"use client";

import Image, { ImageProps } from "next/image";
import { useState, useEffect } from "react";

// In a real app we might fetch this from an API route or pass it down.
// For simplicity in this plan, we assume valid URLs are passed in.
// But to be truly dynamic on the client side without prop drilling everywhere,
// we might want a Context, OR we just accept that Server Components pass the dynamic URL.
// 
// Strategy: The parent Component (Server Component) fetches the URL from DB and passes it here.
// This component handles the fallback logic if the DB url is broken (404).

interface DynamicImageProps extends Omit<ImageProps, 'src'> {
    src: string;        // The dynamic URL from DB
    fallbackSrc: string; // The hardcoded reliable path
}

export function DynamicImage({ src, fallbackSrc, alt, ...props }: DynamicImageProps) {
    const [imgSrc, setImgSrc] = useState(src);

    useEffect(() => {
        setImgSrc(src);
    }, [src]);

    return (
        <Image
            {...props}
            src={imgSrc || fallbackSrc}
            sizes={props.sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
            alt={alt}
            onError={() => {
                if (imgSrc !== fallbackSrc) {
                    setImgSrc(fallbackSrc);
                }
            }}
        />
    );
}
