// Database client placeholder
// For the POC, we use in-memory data from demo-data.ts
// In production, uncomment the Prisma code below after running `npx prisma generate`

/*
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
*/

// POC: In-memory data store
// This is a mock database client for development
export const db = {
  isConnected: () => Promise.resolve(true),
  disconnect: () => Promise.resolve(),
}

export default db
