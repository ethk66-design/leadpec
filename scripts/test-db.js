
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Testing sector fetch...');
    try {
        const sectors = await prisma.sector.findMany({
            orderBy: { title: 'asc' }
        });
        console.log(`Successfully fetched ${sectors.length} sectors.`);
        sectors.forEach(s => console.log(`- ${s.title} (${s.iconName})`));
    } catch (err) {
        console.error('Error fetching sectors:', err);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
