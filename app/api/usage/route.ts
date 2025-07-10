
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const now = new Date()
    const currentMonth = now.getMonth() + 1
    const currentYear = now.getFullYear()

    const usage = await prisma.usage.findUnique({
      where: {
        userId_month_year: {
          userId: session.user.id,
          month: currentMonth,
          year: currentYear
        }
      }
    })

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id
      }
    })

    const currentUsage = usage?.postCount || 0
    const limit = user?.plan === 'FREE' ? 5 : -1 // -1 means unlimited
    
    return NextResponse.json({
      currentUsage,
      limit,
      plan: user?.plan || 'FREE',
      canCreatePost: user?.plan === 'UNLIMITED' || currentUsage < 5
    })
  } catch (error) {
    console.error('Error fetching usage:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
