
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const ASSETS = [
    // --- HOME ---
    { key: 'HOME_HERO_BG', url: '/images/hero-bg.jpg', section: 'Home', description: 'Main hero background image' },
    { key: 'HOME_ABOUT_IMG', url: '/images/about-preview.jpg', section: 'Home', description: 'Image in the "About Us" preview section' },

    // --- SECTORS (HEROES) ---
    { key: 'SECTOR_CONSTRUCTION_HERO', url: '/images/construction-hero-v2.png', section: 'Sectors', description: 'Hero for Engineering & Construction' },
    { key: 'SECTOR_HEALTHCARE_HERO', url: '/images/healthcare-hero.png', section: 'Sectors', description: 'Hero for Healthcare' },
    { key: 'SECTOR_INFRASTRUCTURE_HERO', url: '/images/infrastructure-hero.png', section: 'Sectors', description: 'Hero for Infrastructure' },
    { key: 'SECTOR_ENERGY_HERO', url: '/images/energy-hero.png', section: 'Sectors', description: 'Hero for Renewable Energy' },
    { key: 'SECTOR_FABRICATION_HERO', url: '/images/fabrication-hero-v3.png', section: 'Sectors', description: 'Hero for Fabrication' },
    { key: 'SECTOR_HEAVY_EQUIPMENT_HERO', url: '/images/heavy-equipment-hero-v2.png', section: 'Sectors', description: 'Hero for Heavy Equipment' },
    { key: 'SECTOR_OIL_GAS_HERO', url: '/images/oil-gas-hero.png', section: 'Sectors', description: 'Hero for Oil & Gas' },
    { key: 'SECTOR_WATER_HERO', url: '/images/water-hero.png', section: 'Sectors', description: 'Hero for Water & Wastewater' },
    { key: 'SECTOR_FACILITIES_HERO', url: '/images/facilities-hero.png', section: 'Sectors', description: 'Hero for Facilities Management' },
    { key: 'SECTOR_HOSPITALITY_HERO', url: '/images/hospitality-hero.png', section: 'Sectors', description: 'Hero for Hospitality' },
    { key: 'SECTOR_OM_HERO', url: '/images/om-hero.png', section: 'Sectors', description: 'Hero for Operations & Maintenance' },

    // --- CAREERS ---
    { key: 'CAREERS_HERO_BG', url: '/images/careers-hero.png', section: 'Careers', description: 'Main hero background for Careers page' },
    { key: 'CAREERS_GLOBAL_MAP', url: '/images/careers-global.png', section: 'Careers', description: 'Global reach map image' },
    { key: 'CAREERS_OFFICE', url: '/images/careers-office.png', section: 'Careers', description: 'Office culture image' },
    { key: 'CAREERS_CULTURE', url: '/images/careers-culture.png', section: 'Careers', description: 'Team culture image' },
    { key: 'CAREERS_GROWTH', url: '/images/careers-growth.png', section: 'Careers', description: 'Professional growth image' },

    // --- ABOUT ---
    { key: 'ABOUT_HERO_BG', url: '/images/about-hero.png', section: 'About', description: 'Hero background for About page' },
    { key: 'ABOUT_MISION_IMG', url: '/images/mission.jpg', section: 'About', description: 'Mission section image' },
    { key: 'ABOUT_VISION_IMG', url: '/images/vision.jpg', section: 'About', description: 'Vision section image' },

    // --- CONTACT ---
    { key: 'CONTACT_HERO_BG', url: '/images/contact-hero.png', section: 'Contact', description: 'Hero background for Contact page' },

    // --- SERVICES ---
    { key: 'SERVICES_HERO_BG', url: '/images/services-hero-industrial.png', section: 'Services', description: 'Main hero background for Services page' },
    { key: 'SERVICE_PERMANENT_IMG', url: '/images/service-permanent-office.png', section: 'Services', description: 'Permanent Recruitment feature image' },
    { key: 'SERVICE_EXECUTIVE_IMG', url: '/images/service-executive-meeting.png', section: 'Services', description: 'Executive Search feature image' },
    { key: 'SERVICE_CONTRACT_IMG', url: '/images/service-contract-site.png', section: 'Services', description: 'Temporary & Contract Staffing feature image' },
    { key: 'SERVICE_PROCESS_BG', url: '/images/process-flow-background.png', section: 'Services', description: 'Background for Process Flow section' },

    // --- GLOBAL / CTA ---
    { key: 'CTA_SECTION_BG', url: '/images/cta-bg-default.png', section: 'Global', description: 'Background image for the global Call to Action section' },
    { key: 'WHY_CHOOSE_US_BG', url: '/images/competitive-advantage-bg.png', section: 'Global', description: 'Background image for the Competitive Advantage section' },
    { key: 'WHY_CHOOSE_US_SIDE_IMG', url: '/images/consultation-team.jpg', section: 'Global', description: 'Side image for the Competitive Advantage section' },
];

async function main() {
    console.log(`Start seeding ${ASSETS.length} assets...`);
    for (const asset of ASSETS) {
        const existing = await prisma.siteAsset.findUnique({
            where: { key: asset.key }
        });

        if (!existing) {
            await prisma.siteAsset.create({
                data: asset
            });
            console.log(`Created asset: ${asset.key}`);
        } else {
            console.log(`Skipped existing asset: ${asset.key}`);
        }
    }
    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
