"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Zap, ShieldCheck, Building2 } from "lucide-react";

const PLANS = [
    {
        name: "Solo Pro",
        monthlyPrice: 7,
        desc: "Executive-grade privacy for leadership and high-profile individuals.",
        cta: "Start Solo Pro",
        icon: <ShieldCheck className="w-5 h-5 text-brand-primary" />,
        features: [
            "1 Sovereign Identity",
            "15GB Private Storage",
            "Sovereign Mail + Falcon AI",
            "Zero-Data Mining Guarantee",
            "S/MIME Encryption Ready"
        ]
    },
    {
        name: "Business Sovereign",
        monthlyPrice: 18,
        desc: "Infrastructure for high-growth teams who value brand integrity.",
        cta: "Get Started",
        featured: true,
        icon: <Zap className="w-5 h-5 text-brand-accent" />,
        features: [
            "Up to 6 Dedicated Seats",
            "60GB Encrypted Vault",
            "WhatsApp & WebChat Sync",  
            "DMARC & BIMI Monitoring",
            "Priority Support"
        ]
    },
    {
        name: "Enterprise",
        monthlyPrice: 45,
        desc: "Custom-built clusters for organizations requiring total data control.",
        cta: "Go Enterprise",
        icon: <Building2 className="w-5 h-5 text-indigo-500" />,
        features: [
            "Unlimited Dedicated Seats",
            "500GB+ RocksDB Storage",
            "Full Omnichannel Suite",  
            "Dedicated Stalwart Cluster",
            "SAML / SSO Integration"
        ]
    }
];

export default function Pricing() {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

    return (
        <section id="pricing" className="py-24 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Header & Electric Toggle */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-8">
                        Predictable <span className="text-brand-primary">Pricing.</span>
                    </h2>

                    <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center gap-4 bg-card border border-border p-1.5 rounded-2xl relative">
                            <button
                                onClick={() => setBillingCycle("monthly")}
                                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all relative z-10 ${billingCycle === "monthly" ? "text-white" : "text-muted-foreground"}`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setBillingCycle("yearly")}
                                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all relative z-10 ${billingCycle === "yearly" ? "text-white" : "text-muted-foreground"}`}
                            >
                                Yearly
                            </button>

                            <motion.div
                                className="absolute top-1.5 bottom-1.5 bg-brand-primary rounded-xl shadow-[0_0_15px_rgba(var(--color-brand-primary-rgb),0.4)]"
                                animate={{
                                    left: billingCycle === "monthly" ? "6px" : "50%",
                                    right: billingCycle === "monthly" ? "50%" : "6px"
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        </div>
                        <p className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em] animate-pulse">
                            {billingCycle === "yearly" ? "⚡ 10-Month Special: 2 Months Free applied" : "Standard Monthly Billing"}
                        </p>
                    </div>
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                    {PLANS.map((plan, i) => {
                        const displayPrice = billingCycle === "yearly"
                            ? Math.floor(plan.monthlyPrice * 10 / 12)
                            : plan.monthlyPrice;

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className={`relative p-[1px] rounded-[2rem] transition-all duration-500 h-full ${plan.featured
                                    ? "bg-linear-to-b from-brand-primary/40 to-transparent shadow-2xl scale-105 z-20"
                                    : "bg-border/50 z-10"
                                    }`}
                            >
                                <div className="bg-card rounded-[1.9rem] p-8 h-full flex flex-col relative overflow-hidden">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center">
                                            {plan.icon}
                                        </div>
                                        <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                                    </div>

                                    <div className="mb-8">
                                        <div className="flex items-baseline gap-1">
                                            <AnimatePresence mode="wait">
                                                <motion.span
                                                    key={displayPrice}
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    className="text-4xl font-bold text-foreground"
                                                >
                                                    ${displayPrice}
                                                </motion.span>
                                            </AnimatePresence>
                                            <span className="text-muted-foreground/60 text-xs font-medium">/mo</span>
                                        </div>
                                        {billingCycle === "yearly" && (
                                            <p className="text-[9px] font-black text-brand-primary uppercase mt-1">
                                                Billed ${plan.monthlyPrice * 10} annually
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-3 mb-10 flex-1">
                                        {plan.features.map((feat, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                <Check className="w-3.5 h-3.5 text-brand-primary mt-0.5" />
                                                <span className="text-[13px] font-medium text-foreground/80 leading-tight">{feat}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button 
                                    onClick={() => window.location.href = "/register"}
                                     className={`w-full py-4 rounded-xl cursor-pointer font-black uppercase tracking-widest text-[10px] transition-all active:scale-95 ${plan.featured
                                        ? "bg-brand-primary text-white"
                                        : "bg-secondary text-foreground"
                                        }`}>
                                        {plan.cta}
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}