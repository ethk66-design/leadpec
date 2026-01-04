import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { prisma } from "@/lib/db";
import { CareersContent } from "@/components/pages/careers-content";

export const dynamic = 'force-dynamic';

export default async function JobListingsPage() {
    // Fetch only active jobs
    let jobs: any[] = [];
    let assets: any[] = [];

    if (prisma) {
        jobs = await prisma.job.findMany({
            where: { isActive: true },
            orderBy: { postedDate: "desc" }
        });

        // Fetch dynamic assets
        assets = await prisma.siteAsset.findMany({
            where: {
                key: {
                    in: [
                        "CAREERS_HERO_BG",
                        "CAREERS_OFFICE",
                        "CAREERS_CULTURE",
                        "CAREERS_GROWTH",
                        "CAREERS_GLOBAL_MAP"
                    ]
                }
            }
        });
    }

    const assetMap = assets.reduce((acc, asset) => {
        acc[asset.key] = asset.url;
        return acc;
    }, {} as Record<string, string>);

    return (
        <div className="min-h-screen bg-[#051120] flex flex-col">
            <Header />
            <CareersContent
                jobs={jobs}
                heroBg={assetMap["CAREERS_HERO_BG"]}
                officeImg={assetMap["CAREERS_OFFICE"]}
                cultureImg={assetMap["CAREERS_CULTURE"]}
                growthImg={assetMap["CAREERS_GROWTH"]}
                globalImg={assetMap["CAREERS_GLOBAL_MAP"]}
            />
            <Footer />
        </div>
    );
}
