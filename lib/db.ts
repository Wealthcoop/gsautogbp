import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Lazy initialization function to avoid connecting during build time
function createPrismaClient(): PrismaClient {
  if (!globalForPrisma.prisma) {
    // Only create if we have a DATABASE_URL or we're in development
    if (!process.env.DATABASE_URL && process.env.NODE_ENV === 'production') {
      throw new Error('DATABASE_URL is required in production')
    }
    globalForPrisma.prisma = new PrismaClient()
  }
  return globalForPrisma.prisma
}

// Only create the client when actually needed, not at module load time
export function getPrisma(): PrismaClient {
  // During build time, DATABASE_URL might not be available
  // Only initialize when we actually need to use the database
  if (typeof window !== 'undefined') {
    throw new Error('Prisma client should not be used on the client side')
  }
  
  return createPrismaClient()
}

// For compatibility, also export the old prisma export but make it lazy
export const prisma = new Proxy({} as PrismaClient, {
  get(target, prop) {
    const client = getPrisma()
    const value = client[prop as keyof PrismaClient]
    
    if (typeof value === 'function') {
      return value.bind(client)
    }
    
    return value
  }
})
