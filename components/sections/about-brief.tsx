"use client";

import { Button } from "@/components/ui/button";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { DynamicImage } from "@/components/ui/dynamic-image";

interface AboutBriefProps {
    aboutImage?: string | null;
}

export function AboutBrief({ aboutImage }: AboutBriefProps) {
    return (
        <section className="py-12 md:py-20 bg-gray-50 overflow-hidden">
            <div className="container px-4">
                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-2">Who We Are</h2>
                        <h3 className="text-3xl md:text-4xl font-bold font-heading text-[#0A2540] mb-6">
                            Global Standards, Local Expertise
                        </h3>
                        <div className="space-y-4 text-base md:text-lg text-gray-600 leading-relaxed mb-8 break-words">
                            <p>
                                LEADPEC is a global leader in Recruitment, Talent Sourcing and Executive Search, providing comprehensive manpower solutions including permanent, temporary, short-term, secondment, and remote hiring. With operations spanning the GCC, Europe, North America, Asia, Oceania, and Africa, we are the preferred recruitment partner for a wide range of prestigious clients in both the public and private sectors.
                            </p>
                            <p>
                                We have established ourselves as a trusted Talent Acquisition partner, delivering customized solutions that align with each client’s strategic objectives. Our expertise covers diverse industries, enabling us to identify, attract, and retain premium talent that drives organizational performance. Through our Executive Search services, we connect clients with senior-level professionals who bring the leadership, experience, and vision necessary to achieve sustainable growth.
                            </p>
                            <p>
                                At LEADPEC, we combine global insight with local expertise. Our team of seasoned professionals possesses an in-depth understanding of evolving market dynamics, ensuring our clients benefit from agile, informed, and effective recruitment strategies. Supported by a strong international network, strategic regional alliances, and partnerships with leading job portals, we provide value-driven recruitment services that consistently meet and exceed expectations.
                            </p>
                            <p>
                                Our success is rooted in quality, innovation, and commitment. We employ state-of-the-art systems, rigorous processes, and integrated technologies to ensure efficiency and precision — even in high-volume recruitment scenarios. This dedication to excellence has earned LEADPEC a solid reputation for reliability and timely delivery across all engagements.
                            </p>
                            <p>
                                We take pride in building long-term relationships with clients and candidates alike, fostering mutual trust and success. By understanding your organizational goals, culture, and values, we deliver talent that not only meets your technical requirements but also integrates seamlessly into your team.
                            </p>
                            <p>
                                At LEADPEC, our mission is clear — to empower organizations through exceptional talent. By partnering with us, you gain access to global reach, industry expertise, and a steadfast commitment to quality that transforms your talent acquisition process and strengthens your competitive edge.
                            </p>
                        </div>
                        <Button asChild size="lg" className="bg-[#1E40AF] hover:bg-[#1E40AF]/90">
                            <Link href="/about">
                                Learn More About Us <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <DynamicImage
                            src={aboutImage || "/images/about-corporate-meeting.png"}
                            fallbackSrc="/images/about-corporate-meeting.png"
                            alt="Leadpec Corporate Team"
                            fill
                            className="object-cover"
                            sizes="(min-width: 1024px) 50vw, 100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#051120]/60 to-transparent" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
