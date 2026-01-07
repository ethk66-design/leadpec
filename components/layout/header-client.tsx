"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
    Phone,
    Mail,
    Linkedin,
    Twitter,
    Facebook,
    Instagram,
    ChevronDown,
    Menu,
    X,
    ArrowRight
} from "lucide-react";
import { CONTACT_INFO, SERVICES } from "@/lib/constants";
import { Sector } from "@prisma/client";

interface HeaderClientProps {
    sectors: Sector[];
}

export function HeaderClient({ sectors }: HeaderClientProps) {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const pathname = usePathname();

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const servicesList = SERVICES.slice(0, 4);

    return (
        <>
            {/* Top Bar - Corporate Separator */}
            <div className="bg-[#051120] text-gray-400 text-xs py-2 border-b border-white/5 hidden lg:block relative z-[60]">
                <div className="container flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                            <Mail className="w-3.5 h-3.5 text-[#008CBA]" />
                            <span>{CONTACT_INFO.email}</span>
                        </a>
                        <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center gap-2 hover:text-white transition-colors">
                            <Phone className="w-3.5 h-3.5 text-[#008CBA]" />
                            <span>{CONTACT_INFO.phone}</span>
                        </a>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="opacity-50">Follow Us:</span>
                        <div className="flex items-center gap-3">
                            <Link href={CONTACT_INFO.socials.linkedin} className="hover:text-[#0077b5] transition-colors"><Linkedin className="w-3.5 h-3.5" /></Link>
                            <Link href={CONTACT_INFO.socials.facebook} className="hover:text-[#4267B2] transition-colors"><Facebook className="w-3.5 h-3.5" /></Link>
                            <Link href={CONTACT_INFO.socials.instagram} className="hover:text-[#E1306C] transition-colors"><Instagram className="w-3.5 h-3.5" /></Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 lg:top-[33px]", // Offset for Top Bar
                    isScrolled ? "bg-[#0B1B32]/95 backdrop-blur-md shadow-lg py-2 lg:top-0" : "bg-transparent py-4"
                )}
            >
                <div className="container flex items-center justify-between">
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center space-x-2 shrink-0">
                        <div className="relative w-40 h-12">
                            <Image
                                src="/logo.png"
                                alt="LEADPEC Logo"
                                fill
                                className="object-contain object-left"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Mega Menu */}
                    <nav className="hidden lg:flex items-center gap-8">
                        <Link href="/about" className="text-sm font-semibold text-white/90 hover:text-[#008CBA] transition-colors uppercase tracking-wide font-heading">
                            About Us
                        </Link>

                        {/* Services Mega Menu Trigger */}
                        <div className="relative group">
                            <button className="flex items-center gap-1 text-sm font-semibold text-white/90 group-hover:text-[#008CBA] transition-colors uppercase tracking-wide font-heading py-4">
                                Services <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                            </button>

                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-[#0B1B32] border border-[#004E8F]/30 rounded-sm shadow-2xl overflow-hidden invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out z-50">
                                <div className="p-6 grid grid-cols-2 gap-6">
                                    {servicesList.map((service) => (
                                        <Link key={service.title} href={`/services/${service.slug}`} className="group/item flex items-start gap-4 p-3 rounded-md hover:bg-white/5 transition-colors">
                                            <div className="mt-1 w-8 h-8 rounded-full bg-[#004E8F]/20 flex items-center justify-center text-[#008CBA] group-hover/item:bg-[#008CBA] group-hover/item:text-white transition-colors">
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold text-sm mb-1 group-hover/item:text-[#008CBA] transition-colors">{service.title}</h4>
                                                <p className="text-xs text-gray-400 leading-snug line-clamp-2">{service.description}</p>
                                            </div>
                                        </Link>
                                    ))}
                                    <div className="col-span-2 mt-2 pt-4 border-t border-white/10 text-center">
                                        <Link href="/services" className="text-xs font-bold text-[#008CBA] hover:text-white uppercase tracking-widest transition-colors">
                                            View All Services
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sectors Mega Menu Trigger */}
                        <div className="relative group">
                            <button className="flex items-center gap-1 text-sm font-semibold text-white/90 group-hover:text-[#008CBA] transition-colors uppercase tracking-wide font-heading py-4">
                                Sectors <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                            </button>

                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] bg-[#0B1B32] border border-[#004E8F]/30 rounded-sm shadow-2xl overflow-hidden invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out z-50">
                                <div className="p-6">
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Key Industries</h4>
                                    <ul className="grid grid-cols-3 gap-y-3 gap-x-6">
                                        {sectors.map((sector) => (
                                            <li key={sector.title}>
                                                <Link href={`/sectors/${sector.slug}`} className="text-sm text-gray-300 hover:text-white hover:translate-x-1 transition-all flex items-center gap-2">
                                                    <span className="w-1 h-1 rounded-full bg-[#008CBA]"></span>
                                                    <span className="truncate">{sector.title}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                    {pathname !== "/sectors" && (
                                        <div className="mt-6 pt-4 border-t border-white/10 text-center">
                                            <Link href="/sectors" className="text-xs font-bold text-[#008CBA] hover:text-white uppercase tracking-widest transition-colors">
                                                View All Sectors
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <Link href="/careers" className="text-sm font-semibold text-white/90 hover:text-[#008CBA] transition-colors uppercase tracking-wide font-heading">
                            Job Listings
                        </Link>

                        <Link href="/blog" className="text-sm font-semibold text-white/90 hover:text-[#008CBA] transition-colors uppercase tracking-wide font-heading">
                            Blog
                        </Link>

                        <Link href="/contact" className="text-sm font-semibold text-white/90 hover:text-[#008CBA] transition-colors uppercase tracking-wide font-heading">
                            Contact
                        </Link>
                    </nav>

                    {/* Actions & Mobile Toggle */}
                    <div className="flex items-center gap-4">
                        {/* Header Mail Display */}
                        <Link href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-sm bg-[#004E8F]/20 flex items-center justify-center border border-[#004E8F]/50 text-[#008CBA] group-hover:bg-[#008CBA] group-hover:text-white transition-all shadow-lg shadow-blue-900/10">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div className="hidden xl:block text-left">
                                <span className="block text-[10px] text-gray-400 font-medium uppercase tracking-widest leading-none mb-1">Email Us</span>
                                <span className="text-sm font-bold text-white group-hover:text-[#008CBA] transition-colors font-heading tracking-wide">{CONTACT_INFO.email}</span>
                            </div>
                        </Link>

                        <button
                            className="lg:hidden text-white"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="lg:hidden bg-[#0B1B32] border-t border-white/10 overflow-hidden"
                        >
                            <div className="container py-6 flex flex-col gap-4">
                                {["About Us", "Services", "Sectors", "Job Listings", "Blog", "Contact"].map((item) => (
                                    <Link
                                        key={item}
                                        href={item === "Job Listings" ? "/careers" : item === "Sectors" ? "/sectors" : `/${item.split(" ")[0].toLowerCase()}`}
                                        className="text-lg font-bold text-white hover:text-[#008CBA] transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item}
                                    </Link>
                                ))}
                                <div className="h-px bg-white/10 my-2" />
                                <div className="flex flex-col gap-3 text-sm text-gray-300">
                                    <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center gap-3 hover:text-white">
                                        <Phone className="w-4 h-4 text-[#008CBA]" /> {CONTACT_INFO.phone}
                                    </a>
                                    <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-3 hover:text-white">
                                        <Mail className="w-4 h-4 text-[#008CBA]" /> {CONTACT_INFO.email}
                                    </a>
                                </div>
                                <div className="h-px bg-white/10 my-2" />
                                <div className="flex gap-4">
                                    <Link href={CONTACT_INFO.socials.linkedin} className="text-gray-400 hover:text-white"><Linkedin className="w-5 h-5" /></Link>
                                    <Link href={CONTACT_INFO.socials.twitter} className="text-gray-400 hover:text-white"><Twitter className="w-5 h-5" /></Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </>
    );
}
