import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

let prismaInstance: PrismaClient | null = null;

// Initialize Prisma Client (Works for both Local & Vercel Postgres)
try {
    prismaInstance = globalForPrisma.prisma || new PrismaClient({ log: ["query"] });

    if (process.env.NODE_ENV !== "production") {
        globalForPrisma.prisma = prismaInstance;
    }
} catch (e) {
    console.warn("Failed to initialize Prisma Client:", e);
    // In strict production, we might want to throw, but to keep the site alive 
    // even if DB fails (using static fallbacks), we keep it catchable.
    prismaInstance = null;
}

// Export: Should be a valid client instance unless connection fails totally
export const prisma = prismaInstance;
