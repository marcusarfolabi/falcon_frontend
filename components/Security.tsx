"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
    ShieldCheck,
    Lock,
    EyeOff,
    Key,
    FileCheck,
    RefreshCcw,
    ChevronRight,
    ShieldAlert
} from 'lucide-react';

const securitySpecs = [
    {
        title: "Zero-Knowledge Encryption",
        business: "Total Privacy",
        tech: "AES-256-GCM / Argon2",
        desc: "We cannot access your data. Encryption keys are generated and stored at the edge, ensuring absolute confidentiality even from us.",
        icon: EyeOff
    },
    {
        title: "Domain Sovereignty",
        business: "Brand Protection",
        tech: "DMARC, DKIM & SPF",
        desc: "Automated identity verification protocols that prevent domain spoofing and guarantee your emails never land in the spam folder.",
        icon: ShieldAlert
    },
    {
        title: "Quantum-Resistant Layers",
        business: "Future-Proofing",
        tech: "TLS 1.3 & PFS",
        desc: "Perfect Forward Secrecy (PFS) ensures that even if a future key is compromised, your past communications remains encrypted.",
        icon: Lock
    }
];

export default function Security() {
    return (
        <section id="security" className="py-24 lg:py-40 bg-slate-900 text-white overflow-hidden relative">
            {/* Background Tech Detail */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                <div className="h-full w-full bg-[radial-gradient(#2D5BFF_0.5px,transparent_0.5px)] [background-size:24px_24px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Side: Content */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6"
                        >
                            <ShieldCheck className="w-4 h-4" />
                            Security First Architecture
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-bold tracking-tight mb-8"
                        >
                            Your data is a liability. <br />
                            <span className="text-blue-500">We make it an asset.</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-slate-400 mb-12 max-w-xl leading-relaxed"
                        >
                            FalconMail replaces legacy SMTP vulnerabilities with a hardened,
                            modern stack. We provide the transparency tech teams demand
                            and the compliance insurance leadership needs.
                        </motion.p>

                        {/* Tech Specs List */}
                        <div className="space-y-8">
                            {securitySpecs.map((spec, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex gap-6 group"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                                        <spec.icon className="w-6 h-6 text-blue-400 group-hover:text-white" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h4 className="text-xl font-bold text-white">{spec.title}</h4>
                                            <span className="text-[10px] font-mono bg-white/5 px-2 py-0.5 rounded border border-white/10 text-slate-500">
                                                {spec.tech}
                                            </span>
                                        </div>
                                        <p className="text-slate-400 text-sm leading-relaxed">{spec.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Visual Security Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 rounded-[3rem] p-8 md:p-12 shadow-2xl">
                            <div className="flex items-center justify-between mb-12">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/20" />
                                    <div className="w-3 h-3 rounded-full bg-amber-500/20" />
                                    <div className="w-3 h-3 rounded-full bg-emerald-500/20" />
                                </div>
                                <div className="text-[10px] font-mono text-slate-500 uppercase">Audit Log: Active</div>
                            </div>

                            <div className="space-y-6">
                                <div className="h-4 bg-slate-800 rounded-full w-3/4 animate-pulse" />
                                <div className="h-4 bg-slate-800 rounded-full w-full animate-pulse delay-75" />
                                <div className="h-4 bg-slate-800 rounded-full w-1/2 animate-pulse delay-150" />

                                <div className="py-8">
                                    <div className="flex items-center justify-center">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 animate-pulse" />
                                            <Lock className="w-20 h-20 text-blue-500 relative z-10" />
                                        </div>
                                    </div>
                                    <div className="text-center mt-6">
                                        <div className="text-emerald-400 font-mono text-sm tracking-widest">ENCRYPTION VERIFIED</div>
                                        <div className="text-slate-500 text-[10px] mt-1 italic font-mono">ID: FCON-99-ALPHA-01</div>
                                    </div>
                                </div>
                            </div>

                            {/* Security Badges */}
                            <div className="mt-12 pt-12 border-t border-slate-800 grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase">
                                    <FileCheck className="w-4 h-4 text-blue-500" /> SOC2 Type II
                                </div>
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase">
                                    <RefreshCcw className="w-4 h-4 text-blue-500" /> GDPR Compliant
                                </div>
                            </div>
                        </div>

                        {/* Decorative Orbit */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-[80px]" />
                    </motion.div>
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24 p-8 md:p-16 rounded-[4rem] bg-blue-600 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left"
                >
                    <div>
                        <h3 className="text-3xl md:text-4xl font-bold mb-4">Request a Security Audit</h3>
                        <p className="text-blue-100 text-lg opacity-80">Download our whitepaper on Zero-Knowledge infrastructure.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2">
                            Talk to Security Team
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}