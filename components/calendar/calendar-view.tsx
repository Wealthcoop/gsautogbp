
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Edit,
  Clock,
  Star,
  Filter
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'

interface Post {
  id: string
  title: string
  content: string
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

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [posts, setPosts] = useState<Post[]>([])
  const [usage, setUsage] = useState<Usage | null>(null)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [typeFilter, setTypeFilter] = useState('all')
  const { toast } = useToast()

  useEffect(() => {
    fetchData()
  }, [])

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
      toast({
        title: 'Error',
        description: 'Failed to load calendar data',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }
    
    return days
  }

  const getPostsForDate = (date: Date | null) => {
    if (!date) return []
    
    const filteredPosts = posts.filter(post => {
      if (!post.scheduledAt) return false
      
      const postDate = new Date(post.scheduledAt)
      const isSameDay = postDate.toDateString() === date.toDateString()
      
      if (typeFilter === 'all') return isSameDay
      return isSameDay && post.type.toLowerCase() === typeFilter
    })
    
    return filteredPosts
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'UPDATE':
        return 'bg-purple-100 text-purple-800'
      case 'EVENT':
        return 'bg-orange-100 text-orange-800'
      case 'OFFER':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const isToday = (date: Date | null) => {
    if (!date) return false
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isCurrentMonth = (date: Date | null) => {
    if (!date) return false
    return date.getMonth() === currentDate.getMonth()
  }

  const days = getDaysInMonth(currentDate)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
            <p className="text-muted-foreground">
              View and manage your scheduled posts
            </p>
          </div>
          <Button asChild size="lg" className="gold-shadow">
            <Link href="/posts/new">
              <Plus className="mr-2 h-5 w-5" />
              Schedule Post
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Usage Info */}
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
                <div className="flex items-center gap-2">
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="update">Updates</SelectItem>
                      <SelectItem value="event">Events</SelectItem>
                      <SelectItem value="offer">Offers</SelectItem>
                    </SelectContent>
                  </Select>
                  {!usage.canCreatePost && (
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/upgrade">Upgrade</Link>
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>
      )}

      {/* Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="card-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth('prev')}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentDate(new Date())}
                >
                  Today
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth('next')}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1">
              {/* Day headers */}
              {DAYS.map(day => (
                <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
              
              {/* Calendar days */}
              {days.map((date, index) => {
                const dayPosts = getPostsForDate(date)
                const isCurrentDay = isToday(date)
                const isInCurrentMonth = isCurrentMonth(date)
                
                return (
                  <div
                    key={index}
                    className={`min-h-24 p-1 border border-border rounded-lg transition-colors ${
                      isCurrentDay 
                        ? 'bg-primary/10 border-primary' 
                        : isInCurrentMonth 
                          ? 'bg-background hover:bg-muted' 
                          : 'bg-muted/50'
                    }`}
                  >
                    {date && (
                      <>
                        <div className={`text-sm font-medium mb-1 ${
                          isCurrentDay 
                            ? 'text-primary' 
                            : isInCurrentMonth 
                              ? 'text-foreground' 
                              : 'text-muted-foreground'
                        }`}>
                          {date.getDate()}
                        </div>
                        <div className="space-y-1">
                          {dayPosts.slice(0, 2).map(post => (
                            <Dialog key={post.id}>
                              <DialogTrigger asChild>
                                <div
                                  className="cursor-pointer p-1 rounded text-xs bg-primary/10 hover:bg-primary/20 transition-colors"
                                  onClick={() => setSelectedPost(post)}
                                >
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    <span className="truncate">{post.title}</span>
                                  </div>
                                </div>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle className="flex items-center gap-2">
                                    <Badge className={getTypeColor(post.type)}>
                                      {post.type}
                                    </Badge>
                                    {post.title}
                                  </DialogTitle>
                                  <DialogDescription>
                                    Scheduled for {new Date(post.scheduledAt!).toLocaleDateString()} at{' '}
                                    {new Date(post.scheduledAt!).toLocaleTimeString()}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <p className="text-sm text-muted-foreground">Content:</p>
                                    <p className="text-sm">{post.content}</p>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button asChild size="sm" className="flex-1">
                                      <Link href={`/posts/${post.id}/edit`}>
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit Post
                                      </Link>
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          ))}
                          {dayPosts.length > 2 && (
                            <div className="text-xs text-muted-foreground p-1">
                              +{dayPosts.length - 2} more
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle>Post Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-purple-100 border border-purple-200"></div>
                <span className="text-sm">Updates</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-orange-100 border border-orange-200"></div>
                <span className="text-sm">Events</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-100 border border-green-200"></div>
                <span className="text-sm">Offers</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
