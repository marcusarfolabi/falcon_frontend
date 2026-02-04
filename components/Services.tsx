"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
    Zap,          // JMAP Speed
    Workflow,     // Server-Side Rules (Sieve)
    Layers,       // Distributed Storage (S3)
    Command,      // Full-Text Search
    Fingerprint,  // Guardian Protocol (DMARC/Security)
    ArrowRight
} from 'lucide-react';

const solutions = [
    {
        title: "JMAP Instant Sync",
        desc: "Experience the successor to IMAP. Real-time push notifications and zero-latency syncing that's light on your battery.",
        icon: Zap,
        color: "bg-blue-600",
        shadow: "shadow-blue-200",
        size: "md:col-span-2 md:row-span-2"
    },
    {
        title: "Server-Side Intelligence",
        desc: "Advanced Sieve-based filtering. Organize, tag, and route your mail at the source, not on your device.",
        icon: Workflow,
        color: "bg-slate-900",
        shadow: "shadow-slate-200",
        size: "md:col-span-2"
    },
    {
        title: "Distributed Edge Storage",
        desc: "Immutable S3-backed storage ensures your data is mirrored across regions and never lost.",
        icon: Layers,
        color: "bg-indigo-600",
        shadow: "shadow-indigo-200",
        size: "md:col-span-1"
    },
    {
        title: "Lightning Search",
        desc: "A proprietary Rust indexing engine that finds one email in a million in under 10ms.",
        icon: Command,
        color: "bg-cyan-500",
        shadow: "shadow-cyan-200",
        size: "md:col-span-1"
    },
    {
        title: "Guardian Reputation",
        desc: "Automated DMARC and BIMI management. Protect your domain's identity and ensure 100% deliverability.",
        icon: Fingerprint,
        color: "bg-slate-800",
        shadow: "shadow-slate-300",
        size: "md:col-span-2"
    }
];
export default function Solutions() {
    return (
        <section id="solutions" className="py-24 lg:py-32 bg-[#F8FAFC] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Section Header */}
                <div className="mb-16 md:mb-24 max-w-3xl">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-black uppercase tracking-[0.3em] text-blue-600 mb-4"
                    >
                        The Falcon Suite
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight"
                    >
                        Built for speed. <br />
                        <span className="text-slate-400">Architected for absolute privacy.</span>
                    </motion.h3>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[240px]">
                    {solutions.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`group relative rounded-[2.5rem] p-8 overflow-hidden transition-all duration-500 hover:-translate-y-2 border border-white bg-white shadow-sm flex flex-col justify-between ${item.size}`}
                        >
                            {/* Background Accent (Visible on Hover) */}
                            <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${item.color}`} />

                            <div className="relative z-10">
                                <div className={`${item.color} ${item.shadow} w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <h4 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h4>
                                <p className="text-slate-500 font-medium leading-relaxed max-w-70">
                                    {item.desc}
                                </p>
                            </div>

                            <div className="relative z-10 flex items-center gap-2 text-sm font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2.5 group-hover:translate-x-0">
                                Learn more <ArrowRight className="w-4 h-4" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA for Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 flex flex-col sm:flex-row items-center justify-between p-8 md:p-12 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <h4 className="text-3xl font-bold mb-2">Ready to switch?</h4>
                        <p className="text-slate-400 text-lg">Migrate your entire team in less than 10 minutes.</p>
                    </div>
                    <button className="mt-8 sm:mt-0 relative z-10 bg-blue-600 hover:bg-white hover:text-blue-600 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center gap-2 group">
                        Start Migrating
                        <Zap className="w-5 h-5 fill-current group-hover:animate-pulse" />
                    </button>
                    {/* Subtle Decorative Gradient */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] -mr-64 -mt-64" />
                </motion.div>

            </div>
        </section>
    );
}