"use client";

import { useEffect, useState, useTransition } from "react";
import { ImageUpload } from "@/components/ui/image-upload";
import { SECTOR_CONTENT_CONFIG } from "@/lib/sector-content-config";
import { upsertSiteAsset, getSiteAssets } from "@/lib/site-asset-actions";
import { Loader2 } from "lucide-react";

interface SectorAssetsManagerProps {
    slug: string;
}

export function SectorAssetsManager({ slug }: SectorAssetsManagerProps) {
    const assetsConfig = SECTOR_CONTENT_CONFIG[slug];
    const [assets, setAssets] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (!assetsConfig) return;

        const keys = assetsConfig.map(a => a.key);
        getSiteAssets(keys).then((fetchedAssets) => {
            const assetMap: Record<string, string> = {};
            fetchedAssets.forEach(asset => {
                assetMap[asset.key] = asset.url;
            });
            setAssets(assetMap);
            setLoading(false);
        });
    }, [slug, assetsConfig]);

    if (!assetsConfig || assetsConfig.length === 0) {
        return null;
    }

    const handleImageChange = (key: string, url: string, label: string) => {
        // Optimistic update
        setAssets(prev => ({ ...prev, [key]: url }));

        startTransition(async () => {
            await upsertSiteAsset(key, url, "Sector Detail", `Dynamic asset for ${slug}: ${label}`);
        });
    };

    if (loading) {
        return <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="w-4 h-4 animate-spin" /> Loading dynamic assets...</div>;
    }

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg border space-y-6 mt-8 border-l-4 border-l-blue-500">
            <div>
                <h3 className="text-lg font-bold flex items-center gap-2">🎨 Dynamic Page Content</h3>
                <p className="text-sm text-muted-foreground">Manage specific images that appear within this sector's content area.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {assetsConfig.map((config) => (
                    <div key={config.key} className="space-y-4 bg-white dark:bg-slate-950 p-4 rounded border">
                        <div className="flex justify-between items-start">
                            <div>
                                <label className="text-sm font-semibold text-slate-900 dark:text-slate-100">{config.label}</label>
                                {config.description && <p className="text-xs text-muted-foreground mt-1">{config.description}</p>}
                            </div>
                            {isPending && <Loader2 className="w-3 h-3 animate-spin text-blue-500" />}
                        </div>

                        <ImageUpload
                            value={assets[config.key] || ""}
                            onChange={(url) => handleImageChange(config.key, url, config.label)}
                            label=""
                            description={`Default: ${config.defaultSrc.split('/').pop()}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
