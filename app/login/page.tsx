
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { getAuthOptions } from '@/lib/auth'
import LoginForm from '@/components/auth/login-form'

export default async function LoginPage() {
  const session = await getServerSession(getAuthOptions())
  
  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <LoginForm />
    </div>
  )
}
