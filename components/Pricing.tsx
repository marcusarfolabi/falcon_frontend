"use client";

import { useEffect, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Zap, Shield, Crown, Info, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { createCheckoutSession, listPlans } from '@/lib/api/pricing';
import { useAuth } from '@/context/AuthContext';
import { Plan } from '@/types/plans';

// --- Constants ---
const PLAN_CONFIG = {
    "Solo Pro": { icon: Zap, button: "Start Solo Pro" },
    "Business Sovereign": { icon: Shield, button: "Get Started" },
    Enterprise: { icon: Crown, button: "Contact Sales" },
} as const;
 
const PricingCard = ({
    plan,
    billingCycle,
    onPurchase,
    isRedirecting
}: {
    plan: Plan;
    billingCycle: 'monthly' | 'annually';
    onPurchase: (priceId: string, planName: string) => void;
    isRedirecting: boolean;
}) => {
    const config = PLAN_CONFIG[plan.name as keyof typeof PLAN_CONFIG] || PLAN_CONFIG["Solo Pro"];
    const isCustom = plan.name === "Enterprise";

    const currentPriceObj = billingCycle === 'monthly' ? plan.prices?.monthly : plan.prices?.annual;
    const monthlySavings = (plan.prices?.monthly?.amount || 0) - (plan.prices?.annual?.amount || 0);

    return (
        <motion.div
            layout
            className={`relative flex flex-col p-8 rounded-[3rem] transition-all duration-500 ${plan.highlight ? 'bg-slate-900 text-white shadow-xl scale-105 z-10' : 'bg-slate-50 text-slate-900 border border-slate-100'
                }`}
        >
            <div className="mb-8">
                <config.icon className={`w-10 h-10 mb-6 ${plan.highlight ? 'text-blue-400' : 'text-blue-600'}`} />
                <h4 className="text-2xl font-bold mb-2">{plan.name}</h4>
                <p className={`text-sm ${plan.highlight ? 'text-slate-400' : 'text-slate-500'}`}>{plan.description}</p>
            </div>

            <div className="mb-8 h-20 flex flex-col justify-center">
                <div className="flex items-baseline gap-2">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={`${plan.id}-${billingCycle}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl font-black"
                        >
                            {isCustom ? "Custom" : `$${currentPriceObj?.amount}`}
                        </motion.span>
                    </AnimatePresence>
                    {!isCustom && <span className="text-sm font-bold opacity-50">/mo</span>}
                </div>
                {billingCycle === 'annually' && monthlySavings > 0 && (
                    <div className="text-xs font-bold mt-2 text-emerald-500">Save ${monthlySavings}/mo</div>
                )}
            </div>

            <div className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                        <Check className="w-4 h-4 mt-0.5 text-blue-500" />
                        <span className="text-sm opacity-90">{feature}</span>
                    </div>
                ))}
            </div>

            <button
                disabled={isRedirecting}
                onClick={() => onPurchase(currentPriceObj?.id || '', plan.name)}
                className={`cursor-pointer w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${plan.highlight ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white text-slate-900 border border-gray-200 hover:bg-slate-50'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
                {isRedirecting && <Loader2 className="w-4 h-4 animate-spin" />}
                {isRedirecting ? "Processing..." : config.button}
            </button>
        </motion.div>
    );
};

// --- Main Component ---

export default function Pricing() {
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');
    const [apiPlans, setApiPlans] = useState<Plan[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeLoadingId, setActiveLoadingId] = useState<string | null>(null);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await listPlans();
                setApiPlans(response.data.plans);
            } catch (error) {
                console.error("[Pricing_Fetch_Error]:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPlans();
    }, []);

    // Memoized calculation for the savings badge
    const yearlySavingsLabel = useMemo(() => {
        const discounted = apiPlans.find(p => (p.prices?.monthly?.amount || 0) > (p.prices?.annual?.amount || 0));
        if (!discounted) return 36;
        return (discounted.prices.monthly.amount - discounted.prices.annual.amount) * 12;
    }, [apiPlans]);

    const handlePurchase = useCallback(async (priceId: string, planName: string) => {
        if (planName === "Enterprise") {
            router.push("/contact-sales");
            return;
        }

        if (!isAuthenticated) {
            router.push(`/login?redirect=/pricing`);
            return;
        }

        try {
            setActiveLoadingId(priceId);
            const { data } = await createCheckoutSession(priceId);
            if (data.url) window.location.href = data.url;
        } catch (error) {
            console.error("[Checkout_Error]:", error);
            alert("Payment initialization failed. Please try again.");
        } finally {
            setActiveLoadingId(null);
        }
    }, [isAuthenticated, router]);

    if (isLoading) {
        return (
            <div className="py-60 flex flex-col items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
                <p className="text-slate-500 animate-pulse">Loading tailored solutions...</p>
            </div>
        );
    }

    return (
        <section id="pricing" className="py-24 lg:py-40 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <header className="text-center mb-20">
                    <h2 className="text-blue-600 font-black uppercase tracking-[0.3em] text-xs mb-4">Pricing</h2>
                    <h3 className="text-5xl text-brand-accent md:text-6xl font-bold tracking-tight mb-8">
                        Invest in your <span className="italic">deliverability.</span>
                    </h3>

                    <div className="flex flex-col items-center gap-6">
                        <div className="flex items-center gap-4 bg-slate-100 p-1 text-brand-dark rounded-full">
                            <button
                                onClick={() => setBillingCycle('monthly')}
                                className={`cursor-pointer px-6 py-2 rounded-full text-sm font-bold transition-all ${billingCycle === 'monthly' ? 'bg-white shadow-sm' : 'text-slate-500'}`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setBillingCycle('annually')}
                                className={`cursor-pointer px-6 py-2 rounded-full text-sm font-bold transition-all ${billingCycle === 'annually' ? 'bg-white shadow-sm' : 'text-slate-500'}`}
                            >
                                Annually
                            </button>
                        </div>

                        <AnimatePresence>
                            {billingCycle === 'annually' && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-emerald-100"
                                >
                                    ✨ Save up to ${yearlySavingsLabel} per year
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </header>

                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
                    {apiPlans.map((plan) => (
                        <PricingCard
                            key={plan.id}
                            plan={plan}
                            billingCycle={billingCycle}
                            onPurchase={handlePurchase}
                            isRedirecting={activeLoadingId === (billingCycle === 'monthly' ? plan.prices?.monthly?.id : plan.prices?.annual?.id)}
                        />
                    ))}
                </div>

                <footer className="mt-20 flex justify-center text-slate-400">
                    <div className="flex items-center gap-2 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
                        <Info className="w-4 h-4 text-blue-500" />
                        <span className="text-xs font-bold uppercase tracking-widest">
                            {billingCycle === 'annually'
                                ? `Annual billing enabled (Save ${yearlySavingsLabel}/yr)`
                                : 'Flexible monthly billing'}
                        </span>
                    </div>
                </footer>
            </div>
        </section>
    );
}