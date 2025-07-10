
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import DashboardLayout from '@/components/dashboard/layout'
import PostEditor from '@/components/posts/post-editor'

export default async function NewPostPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }

  return (
    <DashboardLayout>
      <PostEditor />
    </DashboardLayout>
  )
}
