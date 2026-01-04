import { prisma } from "@/lib/db";
import { SectorForm } from "@/components/admin/sector-form";
import { notFound } from "next/navigation";

interface EditSectorPageProps {
    params: {
        id: string;
    };
}

export const dynamic = 'force-dynamic';

export default async function EditSectorPage({ params }: EditSectorPageProps) {
    if (!prisma) {
        notFound();
    }

    const sector = await prisma.sector.findUnique({
        where: { id: params.id }
    });

    if (!sector) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Edit Sector</h2>
                <p className="text-muted-foreground">{sector.title}</p>
            </div>
            <SectorForm sector={sector} />
        </div>
    );
}
