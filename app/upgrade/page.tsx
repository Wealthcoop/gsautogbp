
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { getAuthOptions } from '@/lib/auth'
import DashboardLayout from '@/components/dashboard/layout'
import UpgradeContent from '@/components/upgrade/upgrade-content'

export default async function UpgradePage() {
  const session = await getServerSession(getAuthOptions())
  
  if (!session) {
    redirect('/login')
  }

  return (
    <DashboardLayout>
      <UpgradeContent />
    </DashboardLayout>
  )
}
