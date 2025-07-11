
import { getPrisma } from '@/lib/db'

export interface GoogleBusinessLocation {
  name: string
  title: string
  address: string
  phoneNumber?: string
  websiteUrl?: string
  category?: string
  isVerified: boolean
}

export interface GoogleBusinessPost {
  name: string
  languageCode: string
  summary: string
  media?: {
    mediaFormat: string
    sourceUrl: string
  }[]
  topicType: 'STANDARD' | 'EVENT' | 'OFFER'
  event?: {
    title: string
    schedule: {
      startDate: string
      startTime: string
      endDate: string
      endTime: string
    }
  }
  offer?: {
    couponCode?: string
    redeemOnlineUrl?: string
    termsConditions?: string
  }
}

export class GoogleBusinessProfileAPI {
  private baseUrl = 'https://mybusinessbusinessinformation.googleapis.com/v1'
  private postsBaseUrl = 'https://mybusiness.googleapis.com/v4'

  constructor(private accessToken: string) {}

  async getBusinessAccounts(): Promise<any> {
    const response = await fetch(`${this.baseUrl}/accounts`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch accounts: ${response.statusText}`)
    }

    return response.json()
  }

  async getBusinessLocations(accountId: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/accounts/${accountId}/locations`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch locations: ${response.statusText}`)
    }

    return response.json()
  }

  async createPost(locationId: string, post: GoogleBusinessPost): Promise<any> {
    const response = await fetch(`${this.postsBaseUrl}/${locationId}/localPosts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to create post: ${response.statusText} - ${errorText}`)
    }

    return response.json()
  }

  async getPosts(locationId: string): Promise<any> {
    const response = await fetch(`${this.postsBaseUrl}/${locationId}/localPosts`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`)
    }

    return response.json()
  }

  async deletePost(postId: string): Promise<void> {
    const response = await fetch(`${this.postsBaseUrl}/${postId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to delete post: ${response.statusText}`)
    }
  }
}

export async function getGoogleAccessToken(userId: string): Promise<string | null> {
  try {
    const account = await getPrisma().account.findFirst({
      where: {
        userId,
        provider: 'google',
      },
    })

    if (!account?.access_token) {
      return null
    }

    // Check if token is expired and refresh if needed
    if (account.expires_at && account.expires_at * 1000 < Date.now()) {
      const refreshedToken = await refreshGoogleToken(account.refresh_token!)
      if (refreshedToken) {
        // Update the token in the database
        await getPrisma().account.update({
          where: { id: account.id },
          data: {
            access_token: refreshedToken.access_token,
            expires_at: refreshedToken.expires_at,
          },
        })
        return refreshedToken.access_token
      }
      return null
    }

    return account.access_token
  } catch (error) {
    console.error('Error getting Google access token:', error)
    return null
  }
}

async function refreshGoogleToken(refreshToken: string): Promise<{
  access_token: string
  expires_at: number
} | null> {
  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to refresh token')
    }

    const data = await response.json()
    return {
      access_token: data.access_token,
      expires_at: Math.floor(Date.now() / 1000) + data.expires_in,
    }
  } catch (error) {
    console.error('Error refreshing Google token:', error)
    return null
  }
}

export function convertToGooglePost(post: any): GoogleBusinessPost {
  const googlePost: GoogleBusinessPost = {
    name: '',
    languageCode: 'en',
    summary: post.content,
    topicType: 'STANDARD',
  }

  // Add image if present
  if (post.imageUrl) {
    googlePost.media = [
      {
        mediaFormat: 'PHOTO',
        sourceUrl: post.imageUrl,
      },
    ]
  }

  // Handle different post types
  switch (post.type) {
    case 'EVENT':
      googlePost.topicType = 'EVENT'
      if (post.eventStartDate && post.eventEndDate) {
        googlePost.event = {
          title: post.title,
          schedule: {
            startDate: post.eventStartDate.toISOString().split('T')[0],
            startTime: post.eventStartDate.toISOString().split('T')[1].split('.')[0],
            endDate: post.eventEndDate.toISOString().split('T')[0],
            endTime: post.eventEndDate.toISOString().split('T')[1].split('.')[0],
          },
        }
      }
      break
    case 'OFFER':
      googlePost.topicType = 'OFFER'
      if (post.offerTerms) {
        googlePost.offer = {
          termsConditions: post.offerTerms,
        }
      }
      break
  }

  return googlePost
}
