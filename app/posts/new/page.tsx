
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { getAuthOptions } from '@/lib/auth'
import DashboardLayout from '@/components/dashboard/layout'
import PostEditor from '@/components/posts/post-editor'

export default async function NewPostPage() {
  const session = await getServerSession(getAuthOptions())
  
  if (!session) {
    redirect('/login')
  }

  return (
    <DashboardLayout>
      <PostEditor />
    </DashboardLayout>
  )
}
