import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SECTOR_IMAGES, SLUG_TO_ASSET_KEY } from "@/lib/sector-images";
import { SECTOR_CONTENT_CONFIG } from "@/lib/sector-content-config";

// Import all sector components
import { SectorDetailConstruction } from "@/components/pages/sector-detail-construction";
import { SectorDetailEnergy } from "@/components/pages/sector-detail-energy";
import { SectorDetailFabrication } from "@/components/pages/sector-detail-fabrication";
import { SectorDetailFacilities } from "@/components/pages/sector-detail-facilities";
import { SectorDetailHealthcare } from "@/components/pages/sector-detail-healthcare";
import { SectorDetailHeavyEquipment } from "@/components/pages/sector-detail-heavy-equipment";
import { SectorDetailHospitality } from "@/components/pages/sector-detail-hospitality";
import { SectorDetailInfrastructure } from "@/components/pages/sector-detail-infrastructure";
import { SectorDetailOilGas } from "@/components/pages/sector-detail-oil-gas";
import { SectorDetailOM } from "@/components/pages/sector-detail-om";
import { SectorDetailWater } from "@/components/pages/sector-detail-water";

const SECTOR_COMPONENTS: Record<string, any> = {
    "engineering-construction": SectorDetailConstruction,
    "power-renewable-energy": SectorDetailEnergy,
    "fabrication-technical-services": SectorDetailFabrication,
    "facilities-management": SectorDetailFacilities,
    "healthcare-pharmaceutical": SectorDetailHealthcare,
    "heavy-construction-equipment": SectorDetailHeavyEquipment,
    "hospitality-catering": SectorDetailHospitality,
    "infrastructure-utilities": SectorDetailInfrastructure,
    "oil-gas-petrochemical": SectorDetailOilGas,
    "operation-maintenance": SectorDetailOM,
    "water-wastewater": SectorDetailWater,
};

interface SectorPageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: SectorPageProps): Promise<Metadata> {
    if (!prisma) return { title: "Sector | LEADPEC" };

    const sector = await prisma.sector.findUnique({
        where: { slug: params.slug },
    });

    if (!sector) {
        return {
            title: "Sector Not Found | LEADPEC",
        };
    }

    return {
        title: `${sector.title} | LEADPEC Sectors`,
        description: sector.description,
    };
}

export default async function SectorPage({ params }: SectorPageProps) {
    if (!prisma) notFound();

    const sector = await prisma.sector.findUnique({
        where: { slug: params.slug },
    });

    if (!sector) {
        notFound();
    }

    // 1. Resolve Hero Image
    // Priority: SiteAsset (Unified Manager) > Sector Model (Legacy) > Fallback Map
    let finalHeroImage = "";

    // 1. Try Unified SiteAsset
    const assetKey = SLUG_TO_ASSET_KEY[params.slug] || `SECTOR_${params.slug.toUpperCase().replace(/-/g, '_')}_HERO`;
    const heroAsset = await prisma.siteAsset.findUnique({
        where: { key: assetKey }
    });

    if (heroAsset && heroAsset.url) {
        finalHeroImage = heroAsset.url;
    }

    // 2. Fallback to Legacy Sector Model
    if (!finalHeroImage && sector.heroImage) {
        finalHeroImage = sector.heroImage;
    }

    // 3. Fallback to Static Map
    if (!finalHeroImage) {
        finalHeroImage = SECTOR_IMAGES[params.slug] || "/images/placeholder-hero.jpg";
    }

    // 2. Resolve Dynamic Content Images
    const contentConfig = SECTOR_CONTENT_CONFIG[params.slug] || [];
    const contentAssetKeys = contentConfig.map(c => c.key);

    // Fetch all potential assets for this sector
    const contentAssets = await prisma.siteAsset.findMany({
        where: { key: { in: contentAssetKeys } }
    });

    // Create a dictionary: { KEY: URL }
    // Fallback to defaultSrc from config if no asset found
    const contentImages: Record<string, string> = {};

    contentConfig.forEach(config => {
        const asset = contentAssets.find(a => a.key === config.key);
        contentImages[config.key] = asset?.url || config.defaultSrc;
    });

    // 3. Select Component
    const DetailComponent = SECTOR_COMPONENTS[params.slug];

    // If no custom component exists, use the generic SectorDetail component
    if (!DetailComponent) {
        // Dynamic import to avoid circular dependencies
        const { SectorDetail } = await import("@/components/sectors/sector-detail");

        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <SectorDetail sector={sector} />
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <DetailComponent
                sector={sector}
                heroImage={finalHeroImage}
                images={contentImages}
            />
            <Footer />
        </div>
    );
}
