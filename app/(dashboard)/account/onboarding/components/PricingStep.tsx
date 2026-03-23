"use client";

import { motion } from 'framer-motion';
import { ChevronLeft, Loader2, CheckCircle2 } from 'lucide-react';
import AuthButton from '@/app/(auth)/components/AuthButton';
import { Plan } from '@/types/plans';

interface PricingStepProps {
    plans: Plan[];
    selectedPlanId: string;
    billingCycle: 'monthly' | 'annual';
    isLoading: boolean;
    setBillingCycle: (cycle: 'monthly' | 'annual') => void;
    setFormData: (data: any) => void;
    nextStep: () => void;
    prevStep: () => void;
}

export default function PricingStep({
    plans,
    selectedPlanId,
    billingCycle,
    isLoading,
    setBillingCycle,
    setFormData,
    nextStep,
    prevStep
}: PricingStepProps) {

    // Helper to get currency symbol
    const getCurrencySymbol = (code: string) => code === 'GBP' ? '£' : '$';

    return (
        <motion.div
            key="step3"
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

            <h2 className="text-3xl font-black text-slate-900 mb-2">
                Select a plan
            </h2>

            {/* BILLING TOGGLE */}
            <div className="flex gap-2 mt-6 mb-8">
                {(['monthly', 'annual'] as const).map((cycle) => (
                    <button
                        key={cycle}
                        onClick={() => setBillingCycle(cycle)}
                        className={`cursor-pointer flex-1 py-2 rounded-xl font-bold text-sm transition-all duration-200 ${billingCycle === cycle
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                    >
                        {cycle === 'monthly' ? 'Monthly' : 'Annual (Save 20%)'}
                    </button>
                ))}
            </div>

            {/* PLANS GRID */}
            <div className="grid grid-cols-1 gap-4">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-12 space-y-4">
                        <Loader2 className="animate-spin text-blue-600 w-8 h-8" />
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Syncing with Falcon Infrastructure...</p>
                    </div>
                ) : (
                    // Sort plans by price so Solo Pro usually appears first
                    [...plans].sort((a, b) => a.monthly_amount - b.monthly_amount).map((plan) => {
                        // Logic for new API structure
                        const priceId = billingCycle === 'monthly' ? plan.monthly_price_id : plan.annual_price_id;
                        const amount = billingCycle === 'monthly' ? plan.monthly_amount : plan.annual_amount;
                        const isSelected = selectedPlanId === priceId;

                        return (
                            <div
                                key={plan.id}
                                onClick={() =>
                                    setFormData((prev: any) => ({
                                        ...prev,
                                        plan_id: priceId, // Store the specific Stripe Price ID
                                    }))
                                }
                                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all relative group ${isSelected
                                        ? 'border-blue-600 bg-blue-50'
                                        : 'border-slate-100 hover:border-slate-300 bg-white'
                                    }`}
                            >
                                {plan.is_highlighted && (
                                    <span className="absolute -top-3 right-4 bg-blue-600 text-white text-[10px] px-3 py-1 rounded-full font-bold shadow-sm">
                                        Popular Choice
                                    </span>
                                )}

                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-black text-slate-900 text-lg leading-tight">
                                            {plan.name}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1 max-w-[200px]">
                                            {plan.description}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-black text-slate-900">
                                            {getCurrencySymbol(plan.currency)}{amount}
                                        </p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">
                                            per {billingCycle === 'monthly' ? 'month' : 'year'}
                                        </p>
                                    </div>
                                </div>

                                <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                                    {plan.features.map((feature) => (
                                        <li
                                            key={feature}
                                            className="text-xs text-slate-600 flex items-center gap-2"
                                        >
                                            <CheckCircle2 className={`w-3 h-3 flex-shrink-0 ${isSelected ? 'text-blue-500' : 'text-emerald-500'}`} />
                                            {feature}
                                        </li>
                                    ))}
                                    {/* Additional technical specs from the response */}
                                    <li className="text-[10px] font-bold text-blue-600/60 uppercase tracking-tighter pt-1">
                                        {plan.max_storage}GB Secure Storage • {plan.max_seats} Seat{plan.max_seats > 1 ? 's' : ''}
                                    </li>
                                </ul>
                            </div>
                        );
                    })
                )}
            </div>

            <AuthButton
                className="mt-8"
                onClick={nextStep}
                disabled={!selectedPlanId || isLoading}
                variant="secondary"
            >
                Continue to Admin Setup
            </AuthButton>
        </motion.div>
    );
}