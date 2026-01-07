
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import { SECTORS } from '../lib/constants';
import { getContentRegistry } from '../lib/content-registry';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting seeding process...');

    // 1. Seed Sectors
    console.log('🏗️  Seeding Sectors...');
    const seededSectors = [];

    for (const sectorData of SECTORS) {
        const sector = await prisma.sector.upsert({
            where: { slug: sectorData.slug },
            update: {
                title: sectorData.title,
                description: sectorData.description,
                content: sectorData.content,
                // block_content: null, // REMOVED: Not in Schema
                iconName: sectorData.iconName,
                heroImage: `/images/sectors/${sectorData.slug}.jpg`, // Legacy fallback
            },
            create: {
                title: sectorData.title,
                slug: sectorData.slug,
                description: sectorData.description,
                content: sectorData.content,
                iconName: sectorData.iconName,
                heroImage: `/images/sectors/${sectorData.slug}.jpg`,
            },
        });
        console.log(`   - Processed Sector: ${sector.title}`);
        seededSectors.push(sector);
    }

    // 2. Seed Content Registry Assets (Dynamic Images)
    console.log('🖼️  Seeding SiteAssets from Registry...');

    // We pass the seeded sectors to generate the full registry of expect assets
    const registry = getContentRegistry(seededSectors);

    for (const section of registry) {
        console.log(`   📂 Processing Section: ${section.title}`);
        for (const assetDef of section.assets) {
            // Only seed if it has a defaultSrc (or we can initialize empty ones too, but let's prioritize defaults)
            const initialUrl = assetDef.defaultSrc || "";

            // Upsert SiteAsset
            // We don't want to overwrite user-uploaded images if they exist, 
            // but for "fresh install" (seed), we typically want to set defaults.
            // However, upsert is safe: if it exists, we might want to LEAVE the url alone if it's already set?
            // Actually, standard seed behavior is usually "reset to state", but for a production app 
            // where we run this to 'patch' new assets, we should only create if missing.
            // BUT, checking the requirement: "Database Autonomy... populate... defaults".
            // I will use upsert but only update metadata, NOT the URL if it already exists, to be safe.
            // Wait, if it's a fresh install, it won't exist.

            // Improved Strategy:
            // If it exists, update metadata (label/desc) but keep URL.
            // If it creates, use defaultSrc.

            await prisma.siteAsset.upsert({
                where: { key: assetDef.key },
                update: {
                    // Start fresh if needed, or just ensure description is synced?
                    // Actually, if we update, we might overwrite user custom description if they changed it in DB (unlikely UI allows it).
                    // But we MUST remove 'label' and 'type' as they don't exist in schema.
                    description: assetDef.description,
                },
                create: {
                    key: assetDef.key,
                    // label: assetDef.label, // REMOVED: Not in Schema
                    description: assetDef.description,
                    url: initialUrl,
                    section: section.id,
                    // type: "IMAGE" // REMOVED: Not in Schema
                }
            });
        }
    }
    console.log('   ✅ Assets synced.');


    // 3. Seed Default Admin User
    console.log('👤 Seeding Default Admin...');
    const password = await hash('SecurePass123!', 12);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@leedpec.com' },
        update: {}, // Don't reset password if exists
        create: {
            email: 'admin@leedpec.com',
            name: 'Super Admin',
            password,
            // role: 'ADMIN', // REMOVED: Not in Schema
        },
    });
    console.log(`   - Admin ready: ${admin.email}`);

    console.log('✨ Seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
