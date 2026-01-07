"use client";

import { useState, useTransition } from "react";
import { ImageUpload } from "@/components/ui/image-upload";
import { upsertSiteAsset } from "@/lib/site-asset-actions";
import { Loader2, Save } from "lucide-react";
import { AssetDefinition } from "@/lib/content-registry";
import { SiteAsset } from "@prisma/client";
import { Button } from "@/components/ui/button";

interface BulkAssetEditorProps {
    sectionId: string;
    sectionTitle: string;
    definitions: AssetDefinition[];
    initialAssets: SiteAsset[];
}

export function BulkAssetEditor({ sectionId, sectionTitle, definitions, initialAssets }: BulkAssetEditorProps) {
    // Create a map for fast lookups: Key -> URL
    const initialMap = definitions.reduce((acc, def) => {
        const found = initialAssets.find(a => a.key === def.key);
        acc[def.key] = found?.url || "";
        return acc;
    }, {} as Record<string, string>);

    const [assets, setAssets] = useState<Record<string, string>>(initialMap);
    const [pendingKeys, setPendingKeys] = useState<Set<string>>(new Set());

    const handleImageChange = (key: string, url: string, definition: AssetDefinition) => {
        // Optimistic Update
        setAssets(prev => ({ ...prev, [key]: url }));
        setPendingKeys(prev => new Set(prev).add(key));

        // Trigger Server Action
        upsertSiteAsset(key, url, sectionTitle, definition.description)
            .then(() => {
                setPendingKeys(prev => {
                    const next = new Set(prev);
                    next.delete(key);
                    return next;
                });
            })
            .catch((err) => {
                console.error("Failed to save asset", err);
                // Ideally revert optimistic update here, but for now we look at console
            });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
            {definitions.map((def) => {
                const isSaving = pendingKeys.has(def.key);
                return (
                    <div key={def.key} className="bg-white dark:bg-slate-950 p-4 rounded-lg border shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <label className="text-sm font-semibold text-slate-900 dark:text-slate-100 block">
                                    {def.label}
                                </label>
                                {def.description && (
                                    <p className="text-xs text-muted-foreground mt-1">{def.description}</p>
                                )}
                            </div>
                            {isSaving && (
                                <span className="flex items-center text-xs text-blue-500 gap-1 animate-pulse">
                                    <Loader2 className="w-3 h-3 animate-spin" /> Saving...
                                </span>
                            )}
                        </div>

                        <ImageUpload
                            value={assets[def.key] || ""}
                            onChange={(url) => handleImageChange(def.key, url, def)}
                            label=""
                            description={def.defaultSrc ? `Default: ${def.defaultSrc.split('/').pop()}` : undefined}
                        />

                        <div className="mt-2 text-[10px] text-slate-400 font-mono truncate">
                            Key: {def.key}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
