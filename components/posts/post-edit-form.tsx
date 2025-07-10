
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  Save, 
  Calendar, 
  Image as ImageIcon, 
  Upload, 
  Wand2, 
  Eye, 
  ArrowLeft,
  Tag,
  Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'

interface Post {
  id: string
  title: string
  content: string
  type: string
  status: string
  scheduledAt: string | null
  imageUrl: string | null
  eventStartDate: string | null
  eventEndDate: string | null
  eventLocation: string | null
  offerValidUntil: string | null
  offerTerms: string | null
}

interface PostEditFormProps {
  postId: string
}

export default function PostEditForm({ postId }: PostEditFormProps) {
  const [post, setPost] = useState<Post | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [type, setType] = useState('UPDATE')
  const [imageUrl, setImageUrl] = useState('')
  const [scheduledAt, setScheduledAt] = useState('')
  const [eventStartDate, setEventStartDate] = useState('')
  const [eventEndDate, setEventEndDate] = useState('')
  const [eventLocation, setEventLocation] = useState('')
  const [offerValidUntil, setOfferValidUntil] = useState('')
  const [offerTerms, setOfferTerms] = useState('')
  const [imagePrompt, setImagePrompt] = useState('')
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    fetchPost()
  }, [postId])

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}`)
      if (response.ok) {
        const data = await response.json()
        const postData = data.post
        setPost(postData)
        setTitle(postData.title)
        setContent(postData.content)
        setType(postData.type)
        setImageUrl(postData.imageUrl || '')
        setScheduledAt(postData.scheduledAt ? new Date(postData.scheduledAt).toISOString().slice(0, 16) : '')
        setEventStartDate(postData.eventStartDate ? new Date(postData.eventStartDate).toISOString().slice(0, 16) : '')
        setEventEndDate(postData.eventEndDate ? new Date(postData.eventEndDate).toISOString().slice(0, 16) : '')
        setEventLocation(postData.eventLocation || '')
        setOfferValidUntil(postData.offerValidUntil ? new Date(postData.offerValidUntil).toISOString().slice(0, 16) : '')
        setOfferTerms(postData.offerTerms || '')
      } else {
        throw new Error('Failed to fetch post')
      }
    } catch (error) {
      console.error('Error fetching post:', error)
      toast({
        title: 'Error',
        description: 'Failed to load post',
        variant: 'destructive'
      })
      router.push('/posts')
    } finally {
      setLoading(false)
    }
  }

  const generateImage = async () => {
    if (!imagePrompt.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a description for the image',
        variant: 'destructive'
      })
      return
    }

    setIsGeneratingImage(true)
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: imagePrompt })
      })

      if (response.ok) {
        const data = await response.json()
        setImageUrl(data.imageUrl)
        toast({
          title: 'Success',
          description: 'Image generated successfully'
        })
      } else {
        throw new Error('Failed to generate image')
      }
    } catch (error) {
      console.error('Error generating image:', error)
      toast({
        title: 'Error',
        description: 'Failed to generate image',
        variant: 'destructive'
      })
    } finally {
      setIsGeneratingImage(false)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImageUrl(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const updatePost = async () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: 'Error',
        description: 'Please fill in title and content',
        variant: 'destructive'
      })
      return
    }

    setIsSaving(true)
    try {
      const postData = {
        title,
        content,
        type,
        imageUrl: imageUrl || null,
        scheduledAt: scheduledAt || null,
        eventStartDate: type === 'EVENT' ? eventStartDate : null,
        eventEndDate: type === 'EVENT' ? eventEndDate : null,
        eventLocation: type === 'EVENT' ? eventLocation : null,
        offerValidUntil: type === 'OFFER' ? offerValidUntil : null,
        offerTerms: type === 'OFFER' ? offerTerms : null
      }

      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Post updated successfully'
        })
        router.push('/posts')
      } else {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update post')
      }
    } catch (error: any) {
      console.error('Error updating post:', error)
      toast({
        title: 'Error',
        description: error.message || 'Failed to update post',
        variant: 'destructive'
      })
    } finally {
      setIsSaving(false)
    }
  }

  const getMinDateTime = () => {
    const now = new Date()
    now.setMinutes(now.getMinutes() + 30)
    return now.toISOString().slice(0, 16)
  }

  const getMaxDateTime = () => {
    const oneYearFromNow = new Date()
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1)
    return oneYearFromNow.toISOString().slice(0, 16)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="text-center">
        <p>Post not found</p>
        <Button asChild className="mt-4">
          <Link href="/posts">Back to Posts</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/posts">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Posts
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit Post</h1>
            <p className="text-muted-foreground">
              Update your Google Business Profile post
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content Editor */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Basic Info */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Post Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter post title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="type">Post Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UPDATE">General Update</SelectItem>
                    <SelectItem value="EVENT">Event</SelectItem>
                    <SelectItem value="OFFER">Offer/Promotion</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Write your post content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="mt-1 min-h-32"
                />
              </div>
            </CardContent>
          </Card>

          {/* Event Fields */}
          {type === 'EVENT' && (
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Event Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="eventStartDate">Start Date</Label>
                    <Input
                      id="eventStartDate"
                      type="datetime-local"
                      value={eventStartDate}
                      onChange={(e) => setEventStartDate(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="eventEndDate">End Date</Label>
                    <Input
                      id="eventEndDate"
                      type="datetime-local"
                      value={eventEndDate}
                      onChange={(e) => setEventEndDate(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="eventLocation">Location</Label>
                  <Input
                    id="eventLocation"
                    placeholder="Event location..."
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Offer Fields */}
          {type === 'OFFER' && (
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Offer Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="offerValidUntil">Valid Until</Label>
                  <Input
                    id="offerValidUntil"
                    type="datetime-local"
                    value={offerValidUntil}
                    onChange={(e) => setOfferValidUntil(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="offerTerms">Terms & Conditions</Label>
                  <Textarea
                    id="offerTerms"
                    placeholder="Terms and conditions..."
                    value={offerTerms}
                    onChange={(e) => setOfferTerms(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* Media and Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-6"
        >
          {/* Image Section */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Post Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload">Upload</TabsTrigger>
                  <TabsTrigger value="generate">AI Generate</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upload" className="space-y-4">
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload image
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                </TabsContent>
                
                <TabsContent value="generate" className="space-y-4">
                  <div>
                    <Label htmlFor="imagePrompt">Describe the image</Label>
                    <Textarea
                      id="imagePrompt"
                      placeholder="A professional business photo showing..."
                      value={imagePrompt}
                      onChange={(e) => setImagePrompt(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <Button 
                    onClick={generateImage}
                    disabled={isGeneratingImage || !imagePrompt.trim()}
                    className="w-full"
                  >
                    {isGeneratingImage ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-4 w-4" />
                        Generate Image
                      </>
                    )}
                  </Button>
                </TabsContent>
              </Tabs>
              
              {imageUrl && (
                <div className="mt-4">
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                    <img
                      src={imageUrl}
                      alt="Post preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Scheduling */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Schedule Post
              </CardTitle>
              <CardDescription>
                Update the publication schedule
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="scheduledAt">Publish Date & Time</Label>
                <Input
                  id="scheduledAt"
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                  min={getMinDateTime()}
                  max={getMaxDateTime()}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Leave empty to save as draft
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 bg-background">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{type}</Badge>
                    <p className="text-xs text-muted-foreground">
                      {scheduledAt 
                        ? `Scheduled: ${new Date(scheduledAt).toLocaleDateString()}`
                        : 'Draft'
                      }
                    </p>
                  </div>
                  {title && (
                    <h3 className="font-medium text-sm">{title}</h3>
                  )}
                  {content && (
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {content}
                    </p>
                  )}
                  {imageUrl && (
                    <div className="relative aspect-video rounded overflow-hidden bg-muted">
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="card-shadow">
            <CardContent className="pt-6">
              <Button
                onClick={updatePost}
                disabled={isSaving || !title.trim() || !content.trim()}
                className="w-full"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Update Post
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
