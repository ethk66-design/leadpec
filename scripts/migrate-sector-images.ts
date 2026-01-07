
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SLUG_TO_ASSET_KEY: Record<string, string> = {
    'engineering-construction': 'SECTOR_CONSTRUCTION_HERO',
    'healthcare-pharmaceutical': 'SECTOR_HEALTHCARE_HERO',
    'infrastructure-utilities': 'SECTOR_INFRASTRUCTURE_HERO',
    'power-renewable-energy': 'SECTOR_ENERGY_HERO',
    'fabrication-technical-services': 'SECTOR_FABRICATION_HERO',
    'heavy-construction-equipment': 'SECTOR_HEAVY_EQUIPMENT_HERO',
    'oil-gas-petrochemical': 'SECTOR_OIL_GAS_HERO',
    'water-wastewater': 'SECTOR_WATER_HERO',
    'facilities-management': 'SECTOR_FACILITIES_HERO',
    'hospitality-catering': 'SECTOR_HOSPITALITY_HERO',
    'operation-maintenance': 'SECTOR_OM_HERO',
};

async function main() {
    console.log("🚀 Starting Sector Image Migration...");

    const sectors = await prisma.sector.findMany();
    console.log(`Found ${sectors.length} sectors to process.`);

    let migratedCount = 0;

    for (const sector of sectors) {
        console.log(`Processing: ${sector.title} (${sector.slug})`);

        // 1. Migrate Hero Image
        if (sector.heroImage) {
            // Use the key mapping we already defined, or generate a standard one
            const heroKey = SLUG_TO_ASSET_KEY[sector.slug] || `SECTOR_${sector.slug.toUpperCase().replace(/-/g, '_')}_HERO`;

            await prisma.siteAsset.upsert({
                where: { key: heroKey },
                update: {
                    url: sector.heroImage,
                    section: "Sector: " + sector.title
                },
                create: {
                    key: heroKey,
                    url: sector.heroImage,
                    section: "Sector: " + sector.title,
                    description: "Main Hero Image / Grid Card Thumbnail"
                }
            });
            console.log(`   ✅ Migrated Hero Image -> ${heroKey}`);
            migratedCount++;
        }

        // 2. Migrate Middle Image
        if (sector.middleImage) {
            const middleKey = `SECTOR_${sector.slug.toUpperCase().replace(/-/g, '_')}_MIDDLE`;

            await prisma.siteAsset.upsert({
                where: { key: middleKey },
                update: {
                    url: sector.middleImage,
                    section: "Sector: " + sector.title
                },
                create: {
                    key: middleKey,
                    url: sector.middleImage,
                    section: "Sector: " + sector.title,
                    description: "Middle/Feature Section Background"
                }
            });
            console.log(`   ✅ Migrated Middle Image -> ${middleKey}`);
            migratedCount++;
        }

        // 3. Migrate Bottom Image
        if (sector.bottomImage) {
            const bottomKey = `SECTOR_${sector.slug.toUpperCase().replace(/-/g, '_')}_BOTTOM`;

            await prisma.siteAsset.upsert({
                where: { key: bottomKey },
                update: {
                    url: sector.bottomImage,
                    section: "Sector: " + sector.title
                },
                create: {
                    key: bottomKey,
                    url: sector.bottomImage,
                    section: "Sector: " + sector.title,
                    description: "Bottom CTA Section Background"
                }
            });
            console.log(`   ✅ Migrated Bottom Image -> ${bottomKey}`);
            migratedCount++;
        }
    }

    console.log(`\n🎉 Migration Complete! processed ${migratedCount} assets.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
