"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Link as LinkIcon, X, Loader2 } from "lucide-react";
import Image from "next/image";
import imageCompression from "browser-image-compression";

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    label: string;
    description?: string;
    disabled?: boolean;
}

export function ImageUpload({ value, onChange, label, description, disabled }: ImageUploadProps) {
    const [mode, setMode] = useState<"url" | "upload">("url");
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    async function handleFileUpload(file: File) {
        setError(null);
        setIsUploading(true);
        setUploadStatus("Compressing image...");

        try {
            // Compress the image before uploading
            const options = {
                maxSizeMB: 0.5, // Max 500KB
                maxWidthOrHeight: 1920, // Max dimension
                useWebWorker: true,
                fileType: "image/webp" as const, // Convert to WebP for best compression
            };

            let compressedFile: File;

            // Only compress if file is larger than 500KB
            if (file.size > 500 * 1024) {
                compressedFile = await imageCompression(file, options);
                console.log(`Compressed: ${(file.size / 1024).toFixed(0)}KB → ${(compressedFile.size / 1024).toFixed(0)}KB`);
            } else {
                compressedFile = file;
            }

            setUploadStatus("Uploading...");

            const formData = new FormData();
            formData.append("file", compressedFile);

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.error || "Upload failed");
                return;
            }

            onChange(result.url);
        } catch (err) {
            console.error("Upload error:", err);
            setError("Upload failed. Please try again.");
        } finally {
            setIsUploading(false);
            setUploadStatus("");
        }
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            handleFileUpload(file);
        }
    }

    function handleDrop(e: React.DragEvent) {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleFileUpload(file);
        }
    }

    function handleDragOver(e: React.DragEvent) {
        e.preventDefault();
    }

    function clearImage() {
        onChange("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    return (
        <div className="space-y-3 p-4 border rounded-lg bg-slate-50">
            <div className="flex items-center justify-between">
                <label className="text-sm font-medium">{label}</label>
                <div className="flex gap-1 bg-white rounded-md p-1 border">
                    <button
                        type="button"
                        onClick={() => setMode("url")}
                        disabled={disabled}
                        className={`px-2 py-1 text-xs rounded ${mode === "url" ? "bg-slate-200 font-medium" : "hover:bg-slate-100"} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        <LinkIcon className="w-3 h-3 inline mr-1" />
                        URL
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode("upload")}
                        disabled={disabled}
                        className={`px-2 py-1 text-xs rounded ${mode === "upload" ? "bg-slate-200 font-medium" : "hover:bg-slate-100"} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        <Upload className="w-3 h-3 inline mr-1" />
                        Upload
                    </button>
                </div>
            </div>

            {description && <p className="text-xs text-muted-foreground">{description}</p>}

            {mode === "url" ? (
                <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                />
            ) : (
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer bg-white"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        aria-label="Upload file"
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    {isUploading ? (
                        <div className="flex flex-col items-center gap-2">
                            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                            <span className="text-sm text-muted-foreground">{uploadStatus || "Processing..."}</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <Upload className="w-8 h-8 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                                Click or drag image here
                            </span>
                            <span className="text-xs text-muted-foreground">
                                JPG, PNG, WEBP, GIF (max 5MB)
                            </span>
                        </div>
                    )}
                </div>
            )}

            {error && (
                <p className="text-xs text-red-500">{error}</p>
            )}

            {value && (
                <div className="relative mt-2">
                    <div className="relative aspect-video w-full max-w-xs rounded-lg overflow-hidden border bg-white">
                        <Image
                            src={value}
                            alt="Preview"
                            fill
                            className="object-cover"
                            unoptimized={value.startsWith("http")}
                        />
                    </div>
                    <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6"
                        onClick={clearImage}
                    >
                        <X className="w-3 h-3" />
                    </Button>
                </div>
            )}
        </div>
    );
}
