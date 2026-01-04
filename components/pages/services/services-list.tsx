"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { DynamicImage } from "@/components/ui/dynamic-image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SERVICES } from "@/lib/constants";

interface ServiceBlock {
    title: string;
    description: string;
    imageKey: string;
    imageAlt: string;
    defaultImage: string;
    features: string[];
    link: string;
}

interface ServicesListProps {
    images: {
        permanent?: string;
        executive?: string;
        contract?: string;
    };
}

export function ServicesList({ images }: ServicesListProps) {
    // Map constants to the display format
    const services: ServiceBlock[] = SERVICES.map((service) => ({
        title: service.title,
        description: service.content,
        imageKey: service.slug === 'permanent-hire' ? "SERVICE_PERMANENT_IMG" :
            service.slug === 'executive-search' ? "SERVICE_EXECUTIVE_IMG" :
                service.slug === 'contract-staffing' ? "SERVICE_CONTRACT_IMG" :
                    "SERVICE_SHORT_TERM_IMG",
        imageAlt: service.title,
        defaultImage: service.slug === 'executive-search' ? "/images/service-executive-meeting.png" :
            service.slug === 'permanent-hire' ? "/images/service-permanent-office.png" :
                "/images/service-contract-site.png",
        features: service.features || [],
        link: `/services/${service.slug}`
    }));

    return (
        <section className="py-12 md:py-16 bg-white">
            <div className="container mx-auto px-4 space-y-32">
                {services.map((service, index) => {
                    const isEven = index % 2 === 0;
                    // Map index/key to the specific image prop, gracefully fallback
                    // We need to use type assertion or safer access if images is strict
                    let dynamicSrc;
                    if (service.imageKey === "SERVICE_PERMANENT_IMG") dynamicSrc = images.permanent;
                    else if (service.imageKey === "SERVICE_EXECUTIVE_IMG") dynamicSrc = images.executive;
                    else if (service.imageKey === "SERVICE_CONTRACT_IMG") dynamicSrc = images.contract;
                    // For short term, we don't have a prop yet, so it will fall back to defaultImage which is fine.

                    return (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
                        >
                            {/* Content Side */}
                            <div className="flex-1 space-y-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
                                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                                    {service.title}
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{service.title}</h2>
                                <p className="text-lg text-slate-600 leading-relaxed">
                                    {service.description}
                                </p>
                                <ul className="space-y-3 pt-4">
                                    {service.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3 text-slate-700">
                                            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <div className="pt-6">
                                    <Link href={service.link}>
                                        <Button size="lg" className="bg-[#0c4a6e] hover:bg-[#075985]">
                                            Enquire Now <ArrowRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {/* Image Side */}
                            <div className="flex-1 w-full">
                                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
                                    <DynamicImage
                                        src={dynamicSrc || service.defaultImage}
                                        fallbackSrc={service.defaultImage}
                                        alt={service.imageAlt}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* Decorative geometric overlay */}
                                    <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply group-hover:bg-transparent transition-colors duration-500" />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
