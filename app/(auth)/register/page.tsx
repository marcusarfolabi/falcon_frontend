"use client";
import Link from 'next/link';
import { Mail, Lock, User, ArrowRight, Briefcase, Building2, Server, ArrowLeft } from 'lucide-react';
import { AuthLayout } from '../components/AuthLayout';
import { AuthInput } from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import { useState } from 'react';
import { authApi } from '@/lib/api/auth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { AuthSelect } from '../components/AuthSelect';

const INDUSTRIES = [
    "Technology & Software",
    "Financial Services",
    "Healthcare & Life Sciences",
    "Legal & Professional Services",
    "Education & E-learning",
    "Real Estate & Construction",
    "Retail & E-commerce",
    "Manufacturing & Logistics",
    "Government & Public Sector",
    "Non-Profit & NGOs",
    "Media & Entertainment",
    "Other"
];

export default function Register() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        org_name: '',
        org_industry: '',
        org_domain: '',
    });

    const nextStep = (e: React.FormEvent) => {
        e.preventDefault();
        // Basic validation for Step 1
        if (!formData.name || !formData.email || !formData.password) {
            return toast.error("Please fill in all personal details");
        }
        setStep(2);
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await authApi.register(formData);
            if (response.status === 201 || response.status === 200) {
                localStorage.setItem('pending_verification_email', formData.email);
                toast.success("Identity verified. Initializing node...");
                router.push('/verify-otp');
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.detail || "Registration failed";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title={step === 1 ? "Create Account" : "Initialize Instance"}
            subtitle={step === 1 ? "Step 1: Your Personal Identity" : "Step 2: Your Sovereign Mail Node"}
            showProgress={true}
            currentStep={step}
            totalSteps={2}
        >
            <form className="space-y-5" onSubmit={step === 1 ? nextStep : handleRegister}>
                {step === 1 ? (
                    /* STEP 1: PERSONAL DETAILS */
                    <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                        <AuthInput
                            label="Full Name"
                            icon={User}
                            type="text"
                            placeholder="Precious Treasure"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />

                        <AuthInput
                            label="Personal Email"
                            icon={Mail}
                            type="email"
                            placeholder="name@gmail.com"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />

                        <AuthInput
                            label="Master Password"
                            icon={Lock}
                            type="password"
                            placeholder="••••••••"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />

                        <AuthButton
                            type="submit"
                            icon={ArrowRight}
                            variant="secondary"
                        >
                            Continue to Infrastructure
                        </AuthButton>
                    </div>
                ) : (
                    /* STEP 2: ORGANIZATION DETAILS */
                    <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                        <AuthInput
                            label="Company Name"
                            icon={Building2}
                            value={formData.org_name}
                            onChange={(e) => setFormData({ ...formData, org_name: e.target.value })}
                            placeholder="Org Labs LLC"
                            required
                        />

                        <AuthSelect
                            label="Industry"
                            icon={Briefcase}
                            value={formData.org_industry}
                            options={INDUSTRIES}
                            onChange={(val) => setFormData({ ...formData, org_industry: val })}
                            placeholder="Select industry"
                            required
                        />

                        <AuthInput
                            label='Org Domain'
                            icon={Server}
                            type='text'
                            placeholder='e.g. yourdomain.com'
                            required
                            value={formData.org_domain}
                            onChange={(e) => setFormData({ ...formData, org_domain: e.target.value })}
                        />

                        <div className="flex flex-col gap-3">
                            <AuthButton
                                type="submit"
                                isLoading={loading}
                                icon={ArrowRight}
                                variant="secondary"
                            >
                                Deploy Sovereign Node
                            </AuthButton>

                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="flex items-center justify-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors py-2"
                            >
                                <ArrowLeft className="w-4 h-4" /> Go Back
                            </button>
                        </div>
                    </div>
                )}
            </form>

            <div className="mt-8 pt-8 border-t border-slate-50 text-center">
                <p className="text-sm text-slate-500 font-medium">
                    Already have an instance? <Link prefetch href="/login" className="text-blue-600 font-black hover:underline">Login</Link>
                </p>
            </div>
        </AuthLayout>
    );
}