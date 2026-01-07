'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { rateLimit } from '@/lib/rate-limit';
import { headers } from 'next/headers';

export async function handleSignOut() {
    await signOut({ redirectTo: '/admin/login' });
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    const ip = headers().get("x-forwarded-for") || "unknown";

    // Rate limit: 5 attempts per minute
    if (rateLimit(ip, 5, 60000)) {
        return "Too many login attempts. Please try again later.";
    }

    try {
        await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirectTo: '/admin/dashboard',
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}
