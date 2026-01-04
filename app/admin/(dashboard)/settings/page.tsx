import { prisma } from "@/lib/db";
import { SettingsForm } from "@/components/admin/settings-form";
import { AssetsManager } from "@/components/admin/assets-manager";
import { Separator } from "@/components/ui/separator";

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
    // Fetch all relevant settings
    let settings: any[] = [];
    let assets: any[] = [];

    if (prisma) {
        settings = await prisma.siteSetting.findMany({
            where: {
                key: {
                    in: ["footer_image", "social_linkedin", "social_facebook", "social_instagram"]
                }
            }
        });

        // Fetch site assets
        assets = await prisma.siteAsset.findMany({
            orderBy: { key: 'asc' }
        });
    }

    // Convert to a simple object for easier access
    const settingsMap: Record<string, string> = {};
    settings.forEach(s => {
        settingsMap[s.key] = s.value;
    });

    return (
        <div className="space-y-6 pb-20">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Site Settings</h2>
                <p className="text-muted-foreground">Manage global website configuration.</p>
            </div>

            <SettingsForm
                footerImage={settingsMap["footer_image"] || null}
                linkedinUrl={settingsMap["social_linkedin"] || null}
                facebookUrl={settingsMap["social_facebook"] || null}
                instagramUrl={settingsMap["social_instagram"] || null}
            />

            <Separator className="my-8" />

            <div>
                <h3 className="text-2xl font-bold tracking-tight mb-4">Dynamic Assets</h3>
                <p className="text-muted-foreground mb-6">Manage website images and backgrounds.</p>
                <AssetsManager assets={assets} />
            </div>
        </div>
    );
}

