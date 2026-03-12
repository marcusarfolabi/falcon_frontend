"use client";
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, HardDrive, Key, Cpu, Zap } from "lucide-react";

const SECURITY_FEATURES = [
    {
        title: "Stalwart Mesh",
        desc: "Memory-safe Rust infrastructure with JMAP protocol for secure, stateful synchronization.",
        icon: <ShieldCheck className="w-5 h-5 text-brand-primary" />,
    },
    {
        title: "RocksDB Storage",
        desc: "High-performance key-value storage with optimized encryption-at-rest for metadata.",
        icon: <HardDrive className="w-5 h-5 text-brand-accent" />,
    },
    {
        title: "End-to-End TLS",
        desc: "Forced TLS 1.3 for all data in transit across SMTP, IMAP, and Web API nodes.",
        icon: <Lock className="w-5 h-5 text-emerald-500" />,
    },
    {
        title: "Tenant Isolation",
        desc: "Single-db multi-tenancy enforced by global query scopes and strict middleware.",
        icon: <Cpu className="w-5 h-5 text-indigo-500" />,
    }
];

export default function Security() {
    return (
        <section id="security" className="py-24 bg-background relative overflow-hidden">
            <div className="absolute inset-0 bg-radial-at-t from-brand-primary/5 to-transparent opacity-50" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary">
                                Enterprise Grade
                            </div>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                            Security by <span className="text-brand-primary">Sovereignty.</span>
                        </h2>
                    </div>
                    <p className="text-muted-foreground/60 text-sm max-w-xs font-medium leading-relaxed">
                        Data is encrypted at every hop. We don't just host your data; we fortify it.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {SECURITY_FEATURES.map((feat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group p-8 rounded-[2rem] border border-border bg-card hover:border-brand-primary/30 transition-all duration-500 relative overflow-hidden"
                        >
                            {/* Animated Background Sparkle */}
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 group-hover:scale-110 transition-all">
                                <Zap className="w-12 h-12 text-brand-primary/20" />
                            </div>

                            <div className="w-12 h-12 rounded-2xl bg-background border border-border flex items-center justify-center mb-6 shadow-sm">
                                {feat.icon}
                            </div>

                            <h3 className="text-lg font-bold text-foreground mb-3">{feat.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {feat.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Encryption visualization banner */}
                <div className="mt-12 p-8 rounded-[2.5rem] border border-border bg-card/50 backdrop-blur-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-full border-4 border-brand-primary/20 flex items-center justify-center">
                                <Key className="w-6 h-6 text-brand-primary animate-pulse" />
                            </div>
                            <div className="absolute inset-0 rounded-full border-t-4 border-brand-primary animate-spin" />
                        </div>
                        <div>
                            <p className="text-xs font-black uppercase tracking-widest text-brand-primary mb-1">Status: Fortified</p>
                            <p className="text-xl font-bold">AES-256 Bit Encryption</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3 justify-center">
                        {['SOC2 Ready', 'GDPR Compliant', 'HIPAA Capable', 'TLS 1.3'].map((tag) => (
                            <span key={tag} className="px-4 py-2 rounded-xl bg-background border border-border text-[10px] font-black uppercase tracking-tighter text-foreground/50">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}