"use client";

import StripeCheckoutForm from '@/app/(dashboard)/components/StripeCheckoutForm';
import StripeElementsProvider from '@/app/(dashboard)/components/StripeElementsProvider';
import { motion } from 'framer-motion'; 
import { ChevronLeft } from 'lucide-react';

interface PaymentStepProps {
    clientSecret: string;
    domain: string;
    prevStep: () => void;

}

export default function PaymentStep({
    clientSecret,
    domain,
    prevStep
}: PaymentStepProps) {
    return (
        <StripeElementsProvider clientSecret={clientSecret} prevStep>
            <motion.div
                key="step5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
            >
                <button
                    onClick={prevStep}
                    className="flex cursor-pointer items-center text-xs font-bold text-slate-400 mb-4 hover:text-blue-600 transition-colors"
                >
                    <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <h2 className="text-3xl font-black text-slate-900 mb-2">
                    Secure Payment.
                </h2>

                <p className="text-slate-500 mb-8">
                    Setup your subscription to activate your <strong>{domain}</strong> node.
                </p>

                <div className="bg-slate-50 p-1 rounded-2xl border border-slate-100">
                    <StripeCheckoutForm />
                </div>

                <p className="text-[10px] text-center text-slate-400 mt-6 uppercase tracking-widest font-bold">
                    Protected by Stripe 256-bit Encryption
                </p>
            </motion.div>
        </StripeElementsProvider>
    );
}