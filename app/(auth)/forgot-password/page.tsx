// app/forgot-password/page.tsx
"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Mail, Send, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AuthInput } from '../components/AuthInput';
import { AuthLayout } from '../components/AuthLayout';
import AuthButton from '../components/AuthButton';
import { authApi } from '@/lib/api/auth';
import toast from 'react-hot-toast';

export default function ForgotPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try { 
            await authApi.requestOtp(email); 
            localStorage.setItem('pending_verification_email', email); 
            router.push(`/verify-otp?type=password_reset`);
        } catch (error) { 
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Recover Access"
            subtitle="Enter your email to receive a secure verification code."
        >
            <form className="space-y-6" onSubmit={handleSubmit}>
                <AuthInput
                    label="Recovery Email"
                    icon={Mail}
                    type="email"
                    placeholder="name@company.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <AuthButton
                    type="submit"
                    isLoading={isLoading}
                    icon={Send}
                    variant="secondary"
                >
                    Send Reset Code
                </AuthButton>
            </form>

            <div className="mt-8 pt-8 border-t border-slate-50 text-center">
                <Link href="/login" className="inline-flex items-center gap-2 text-sm text-slate-500 font-bold hover:text-blue-600 transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                    Back to Login
                </Link>
            </div>
        </AuthLayout>
    );
}