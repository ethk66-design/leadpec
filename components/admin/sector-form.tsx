"use client";

import { useState } from "react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import { updateSector, createSector } from "@/lib/sector-actions";
import { Sector } from "@prisma/client";

interface SectorFormProps {
    sector?: Sector;
}

export function SectorForm({ sector }: SectorFormProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

    // State for image URLs
    const [heroImage, setHeroImage] = useState(sector?.heroImage || "");
    const [middleImage, setMiddleImage] = useState(sector?.middleImage || "");
    const [bottomImage, setBottomImage] = useState(sector?.bottomImage || "");

    // State for Branding (Deep Planning Feature)
    const initialBranding = sector?.branding ? JSON.parse(sector.branding) : {
        heroTitle: "", heroSubtitle: "", quote: "", conceptTitle: "", processTitle: ""
    };
    const [branding, setBranding] = useState(initialBranding);

    // State for Process (JSON String)
    const [processJson, setProcessJson] = useState(sector?.process || "[]");

    async function handleSubmit(formData: FormData) {
        setMessage(null);

        // Add image URLs to form data
        formData.set("heroImage", heroImage);
        formData.set("middleImage", middleImage);
        formData.set("bottomImage", bottomImage);

        // Add Branding JSON
        formData.set("branding", JSON.stringify(branding));
        formData.set("process", processJson);

        startTransition(async () => {
            const result = sector
                ? await updateSector(sector.id, formData)
                : await createSector(formData);

            if (result.error) {
                setMessage({ text: result.error, type: 'error' });
            } else {
                setMessage({ text: result.success as string, type: 'success' });
                if (!sector) {
                    router.push('/admin/sectors');
                }
            }
        });
    }

    const handleBrandingChange = (key: string, value: string) => {
        setBranding((prev: any) => ({ ...prev, [key]: value }));
    };

    return (
        <form action={handleSubmit} className="space-y-6 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">Title</label>
                    <Input name="title" id="title" required defaultValue={sector?.title || ""} placeholder="Engineering & Construction" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="slug" className="text-sm font-medium">Slug</label>
                    <Input name="slug" id="slug" required defaultValue={sector?.slug || ""} placeholder="engineering-construction" />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">Short Description</label>
                <Input name="description" id="description" required defaultValue={sector?.description || ""} placeholder="Delivering complex project models..." />
            </div>

            {/* Corporate Identity Section (Deep Plan Enhancement) */}
            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg border space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2">✨ Corporate Identity</h3>
                <p className="text-sm text-muted-foreground">Customize the high-end branding elements for the Sector Detail page.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Hero Title</label>
                        <Input
                            value={branding.heroTitle}
                            onChange={(e) => handleBrandingChange('heroTitle', e.target.value)}
                            placeholder="e.g. Identifying Leadership."
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Hero Subtitle</label>
                        <Input
                            value={branding.heroSubtitle}
                            onChange={(e) => handleBrandingChange('heroSubtitle', e.target.value)}
                            placeholder="e.g. Defining The Future."
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Executive Quote</label>
                    <Textarea
                        value={branding.quote}
                        onChange={(e) => handleBrandingChange('quote', e.target.value)}
                        placeholder="Strategic quote displayed in the overview section..."
                        className="min-h-[80px]"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Concept Section Title</label>
                        <Input
                            value={branding.conceptTitle}
                            onChange={(e) => handleBrandingChange('conceptTitle', e.target.value)}
                            placeholder="e.g. Our Concept"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Process Section Title</label>
                        <Input
                            value={branding.processTitle}
                            onChange={(e) => handleBrandingChange('processTitle', e.target.value)}
                            placeholder="e.g. The Recruitment Lifecycle"
                        />
                    </div>
                </div>
            </div>

            {/* Process Flow JSON */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Process Flow (JSON)</label>
                <div className="relative">
                    <Textarea
                        value={processJson}
                        onChange={(e) => setProcessJson(e.target.value)}
                        className="font-mono text-xs min-h-[150px] bg-slate-950 text-slate-300"
                    />
                    <div className="absolute top-2 right-2 text-[10px] text-slate-500 bg-slate-900 px-2 py-1 rounded">
                        Strict JSON Array required
                    </div>
                </div>
                <p className="text-xs text-muted-foreground">
                    Format: <code>[{`{"title": "Step 1", "description": "..."}`}]</code>
                </p>
            </div>

            <div className="space-y-2">
                <label htmlFor="content" className="text-sm font-medium">Full Content</label>
                <Textarea name="content" id="content" required defaultValue={sector?.content || ""} placeholder="Detailed sector content..." className="min-h-[200px]" />
            </div>

            <div className="border-t pt-6">
                <h3 className="text-lg font-bold mb-4">🖼️ Section Images</h3>
                <p className="text-sm text-muted-foreground mb-6">Upload images or paste URLs. Toggle between modes using the buttons.</p>

                <div className="grid grid-cols-1 gap-6">
                    <ImageUpload
                        value={heroImage}
                        onChange={setHeroImage}
                        label="🔝 Hero Image / Grid Card"
                        description="Used for the Grid Card thumbnail and the main title area background."
                    />
                    <ImageUpload
                        value={middleImage}
                        onChange={setMiddleImage}
                        label="↕️ Middle Image (Feature Section)"
                        description="Background for the mid-page callout."
                    />
                    <ImageUpload
                        value={bottomImage}
                        onChange={setBottomImage}
                        label="🔻 Bottom Image (CTA Section)"
                        description="Background for the CTA near the footer."
                    />
                </div>
            </div>

            {message && (
                <div className={`p-3 rounded-md text-sm ${message.type === 'success' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
                    {message.text}
                </div>
            )}

            <div className="flex gap-4">
                <Button type="submit" disabled={isPending}>
                    {isPending ? "Saving..." : (sector ? "Update Sector" : "Create Sector")}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                </Button>
            </div>
        </form>
    );
}
