"use client";

import { useState, useTransition } from "react";
import { updateSiteSetting } from "@/lib/settings-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ImageUpload } from "@/components/ui/image-upload";

interface SettingsFormProps {
    footerImage: string | null;
    linkedinUrl: string | null;
    facebookUrl: string | null;
    instagramUrl: string | null;
}

export function SettingsForm({
    footerImage,
    linkedinUrl,
    facebookUrl,
    instagramUrl
}: SettingsFormProps) {
    const [isPending, startTransition] = useTransition();

    // Local state for inputs
    const [linkedin, setLinkedin] = useState(linkedinUrl || "");
    const [facebook, setFacebook] = useState(facebookUrl || "");
    const [instagram, setInstagram] = useState(instagramUrl || "");

    const handleSaveSocials = () => {
        startTransition(async () => {
            const results = await Promise.all([
                updateSiteSetting("social_linkedin", linkedin),
                updateSiteSetting("social_facebook", facebook),
                updateSiteSetting("social_instagram", instagram)
            ]);

            const errors = results.filter(r => r.error);
            if (errors.length > 0) {
                toast.error("Failed to update some settings.");
            } else {
                toast.success("Social links updated successfully!");
            }
        });
    };

    const handleFooterImageChange = (url: string) => {
        startTransition(async () => {
            const res = await updateSiteSetting("footer_image", url);
            if (res.error) {
                toast.error(res.error);
            } else {
                toast.success("Footer image updated!");
            }
        });
    };

    const handleRemoveFooterImage = () => {
        handleFooterImageChange("");
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Branding & Images</CardTitle>
                    <CardDescription>
                        Set global images for the website.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Footer Background Image</Label>
                        <ImageUpload
                            value={footerImage || ""}
                            onChange={handleFooterImageChange}
                            label="Footer Background Image"
                            disabled={isPending}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Social Media Links</CardTitle>
                    <CardDescription>
                        Update links to your social profiles.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn URL</Label>
                        <Input
                            id="linkedin"
                            placeholder="https://linkedin.com/company/..."
                            value={linkedin}
                            onChange={(e) => setLinkedin(e.target.value)}
                            disabled={isPending}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="facebook">Facebook URL</Label>
                        <Input
                            id="facebook"
                            placeholder="https://facebook.com/..."
                            value={facebook}
                            onChange={(e) => setFacebook(e.target.value)}
                            disabled={isPending}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="instagram">Instagram URL</Label>
                        <Input
                            id="instagram"
                            placeholder="https://instagram.com/..."
                            value={instagram}
                            onChange={(e) => setInstagram(e.target.value)}
                            disabled={isPending}
                        />
                    </div>
                    <Button onClick={handleSaveSocials} disabled={isPending}>
                        {isPending ? "Saving..." : "Save Social Links"}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
