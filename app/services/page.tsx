import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CTASection } from "@/components/sections/cta";
import { ServicesHero } from "@/components/pages/services/services-hero";
import { ServicesList } from "@/components/pages/services/services-list";
import { ServicesProcess } from "@/components/pages/services/services-process";
import { RecruitmentCycle } from "@/components/sections/recruitment-cycle";
import { ProcessFlow } from "@/components/sections/process-flow";
import { prisma } from "@/lib/db";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Services | LEADPEC",
    description: "Explore our comprehensive workforce solutions including permanent recruitment, executive search, and contract staffing.",
};

export const dynamic = 'force-dynamic';

export default async function ServicesPage() {
    // Fetch dynamic assets
    // Default static assets for Vercel/Fallback
    let assets: any[] = [
        { key: 'SERVICES_HERO_BG', url: '/images/services-hero-industrial.png' },
        { key: 'SERVICE_PERMANENT_IMG', url: '/images/service-permanent-office.png' },
        { key: 'SERVICE_EXECUTIVE_IMG', url: '/images/service-executive-meeting.png' },
        { key: 'SERVICE_CONTRACT_IMG', url: '/images/service-contract-site.png' },
        { key: 'SERVICE_PROCESS_BG', url: '/images/hero-corporate.png' }
    ];

    if (prisma) {
        try {
            const dbAssets = await prisma.siteAsset.findMany({
                where: {
                    key: {
                        in: [
                            'SERVICES_HERO_BG',
                            'SERVICE_PERMANENT_IMG',
                            'SERVICE_EXECUTIVE_IMG',
                            'SERVICE_CONTRACT_IMG',
                            'SERVICE_PROCESS_BG'
                        ]
                    }
                }
            });
            // If DB returns assets, merge them in or replace (simplest is replace if we trust DB has all or nothing, but merging is safer)
            if (dbAssets && dbAssets.length > 0) {
                // Create a map of DB assets
                const dbAssetMap = new Map(dbAssets.map(a => [a.key, a]));
                // Update default assets with DB versions where they exist
                assets = assets.map(a => dbAssetMap.get(a.key) || a);
            }
        } catch (e) { console.warn("DB unavailable, using fallback assets"); }
    }

    // Valid keys based on our seed data
    const getAssetUrl = (key: string) => assets.find(a => a.key === key)?.url;

    const listImages = {
        permanent: getAssetUrl('SERVICE_PERMANENT_IMG'),
        executive: getAssetUrl('SERVICE_EXECUTIVE_IMG'),
        contract: getAssetUrl('SERVICE_CONTRACT_IMG')
    };

    return (
        <main className="flex min-h-screen flex-col bg-[#0f172a]">
            <Header />

            <ServicesHero heroImage={getAssetUrl('SERVICES_HERO_BG')} />

            <ServicesList images={listImages} />

            <RecruitmentCycle />

            <ProcessFlow />

            <CTASection
                title="Ready to Transform Your Workforce?"
                description="Connect with our global recruitment experts today."
                buttonText="Get in Touch"
                href="/contact"
            />

            <Footer />
        </main>
    );
}
