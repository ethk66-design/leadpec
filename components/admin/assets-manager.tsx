"use client";

import { useState, useTransition } from "react";
import { SiteAsset } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateSiteAsset } from "@/lib/assets-actions";
import { ImageUpload } from "@/components/ui/image-upload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

interface AssetsManagerProps {
    assets: SiteAsset[];
}

export function AssetsManager({ assets }: AssetsManagerProps) {
    const [searchTerm, setSearchTerm] = useState("");

    // Group assets by section
    const sections = Array.from(new Set(assets.map(a => a.section)));
    const groupedAssets = sections.reduce((acc, section) => {
        acc[section] = assets.filter(a =>
            a.section === section &&
            (a.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (a.description || "").toLowerCase().includes(searchTerm.toLowerCase()))
        );
        return acc;
    }, {} as Record<string, SiteAsset[]>);

    return (
        <div className="space-y-6">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                    placeholder="Search assets..."
                    className="pl-9 bg-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <Tabs defaultValue={sections[0]} className="w-full">
                <TabsList className="mb-4 flex flex-wrap h-auto gap-2 bg-transparent justify-start p-0">
                    {sections.map(section => (
                        <TabsTrigger
                            key={section}
                            value={section}
                            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border bg-white"
                        >
                            {section}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {sections.map(section => (
                    <TabsContent key={section} value={section} className="space-y-4">
                        {groupedAssets[section]?.map(asset => (
                            <AssetEditor key={asset.id} asset={asset} />
                        ))}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}

function AssetEditor({ asset }: { asset: SiteAsset }) {
    const [url, setUrl] = useState(asset.url);
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

    const hasChanged = url !== asset.url;

    const handleSave = () => {
        setMessage(null);
        startTransition(async () => {
            const result = await updateSiteAsset(asset.key, url);
            if (result.success) {
                setMessage({ text: "Saved!", type: "success" });
            } else {
                setMessage({ text: "Error saving.", type: "error" });
            }
        });
    };

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle className="text-base font-bold font-mono">{asset.key}</CardTitle>
                        <CardDescription>{asset.description}</CardDescription>
                    </div>
                    <Badge variant="outline">{asset.section}</Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <ImageUpload
                        value={url}
                        onChange={setUrl}
                        label="Asset Image"
                    />

                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            {message && (
                                <span className={message.type === 'success' ? "text-green-600" : "text-red-600"}>
                                    {message.text}
                                </span>
                            )}
                        </div>
                        <Button
                            onClick={handleSave}
                            disabled={!hasChanged || isPending}
                            size="sm"
                        >
                            {isPending ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
