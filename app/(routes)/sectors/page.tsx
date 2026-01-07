import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SectorsContent } from "@/components/pages/sectors-content";
import { prisma } from "@/lib/db";
import { SECTOR_IMAGES, SLUG_TO_ASSET_KEY } from "@/lib/sector-images";

export const dynamic = 'force-dynamic';

export default async function SectorsPage() {
    let sectors: any[] = [];
    if (prisma) {
        const [dbSectors, sectorAssets] = await Promise.all([
            prisma.sector.findMany({
                orderBy: { title: 'asc' }
            }),
            prisma.siteAsset.findMany({
                where: {
                    key: {
                        in: Object.values(SLUG_TO_ASSET_KEY)
                    }
                }
            })
        ]);

        sectors = dbSectors.map(sector => {
            const assetKey = SLUG_TO_ASSET_KEY[sector.slug];
            const asset = sectorAssets.find(a => a.key === assetKey);

            // Fix: Ignore legacy seed paths that don't exist
            const isLegacyBrokenPath = sector.heroImage?.startsWith("/images/sectors/");
            const validHeroImage = isLegacyBrokenPath ? null : sector.heroImage;

            // Priority: 1. Valid DB Image, 2. SiteAsset (Admin), 3. Static Config
            const resolvedImage = validHeroImage || asset?.url || SECTOR_IMAGES[sector.slug] || "/images/hero-corporate.png";

            return {
                ...sector,
                heroImage: resolvedImage
            };
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
