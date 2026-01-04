import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SectorsContent } from "@/components/pages/sectors-content";
import { prisma } from "@/lib/db";

export const dynamic = 'force-dynamic';

export default async function SectorsPage() {
    let sectors: any[] = [];
    if (prisma) {
        sectors = await prisma.sector.findMany({
            orderBy: { title: 'asc' }
        });
    }

    return (
        <div className="flex min-h-screen flex-col bg-[#051120]">
            <Header />
            <SectorsContent sectors={sectors} />
            <Footer />
        </div>
    );
}
