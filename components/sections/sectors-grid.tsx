"use client";

import { Sector } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Image mapping based on seed assets
const sectorImages: { [key: string]: string } = {
    "engineering-construction": "/images/eng-execute-site.png",
    "oil-gas-petrochemical": "/images/oil-gas-hero.png",
    "power-renewable-energy": "/images/sector-feature-energy.png",
    "water-wastewater": "/images/water-hero.png",
    "infrastructure-utilities": "/images/sector-feature-construction.png",
    "facilities-management": "/images/fm-hero.png",
    "operation-maintenance": "/images/om-hero.png",
    "healthcare-pharmaceutical": "/images/healthcare-facility.png",
    "hospitality-catering": "/images/hospitality-hero.png",
    "fabrication-technical-services": "/images/fabrication-hero-v3.png",
    "heavy-construction-equipment": "/images/heavy-equipment-hero-v2.png"
};

interface SectorsGridProps {
    sectors: Sector[];
}

export function SectorsGrid({ sectors }: SectorsGridProps) {
    return (
        <section className="py-12 md:py-16 bg-gray-50">
            <div className="container px-4">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold text-[#008CBA] uppercase tracking-wider mb-2">Industries We Serve</h2>
                    <h3 className="text-4xl md:text-5xl font-bold font-heading text-[#0B1B32]">Specialized Sector Expertise</h3>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
                    {sectors.map((sector, index) => {
                        const imageSrc = sector.heroImage || sectorImages[sector.slug] || "/images/hero-corporate.png"; // Fallback

                        return (
                            <motion.div
                                key={sector.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link href={`/sectors/${sector.slug}`} className="block h-full group">
                                    <div className="bg-white rounded-[1rem] sm:rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-[200px] sm:h-[320px] flex flex-col relative group-hover:-translate-y-2">

                                        {/* Image Container with Custom Curve Mask */}
                                        <div className="relative h-2/3 w-full overflow-hidden">
                                            <Image
                                                src={imageSrc}
                                                alt={sector.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />

                                            {/* Creative overlay mask to create the curve effect */}
                                            {/* This SVG creates a white curve at bottom right, biting into the image */}
                                            <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-16 z-10 translate-y-[1px]">
                                                <svg
                                                    viewBox="0 0 100 100"
                                                    preserveAspectRatio="none"
                                                    className="w-full h-full fill-white"
                                                    style={{ transform: index % 2 === 0 ? "scaleX(1)" : "scaleX(-1)" }}
                                                >
                                                    <path d="M0,100 L0,50 Q50,100 100,0 L100,100 Z" />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Text Content */}
                                        <div className="h-1/3 flex items-center justify-center px-2 sm:px-6 relative z-10 w-full">
                                            <h4 className="text-xs sm:text-lg md:text-xl font-bold text-[#0B1B32] text-center group-hover:text-[#008CBA] transition-colors leading-tight line-clamp-2">
                                                {sector.title}
                                            </h4>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="mt-16 text-center">
                    <Link href="/services">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-[#008CBA] border-2 border-transparent hover:bg-[#007EA8] rounded-full shadow-lg hover:shadow-xl hover:shadow-blue-500/20"
                        >
                            View All Sectors
                            <svg className="w-5 h-5 ml-2 -mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                            </svg>
                        </motion.button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
