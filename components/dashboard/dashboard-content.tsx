
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { 
  Calendar, 
  FileText, 
  Clock, 
  Plus, 
  TrendingUp, 
  Users, 
  Star,
  BarChart3,
  PenTool,
  CheckCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

interface Post {
  id: string
  title: string
  type: string
  status: string
  scheduledAt: string | null
  createdAt: string
}

interface Usage {
  currentUsage: number
  limit: number
  plan: string
  canCreatePost: boolean
}

export default function DashboardContent() {
  const { data: session } = useSession()
  const [posts, setPosts] = useState<Post[]>([])
  const [usage, setUsage] = useState<Usage | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsResponse, usageResponse] = await Promise.all([
          fetch('/api/posts'),
          fetch('/api/usage')
        ])

        if (postsResponse.ok) {
          const postsData = await postsResponse.json()
          setPosts(postsData.posts || [])
        }

        if (usageResponse.ok) {
          const usageData = await usageResponse.json()
          setUsage(usageData)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  const scheduledPosts = posts?.filter(post => post.status === 'SCHEDULED') || []
  const draftPosts = posts?.filter(post => post.status === 'DRAFT') || []
  const upcomingPosts = scheduledPosts
    .filter(post => post.scheduledAt && new Date(post.scheduledAt) > new Date())
    .sort((a, b) => new Date(a.scheduledAt!).getTime() - new Date(b.scheduledAt!).getTime())
    .slice(0, 3)

  const usagePercentage = usage ? (usage.currentUsage / (usage.limit === -1 ? 100 : usage.limit)) * 100 : 0

  const stats = [
    {
      title: 'Total Posts',
      value: posts?.length || 0,
      icon: FileText,
      description: 'All created posts'
    },
    {
      title: 'Scheduled',
      value: scheduledPosts.length,
      icon: Calendar,
      description: 'Ready to publish'
    },
    {
      title: 'Drafts',
      value: draftPosts.length,
      icon: PenTool,
      description: 'Work in progress'
    },
    {
      title: 'This Month',
      value: usage?.currentUsage || 0,
      icon: TrendingUp,
      description: 'Posts created'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back, {session?.user?.name?.split(' ')[0]}!
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening with your Google Business Profile posts.
            </p>
          </div>
          <Button asChild size="lg" className="gold-shadow">
            <Link href="/posts/new">
              <Plus className="mr-2 h-5 w-5" />
              Create Post
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Usage Card */}
      {usage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    {usage.plan === 'FREE' ? 'Free Plan' : 'Unlimited Plan'}
                  </CardTitle>
                  <CardDescription>
                    {usage.plan === 'FREE' 
                      ? `${usage.currentUsage} of ${usage.limit} posts used this month`
                      : 'Unlimited posts available'
                    }
                  </CardDescription>
                </div>
                {usage.plan === 'FREE' && (
                  <Badge variant="secondary">
                    {usage.limit - usage.currentUsage} remaining
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {usage.plan === 'FREE' && (
                <div className="space-y-3">
                  <Progress value={usagePercentage} className="h-2" />
                  {!usage.canCreatePost && (
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        You've reached your monthly limit
                      </p>
                      <Button size="sm" variant="outline" asChild>
                        <Link href="/upgrade">Upgrade Plan</Link>
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="card-shadow hover:card-shadow-hover transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Posts
              </CardTitle>
              <CardDescription>
                Your next scheduled posts
              </CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingPosts.length > 0 ? (
                <div className="space-y-4">
                  {upcomingPosts.map((post, index) => (
                    <div key={post.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{post.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {post.scheduledAt ? new Date(post.scheduledAt).toLocaleDateString() : 'No date'}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {post.type}
                      </Badge>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link href="/calendar">View All Scheduled</Link>
                  </Button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">
                    No upcoming posts scheduled
                  </p>
                  <Button variant="outline" size="sm" asChild className="mt-2">
                    <Link href="/posts/new">Schedule Your First Post</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Common tasks and shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/posts/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Post
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/calendar">
                    <Calendar className="mr-2 h-4 w-4" />
                    View Calendar
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/posts?status=draft">
                    <PenTool className="mr-2 h-4 w-4" />
                    View Drafts
                  </Link>
                </Button>
                {usage?.plan === 'FREE' && (
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link href="/upgrade">
                      <Star className="mr-2 h-4 w-4" />
                      Upgrade Plan
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
