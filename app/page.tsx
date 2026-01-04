import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero";
// import { TrustIndicators } from "@/components/sections/trust-indicators"; // Commenting out if not verified, but user list implied it existed. I'll check first or just include it and if it fails I'll fix.
// Actually checking the file list earlier: "trust-indicators.tsx" existed.
import { TrustIndicators } from "@/components/sections/trust-indicators";
import { AboutBrief } from "@/components/sections/about-brief";
import { ServicesOverview } from "@/components/sections/services-overview";
import { SectorsGrid } from "@/components/sections/sectors-grid";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { GlobalPresence } from "@/components/sections/global-presence";
import { CTASection } from "@/components/sections/cta";
import { prisma } from "@/lib/db";
import { SECTORS } from "@/lib/constants";

export const dynamic = 'force-dynamic';

export default async function Home() {
    // Fallback data for Vercel (where prisma is null)
    // Fallback data for Vercel (where prisma is null) or when DB is empty
    let sectors: any[] = SECTORS.slice(0, 8); // Default to static data
    let heroAsset: any = { url: "/images/hero-corporate.png" }; // Default hero

    if (prisma) {
        try {
            // Fetch data in parallel to avoid waterfalls
            const [dbSectors, dbHero] = await Promise.all([
                prisma.sector.findMany({
                    orderBy: { title: 'asc' },
                    take: 8
                }),
                prisma.siteAsset.findUnique({
                    where: { key: "HOME_HERO_BG" }
                })
            ]);

            // Only override if DB returns data
            if (dbSectors && dbSectors.length > 0) {
                sectors = dbSectors;
            }
            if (dbHero) {
                heroAsset = dbHero;
            }
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
            <WhyChooseUs />
            <GlobalPresence />
            <CTASection />
            <Footer />
        </main>
    );
}
