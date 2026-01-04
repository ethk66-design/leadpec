"use client";

import { WHY_CHOOSE_US } from "@/lib/constants";
import { motion } from "framer-motion";
import { Globe, Zap, Network, ClipboardCheck, Hammer, FileCheck, Star, Target, Brain, UserCheck, MessageCircle, BookOpen, Plane } from "lucide-react";
import Image from "next/image";

// Lucide icon mapping
const iconMap = {
    Globe: Globe,
    Zap: Zap,
    Network: Network,
    ClipboardCheck: ClipboardCheck,
    Hammer: Hammer,
    FileCheck: FileCheck,
    BestSolutions: Star,
    Target: Target,
    Assessment: Brain,
    TestCenters: Hammer,
    UserCheck: UserCheck,
    Languages: MessageCircle,
    Induction: BookOpen,
    Plane: Plane,
};

import { useState, useEffect } from "react";
import { getSiteAssetAction } from "@/lib/public-actions";

export function WhyChooseUs() {
    const [bgImage, setBgImage] = useState<string | null>(null);
    const [sideImage, setSideImage] = useState<string>("/images/consultation-team.jpg");

    useEffect(() => {
        const fetchAssets = async () => {
            const bg = await getSiteAssetAction("WHY_CHOOSE_US_BG");
            if (bg) setBgImage(bg);

            const side = await getSiteAssetAction("WHY_CHOOSE_US_SIDE_IMG");
            if (side) setSideImage(side);
        };
        fetchAssets();
    }, []);

    return (
        <section
            className="py-12 md:py-20 bg-[#202020] relative overflow-hidden bg-cover bg-center"
            style={bgImage ? { backgroundImage: `url(${bgImage})` } : {}}
        >
            {/* Background Pattern - Only show if no bg image */}
            {!bgImage && (
                <div className="absolute inset-0 opacity-5 bg-[linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000),linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000)] bg-[length:60px_60px] bg-[position:0_0,30px_30px]" />
            )}

            {/* Dark Overlay for Readability */}
            <div className={`absolute inset-0 ${bgImage ? 'bg-black/80' : ''}`} />

            <div className="container px-4 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 items-center">

                    {/* Left Column: Content & Grid */}
                    <div className="lg:w-3/5">
                        <div className="mb-12">
                            <h2 className="text-sm font-bold text-[#4DB6AC] uppercase tracking-widest mb-4">Why Choose LEADPEC</h2>
                            <h3 className="text-4xl md:text-5xl font-bold font-heading text-white leading-tight mb-6">
                                ADVANTAGES OF <br />
                                <span className="text-[#008CBA]">LEADPEC</span>
                            </h3>
                            <p className="text-gray-400 leading-relaxed border-l-2 border-[#008CBA] pl-6 max-w-2xl">
                                We deliver precision, speed, and reliability in every placement, ensuring your projects never face delays due to workforce shortages.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-8 md:gap-y-12">
                            {WHY_CHOOSE_US.map((item, index) => {
                                const Icon = iconMap[item.icon as keyof typeof iconMap] || Globe;
                                return (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group"
                                    >
                                        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                                            <div className="shrink-0 p-2 sm:p-3 rounded-sm bg-[#0B1B32] group-hover:bg-[#008CBA] transition-colors duration-300">
                                                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#008CBA] group-hover:text-white transition-colors" />
                                            </div>
                                            <div className="w-full">
                                                <h4 className="text-sm sm:text-xl font-bold text-white mb-2 sm:mb-3 font-heading group-hover:text-[#4DB6AC] transition-colors line-clamp-2 md:line-clamp-none">
                                                    {item.title}
                                                </h4>
                                                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed border-t border-gray-800 pt-2 sm:pt-3 group-hover:border-gray-700 transition-colors">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Column: Image */}
                    <div className="lg:w-2/5">
                        <div className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                            <Image
                                src={sideImage}
                                alt="Professional Consultation"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B32]/80 via-transparent to-transparent" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
