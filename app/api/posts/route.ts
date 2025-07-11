
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { getAuthOptions } from '@/lib/auth'
import { getPrisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const session = await getServerSession(getAuthOptions())
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const type = searchParams.get('type')

    const where: any = {
      userId: session.user.id
    }

    if (status && status !== 'all') {
      where.status = status.toUpperCase()
    }

    if (type && type !== 'all') {
      where.type = type.toUpperCase()
    }

    const posts = await getPrisma().post.findMany({
      where,
      include: {
        business: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ posts })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(getAuthOptions())
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { 
      title, 
      content, 
      type, 
      businessId,
      imageUrl, 
      scheduledAt,
      eventStartDate,
      eventEndDate,
      eventLocation,
      offerValidUntil,
      offerTerms
    } = body

    // Validate business ownership if businessId is provided
    if (businessId) {
      const business = await getPrisma().business.findUnique({
        where: { id: businessId },
      })

      if (!business || business.userId !== session.user.id) {
        return NextResponse.json(
          { error: 'Business not found or unauthorized' },
          { status: 403 }
        )
      }
    }

    // Check usage limits for free tier
    if (session.user.plan === 'FREE') {
      const now = new Date()
      const currentMonth = now.getMonth() + 1
      const currentYear = now.getFullYear()

      const usage = await getPrisma().usage.findUnique({
        where: {
          userId_month_year: {
            userId: session.user.id,
            month: currentMonth,
            year: currentYear
          }
        }
      })

      if (usage && usage.postCount >= 5) {
        return NextResponse.json(
          { error: 'Monthly post limit reached. Upgrade to unlimited plan.' },
          { status: 403 }
        )
      }
    }

    // Create the post
    const post = await getPrisma().post.create({
      data: {
        title,
        content,
        type: type.toUpperCase(),
        businessId: businessId || null,
        imageUrl,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        eventStartDate: eventStartDate ? new Date(eventStartDate) : null,
        eventEndDate: eventEndDate ? new Date(eventEndDate) : null,
        eventLocation,
        offerValidUntil: offerValidUntil ? new Date(offerValidUntil) : null,
        offerTerms,
        status: scheduledAt ? 'SCHEDULED' : 'DRAFT',
        userId: session.user.id
      },
      include: {
        business: true,
      }
    })

    // Update usage count if post is scheduled
    if (scheduledAt && session.user.plan === 'FREE') {
      const now = new Date()
      const currentMonth = now.getMonth() + 1
      const currentYear = now.getFullYear()

      await getPrisma().usage.upsert({
        where: {
          userId_month_year: {
            userId: session.user.id,
            month: currentMonth,
            year: currentYear
          }
        },
        update: {
          postCount: {
            increment: 1
          }
        },
        create: {
          userId: session.user.id,
          month: currentMonth,
          year: currentYear,
          postCount: 1
        }
      })
    }

    return NextResponse.json({ post })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
