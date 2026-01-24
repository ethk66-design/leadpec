import LoginForm from '@/components/admin/login-form';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
    return (
        <main className="flex items-center justify-center md:h-screen bg-[#051120]">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <div className="flex w-full items-center justify-center rounded-lg bg-[#0B1B32] p-3 mb-4 border border-white/10">
                    <div className="relative w-32 h-10">
                        <Image
                            src="/logo.png"
                            alt="LEADPEC Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
                <div className="bg-[#0B1B32] px-6 py-8 rounded-xl border border-white/5 shadow-2xl">
                    <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Access</h1>
                    <LoginForm />
                    <div className="mt-4 text-center">
                        <Link
                            href="/admin/forgot-password"
                            className="text-sm text-[#008CBA] hover:text-[#00b4e6] transition-colors"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
    );
}
