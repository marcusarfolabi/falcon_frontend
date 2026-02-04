"use client";
import Link from 'next/link';
import { Mail, Lock, LogIn } from 'lucide-react';
import { AuthInput } from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '../components/AuthLayout';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { login } = useAuth(); 
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try { 
            await login(formData); 
        } catch (error: any) { 
            console.error("Login component error:", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Access your secure mail infrastructure."
        >
            <form className="space-y-5" onSubmit={handleLogin}>
                <AuthInput
                    label="Corporate Email"
                    icon={Mail}
                    type="email"
                    placeholder="name@company.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />

                <AuthInput
                    label="Password"
                    icon={Lock}
                    type="password"
                    placeholder="••••••••"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />

                <div className="flex justify-end">
                    <Link href="/forgot-password" className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors">
                        Forgot Password?
                    </Link>
                </div>

                <AuthButton
                    type="submit"
                    isLoading={loading}
                    icon={LogIn}
                    variant="secondary"
                >
                    Sign In
                </AuthButton>
            </form>

            <div className="mt-8 pt-8 border-t border-slate-50 text-center">
                <p className="text-sm text-slate-500 font-medium">
                    New to the platform? <Link href="/register" className="text-blue-600 font-black hover:underline">Initialize Account</Link>
                </p>
            </div>
        </AuthLayout>
    );
}