import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

let prismaInstance: PrismaClient | null = null;

// Initialize Prisma Client (Works for both Local & Vercel Postgres)
// Initialize Prisma Client
prismaInstance = globalForPrisma.prisma || new PrismaClient({
    log: ["query", "error", "warn"]
});

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prismaInstance;
}

// Export: Should be a valid client instance unless connection fails totally
export const prisma = prismaInstance;
