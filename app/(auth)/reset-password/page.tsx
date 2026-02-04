"use client";
import { Lock, CheckCircle } from 'lucide-react';
import { AuthLayout } from '../components/AuthLayout';
import { AuthInput } from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authApi } from '@/lib/api/auth';

export default function ResetPassword() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // 1. Get the email on mount and then clear storage
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const urlEmail = urlParams.get('email');

        // 2. Check Storage second
        const storedEmail = localStorage.getItem('pending_verification_email');

        const finalEmail = urlEmail || storedEmail;

        if (!finalEmail) {
            toast.error("Session expired. Please request a new OTP.");
            router.push('/forgot-password');
            return;
        }

        setEmail(finalEmail);

        // 3. Clean up storage so it's not sitting there forever
        localStorage.removeItem('pending_verification_email');
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 2. Validation
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        if (password.length < 12) {
            toast.error("Password must be at least 12 characters.");
            return;
        }

        try {
            setIsLoading(true);

            // 3. Call Backend
            await authApi.resetPassword({
                email: email,
                password: password,
            });
            router.push('/login');
        } catch (error: any) {
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Set New Password"
            subtitle={`Setting password for ${email}`}
        >
            <form className="space-y-5" onSubmit={handleSubmit}>
                <AuthInput
                    label="New Password"
                    icon={Lock}
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <AuthInput
                    label="Confirm Password"
                    icon={Lock}
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <AuthButton
                    type="submit"
                    isLoading={isLoading}
                    icon={CheckCircle}
                    variant="secondary"
                >
                    Update Password
                </AuthButton>
            </form>
        </AuthLayout>
    );
}