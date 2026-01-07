
import { SECTOR_CONTENT_CONFIG } from "./sector-content-config";
import { Sector } from "@prisma/client";

export interface AssetDefinition {
    key: string; // The database key in SiteAsset table
    label: string; // Human readable label
    description?: string; // Help text
    defaultSrc?: string; // Fallback image if DB is empty
}

export interface ContentSection {
    id: string; // ID for accordion
    title: string; // Section Title (e.g. "Home Page", "Sector: Energy")
    assets: AssetDefinition[];
}

// 1. Static/Global Assets
const GLOBAL_SECTION: ContentSection = {
    id: "global",
    title: "🌍 Global Layout (Header/Footer)",
    assets: [
        {
            key: "GLOBAL_FOOTER_BG",
            label: "Footer Background Image",
            description: "The dark background image appearing behind the footer."
        },
    ]
};

const HOME_SECTION: ContentSection = {
    id: "home",
    title: "🏠 Home Page",
    assets: [
        {
            key: "HOME_HERO_BG",
            label: "Main Hero Background",
            description: "The large image at the very top of the home page.",
            defaultSrc: "/images/hero-corporate.png"
        }
    ]
};

const ABOUT_SECTION: ContentSection = {
    id: "about",
    title: "ℹ️ About Page",
    assets: [
        {
            key: "ABOUT_HERO_BG",
            label: "About Hero Background",
            description: "Main hero image for About Us page.",
            defaultSrc: "/images/about-hero-team.png"
        },
        {
            key: "ABOUT_COLLAB_IMG",
            label: "Office Collaboration Image",
            description: "Image showing team collaboration (Introduction section).",
            defaultSrc: "/images/office-collaboration.png"
        },
        {
            key: "ABOUT_VISION_BG",
            label: "Vision Section Background",
            description: "Background pattern for the Mission & Vision section.",
            defaultSrc: "/images/vision-background.png"
        }
    ]
};

const SERVICES_SECTION: ContentSection = {
    id: "services",
    title: "💼 Services Pages",
    assets: [
        {
            key: "SERVICES_HERO_BG",
            label: "General Services Hero (Fallback)",
            description: "Default hero image for services that don't have a specific override.",
            defaultSrc: "/images/services-hero-industrial.png"
        },
        {
            key: "SERVICE_EXECUTIVE_IMG",
            label: "Executive Search Hero",
            description: "Hero image for Executive Search service page.",
            defaultSrc: "/images/service-executive-meeting.png"
        },
        {
            key: "SERVICE_PERMANENT_IMG",
            label: "Permanent Hire Hero",
            description: "Hero image for Permanent Hire service page.",
            defaultSrc: "/images/service-permanent-office.png"
        },
        {
            key: "SERVICE_CONTRACT_IMG",
            label: "Contract Staffing Hero",
            description: "Hero image for Contract Staffing service page.",
            defaultSrc: "/images/service-contract-site.png"
        },
        {
            key: "SERVICE_SHORT_TERM_IMG",
            label: "Short Term Staffing Hero",
            description: "Hero image for Short Term Staffing service page.",
            defaultSrc: "/images/service-contract-site.png"
        }
    ]
};

const BLOG_SECTION: ContentSection = {
    id: "blog",
    title: "📰 Blog Page",
    assets: [
        {
            key: "BLOG_HERO_BG",
            label: "Blog Hero Background",
            description: "The main hero image for the Blog/Insights index page.",
            defaultSrc: "/images/blog-hero-placeholder.png"
        }
    ]
};

// 2. Dynamic Generator Function
export function getContentRegistry(sectors: Sector[]): ContentSection[] {
    const sectorSections: ContentSection[] = sectors.map(sector => {
        // 1. The Standard Hero (Standardized Keys)
        const assets: AssetDefinition[] = [
            {
                key: `SECTOR_${sector.slug.toUpperCase().replace(/-/g, '_')}_HERO`,
                label: "Hero Image (Main Banner)",
                description: "The primary banner image at the top of the detail page."
            },
            {
                key: `SECTOR_${sector.slug.toUpperCase().replace(/-/g, '_')}_MIDDLE`,
                label: "Middle Feature Background",
                description: "Background for the mid-page highlight section."
            },
            {
                key: `SECTOR_${sector.slug.toUpperCase().replace(/-/g, '_')}_BOTTOM`,
                label: "Bottom CTA Background",
                description: "Background for the 'Ready to Start' section near the footer."
            }
        ];

        // 2. The Dynamic Content Assets (from config)
        // Note: For new sectors, this might be empty initially, which is fine.
        // They will still get the 3 core images above.
        const dynamicAssets = SECTOR_CONTENT_CONFIG[sector.slug] || [];
        dynamicAssets.forEach(da => {
            assets.push({
                key: da.key,
                label: da.label,
                description: da.description,
                defaultSrc: da.defaultSrc
            });
        });

        return {
            id: `sector-${sector.slug}`,
            title: `Sector: ${sector.title}`,
            assets: assets
        };
    });


    return [
        GLOBAL_SECTION,
        HOME_SECTION,
        ABOUT_SECTION,
        SERVICES_SECTION,
        BLOG_SECTION,
        ...sectorSections
    ];
}
