import { prisma } from "@/lib/db";
import { getContentRegistry } from "@/lib/content-registry";
import { BulkAssetEditor } from "@/components/admin/bulk-asset-editor";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

export const dynamic = 'force-dynamic';

export default async function PageContentManager() {
    // 1. Fetch ALL site assets in one go
    const allAssetsPromise = prisma?.siteAsset.findMany() || [];

    // 2. Fetch ALL Sectors to generate the dynamic registry
    const sectorsPromise = prisma?.sector.findMany({
        orderBy: { title: 'asc' }
    }) || [];

    const [allAssets, sectors] = await Promise.all([allAssetsPromise, sectorsPromise]);

    // 3. Generate the Dynamic Registry
    const registry = getContentRegistry(sectors);

    return (
        <div className="space-y-6 pb-20">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Page Content Manager</h2>
                <p className="text-muted-foreground">
                    Manage images and assets for every page on the website from a single location.
                </p>
            </div>
            <Separator />

            <Accordion type="multiple" defaultValue={["home"]} className="w-full space-y-4">
                {registry.map((section) => (
                    <AccordionItem key={section.id} value={section.id} className="border rounded-lg bg-slate-50/50 px-4">
                        <AccordionTrigger className="hover:no-underline py-4">
                            <span className="text-lg font-semibold flex items-center gap-2">
                                {section.title}
                                <span className="text-xs font-normal text-muted-foreground bg-slate-200 px-2 py-0.5 rounded-full">
                                    {section.assets.length} Assets
                                </span>
                            </span>
                        </AccordionTrigger>
                        <AccordionContent>
                            <BulkAssetEditor
                                sectionId={section.id}
                                sectionTitle={section.title}
                                definitions={section.assets}
                                initialAssets={allAssets}
                            />
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
