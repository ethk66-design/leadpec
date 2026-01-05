import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verify() {
    console.log("Verifying Remote Data...");
    
    try {
        const sectorCount = await prisma.sector.count();
        const serviceCount = await prisma.service.count();
        
        console.log(`--- Verification Results ---`);
        console.log(`Sectors Found: ${sectorCount} (Expected: 11)`);
        console.log(`Services Found: ${serviceCount} (Expected: 3)`);
        
        if (sectorCount === 0 || serviceCount === 0) {
            console.error("❌ CRITICAL: Database is empty! Seeding required.");
            process.exit(1);
        } else {
            console.log("✅ SUCCESS: Data exists in the remote database.");
        }
    } catch (e) {
        console.error("❌ ERROR: Connection failed.", e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

verify();
