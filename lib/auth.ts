
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { getPrisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

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

export function getAuthOptions(): NextAuthOptions {
  // Create adapter lazily to avoid Prisma initialization during build
  let adapter: any
  try {
    adapter = PrismaAdapter(getPrisma())
  } catch (error) {
    // During build time, if DATABASE_URL is not available, skip the adapter
    console.warn('Prisma adapter not available during build:', error)
    adapter = undefined
  }
  
  return {
    adapter,
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        authorization: {
          params: {
            scope: 'openid email profile https://www.googleapis.com/auth/business.manage'
          }
        }
      }),
      CredentialsProvider({
        name: 'credentials',
        credentials: {
          email: { label: 'Email', type: 'email' },
          password: { label: 'Password', type: 'password' }
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
            return null
          }

          try {
            const prisma = getPrisma()
            const user = await prisma.user.findUnique({
              where: { email: credentials.email }
            })

            if (!user || !user.password) {
              return null
            }

            const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

            if (!isPasswordValid) {
              return null
            }

            return {
              id: user.id,
              email: user.email,
              name: user.name,
              plan: user.plan
            }
          } catch (error) {
            console.error('Error during authentication:', error)
            return null
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
            const prisma = getPrisma()
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
        } else if (account?.provider === 'credentials') {
          // User is already verified in the authorize function
          // No additional action needed for credentials login
          return true
        }
        return true
      }
    }
  }
}
