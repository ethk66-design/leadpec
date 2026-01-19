"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

import { DynamicImage } from "@/components/ui/dynamic-image";

interface HeroSectionProps {
    heroImage?: string;
}

export function HeroSection({ heroImage }: HeroSectionProps) {
    return (
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 select-none">
                <DynamicImage
                    src={heroImage || "/images/hero-corporate.png"}
                    fallbackSrc="/images/hero-corporate.png"
                    alt="Hero Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-[#0B1B32]/90 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B32] via-transparent to-[#0B1B32]/30" />
            </div>

            <div className="container relative z-10 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Govt of India Approval Badge */}
                    <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-6">
                        <img
                            src="/images/govt-india-emblem.png"
                            alt="Govt of India"
                            width={20}
                            height={24}
                            className="invert opacity-90"
                        />
                        <div className="flex flex-col items-start text-left">
                            <span className="text-[#D4AF37] font-bold text-[10px] sm:text-xs uppercase tracking-wider">
                                Govt. of India Approved Recruitment Agency
                            </span>
                            <span className="text-gray-400 text-[9px] sm:text-[10px]">
                                Reg: B-1698/DEL/COM/1000+/5/10340/2023
                            </span>
                        </div>
                    </div>

                    <h2 className="text-[#008CBA] font-bold tracking-wide md:tracking-[0.2em] mb-4 md:mb-6 uppercase text-[10px] sm:text-xs md:text-base">
                        Global Recruitment & Executive Search
                    </h2>
                    <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 md:mb-8 leading-tight font-heading break-words max-w-full">
                        Connecting Talent <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008CBA] to-[#4DB6AC]">
                            To Opportunity
                        </span>
                    </h1>
                    <p className="text-base md:text-xl text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-2 sm:px-4">
                        We are a global leader in providing comprehensive manpower solutions,
                        seamlessly bridging the gap between exceptional talent and world-class organizations.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/services"
                            className="w-full sm:w-auto px-8 py-4 bg-[#008CBA] hover:bg-[#007da6] text-white font-bold rounded-sm transition-all flex items-center justify-center gap-2 group"
                        >
                            Explore Our Sectors
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/contact"
                            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 hover:bg-white/10 text-white font-bold rounded-sm transition-all"
                        >
                            Contact Us
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 cursor-pointer"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
                <div className="flex flex-col items-center gap-2 text-white hover:text-[#008CBA] transition-colors">
                    <span className="text-xs uppercase tracking-[0.2em] font-heading font-medium">Scroll</span>
                    <ChevronDown className="w-8 h-8 drop-shadow-md" />
                </div>
            </motion.div>
        </section>
    );
}
