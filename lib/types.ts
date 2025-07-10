
export interface User {
  id: string
  name: string | null
  email: string
  plan: 'FREE' | 'UNLIMITED'
  createdAt: Date
  updatedAt: Date
}

export interface Business {
  id: string
  userId: string
  googleId: string
  name: string
  address: string | null
  phoneNumber: string | null
  websiteUrl: string | null
  category: string | null
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Post {
  id: string
  title: string
  content: string
  type: 'UPDATE' | 'EVENT' | 'OFFER'
  status: 'DRAFT' | 'SCHEDULED' | 'PUBLISHED'
  imageUrl: string | null
  scheduledAt: Date | null
  createdAt: Date
  updatedAt: Date
  userId: string
  businessId: string | null
  googlePostId: string | null
  business?: Business
  
  // Event-specific fields
  eventStartDate: Date | null
  eventEndDate: Date | null
  eventLocation: string | null
  
  // Offer-specific fields
  offerValidUntil: Date | null
  offerTerms: string | null
}

export interface Usage {
  id: string
  userId: string
  month: number
  year: number
  postCount: number
  createdAt: Date
  updatedAt: Date
}

export interface PostFormData {
  title: string
  content: string
  type: 'UPDATE' | 'EVENT' | 'OFFER'
  businessId?: string
  imageUrl?: string
  scheduledAt?: Date
  eventStartDate?: Date
  eventEndDate?: Date
  eventLocation?: string
  offerValidUntil?: Date
  offerTerms?: string
}

export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface UsageStats {
  currentUsage: number
  limit: number
  plan: 'FREE' | 'UNLIMITED'
  canCreatePost: boolean
}
