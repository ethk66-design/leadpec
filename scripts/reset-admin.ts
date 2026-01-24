import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function resetAdmin() {
    const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD;

    if (!adminPassword) {
        console.error('❌ ADMIN_DEFAULT_PASSWORD environment variable is required');
        console.error('   Set it in your .env file before running this script');
        process.exit(1);
    }

    console.log('🔑 Resetting admin password...');

    const newPassword = await hash(adminPassword, 12);

    const admin = await prisma.user.upsert({
        where: { email: 'admin@leadpec.com' },
        update: {
            password: newPassword
        },
        create: {
            email: 'admin@leadpec.com',
            name: 'Super Admin',
            password: newPassword,
        },
    });

    console.log(`✅ Admin password reset for: ${admin.email}`);
    console.log('📧 Email: admin@leadpec.com');
    console.log('🔐 Password: (set via ADMIN_DEFAULT_PASSWORD env var)');
}

resetAdmin()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
