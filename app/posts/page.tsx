
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { getAuthOptions } from '@/lib/auth'
import DashboardLayout from '@/components/dashboard/layout'
import PostsList from '@/components/posts/posts-list'

export default async function PostsPage() {
  const session = await getServerSession(getAuthOptions())
  
  if (!session) {
    redirect('/login')
  }

  return (
    <DashboardLayout>
      <PostsList />
    </DashboardLayout>
  )
}
