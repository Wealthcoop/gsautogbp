
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import DashboardLayout from '@/components/dashboard/layout'
import CalendarView from '@/components/calendar/calendar-view'

export default async function CalendarPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }

  return (
    <DashboardLayout>
      <CalendarView />
    </DashboardLayout>
  )
}
