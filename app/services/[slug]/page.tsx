import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CTASection } from "@/components/sections/cta";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { SERVICES } from "@/lib/constants";
import { DynamicImage } from "@/components/ui/dynamic-image";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

interface Branding {
    heroTitle?: string;
    heroSubtitle?: string;
    quote?: string;
    conceptTitle?: string;
    processTitle?: string;
}

interface ProcessStep {
    title: string;
    description: string;
}

interface ServiceDetailProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: ServiceDetailProps): Promise<Metadata> {
    const localService = SERVICES.find(s => s.slug === params.slug);
    if (localService) {
        return {
            title: `${localService.title} | LEADPEC Services`,
            description: localService.description
        };
    }

    if (!prisma) return { title: "Service Not Found" };

    const service = await prisma.service.findUnique({
        where: { slug: params.slug }
    });
    if (!service) return { title: "Service Not Found" };
    return {
        title: `${service.title} | LEADPEC Services`,
        description: service.description
    };
}

export const dynamic = 'force-dynamic';

export default async function ServiceDetailPage({ params }: ServiceDetailProps) {
    // 1. Try finding in Constants (Source of Truth for Content Updates)
    let service: any = SERVICES.find(s => s.slug === params.slug);

    // 2. If not found, try Database
    if (!service && prisma) {
        const dbService = await prisma.service.findUnique({
            where: { slug: params.slug }
        });

        if (dbService) {
            service = {
                ...dbService,
                branding: dbService.branding ? JSON.parse(dbService.branding as string) : null,
                process: dbService.process ? JSON.parse(dbService.process as string) : null,
                features: dbService.features ? JSON.parse(dbService.features as string) : [],
                images: []
            };
        }
    }

    if (!service) {
        notFound();
    }

    // Map new slugs to image sets
    const fallbackImages: Record<string, string[]> = {
        'permanent-hire': ["/images/service-perm-strategic.png", "/images/service-perm-global.png", "/images/service-perm-candidate.png"],
        'executive-search': ["/images/service-exec-decision.png", "/images/service-exec-global.png", "/images/service-exec-handshake.png"],
        'contract-staffing': ["/images/service-contract-site.png", "/images/service-contract-site.png", "/images/service-contract-site.png"],
        'short-term-staffing': ["/images/service-contract-site.png", "/images/service-contract-site.png", "/images/service-contract-site.png"]
    };

    // Ensure images exist
    if (!service.images || service.images.length === 0) {
        service.images = fallbackImages[service.slug] || [];
    }

    // Determine Asset Key based on slug
    let assetKey = 'SERVICES_HERO_BG'; // Fallback
    let fallbackImg = '/images/services-hero-industrial.png';

    if (service.slug === 'permanent-hire') {
        assetKey = 'SERVICE_PERMANENT_IMG';
        fallbackImg = '/images/service-permanent-office.png';
    } else if (service.slug === 'executive-search') {
        assetKey = 'SERVICE_EXECUTIVE_IMG';
        fallbackImg = '/images/service-executive-meeting.png';
    } else if (service.slug === 'contract-staffing') {
        assetKey = 'SERVICE_CONTRACT_IMG';
        fallbackImg = '/images/service-contract-site.png';
    } else if (service.slug === 'short-term-staffing') {
        assetKey = 'SERVICE_CONTRACT_IMG';
        fallbackImg = '/images/service-contract-site.png';
    }

    let asset = null;
    if (prisma) {
        asset = await prisma.siteAsset.findUnique({
            where: { key: assetKey }
        });
    }

    const heroImage = asset?.url || fallbackImg;

    return (
        <main className="flex min-h-screen flex-col bg-[#0f172a]">
            <Header />

            {/* Minimal Hero */}
            <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-[#0f172a]">
                <div className="absolute inset-0 z-0 select-none">
                    <DynamicImage
                        src={heroImage}
                        fallbackSrc={fallbackImg}
                        alt={service.title}
                        fill
                        className="object-cover opacity-50"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent" />
                </div>
                <div className="relative z-10 container mx-auto px-4 pt-20">
                    <Link href="/services" className="inline-flex items-center text-blue-400 hover:text-white mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{service.title}</h1>
                    <p className="text-xl text-gray-300 max-w-2xl">{service.description}</p>
                </div>
            </section>

            {/* Detailed Content */}
            <section className="py-24 bg-white relative">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Main Content Area */}
                        <div className="lg:w-2/3">

                            {/* 1. Split Intro Layout (Data-Driven) */}
                            <div className="mb-16">
                                <h2 className="text-4xl font-bold text-slate-900 mb-8 font-heading leading-tight">
                                    {service.branding?.heroTitle ? (
                                        <>
                                            {service.branding.heroTitle.split('.')[0]}
                                            {service.branding.heroTitle.includes('.') && '.'} <br />
                                            <span className="text-[#008CBA]">{service.branding.heroSubtitle}</span>
                                        </>
                                    ) : (
                                        <span className="text-slate-900">{service.title} Overview</span>
                                    )}
                                </h2>
                                <div className="text-lg text-slate-700 leading-loose font-light space-y-6">
                                    {service.branding?.quote && (
                                        <p className="border-l-4 border-[#008CBA] pl-6 italic text-slate-600 bg-slate-50 py-4 rounded-r-lg">
                                            "{service.branding.quote}"
                                        </p>
                                    )}
                                    <p>
                                        {service.content}
                                    </p>
                                </div>
                            </div>

                            {/* 2. Enhanced Visual Gallery - "The Ecosystem" */}
                            {service.images && service.images.length > 0 && (
                                <div className="mb-20">
                                    <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
                                        <h3 className="text-2xl font-bold text-[#0B1B32] font-heading">
                                            {service.branding?.conceptTitle || "Our Concept"}
                                        </h3>
                                        <span className="text-sm font-semibold text-[#008CBA] uppercase tracking-wider">Visualizing Excellence</span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {service.images.map((img: string, index: number) => (
                                            <div
                                                key={index}
                                                className={`relative rounded-none overflow-hidden group ${index === 0 ? 'md:col-span-2 h-[350px]' : 'h-[250px]'}`}
                                            >
                                                <DynamicImage
                                                    src={img}
                                                    fallbackSrc={fallbackImg}
                                                    alt={`${service.title} Concept ${index + 1}`}
                                                    fill
                                                    className="object-cover transition-transform duration-1000 group-hover:scale-105 saturate-0 group-hover:saturate-100"
                                                />
                                                {/* Corporate Caption Bar */}
                                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0B1B32] to-transparent p-6 pt-20">
                                                    <div className="border-l-2 border-[#FCD34D] pl-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                                        {/* Dynamic Captions Logic - Fallback to generic if not mapped */}
                                                        <span className="text-white font-bold text-lg block leading-none">
                                                            {service.slug === 'permanent-hire' && index === 0 ? "Strategic Alignment" :
                                                                service.slug === 'permanent-hire' && index === 1 ? "Global Network" :
                                                                    service.slug === 'permanent-hire' && index === 2 ? "Human Capital" :
                                                                        service.slug === 'executive-search' && index === 0 ? "Executive Decision" :
                                                                            service.slug === 'executive-search' && index === 1 ? "Global Influence" :
                                                                                service.slug === 'executive-search' && index === 2 ? "Trust & Discretion" :
                                                                                    `Concept ${index + 1}`}
                                                        </span>
                                                        <span className="text-gray-300 text-xs uppercase tracking-widest mt-1 block">
                                                            {service.slug === 'permanent-hire' && index === 0 ? "Boardroom & Strategy" :
                                                                service.slug === 'permanent-hire' && index === 1 ? "50+ Countries" :
                                                                    service.slug === 'permanent-hire' && index === 2 ? "Candidate Experience" :
                                                                        service.slug === 'executive-search' && index === 0 ? "Boardroom Strategy" :
                                                                            service.slug === 'executive-search' && index === 1 ? "International Vision" :
                                                                                service.slug === 'executive-search' && index === 2 ? "Confidentiality" :
                                                                                    "Service Insight"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* 3. Recruitment Lifecycle Process Flow */}
                            {service.process && (
                                <div className="mb-16 bg-[#F8FAFC] p-8 rounded-2xl border border-slate-100">
                                    <div className="text-center mb-10">
                                        <h3 className="text-2xl font-bold text-[#0B1B32] font-heading">
                                            {service.branding?.processTitle || "The Process"}
                                        </h3>
                                        <p className="text-slate-500 mt-2">A systematic approach to precision.</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                                        {/* Connecting Line (Desktop Only) */}
                                        <div className="hidden md:block absolute top-[24px] left-[10%] right-[10%] h-[2px] bg-gray-200 -z-10"></div>

                                        {service.process.map((step: ProcessStep, i: number) => (
                                            <div key={i} className="flex flex-col items-center text-center group">
                                                <div className="w-12 h-12 bg-white border-2 border-[#008CBA] text-[#008CBA] rounded-full flex items-center justify-center font-bold text-lg mb-4 shadow-sm group-hover:bg-[#008CBA] group-hover:text-white transition-colors relative z-10 font-heading">
                                                    {i + 1}
                                                </div>
                                                <h4 className="font-bold text-slate-900 mb-2 text-sm">{step.title}</h4>
                                                <p className="text-xs text-slate-500 leading-relaxed px-2">{step.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Key Features List */}
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-6 font-heading border-b border-slate-200 pb-2 inline-block">Key Advantages</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    {service.features?.map((feature: string) => (
                                        <div key={feature} className="flex items-center gap-4 p-5 bg-white border-l-4 border-l-gray-200 border border-t-gray-100 border-r-gray-100 border-b-gray-100 hover:border-l-[#008CBA] hover:shadow-md transition-all group">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#008CBA] group-hover:text-white transition-colors">
                                                <CheckCircle2 className="w-4 h-4" />
                                            </div>
                                            <span className="font-semibold text-slate-700 text-lg">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 4. Sidebar - "The Power Card" */}
                        <div className="lg:w-1/3 space-y-8">
                            {/* Sticky Wrapper */}
                            <div className="sticky top-24 space-y-8">

                                {/* The "Black Card" / Corporate Invite */}
                                <div className="relative overflow-hidden bg-[#0B1B32] text-white p-8 rounded-none shadow-2xl">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl pointer-events-none"></div>
                                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#008CBA]/20 rounded-full -ml-12 -mb-12 blur-xl pointer-events-none"></div>

                                    <div className="relative z-10">
                                        <h3 className="text-2xl font-bold font-heading mb-2">Partner With Us</h3>
                                        <div className="w-12 h-1 bg-[#008CBA] mb-6"></div>

                                        <p className="text-gray-300 mb-8 leading-relaxed font-light">
                                            Ready to transform your organization? Connect with our specialized {service.title.toLowerCase()} consultants today.
                                        </p>

                                        <Link
                                            href={`/contact?subject=${encodeURIComponent(service.title)}`}
                                            className="group block w-full bg-white text-[#0B1B32] text-center font-bold py-4 px-6 hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
                                        >
                                            Intiate Engagement
                                            <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                                        </Link>

                                        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                                            <span>Global HQ: Kochi</span>
                                            <span>+91 123 456 7890</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Stat / Trust Signal */}
                                <div className="bg-[#F8FAFC] p-6 border border-slate-200">
                                    <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Why Leadpec?</h4>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#008CBA] mt-2 shrink-0"></div>
                                            <p className="text-sm text-slate-600">Access to <strong>passive talent pools</strong> not on job boards.</p>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#008CBA] mt-2 shrink-0"></div>
                                            <p className="text-sm text-slate-600">Rigorous <strong>3-stage vetting</strong> process.</p>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#008CBA] mt-2 shrink-0"></div>
                                            <p className="text-sm text-slate-600">Dedicated <strong>sector specialists</strong>.</p>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
