import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AboutContent } from "@/components/pages/about-content";
import { prisma } from "@/lib/db";

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
    let assets: any[] = [];
    if (prisma) {
        assets = await prisma.siteAsset.findMany({
            where: {
                key: {
                    in: ["ABOUT_HERO_BG", "ABOUT_COLLAB_IMG", "ABOUT_VISION_BG"]
                }
            }
        });
    }

    const assetMap = assets.reduce((acc, asset) => {
        acc[asset.key] = asset.url;
        return acc;
    }, {} as Record<string, string>);

    return (
        <div className="flex min-h-screen flex-col bg-[#051120]">
            <Header />
            <AboutContent
                heroBg={assetMap["ABOUT_HERO_BG"]}
                collabImg={assetMap["ABOUT_COLLAB_IMG"]}
                visionBg={assetMap["ABOUT_VISION_BG"]}
            />
            <Footer />
        </div>
    );
}
