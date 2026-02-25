"use client";

import { CONTACT_INFO } from "@/lib/constants";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import Link from "next/link";
import { DynamicImage } from "@/components/ui/dynamic-image";

interface ContactContentProps {
    supportImage?: string | null;
}

export function ContactContent({ supportImage }: ContactContentProps) {
    return (
        <main className="flex-1">
            {/* Hero Section */}
            <section className="relative py-12 md:py-20 bg-[#0B1B32] border-b border-white/5 overflow-hidden">
                <div className="container relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight font-heading">
                            Get in <span className="text-[#008CBA]">Touch</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            Ready to transform your workforce or find your next career move? Contact our global team today.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-12 md:py-16">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-2 font-heading">Send us a Message</h2>
                                <p className="text-gray-400">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>
                            </div>

                            <ContactForm />
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-10"
                        >
                            <div className="relative h-64 w-full rounded-xl overflow-hidden shadow-lg border border-white/10">
                                <DynamicImage
                                    src={supportImage || "/images/contact-support.png"}
                                    fallbackSrc="/images/contact-support.png"
                                    alt="Customer Support"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#051120] to-transparent/20" />
                                <div className="absolute bottom-4 left-4">
                                    <p className="text-white font-bold text-lg">Detailed Support</p>
                                    <p className="text-gray-300 text-sm">We are here to help 24/7</p>
                                </div>
                            </div>

                            <div className="p-8 bg-[#0B1B32] rounded-xl border border-white/5 space-y-8">
                                <h3 className="text-xl font-bold text-white mb-6 font-heading">Contact Information</h3>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#004E8F]/20 flex items-center justify-center text-[#008CBA] shrink-0">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white mb-1">Email Us</p>
                                        <a href={`mailto:${CONTACT_INFO.email}`} className="text-gray-400 hover:text-[#008CBA] transition-colors">{CONTACT_INFO.email}</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#004E8F]/20 flex items-center justify-center text-[#008CBA] shrink-0">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white mb-1">Call Us</p>
                                        <a href={`tel:${CONTACT_INFO.phone}`} className="text-gray-400 hover:text-[#008CBA] transition-colors">{CONTACT_INFO.phone}</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#004E8F]/20 flex items-center justify-center text-[#008CBA] shrink-0">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white mb-1">Business Hours</p>
                                        <p className="text-gray-400">Monday - Friday: 9:00 AM - 6:00 PM</p>
                                    </div>
                                </div>
                            </div>

                            {/* Address List */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-white font-heading">Our Offices</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {CONTACT_INFO.offices.map((office) => (
                                        <div key={office.city} className="p-4 rounded-lg bg-[#0B1B32]/50 border border-white/5 hover:border-[#008CBA]/30 transition-colors">
                                            <div className="flex items-start gap-3">
                                                <MapPin className="w-5 h-5 text-[#008CBA] shrink-0 mt-0.5" />
                                                <div>
                                                    <h4 className="font-bold text-white text-sm mb-1">{office.city}</h4>
                                                    <p className="text-xs text-gray-400 leading-relaxed whitespace-pre-line">{office.address}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
}
