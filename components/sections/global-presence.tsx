"use client";

import { CONTACT_INFO } from "@/lib/constants";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

// Dynamically import the map component (SSR false is required for Leaflet)
const OfficeMap = dynamic(() => import("@/components/maps/office-map"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center bg-blue-50">
            <div className="text-[#0A2540] animate-pulse font-semibold">Loading Map...</div>
        </div>
    )
});

export function GlobalPresence() {
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    return (
        <section className="py-12 md:py-16 bg-white overflow-hidden">
            <div className="container px-4">
                <div className="flex flex-col lg:flex-row gap-16">

                    {/* Content Side */}
                    <div className="lg:w-1/3 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-2">Global Presence</h2>
                            <h3 className="text-3xl md:text-4xl font-bold font-heading text-[#0A2540] mb-6">
                                Global Reach, <br /> Local Expertise
                            </h3>
                            <p className="text-gray-600 mb-8">
                                Operating across the GCC, Europe, North America, Asia, Oceania, and Africa, we connect you with talent wherever your business needs it.
                            </p>

                            <div className="space-y-6">
                                {CONTACT_INFO.offices.map((office) => (
                                    <div
                                        key={office.city}
                                        className={`flex gap-4 items-start p-4 rounded-lg cursor-pointer transition-all duration-300 ${selectedCity === office.city
                                            ? "bg-blue-50 border border-blue-100 shadow-sm"
                                            : "bg-gray-50 hover:bg-gray-100 border border-transparent"
                                            }`}
                                        onClick={() => setSelectedCity(office.city)}
                                    >
                                        <MapPin className={`w-5 h-5 mt-1 shrink-0 ${selectedCity === office.city ? "text-[#D4AF37]" : "text-[#1E40AF]"
                                            }`} />
                                        <div>
                                            <h4 className={`font-bold transition-colors ${selectedCity === office.city ? "text-[#1E40AF]" : "text-[#0A2540]"
                                                }`}>{office.city}</h4>
                                            <p className="text-sm text-gray-500">{office.address}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Map Side (Interactive) */}
                    <div className="lg:w-2/3 relative h-[500px] bg-[#FDFBF7] rounded-3xl overflow-hidden border border-gray-100 shadow-xl group">
                        {/* Background Map Image - Subtle Texture for Light Theme */}
                        <div className="absolute inset-0 z-0 opacity-10 mix-blend-multiply pointer-events-none">
                            <Image
                                src="/images/global-map-dark.png" // We can keep this but fade it largely out or just remove it if it clashes. Let's keep distinct texture but heavily faded.
                                alt="Global Presence Map"
                                fill
                                className="object-cover grayscale invert"
                                sizes="(min-width: 1024px) 66vw, 100vw"
                            />
                        </div>
                        <div className="relative z-10 w-full h-full">
                            <OfficeMap offices={CONTACT_INFO.offices} selectedCity={selectedCity} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
