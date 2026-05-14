/**
 * Database client for PostgreSQL (Neon)
 *
 * Uses DATABASE_URL environment variable for the connection string.
 * Prisma schema defines: url = env("DATABASE_URL")
 *
 * Includes a Prisma extension that automatically converts Decimal fields
 * to JavaScript numbers on every query, ensuring JSON serialization works
 * correctly in API responses.
 */

import { PrismaClient } from '@prisma/client'
import { Prisma } from '@prisma/client'

/**
 * Recursively converts Prisma.Decimal objects to numbers for JSON-safe output.
 * Handles: objects, arrays, Date objects (kept as-is for ISO string conversion),
 * Decimal instances (converted to number), and primitives.
 */
function serializeDecimal(obj: unknown): unknown {
  if (obj === null || obj === undefined) return obj
  if (typeof obj === 'number' || typeof obj === 'boolean' || typeof obj === 'string') return obj
  if (obj instanceof Date) return obj
  if (typeof obj === 'object' && (obj as Record<string, unknown>).constructor?.name === 'Decimal') {
    return Number((obj as { toNumber: () => number }).toNumber())
  }
  if (Array.isArray(obj)) return obj.map(serializeDecimal)
  if (typeof obj === 'object') {
    const result: Record<string, unknown> = {}
    for (const key of Object.keys(obj)) {
      result[key] = serializeDecimal((obj as Record<string, unknown>)[key])
    }
    return result
  }
  return obj
}

/**
 * Prisma client extension that transparently serializes Decimal fields to numbers.
 * This ensures all API responses can be JSON.stringify'd without losing data.
 */
const decimalExtension = Prisma.defineExtension({
  name: 'decimalSerializer',
  query: {
    $allModels: {
      $allOperations: async ({ args, query, model, operation }) => {
        const result = await query(args)
        return serializeDecimal(result)
      },
    },
  },
})

// Singleton pattern for development (prevents multiple connections)
const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createDbClient> | undefined
}

function createDbClient() {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  }).$extends(decimalExtension)
}

export const db = globalForPrisma.prisma ?? createDbClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
