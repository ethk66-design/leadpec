'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { validateResetToken, resetPassword } from '@/lib/password-reset-actions';
import Link from 'next/link';
import { ArrowLeft, Lock, CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token') || '';

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [tokenValid, setTokenValid] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        async function checkToken() {
            if (!token) {
                setError('No reset token provided');
                setIsLoading(false);
                return;
            }

            const result = await validateResetToken(token);
            setIsLoading(false);

            if (result.valid) {
                setTokenValid(true);
                setUserEmail(result.email || '');
            } else {
                setError(result.error || 'Invalid token');
            }
        }

        checkToken();
    }, [token]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');

        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsSubmitting(true);
        const result = await resetPassword(token, password);
        setIsSubmitting(false);

        if (result.error) {
            setError(result.error);
        } else {
            setSuccess(true);
        }
    }

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B1B32] via-[#0d2341] to-[#1a3a5c]">
                <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl text-center">
                    <Loader2 className="w-12 h-12 text-[#008CBA] animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Validating reset link...</p>
                </div>
            </div>
        );
    }

    // Invalid token state
    if (!tokenValid && !success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B1B32] via-[#0d2341] to-[#1a3a5c]">
                <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <XCircle className="w-8 h-8 text-red-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-[#0B1B32] mb-4">Invalid Reset Link</h1>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <Link
                        href="/admin/forgot-password"
                        className="inline-block px-6 py-3 bg-[#008CBA] hover:bg-[#007aa3] text-white font-medium rounded-md transition-colors"
                    >
                        Request New Reset Link
                    </Link>
                    <div className="mt-4">
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

    // Success state
    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B1B32] via-[#0d2341] to-[#1a3a5c]">
                <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-[#0B1B32] mb-4">Password Reset Successful!</h1>
                    <p className="text-gray-600 mb-6">
                        Your password has been updated. You can now log in with your new password.
                    </p>
                    <Link
                        href="/admin/login"
                        className="inline-block px-6 py-3 bg-[#008CBA] hover:bg-[#007aa3] text-white font-medium rounded-md transition-colors"
                    >
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }

    // Reset form
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B1B32] via-[#0d2341] to-[#1a3a5c]">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-[#0B1B32] rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-[#0B1B32]">Reset Your Password</h1>
                    {userEmail && (
                        <p className="text-gray-600 mt-2">
                            For account: <strong>{userEmail}</strong>
                        </p>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            New Password
                        </label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                            required
                            minLength={8}
                            className="w-full"
                        />
                        <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm Password
                        </label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            required
                            className="w-full"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-[#008CBA] hover:bg-[#007aa3]"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Resetting...' : 'Reset Password'}
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
