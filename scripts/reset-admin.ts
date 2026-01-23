import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function resetAdmin() {
    console.log('🔑 Resetting admin password...');

    const newPassword = await hash('SecurePass123!', 12);

    const admin = await prisma.user.upsert({
        where: { email: 'admin@leedpec.com' },
        update: {
            password: newPassword  // Force update password
        },
        create: {
            email: 'admin@leedpec.com',
            name: 'Super Admin',
            password: newPassword,
        },
    });

    console.log(`✅ Admin password reset for: ${admin.email}`);
    console.log('📧 Email: admin@leedpec.com');
    console.log('🔐 Password: SecurePass123!');
}

resetAdmin()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
