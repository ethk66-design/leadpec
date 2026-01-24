import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero";
// import { TrustIndicators } from "@/components/sections/trust-indicators"; // Commenting out if not verified, but user list implied it existed. I'll check first or just include it and if it fails I'll fix.
// Actually checking the file list earlier: "trust-indicators.tsx" existed.
import { TrustIndicators } from "@/components/sections/trust-indicators";
// Static imports removed in favor of dynamic imports below
import { prisma } from "@/lib/db";
import { SECTOR_IMAGES, SLUG_TO_ASSET_KEY, getSectorHeroAssetKey } from "@/lib/sector-images";
import { SECTORS } from "@/lib/constants";
import dynamic from "next/dynamic";

const WhyChooseUs = dynamic(() => import("@/components/sections/why-choose-us").then(mod => mod.WhyChooseUs));
const GlobalPresence = dynamic(() => import("@/components/sections/global-presence").then(mod => mod.GlobalPresence));
const CTASection = dynamic(() => import("@/components/sections/cta").then(mod => mod.CTASection));
const AboutBrief = dynamic(() => import("@/components/sections/about-brief").then(mod => mod.AboutBrief));
const ServicesOverview = dynamic(() => import("@/components/sections/services-overview").then(mod => mod.ServicesOverview));
const SectorsGrid = dynamic(() => import("@/components/sections/sectors-grid").then(mod => mod.SectorsGrid));

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
    // Fallback data for Vercel (where prisma is null) or when DB is empty
    let sectors: any[] = SECTORS.slice(0, 8); // Default to static data
    let heroAsset: any = { url: "/images/hero-corporate.png" }; // Default hero
    let whyChooseUsBg: string | null = null;
    let whyChooseUsSide: string | null = null;

    if (prisma) {
        try {
            // 1. Fetch data
            const dbSectors = await prisma.sector.findMany({
                orderBy: { title: 'asc' },
                take: 8
            });
            const dbHero = await prisma.siteAsset.findUnique({
                where: { key: "HOME_HERO_BG" }
            });

            // 2. Determine Asset Keys
            // Include both dynamic keys from sectors AND static keys for other sections
            const dynamicSectorKeys = dbSectors.map(s => getSectorHeroAssetKey(s.slug));
            const otherKeys = ["WHY_CHOOSE_US_BG", "WHY_CHOOSE_US_SIDE_IMG"];
            const allKeys = [...dynamicSectorKeys, ...otherKeys];

            const sectorAssets = await prisma.siteAsset.findMany({
                where: {
                    key: {
                        in: allKeys
                    }
                }
            });

            // Only override if DB returns data
            if (dbSectors && dbSectors.length > 0) {
                // Map sectors to include resolved hero images matching Detail Page logic
                sectors = dbSectors.map(sector => {
                    const assetKey = getSectorHeroAssetKey(sector.slug);
                    const asset = sectorAssets.find(a => a.key === assetKey);

                    // Fix: Ignore legacy seed paths that don't exist
                    const isLegacyBrokenPath = sector.heroImage?.startsWith("/images/sectors/");
                    const validHeroImage = isLegacyBrokenPath ? null : sector.heroImage;

                    // Priority: 1. Use Valid DB Image, 2. SiteAsset (Admin) <--- Priority Logic may vary, check detail page
                    // Detail page priority: Asset(Unified) > DB > Fallback.
                    // Let's match Detail Page priority: Asset > DB > Fallback
                    const resolvedImage = asset?.url || validHeroImage || SECTOR_IMAGES[sector.slug];

                    return {
                        ...sector,
                        heroImage: resolvedImage
                    };
                });
            }
            if (dbHero) {
                heroAsset = dbHero;
            }

            const wcuBgAsset = sectorAssets.find(a => a.key === "WHY_CHOOSE_US_BG");
            if (wcuBgAsset) whyChooseUsBg = wcuBgAsset.url;

            const wcuSideAsset = sectorAssets.find(a => a.key === "WHY_CHOOSE_US_SIDE_IMG");
            if (wcuSideAsset) whyChooseUsSide = wcuSideAsset.url;
        } catch (e) {
            console.warn("Database connection failed, using static fallbacks");
        }
    } else {
        // Explicitly format static sectors to match DB shape if needed (though SECTORS is likely close enough)
        // logic is already handled by initial assignment
        console.log("Using static content for Vercel deployment");
    }

    return (
        <main className="flex min-h-screen flex-col bg-[#051120]">
            <Header />
            <HeroSection heroImage={heroAsset?.url} />
            <TrustIndicators />
            <AboutBrief />
            <ServicesOverview />
            <SectorsGrid sectors={sectors} />
            <WhyChooseUs bgImage={whyChooseUsBg} sideImage={whyChooseUsSide} />
            <GlobalPresence />
            <CTASection />
            <Footer />
        </main>
    );
}
