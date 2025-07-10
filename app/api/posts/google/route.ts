
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { GoogleBusinessProfileAPI, getGoogleAccessToken, convertToGooglePost } from '@/lib/google-business-profile'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { postId } = await request.json()
    
    if (!postId) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 })
    }

    // Get the post from database
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { business: true },
    })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    if (post.userId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    if (!post.business) {
      return NextResponse.json({ error: 'Business not associated with post' }, { status: 400 })
    }

    const accessToken = await getGoogleAccessToken(session.user.id)
    if (!accessToken) {
      return NextResponse.json({ error: 'Google access token not found' }, { status: 401 })
    }

    const api = new GoogleBusinessProfileAPI(accessToken)
    
    // Convert our post to Google Business Profile format
    const googlePost = convertToGooglePost(post)
    
    // Create the post on Google Business Profile
    const createdPost = await api.createPost(post.business.googleId, googlePost)

    // Update our post with the Google post ID and mark as published
    await prisma.post.update({
      where: { id: postId },
      data: {
        googlePostId: createdPost.name,
        status: 'PUBLISHED',
      },
    })

    return NextResponse.json({ 
      message: 'Post published successfully',
      googlePostId: createdPost.name 
    })
  } catch (error) {
    console.error('Error publishing post to Google:', error)
    return NextResponse.json(
      { error: 'Failed to publish post to Google Business Profile' },
      { status: 500 }
    )
  }
}
