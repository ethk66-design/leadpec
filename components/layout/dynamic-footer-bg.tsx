/* eslint-disable */
"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface DynamicFooterBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
    footerImage?: string;
    children: React.ReactNode;
}

export function DynamicFooterBackground({ footerImage, children, className, ...props }: DynamicFooterBackgroundProps) {
    const footerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (footerRef.current && footerImage) {
            footerRef.current.style.setProperty("--bg-footer", `url(${footerImage})`);
            footerRef.current.style.backgroundImage = "var(--bg-footer)";
        }
    }, [footerImage]);

    return (
        <footer
            ref={footerRef}
            className={cn(
                "bg-[#051120] text-blue-100/70 relative overflow-hidden bg-cover bg-center",
                className
            )}
            {...props}
        >
            {children}
        </footer>
    );
}
