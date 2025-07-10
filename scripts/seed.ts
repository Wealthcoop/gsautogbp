
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create demo user (for Google OAuth, no password needed)
  const user = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'john@doe.com',
      plan: 'FREE',
    },
  })

  // Create a sample business for the demo user
  const business = await prisma.business.upsert({
    where: { googleId: 'demo-business-123' },
    update: {},
    create: {
      googleId: 'demo-business-123',
      name: 'Gold Standard Demo Business',
      address: '123 Main Street, Anytown, ST 12345',
      phoneNumber: '+1 (555) 123-4567',
      websiteUrl: 'https://goldstandardgbp.com',
      category: 'Business Services',
      isVerified: true,
      userId: user.id,
    },
  })

  // Create usage record for demo user
  const now = new Date()
  const currentMonth = now.getMonth() + 1
  const currentYear = now.getFullYear()

  await prisma.usage.upsert({
    where: {
      userId_month_year: {
        userId: user.id,
        month: currentMonth,
        year: currentYear,
      },
    },
    update: {},
    create: {
      userId: user.id,
      month: currentMonth,
      year: currentYear,
      postCount: 2,
    },
  })

  // Create sample posts
  const samplePosts = [
    {
      title: 'Welcome to Our New Location!',
      content: 'We are excited to announce the opening of our new location in downtown. Come visit us and experience our premium services in a brand new setting.',
      type: 'UPDATE' as const,
      status: 'SCHEDULED' as const,
      scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      imageUrl: 'https://thumbs.dreamstime.com/b/wooden-open-sign-hanging-glass-door-d-rendering-detailed-blurred-modern-interior-perfect-illustration-storefront-356761835.jpg',
      userId: user.id,
      businessId: business.id,
    },
    {
      title: 'Summer Sale - 50% Off All Services',
      content: 'Beat the heat with our amazing summer sale! Get 50% off all services for a limited time. Book your appointment today and save big.',
      type: 'OFFER' as const,
      status: 'SCHEDULED' as const,
      scheduledAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      imageUrl: 'https://media.istockphoto.com/id/2150548065/vector/summer-sale-promotional-banner-summertime-commercial-background-with-hand-lettering-summer.jpg?s=612x612&w=is&k=20&c=XOrHEK6As6QvniMyARKbj8sGAYHX6HbeXuMjKpdVWto=',
      offerValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      offerTerms: 'Valid for new customers only. Cannot be combined with other offers.',
      userId: user.id,
      businessId: business.id,
    },
    {
      title: 'Monthly Networking Event',
      content: 'Join us for our monthly networking event! Connect with local business owners, share ideas, and build meaningful relationships in a relaxed atmosphere.',
      type: 'EVENT' as const,
      status: 'SCHEDULED' as const,
      scheduledAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
      imageUrl: 'https://bettendorfbusiness.net/wp-content/uploads/2022/01/Untitled-design-2023-05-11T135223.291.png',
      eventStartDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 18 * 60 * 60 * 1000), // 1 week + 18 hours
      eventEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 21 * 60 * 60 * 1000), // 1 week + 21 hours
      eventLocation: '123 Business Center, Downtown',
      userId: user.id,
      businessId: business.id,
    },
    {
      title: 'Customer Success Story',
      content: 'We love hearing from our satisfied customers! Read about how our services helped transform their business and achieve their goals.',
      type: 'UPDATE' as const,
      status: 'DRAFT' as const,
      imageUrl: 'https://i.ytimg.com/vi/6qFRVWV4unY/maxresdefault.jpg',
      userId: user.id,
      businessId: business.id,
    },
    {
      title: 'Holiday Hours Announcement',
      content: 'Please note our special holiday hours for the upcoming weekend. We will be open with extended hours to better serve our community.',
      type: 'UPDATE' as const,
      status: 'DRAFT' as const,
      imageUrl: 'https://lookaside.instagram.com/seo/google_widget/crawler/?media_id=3526846106068691139',
      userId: user.id,
      businessId: business.id,
    },
  ]

  for (const post of samplePosts) {
    await prisma.post.create({
      data: post,
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
