"use client";

import { motion } from 'framer-motion';
import { Mail, ShieldCheck, ChevronLeft, RefreshCw, Check, Copy } from 'lucide-react';
import { AuthInput } from '@/app/(auth)/components/AuthInput';
import AuthButton from '@/app/(auth)/components/AuthButton';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface AdminStepProps {
    formData: any;
    isProvisioning: boolean;
    setFormData: (data: any) => void;
    prevStep: () => void;
    onInitializePayment: () => Promise<void>;
}

export default function AdminStep({
    formData,
    isProvisioning,
    setFormData,
    prevStep,
    onInitializePayment
}: AdminStepProps) {
    // --- Generate Password Function ---
    const generatePassword = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
        let result = "";
        for (let i = 0; i < 16; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setFormData({ ...formData, password: result });
    };
    // Add state for feedback (optional but recommended)
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        if (!formData.password) return;

        try {
            await navigator.clipboard.writeText(formData.password);
            setCopied(true);
            toast.success("Password copied to clipboard");

            // Reset the "copied" state after 2 seconds
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            toast.error("Failed to copy password");
        }
    };
    return (
        <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
        >
            <button
                onClick={prevStep}
                className="flex items-center text-xs font-bold text-slate-400 mb-4 hover:text-blue-600 transition-colors"
            >
                <ChevronLeft className="w-4 h-4" /> Back
            </button>

            <h2 className="text-3xl font-black text-slate-900 mb-6">
                Primary Admin
            </h2>

            <div className="space-y-4">
                {/* USERNAME / NAME */}
                <AuthInput
                    label="Display Name"
                    icon={Mail}
                    type="text"
                    placeholder="Precious Treasure"
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                    }
                />

                {/* EMAIL LOCAL PART */}
                <AuthInput
                    label="Email"
                    icon={Mail}
                    type="text"
                    placeholder="precious.treasure"
                    value={formData.email}
                    onKeyDown={(e) => {
                        if (e.key === "@") e.preventDefault();
                    }}
                    onChange={(e) => {
                        const value = e.target.value
                            .toLowerCase()
                            .split("@")[0]
                            .replace(/\s+/g, "");

                        setFormData({
                            ...formData,
                            email: value,
                        });
                    }}
                    rightAddon={`@${formData.domain}`}
                />

                <p className="text-[11px] text-slate-400 ml-2 mt-1 italic">
                    Email name only — domain is added automatically
                </p>

                <AuthInput
                    label="Alternative Email"
                    icon={Mail}
                    type="email"
                    placeholder="alternative@gmail.com"
                    value={formData.alternative_email}
                    onChange={(e) =>
                        setFormData({ ...formData, alternative_email: e.target.value })
                    }
                />
 
                {/* PASSWORD WITH GENERATE BUTTON */}
                {/* PASSWORD WITH GENERATE & COPY BUTTONS */}
                <div className="relative">
                    <div className="flex justify-between items-end mb-1 px-1">
                        <label className="text-sm font-bold text-slate-700">Password</label>

                        <div className="flex items-center gap-3">
                            {/* Copy Button */}
                            {formData.password && (
                                <button
                                    type="button"
                                    onClick={copyToClipboard}
                                    className="text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-3 h-3 text-green-500" />
                                            <span className="text-green-500">Copied</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-3 h-3" />
                                            Copy
                                        </>
                                    )}
                                </button>
                            )}

                            {/* Generate Button */}
                            <button
                                type="button"
                                onClick={generatePassword}
                                className="text-[10px] font-bold uppercase tracking-wider text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
                            >
                                <RefreshCw className="w-3 h-3" />
                                Generate Strong Password
                            </button>
                        </div>
                    </div>

                    <AuthInput
                        icon={ShieldCheck}
                        type="text" // Keeps password visible so they can see what they generated/copied
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        label={''}
                    />
                </div>

                <AuthButton
                    onClick={onInitializePayment}
                    isLoading={isProvisioning}
                    variant="secondary"
                    disabled={
                        !formData.name ||
                        !formData.email ||
                        !formData.password ||
                        isProvisioning
                    }
                >
                    Go to Secure Payment
                </AuthButton>

                <p className="text-[11px] text-center text-slate-400 mt-4 leading-relaxed">
                    You will be able to create additional user accounts after deployment.
                </p>
            </div>
        </motion.div>
    );
}