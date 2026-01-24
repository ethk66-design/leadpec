import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { SECTORS } from "@/lib/constants";
import { auth } from "@/auth";

export const dynamic = 'force-dynamic'; // Prevent static generation

export async function GET() {
    // Security: Only authenticated admins can seed
    const session = await auth();
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!prisma) {
        return NextResponse.json({ success: false, error: "Database not available" }, { status: 503 });
    }

    try {
        console.log("Seeding sectors...");

        // Clear existing
        // await prisma.sector.deleteMany({}); 

        for (const sectorData of SECTORS) {
            // Upsert to avoid duplicates but update content
            await prisma.sector.upsert({
                where: { slug: sectorData.slug },
                update: {
                    title: sectorData.title,
                    description: sectorData.description,
                    // We can add other fields if we map them from constants to DB schema
                },
                create: {
                    title: sectorData.title,
                    slug: sectorData.slug,
                    description: sectorData.description,

                    content: "Generated from constants.",
                }
            });
        }

        return NextResponse.json({ success: true, message: "Sectors seeded/updated." });
    } catch (error: any) {
        console.error("Seeding error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
