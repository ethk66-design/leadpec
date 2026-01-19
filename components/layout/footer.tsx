/* eslint-disable */
import { CONTACT_INFO, SECTORS } from "@/lib/constants";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Linkedin, Instagram, Facebook, ArrowRight, MapPin, Phone, Mail, ShieldCheck } from "lucide-react";
import Image from "next/image";

import Link from "next/link";
import { getSiteSetting, getSocialLinks } from "@/lib/settings-actions";

import { DynamicFooterBackground } from "@/components/layout/dynamic-footer-bg";

export async function Footer() {
    // Fetch sectors from DB, take first 6 for the footer list
    // Fetch sectors from DB, take first 6 for the footer list. Fallback to static.
    let sectors: any[] = SECTORS.slice(0, 6);

    if (prisma) {
        try {
            const dbSectors = await prisma.sector.findMany({
                orderBy: { title: "asc" },
                take: 6
            });
            if (dbSectors.length > 0) sectors = dbSectors;
        } catch (e) {
            console.warn("DB unavailable, using fallback sectors");
        }
    }

    const footerSectors = sectors;

    // Try getting dynamic footer image, else fallback
    let footerImage = "/images/hero-corporate.png"; // Default backup
    if (prisma) {
        const dbImage = await getSiteSetting("footer_image");
        if (dbImage) footerImage = dbImage;
    }



    // ... (existing imports)

    const socials = await getSocialLinks();

    return (
        <DynamicFooterBackground footerImage={footerImage}>
            {/* Background Pattern / Overlay */}
            {
                footerImage ? (
                    <div className="absolute inset-0 bg-[#051120]/90" /> // Dark overlay if image is set
                ) : (
                    <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(45deg,#fff_25%,transparent_25%,transparent_75%,#fff_75%,#fff),linear-gradient(45deg,#fff_25%,transparent_25%,transparent_75%,#fff_75%,#fff)] bg-[length:60px_60px] bg-[position:0_0,30px_30px]" />
                )
            }

            <div className="container py-12 md:py-16 px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Column 1: Brand & Contact */}
                    <div className="space-y-6">
                        <div className="relative w-48 h-16">
                            <Image
                                src="/logo.png"
                                alt="LEADPEC Logo"
                                fill
                                className="object-contain object-left"
                            />
                        </div>
                        <p className="text-sm leading-relaxed text-blue-200/60 max-w-xs">
                            Global Leader in Recruitment, Talent Sourcing & Executive Search. Connecting businesses with top-tier talent worldwide.
                        </p>

                        <div className="space-y-3 pt-2">
                            <div className="flex items-start gap-3 text-sm group">
                                <MapPin className="w-4 h-4 text-[#008CBA] mt-1 group-hover:text-white transition-colors" />
                                <span className="group-hover:text-white transition-colors">{CONTACT_INFO.offices[0].address}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm group">
                                <Phone className="w-4 h-4 text-[#008CBA] group-hover:text-white transition-colors" />
                                <span className="group-hover:text-white transition-colors">{CONTACT_INFO.phone}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm group">
                                <Mail className="w-4 h-4 text-[#008CBA] group-hover:text-white transition-colors" />
                                <span className="group-hover:text-white transition-colors">{CONTACT_INFO.email}</span>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/5 mt-6">
                            <p className="text-white font-bold text-xs md:text-sm">{CONTACT_INFO.legal.name}</p>
                            <div className="flex items-start gap-3 mt-2">
                                <Image
                                    src="/images/govt-india-emblem.png"
                                    alt="Government of India Emblem"
                                    width={32}
                                    height={40}
                                    className="invert opacity-60"
                                />
                                <p className="text-[10px] md:text-xs text-blue-200/50 leading-tight max-w-[200px]">
                                    {CONTACT_INFO.legal.registration}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Link href={socials.linkedin} className="w-10 h-10 rounded-sm bg-[#0B1B32] border border-[#004E8F]/30 flex items-center justify-center hover:bg-[#008CBA] hover:text-white hover:border-[#008CBA] transition-all duration-300"><Linkedin className="w-5 h-5" /></Link>
                            <Link href={socials.facebook} className="w-10 h-10 rounded-sm bg-[#0B1B32] border border-[#004E8F]/30 flex items-center justify-center hover:bg-[#008CBA] hover:text-white hover:border-[#008CBA] transition-all duration-300"><Facebook className="w-5 h-5" /></Link>
                            <Link href={socials.instagram} className="w-10 h-10 rounded-sm bg-[#0B1B32] border border-[#004E8F]/30 flex items-center justify-center hover:bg-[#008CBA] hover:text-white hover:border-[#008CBA] transition-all duration-300"><Instagram className="w-5 h-5" /></Link>
                        </div>
                    </div >

                    {/* Column 2: Quick Links */}
                    < div >
                        <h4 className="text-white font-bold font-heading text-lg mb-6 uppercase tracking-wider">Quick Links</h4>
                        <ul className="space-y-3 text-sm">
                            {['About Us', 'Our Services', 'Sectors', 'Careers', 'Contact Us'].map((item) => (
                                <li key={item}>
                                    <Link href="/" className="hover:text-[#008CBA] transition-colors block group">
                                        <span className="group-hover:translate-x-1 transition-transform inline-block">{item}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div >

                    {/* Column 3: Top Sectors */}
                    < div >
                        <h4 className="text-white font-bold font-heading text-lg mb-6 uppercase tracking-wider">Key Sectors</h4>
                        <ul className="space-y-3 text-sm">
                            {footerSectors.map((sector) => (
                                <li key={sector.title}>
                                    <Link href="/services" className="hover:text-[#008CBA] transition-colors block group">
                                        <span className="group-hover:translate-x-1 transition-transform inline-block">{sector.title}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div >

                    {/* Column 4: Newsletter */}
                    < div >
                        <h4 className="text-white font-bold font-heading text-lg mb-6 uppercase tracking-wider">Newsletter</h4>
                        <p className="text-sm mb-6 text-blue-200/60">Subscribe to get the latest job postings and industry news.</p>
                        <div className="flex gap-2">
                            <Input placeholder="Email Address" className="bg-[#0B1B32] border-[#004E8F]/30 focus:border-[#008CBA] rounded-sm text-sm text-white placeholder:text-blue-200/30" />
                            <Button size="icon" className="bg-[#008CBA] hover:bg-[#007aa3] text-white rounded-sm shrink-0">
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div >
                </div >

                <div className="mt-16 pt-8 border-t border-[#004E8F]/20 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-blue-200/40">
                    <p>© {new Date().getFullYear()} LEADPEC. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div >
        </DynamicFooterBackground>
    );
}
