import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ASSETS = [
    {
        key: 'CTA_SECTION_BG',
        url: '/images/vision-background.png',
        description: 'Background for the main Call to Action section.',
        section: 'Home'
    },
    {
        key: 'WHY_CHOOSE_US_BG',
        url: '/images/sectors-hero-skyline.png',
        description: 'Background for the Advantages/Why Choose Us section.',
        section: 'Home'
    },
    {
        key: 'WHY_CHOOSE_US_SIDE_IMG',
        url: '/images/consultation-team.jpg',
        description: 'Side image for the Why Choose Us section.',
        section: 'Home'
    }
];

async function main() {
    console.log("Seeding Site Assets...");

    for (const asset of ASSETS) {
        await prisma.siteAsset.upsert({
            where: { key: asset.key },
            update: {
                url: asset.url,
                description: asset.description,
                section: asset.section
            },
            create: {
                key: asset.key,
                url: asset.url,
                description: asset.description,
                section: asset.section
            }
        });
        console.log(`Upserted Asset: ${asset.key}`);
    }

    console.log("Asset Seeding Completed.");
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
