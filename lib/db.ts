import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

let prismaInstance: PrismaClient | null = null;

// Check if we're on Vercel serverless (no persistent SQLite)
const isVercel = process.env.VERCEL === "1";

if (!isVercel) {
    // Local development: Use SQLite normally
    try {
        prismaInstance = globalForPrisma.prisma || new PrismaClient({ log: ["query"] });
        if (process.env.NODE_ENV !== "production") {
            globalForPrisma.prisma = prismaInstance;
        }
    } catch (e) {
        console.warn("Failed to initialize Prisma Client:", e);
        prismaInstance = null;
    }
}

// Export: On Vercel, this will be null. Pages should handle this gracefully.
export const prisma = prismaInstance;
