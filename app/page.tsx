
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { getAuthOptions } from '@/lib/auth'
import LandingPage from '@/components/landing-page'

export default async function Home() {
  const session = await getServerSession(getAuthOptions())
  
  if (session) {
    redirect('/dashboard')
  }

  return <LandingPage />
}
