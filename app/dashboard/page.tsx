
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { getAuthOptions } from '@/lib/auth'
import DashboardLayout from '@/components/dashboard/layout'
import DashboardContent from '@/components/dashboard/dashboard-content'

export default async function DashboardPage() {
  const session = await getServerSession(getAuthOptions())
  
  if (!session) {
    redirect('/login')
  }

  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  )
}
