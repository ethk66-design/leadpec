"use client";

import { Button } from "@/components/ui/button";
import { CONTACT_INFO } from "@/lib/constants";
import { Mail, Phone, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getSiteAssetAction } from "@/lib/public-actions";

interface CTASectionProps {
    title?: string;
    description?: string;
    buttonText?: string;
    href?: string;
}

export function CTASection({
    title = "Ready to Start Your Project?",
    description = "Partner with LEADPEC to access a global network of exceptional professionals.",
    buttonText = "Request Talent",
    href = "/contact"
}: CTASectionProps) {
    const [bgImage, setBgImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchBg = async () => {
            const url = await getSiteAssetAction("CTA_SECTION_BG");
            if (url) setBgImage(url);
        };
        fetchBg();
    }, []);

    return (
        <section
            className="py-16 md:py-20 bg-[#004E8F] relative overflow-hidden bg-cover bg-center"
            style={bgImage ? { backgroundImage: `url(${bgImage})` } : {}}
        >
            {/* Default Gradient/Pattern Backup (Hidden if bgImage exists) */}
            {!bgImage && (
                <>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#004E8F] to-[#008CBA]" />
                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000),linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000)] bg-[length:60px_60px] bg-[position:0_0,30px_30px]" />
                </>
            )}

            {/* Overlay for legibility over image */}
            <div className={`absolute inset-0 ${bgImage ? 'bg-black/60' : 'bg-gradient-to-br from-[#0B1B32]/30 to-transparent'}`} />

            <div className="container px-4 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-6xl font-bold font-heading mb-6 text-white tracking-tight">
                        {title}
                    </h2>
                    <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                        {description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                        <Button asChild size="lg" className="bg-white hover:bg-gray-50 text-[#004E8F] font-bold text-lg h-14 px-10 rounded-sm uppercase tracking-wide shadow-xl">
                            <Link href={href}>
                                {buttonText}
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10 text-lg h-14 px-10 rounded-sm bg-transparent hover:text-white uppercase tracking-wide">
                            <Link href="/contact">
                                Submit Job Opening
                            </Link>
                        </Button>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 justify-center items-center text-white/80">
                        <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center gap-2 hover:text-white transition-colors group">
                            <div className="p-2 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
                                <Phone className="w-4 h-4" />
                            </div>
                            <span className="font-medium tracking-wide">{CONTACT_INFO.phone}</span>
                        </a>
                        <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/40" />
                        <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-2 hover:text-white transition-colors group">
                            <div className="p-2 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
                                <Mail className="w-4 h-4" />
                            </div>
                            <span className="font-medium tracking-wide">{CONTACT_INFO.email}</span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
