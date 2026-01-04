import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { SectorDetail } from "@/components/sectors/sector-detail";
import { SectorDetailConstruction } from "@/components/pages/sector-detail-construction";
import { SectorDetailHealthcare } from "@/components/pages/sector-detail-healthcare";
import { SectorDetailInfrastructure } from "@/components/pages/sector-detail-infrastructure";
import { SectorDetailEnergy } from "@/components/pages/sector-detail-energy";
import { SectorDetailFabrication } from "@/components/pages/sector-detail-fabrication";
import { SectorDetailHeavyEquipment } from "@/components/pages/sector-detail-heavy-equipment";
import { SectorDetailOilGas } from "@/components/pages/sector-detail-oil-gas";
import { SectorDetailWater } from "@/components/pages/sector-detail-water";
import { SectorDetailFacilities } from "@/components/pages/sector-detail-facilities";
import { SectorDetailHospitality } from "@/components/pages/sector-detail-hospitality";
import { SectorDetailOM } from "@/components/pages/sector-detail-om";

interface SectorPageProps {
    params: {
        slug: string;
    };
}

// Map slugs to asset keys
const SLUG_TO_ASSET_KEY: Record<string, string> = {
    'engineering-construction': 'SECTOR_CONSTRUCTION_HERO',
    'healthcare-pharmaceutical': 'SECTOR_HEALTHCARE_HERO',
    'infrastructure-utilities': 'SECTOR_INFRASTRUCTURE_HERO',
    'power-renewable-energy': 'SECTOR_ENERGY_HERO',
    'fabrication-technical-services': 'SECTOR_FABRICATION_HERO',
    'heavy-construction-equipment': 'SECTOR_HEAVY_EQUIPMENT_HERO',
    'oil-gas-petrochemical': 'SECTOR_OIL_GAS_HERO',
    'water-wastewater': 'SECTOR_WATER_HERO',
    'facilities-management': 'SECTOR_FACILITIES_HERO',
    'hospitality-catering': 'SECTOR_HOSPITALITY_HERO',
    'operation-maintenance': 'SECTOR_OM_HERO',
};

export const dynamic = 'force-dynamic';

export default async function SectorPage({ params }: SectorPageProps) {
    if (!prisma) {
        notFound(); // No DB available, show 404
    }

    const sector = await prisma.sector.findUnique({
        where: {
            slug: params.slug
        }
    });

    if (!sector) {
        notFound();
    }

    // Fetch dynamic hero image for this sector
    const assetKey = SLUG_TO_ASSET_KEY[params.slug];
    let heroImage = null;

    if (assetKey) {
        const asset = await prisma.siteAsset.findUnique({
            where: { key: assetKey }
        });
        // Prioritize the image directly on the sector model (editable via Admin), fallback to SiteAsset
        heroImage = sector.heroImage || asset?.url;
    } else {
        heroImage = sector.heroImage;
    }

    // Specialized Rendering for Engineering
    if (params.slug === 'engineering-construction') {
        return (
            <div className="flex min-h-screen flex-col bg-[#051120]">
                <Header />
                <SectorDetailConstruction sector={sector} heroImage={heroImage || undefined} />
                <Footer />
            </div>
        );
    }

    // Specialized Rendering for Healthcare
    if (params.slug === 'healthcare-pharmaceutical') {
        return (
            <div className="flex min-h-screen flex-col bg-[#051120]">
                <Header />
                <SectorDetailHealthcare sector={sector} heroImage={heroImage || undefined} />
                <Footer />
            </div>
        );
    }

    // Specialized Rendering for Infrastructure
    if (params.slug === 'infrastructure-utilities') {
        return (
            <div className="flex min-h-screen flex-col bg-[#051120]">
                <Header />
                <SectorDetailInfrastructure sector={sector} heroImage={heroImage || undefined} />
                <Footer />
            </div>
        );
    }

    // Specialized Rendering for Energy
    if (params.slug === 'power-renewable-energy') {
        return (
            <div className="flex min-h-screen flex-col bg-[#051120]">
                <Header />
                <SectorDetailEnergy sector={sector} heroImage={heroImage || undefined} />
                <Footer />
            </div>
        );
    }

    // Specialized Rendering for Fabrication
    if (params.slug === 'fabrication-technical-services') {
        return (
            <div className="flex min-h-screen flex-col bg-[#051120]">
                <Header />
                <SectorDetailFabrication sector={sector} heroImage={heroImage || undefined} />
                <Footer />
            </div>
        );
    }

    // Specialized Rendering for Heavy Equipment
    if (params.slug === 'heavy-construction-equipment') {
        return (
            <div className="flex min-h-screen flex-col bg-[#051120]">
                <Header />
                <SectorDetailHeavyEquipment sector={sector} heroImage={heroImage || undefined} />
                <Footer />
            </div>
        );
    }

    // Specialized Rendering for Oil & Gas
    if (params.slug === 'oil-gas-petrochemical') {
        return (
            <div className="flex min-h-screen flex-col bg-[#051120]">
                <Header />
                <SectorDetailOilGas sector={sector} heroImage={heroImage || undefined} />
                <Footer />
            </div>
        );
    }

    // Specialized Rendering for Water
    if (params.slug === 'water-wastewater') {
        return (
            <div className="flex min-h-screen flex-col bg-[#051120]">
                <Header />
                <SectorDetailWater sector={sector} heroImage={heroImage || undefined} />
                <Footer />
            </div>
        );
    }

    // Specialized Rendering for Facilities Management
    if (params.slug === 'facilities-management') {
        return (
            <div className="flex min-h-screen flex-col bg-[#051120]">
                <Header />
                <SectorDetailFacilities sector={sector} heroImage={heroImage || undefined} />
                <Footer />
            </div>
        );
    }

    // Specialized Rendering for Hospitality
    if (params.slug === 'hospitality-catering') {
        return (
            <div className="flex min-h-screen flex-col bg-[#051120]">
                <Header />
                <SectorDetailHospitality sector={sector} heroImage={heroImage || undefined} />
                <Footer />
            </div>
        );
    }

    // Specialized Rendering for Operation & Maintenance
    if (params.slug === 'operation-maintenance') {
        return (
            <div className="flex min-h-screen flex-col bg-[#051120]">
                <Header />
                <SectorDetailOM sector={sector} heroImage={heroImage || undefined} />
                <Footer />
            </div>
        );
    }

    return (
        <main className="flex min-h-screen flex-col bg-[#051120]">
            <Header />
            <SectorDetail sector={sector} />
            <Footer />
        </main>
    );
}
