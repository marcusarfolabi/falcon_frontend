"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Check, Copy, ChevronLeft } from 'lucide-react';
import AuthButton from '@/app/(auth)/components/AuthButton';

interface DNSVerifyStepProps {
    domain: string;
    verificationToken: string | undefined;
    isAutoChecking: boolean;
    isValidating: boolean;
    onVerify: (isManual?: boolean) => Promise<void>;
    prevStep: () => void;

}

export default function DNSVerifyStep({
    domain,
    verificationToken,
    isAutoChecking,
    isValidating,
    onVerify,
    prevStep,

}: DNSVerifyStepProps) {

    // Internal Copy Component for Step 2
    const CopyField = ({ label, value }: { label: string, value: string }) => {
        const [copied, setCopied] = useState(false);

        const handleCopy = async () => {
            if (!value) return;
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        };

        return (
            <div className="group relative">
                <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-2">
                    {label}
                </p>
                <div
                    onClick={handleCopy}
                    className="relative flex items-center justify-between bg-slate-800 p-3 rounded-lg border border-slate-700 cursor-pointer hover:border-slate-500 transition-colors group"
                >
                    <code className="text-emerald-400 font-mono break-all text-sm pr-8">
                        {value || "Loading..."}
                    </code>
                    <div className="absolute right-3 p-1 rounded-md bg-slate-700 group-hover:bg-slate-600 transition-colors">
                        {copied ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                            <Copy className="w-3.5 h-3.5 text-slate-400" />
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
        >
            <button
                onClick={prevStep}
                className="flex cursor-pointer items-center text-xs font-bold text-slate-400 mb-4 hover:text-blue-600 transition-colors"
            >
                <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <h2 className="text-3xl font-black text-slate-900 mb-2">
                Verify Ownership.
            </h2>
            <p className="text-slate-500 mb-6 font-medium text-sm">
                Add this TXT record to <strong>{domain}</strong> to prove you own it.
            </p>

            <div className="bg-slate-900 p-6 rounded-2xl mb-6 border border-slate-700 space-y-6">
                <CopyField
                    label="Type & Host"
                    value="@"
                />

                <CopyField
                    label="Value"
                    value={verificationToken ? `falcon-verify=${verificationToken}` : ""}
                />

                <div className="flex items-start gap-2 px-1">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    <p className="text-[10px] text-slate-400 leading-relaxed italic">
                        Click any field above to copy. Most DNS providers (Cloudflare, Namecheap) use "@" for the root domain.
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                <AuthButton
                    onClick={() => onVerify(true)}
                    isLoading={isValidating}
                    variant="secondary"
                >
                    {isAutoChecking ? "Checking in background..." : "Verify Record"}
                </AuthButton>

                {isAutoChecking && (
                    <div className="flex items-center justify-center gap-2 text-blue-500 animate-pulse">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">
                            Auto-checking DNS every 60s
                        </span>
                    </div>
                )}
            </div>
        </motion.div>
    );
}