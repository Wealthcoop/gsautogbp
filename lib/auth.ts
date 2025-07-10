
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/db'

declare module 'next-auth' {
  interface User {
    id: string
    email: string
    name?: string | null
    plan?: string
  }

  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
      plan?: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    plan?: string
    accessToken?: string
    refreshToken?: string
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'openid email profile https://www.googleapis.com/auth/business.manage'
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.plan = user.plan
      }
      
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
      }
      
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id
        session.user.plan = token.plan
        // Don't expose tokens in session for security
      }
      return session
    },
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        // Update user plan if it's a new user
        try {
          await prisma.user.upsert({
            where: { email: user.email! },
            update: {},
            create: {
              email: user.email!,
              name: user.name,
              image: user.image,
              plan: 'FREE'
            }
          })
        } catch (error) {
          console.error('Error creating/updating user:', error)
        }
      }
      return true
    }
  }
}
