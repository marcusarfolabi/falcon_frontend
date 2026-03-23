"use client";

import { motion } from 'framer-motion';
import { Server } from 'lucide-react';
import AuthButton from '@/app/(auth)/components/AuthButton';

interface DomainStepProps {
    domain: string;
    error: string;
    isValidating: boolean;
    setFormData: (data: any) => void;
    setError: (error: string) => void;
    onValidate: () => Promise<void>;
}

export default function DomainStep({
    domain,
    error,
    isValidating,
    setFormData,
    setError,
    onValidate
}: DomainStepProps) {
    return (
        <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
        >
            <h2 className="text-3xl font-black text-slate-900 mb-2">
                Claim your domain.
            </h2>

            <p className="text-slate-500 mb-8">
                This will be your sovereign email identity.
            </p>

            <div className="space-y-4">
                <div className="relative">
                    <Server
                        className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${error ? 'text-red-400' : 'text-slate-400'
                            }`}
                    />
                    <input
                        type="text"
                        placeholder="yourcompany.com"
                        value={domain}
                        disabled={isValidating}
                        className={`input text-gray-500 ${error
                                ? 'border-red-100 bg-red-50 text-red-900'
                                : 'border-slate-100 focus:border-blue-600 bg-slate-50 focus:bg-white'
                            }`}
                        onChange={(e) => {
                            setError("");
                            setFormData((prev: any) => ({ ...prev, domain: e.target.value }));
                        }}
                    />
                </div>

                {error && (
                    <p className="text-red-500 text-xs font-bold pl-2 animate-in fade-in slide-in-from-left-1">
                        {error}
                    </p>
                )}

                <AuthButton
                    onClick={onValidate}
                    isLoading={isValidating}
                    variant="secondary"
                >
                    Claim domain
                </AuthButton>
            </div>
        </motion.div>
    );
}