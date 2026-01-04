"use client";

import { motion } from "framer-motion";
import { DynamicImage } from "@/components/ui/dynamic-image";

interface ServicesHeroProps {
    heroImage?: string;
}

export function ServicesHero({ heroImage }: ServicesHeroProps) {
    return (
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-[#0f172a]">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 select-none">
                <DynamicImage
                    src={heroImage || "/images/services-hero-industrial.png"}
                    fallbackSrc="/images/services-hero-industrial.png"
                    alt="Services Hero"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 via-[#0f172a]/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl"
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Comprehensive <span className="text-primary-400">Workforce Solutions</span>
                    </h1>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
                        Delivering specialized talent across 15+ key industries worldwide, from executive leadership to technical field operations.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
