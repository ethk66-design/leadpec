"use client";

import { useState } from "react";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageUpload } from "@/components/ui/image-upload";
import { updateSiteSetting } from "@/lib/settings-actions";

interface SettingsFormProps {
    footerImage: string | null;
    linkedinUrl: string | null;
    facebookUrl: string | null;
    instagramUrl: string | null;
}

export function SettingsForm({ footerImage, linkedinUrl, facebookUrl, instagramUrl }: SettingsFormProps) {
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

    const [image, setImage] = useState(footerImage || "");
    const [linkedin, setLinkedin] = useState(linkedinUrl || "");
    const [facebook, setFacebook] = useState(facebookUrl || "");
    const [instagram, setInstagram] = useState(instagramUrl || "");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setMessage(null);

        startTransition(async () => {
            // Save all settings
            await updateSiteSetting("footer_image", image);
            await updateSiteSetting("social_linkedin", linkedin);
            await updateSiteSetting("social_facebook", facebook);
            await updateSiteSetting("social_instagram", instagram);

            setMessage({ text: "Settings saved successfully!", type: 'success' });
        });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
            {/* Footer Section */}
            <div className="bg-white p-6 rounded-lg border space-y-4">
                <h3 className="text-lg font-medium">Footer Configuration</h3>
                <ImageUpload
                    value={image}
                    onChange={setImage}
                    label="Footer Background Image"
                    description="This image will appear as the background for the website footer."
                />
            </div>

            {/* Social Media Section */}
            <div className="bg-white p-6 rounded-lg border space-y-4">
                <h3 className="text-lg font-medium">Social Media Links</h3>
                <p className="text-sm text-muted-foreground">Update the social media URLs displayed in the header and footer.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <label htmlFor="linkedin" className="text-sm font-medium">LinkedIn URL</label>
                        <Input
                            id="linkedin"
                            value={linkedin}
                            onChange={(e) => setLinkedin(e.target.value)}
                            placeholder="https://linkedin.com/company/..."
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="facebook" className="text-sm font-medium">Facebook URL</label>
                        <Input
                            id="facebook"
                            value={facebook}
                            onChange={(e) => setFacebook(e.target.value)}
                            placeholder="https://facebook.com/..."
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="instagram" className="text-sm font-medium">Instagram URL</label>
                        <Input
                            id="instagram"
                            value={instagram}
                            onChange={(e) => setInstagram(e.target.value)}
                            placeholder="https://instagram.com/..."
                        />
                    </div>
                </div>
            </div>

            {message && (
                <div className={`p-3 rounded-md text-sm ${message.type === 'success' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
                    {message.text}
                </div>
            )}

            <div className="flex gap-4">
                <Button type="submit" disabled={isPending}>
                    {isPending ? "Saving..." : "Save All Settings"}
                </Button>
            </div>
        </form>
    );
}
