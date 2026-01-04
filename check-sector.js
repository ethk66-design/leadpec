const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const sector = await prisma.sector.findUnique({
        where: { slug: 'automotive-rail-aviation' }
    });
    console.log(JSON.stringify(sector, null, 2));
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
