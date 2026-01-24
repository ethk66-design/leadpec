'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { requestPasswordReset } from '@/lib/password-reset-actions';
import Link from 'next/link';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        await requestPasswordReset(email);
        setIsLoading(false);
        setSubmitted(true);
    }

    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B1B32] via-[#0d2341] to-[#1a3a5c]">
                <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-[#0B1B32] mb-4">Check Your Email</h1>
                    <p className="text-gray-600 mb-6">
                        If an account exists with <strong>{email}</strong>, you will receive a password reset link shortly.
                    </p>
                    <p className="text-sm text-gray-500 mb-8">
                        The link will expire in 1 hour. Please check your spam folder if you don't see the email.
                    </p>
                    <Link
                        href="/admin/login"
                        className="inline-flex items-center gap-2 text-[#008CBA] hover:text-[#006d91] font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B1B32] via-[#0d2341] to-[#1a3a5c]">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-[#0B1B32] rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-[#0B1B32]">Forgot Password?</h1>
                    <p className="text-gray-600 mt-2">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@leadpec.com"
                            required
                            className="w-full"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-[#008CBA] hover:bg-[#007aa3]"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Sending...' : 'Send Reset Link'}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <Link
                        href="/admin/login"
                        className="inline-flex items-center gap-2 text-[#008CBA] hover:text-[#006d91] text-sm font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
