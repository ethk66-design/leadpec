import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { DeleteSectorButton } from "@/components/admin/delete-sector-button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export const dynamic = 'force-dynamic';

export default async function SectorsPage() {
    let sectors: any[] = [];
    if (prisma) {
        sectors = await prisma.sector.findMany({
            orderBy: {
                title: "asc"
            }
        });
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Sectors</h2>
                    <p className="text-muted-foreground">Manage sector content and images.</p>
                </div>
                {/* 
                  Optional: Add "New Sector" button if we want to allow creating new ones, 
                  but usually sectors are fixed. I'll leave it out for now or comment it out.
                */}
                <Button asChild>
                    <Link href="/admin/sectors/new">
                        <Plus className="w-4 h-4 mr-2" /> Add Sector
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Images Set</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sectors.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                                    No sectors found. <Link href="/api/seed-sectors" target="_blank" className="underline text-blue-500">Click to Seed</Link>
                                </TableCell>
                            </TableRow>
                        ) : (
                            sectors.map((sector) => (
                                <TableRow key={sector.id}>
                                    <TableCell className="font-medium">{sector.title}</TableCell>
                                    <TableCell>{sector.slug}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            {sector.heroImage && <span className="w-2 h-2 rounded-full bg-green-500" title="Hero Image Set" />}
                                            {sector.middleImage && <span className="w-2 h-2 rounded-full bg-blue-500" title="Middle Image Set" />}
                                            {sector.bottomImage && <span className="w-2 h-2 rounded-full bg-purple-500" title="Bottom Image Set" />}
                                            {!sector.heroImage && !sector.middleImage && !sector.bottomImage && <span className="text-xs text-muted-foreground">None</span>}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link href={`/admin/sectors/${sector.id}`}>
                                                    Edit
                                                </Link>
                                            </Button>
                                            <DeleteSectorButton id={sector.id} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
