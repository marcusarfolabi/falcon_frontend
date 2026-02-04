"use client";

import { motion } from 'framer-motion';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import AuthButton from '@/app/(auth)/components/AuthButton';

interface DeployStepProps {
    domain: string;
}

export default function DeployStep({ domain }: DeployStepProps) {
    const router = useRouter();

    return (
        <motion.div
            key="step6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
        >
            {/* Animated Icon Container */}
            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Loader2 className="w-10 h-10 animate-spin" />
            </div>

            <h2 className="text-3xl font-black text-slate-900 mb-2">
                Deploying Node...
            </h2>

            <p className="text-slate-500 mb-8">
                We are provisioning your Stalwart cluster for <strong>{domain}</strong>.
                This usually takes 3-5 minutes.
            </p>

            {/* Status Checklist */}
            <div className="p-6 bg-slate-50 rounded-3xl border text-left space-y-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Deployment Progress
                </p>

                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-slate-700">1. Payment Verified</p>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-slate-700">2. DNS Config Generation</p>
                        <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
                    </div>

                    <div className="flex items-center justify-between opacity-50">
                        <p className="text-sm font-bold text-slate-700">3. Stalwart Principal Creation</p>
                        <span className="text-[10px] font-bold text-slate-400">PENDING</span>
                    </div>
                </div>
            </div>

            <AuthButton
                className="mt-8"
                onClick={() => router.push('/account')}
            >
                Go to Dashboard
            </AuthButton>

            <p className="mt-4 text-[11px] text-slate-400 italic">
                You can safely close this window. We'll email you once the setup is complete.
            </p>
        </motion.div>
    );
}