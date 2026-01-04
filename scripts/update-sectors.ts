
const { PrismaClient } = require('@prisma/client');
const { SECTORS } = require('../lib/constants');

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding sectors...');
    for (const sector of SECTORS) {
        try {
            await prisma.sector.upsert({
                where: { slug: sector.slug },
                update: {
                    title: sector.title,
                    description: sector.description,
                    // Only update content if it's not the placeholder, otherwise keep existing if any or set placeholder
                    content: sector.content.includes("Phase 2") ? undefined : sector.content,
                    iconName: sector.iconName
                },
                create: {
                    title: sector.title,
                    slug: sector.slug,
                    description: sector.description,
                    content: sector.content,
                    iconName: sector.iconName
                },
            });
            console.log(`Upserted sector: ${sector.title}`);
        } catch (error) {
            console.error(`Error upserting ${sector.title}:`, error);
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
