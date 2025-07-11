
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { getAuthOptions } from '@/lib/auth'
import DashboardLayout from '@/components/dashboard/layout'
import PostEditForm from '@/components/posts/post-edit-form'

interface Props {
  params: {
    id: string
  }
}

export default async function EditPostPage({ params }: Props) {
  const session = await getServerSession(getAuthOptions())
  
  if (!session) {
    redirect('/login')
  }

  return (
    <DashboardLayout>
      <PostEditForm postId={params.id} />
    </DashboardLayout>
  )
}
