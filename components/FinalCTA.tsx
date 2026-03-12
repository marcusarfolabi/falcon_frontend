"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Mail, Fingerprint, Share2, LucideIcon } from "lucide-react";
import Link from "next/link";

interface FinalCTAProps {
    title?: React.ReactNode;
    description?: string;
    icon?: LucideIcon;
    primaryBtnText?: string;
    primaryBtnHref?: string;
}

export default function FinalCTA({
    title = <>Are you <span className="text-brand-primary">Ready?</span></>,
    description = "Deploy your private node in 0.002s. Fully encrypted Stalwart infra, RocksDB storage, and AI-driven omnichannel routing.",
    icon: Icon = Mail,
    primaryBtnText = "Get Started",
    primaryBtnHref = "/register"
}: FinalCTAProps) {
    return (
        <section className="py-24 bg-background relative overflow-hidden">
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                    <div className="lg:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2 mb-6"
                        >
                            <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary">
                                System Ready
                            </span>
                        </motion.div>

                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
                            {title}
                        </h2>

                        <p className="text-lg text-muted-foreground/80 mb-10 leading-relaxed">
                            {description}
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link href={primaryBtnHref} className="group relative">
                                <div className="absolute -inset-1 bg-brand-primary/40 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                                <button className="relative cursor-pointer px-8 py-4 bg-brand-primary text-white rounded-xl font-black uppercase tracking-widest text-xs flex items-center gap-3 transition-all active:scale-95">
                                    {primaryBtnText}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                            <Link href="/contact" className="px-8 py-4 rounded-xl border border-border bg-card font-black uppercase tracking-widest text-xs hover:bg-secondary/50 transition-colors">
                                Learn More
                            </Link>
                        </div>
                    </div>

                    <div className="lg:col-span-7 relative h-[400px] flex items-center justify-center">
                        <div className="relative z-20 w-48 h-48 bg-card border border-border rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden group">
                            <div className="absolute inset-0 bg-linear-to-br from-brand-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative p-6 border border-brand-primary/20 rounded-2xl bg-background/50 backdrop-blur-sm">
                                <Icon className="w-12 h-12 text-brand-primary animate-pulse" />
                            </div>

                            {[...Array(4)].map((_, i) => (
                                <div key={i} className={`absolute w-1.5 h-1.5 rounded-full bg-muted-foreground/20 border border-border ${i === 0 ? 'top-4 left-4' : i === 1 ? 'top-4 right-4' : i === 2 ? 'bottom-4 left-4' : 'bottom-4 right-4'
                                    }`} />
                            ))}
                        </div>

                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                            <defs>
                                <linearGradient id="wireGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="transparent" />
                                    <stop offset="50%" stopColor="var(--color-brand-primary)" stopOpacity="0.5" />
                                    <stop offset="100%" stopColor="transparent" />
                                </linearGradient>
                            </defs>

                            <motion.path
                                d="M 50 50 Q 150 50 200 150"
                                stroke="url(#wireGradient)" strokeWidth="1" fill="none"
                                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2, repeat: Infinity }}
                            />
                            <motion.path
                                d="M 600 350 Q 500 350 400 250"
                                stroke="url(#wireGradient)" strokeWidth="1" fill="none"
                                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                            />
                        </svg>

                        <div className="absolute top-10 left-[10%] p-3 rounded-full bg-card border border-border shadow-xl">
                            <Fingerprint className="w-5 h-5 text-brand-accent" />
                        </div>
                        <div className="absolute bottom-10 right-[15%] p-3 rounded-full bg-card border border-border shadow-xl">
                            <Share2 className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div className="absolute top-1/2 -right-4 -translate-y-1/2 p-3 rounded-full bg-card border border-border shadow-xl">
                            <Zap className="w-5 h-5 text-yellow-500" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}