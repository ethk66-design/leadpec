import { prisma } from "@/lib/db";
import { SettingsForm } from "@/components/admin/settings-form";

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
    // Fetch all relevant settings
    let settings: any[] = [];

    if (prisma) {
        settings = await prisma.siteSetting.findMany({
            where: {
                key: {
                    in: ["footer_image", "social_linkedin", "social_facebook", "social_instagram"]
                }
            }
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
        </div>
    );
}
