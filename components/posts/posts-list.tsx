
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Edit, 
  Trash2,
  Clock,
  CheckCircle,
  PenTool,
  Building2,
  Send,
  Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'

interface Business {
  id: string
  name: string
  address: string | null
  isVerified: boolean
}

interface Post {
  id: string
  title: string
  content: string
  type: string
  status: string
  scheduledAt: string | null
  createdAt: string
  imageUrl?: string
  businessId: string | null
  googlePostId: string | null
  business?: Business
}

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [publishingPosts, setPublishingPosts] = useState<Set<string>>(new Set())
  const { toast } = useToast()

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    filterPosts()
  }, [posts, searchTerm, statusFilter, typeFilter])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      if (response.ok) {
        const data = await response.json()
        setPosts(data.posts || [])
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
      toast({
        title: 'Error',
        description: 'Failed to load posts',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const filterPosts = () => {
    let filtered = posts

    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(post => post.status.toLowerCase() === statusFilter)
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(post => post.type.toLowerCase() === typeFilter)
    }

    setFilteredPosts(filtered)
  }

  const deletePost = async (postId: string) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setPosts(posts.filter(post => post.id !== postId))
        toast({
          title: 'Success',
          description: 'Post deleted successfully'
        })
      } else {
        throw new Error('Failed to delete post')
      }
    } catch (error) {
      console.error('Error deleting post:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete post',
        variant: 'destructive'
      })
    }
  }

  const publishToGoogle = async (postId: string) => {
    setPublishingPosts(prev => new Set(prev).add(postId))
    
    try {
      const response = await fetch('/api/posts/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId }),
      })

      if (response.ok) {
        // Update the post status to published
        setPosts(prevPosts =>
          prevPosts.map(post =>
            post.id === postId
              ? { ...post, status: 'PUBLISHED' }
              : post
          )
        )
        toast({
          title: 'Success',
          description: 'Post published to Google Business Profile successfully'
        })
      } else {
        const error = await response.json()
        throw new Error(error.error || 'Failed to publish post')
      }
    } catch (error: any) {
      console.error('Error publishing post:', error)
      toast({
        title: 'Error',
        description: error.message || 'Failed to publish post to Google Business Profile',
        variant: 'destructive'
      })
    } finally {
      setPublishingPosts(prev => {
        const newSet = new Set(prev)
        newSet.delete(postId)
        return newSet
      })
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return <PenTool className="h-4 w-4" />
      case 'SCHEDULED':
        return <Clock className="h-4 w-4" />
      case 'PUBLISHED':
        return <CheckCircle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return 'bg-gray-100 text-gray-800'
      case 'SCHEDULED':
        return 'bg-blue-100 text-blue-800'
      case 'PUBLISHED':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
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
            <h1 className="text-3xl font-bold tracking-tight">Posts</h1>
            <p className="text-muted-foreground">
              Manage your Google Business Profile posts
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

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="card-shadow">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="update">Update</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="offer">Offer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Posts List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="card-shadow hover:card-shadow-hover transition-shadow h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                        <CardDescription className="mt-2 line-clamp-3">
                          {post.content}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Badge className={getStatusColor(post.status)}>
                        {getStatusIcon(post.status)}
                        <span className="ml-1">{post.status}</span>
                      </Badge>
                      <Badge variant="outline" className={getTypeColor(post.type)}>
                        {post.type}
                      </Badge>
                    </div>
                    {post.business && (
                      <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        <span className="font-medium">{post.business.name}</span>
                        {post.business.isVerified && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-sm text-muted-foreground">
                        {post.scheduledAt ? (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Scheduled: {new Date(post.scheduledAt).toLocaleDateString()}
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Created: {new Date(post.createdAt).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        {/* Publish button for posts with business that aren't published yet */}
                        {post.business && post.status !== 'PUBLISHED' && (
                          <Button
                            onClick={() => publishToGoogle(post.id)}
                            disabled={publishingPosts.has(post.id)}
                            size="sm"
                            className="w-full"
                          >
                            {publishingPosts.has(post.id) ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Publishing...
                              </>
                            ) : (
                              <>
                                <Send className="h-4 w-4 mr-2" />
                                Publish to Google
                              </>
                            )}
                          </Button>
                        )}
                        
                        <div className="flex gap-2">
                          <Button asChild variant="outline" size="sm" className="flex-1">
                            <Link href={`/posts/${post.id}/edit`}>
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Link>
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm" className="px-3">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the post.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deletePost(post.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card className="card-shadow">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No posts found</h3>
              <p className="text-muted-foreground text-center mb-6">
                {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
                  ? 'No posts match your current filters'
                  : 'Get started by creating your first post'}
              </p>
              <Button asChild>
                <Link href="/posts/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Post
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  )
}
