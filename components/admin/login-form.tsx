'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

export default function LoginForm() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    return (
        <form action={dispatch} className="space-y-4">
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-200" htmlFor="email">
                    Email
                </label>
                <Input
                    className="bg-gray-800 border-gray-700 text-white"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="admin@leadpec.com"
                    required
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-200" htmlFor="password">
                    Password
                </label>
                <Input
                    className="bg-gray-800 border-gray-700 text-white"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="••••••"
                    required
                    minLength={6}
                />
            </div>
            <div className="flex items-end space-x-1" aria-live="polite" aria-atomic="true">
                {errorMessage && (
                    <p className="text-sm text-red-500">{errorMessage}</p>
                )}
            </div>
            <LoginButton />
        </form>
    );
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <Button className="w-full bg-[#008CBA] hover:bg-[#007ba3]" aria-disabled={pending} disabled={pending}>
            {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Log in
        </Button>
    );
}
