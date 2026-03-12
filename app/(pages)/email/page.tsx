"use client";
import React from "react";
import { motion } from "framer-motion";
import {
    Mail, Bot, Zap, History, ShieldCheck,
    CheckCircle2, Globe, Lock, Server,
    Database, BrainCircuit, Cpu, Search,
    MessageSquareText, Sparkles
} from "lucide-react";

export default function EmailSovereigntyPage() {
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-brand-primary selection:text-white">

            {/* 1. HERO: THE MOTHERBOARD CONCEPT */}
            <section className="pt-32 pb-20 px-6 relative overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-black uppercase tracking-[0.2em]">
                            <Server className="w-3 h-3" />
                            Secure SMTP/IMAP Relay
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase">
                            Email <br />
                            <span className="text-brand-primary italic">Sovereignty.</span>
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                            FalconMail is the core motherboard of your communications. We wrap your entire domain in a layer of AI-driven intelligence, turning a simple inbox into a high-velocity support engine.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="bg-brand-primary text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-brand-primary/20 hover:scale-105 transition-all">
                                Onboard Domain
                            </button>
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                                <Lock className="w-3 h-3" /> E2EE Protocol Active
                            </div>
                        </div>
                    </motion.div>

                    <div className="relative">
                        {/* Visual: The DNS Motherboard */}
                        <div className="aspect-square bg-card border border-border/60 rounded-[3.5rem] relative flex items-center justify-center p-12 overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:32px_32px]" />
                            <div className="relative z-10 w-full space-y-4">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="p-4 bg-background border border-border rounded-2xl shadow-xl"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[9px] font-bold text-brand-primary uppercase">Type: TXT (SPF)</span>
                                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                    </div>
                                    <code className="text-[10px] text-muted-foreground block truncate font-mono">v=spf1 include:_spf.falconmail.io ~all</code>
                                </motion.div>

                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="p-4 bg-background border border-border rounded-2xl shadow-xl ml-8"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[9px] font-bold text-brand-primary uppercase">Type: MX (Primary)</span>
                                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                    </div>
                                    <code className="text-[10px] text-muted-foreground block font-mono">mx1.falconmail.io</code>
                                </motion.div>

                                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-primary/20 blur-[60px] rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. THE 3-STEP WHOOOSH ONBOARDING */}
            <section className="py-24 bg-secondary/10 border-y border-border/40">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-16">
                        <h2 className="text-4xl font-black uppercase tracking-tighter">Onboard in <span className="text-brand-primary italic">Seconds.</span></h2>
                        <p className="text-muted-foreground mt-2">The fastest domain-to-mailbox pipeline in the industry.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <OnboardingStep
                            num="01"
                            title="Domain Link"
                            desc="Input your domain. We scan your DNS provider to prepare the necessary TXT and MX handshakes instantly."
                        />
                        <OnboardingStep
                            num="02"
                            title="DNS Handshake"
                            desc="One click to verify SPF, DKIM, and DMARC records. We monitor propagation in real-time."
                        />
                        <OnboardingStep
                            num="03"
                            title="Whooosh. Live."
                            desc="Your motherboard is active. All inbound mail is now routed through Falcon's AI-Sanitization layer."
                        />
                    </div>
                </div>
            </section>

            {/* 3. DEEP AI INTEGRATION: THE NEURAL LAYER */}
            <section className="py-24 bg-background relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-2 text-brand-primary mb-4">
                                <BrainCircuit className="w-5 h-5" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Neural Protocol Integration</span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                                Deep <span className="text-brand-primary italic">Inference.</span> <br />
                                Zero Effort.
                            </h2>
                        </div>
                        <p className="text-muted-foreground max-sm:text-xs text-sm leading-relaxed max-w-sm">
                            Our AI is baked into the IMAP stream. It doesn't just "read" emails; it solves them using your private knowledge base.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* THE KNOWLEDGE CORE */}
                        <div className="lg:col-span-7 p-px rounded-[3rem] bg-gradient-to-b from-brand-primary/40 to-transparent">
                            <div className="bg-card rounded-[2.9rem] p-10 h-full relative overflow-hidden">
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-black uppercase mb-6 flex items-center gap-3">
                                        <Database className="text-brand-primary w-6 h-6" /> The Knowledge Brain
                                    </h3>
                                    <p className="text-muted-foreground mb-8 text-lg">
                                        Falcon AI ingests your PDFs and documentation to build a private, sovereign brain. It answers customer expectations in the shortest frame of time.
                                    </p>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-background/50 border border-border/60">
                                            <Search className="w-5 h-5 text-brand-primary shrink-0 mt-1" />
                                            <div>
                                                <h4 className="text-xs font-bold uppercase mb-1 text-foreground">Vectorized Search</h4>
                                                <p className="text-[11px] text-muted-foreground">Finds exact solutions within your documentation to draft the perfect reply.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-background/50 border border-border/60">
                                            <MessageSquareText className="w-5 h-5 text-brand-primary shrink-0 mt-1" />
                                            <div>
                                                <h4 className="text-xs font-bold uppercase mb-1 text-foreground">Sentiment Routing</h4>
                                                <p className="text-[11px] text-muted-foreground">Analyzes history and tone to prioritize urgent support tickets automatically.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* AUTO-PILOT MODULES */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="p-10 rounded-[3rem] border border-border bg-card group hover:border-brand-primary/50 transition-all flex flex-col justify-between h-[280px]">
                                <div>
                                    <Zap className="text-brand-primary mb-4 w-6 h-6" />
                                    <h3 className="text-xl font-black uppercase mb-2 text-foreground">Ghost Drafting</h3>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        Falcon generates 90% complete drafts as mail arrives. Your agents simply hit "Refine" and "Send."
                                    </p>
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">Saves ~4m per ticket</span>
                            </div>

                            <div className="p-10 rounded-[3rem] bg-foreground text-background flex flex-col justify-between h-[280px]">
                                <div>
                                    <Cpu className="text-brand-primary mb-4 w-6 h-6" />
                                    <h3 className="text-xl font-black uppercase mb-2 text-white">Offline Autopilot</h3>
                                    <p className="text-xs text-white/60 leading-relaxed">
                                        When agents are offline, AI uses the knowledge base to satisfy customers instantly rather than making them wait.
                                    </p>
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">24/7 Satisfaction Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. SECURITY FLOW: THE SANITIZATION LAYER */}
            <section className="py-24 px-6 border-t border-border/40">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
                    <div className="lg:w-1/2 order-2 lg:order-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { t: "SPF/DKIM Scrub", d: "Zero-trust sender verification." },
                                { t: "Intent Analysis", d: "Automatic threat/spam sorting." },
                                { t: "Sandbox Mode", d: "Isolated attachment scanning." },
                                { t: "Sovereign Sync", d: "Local data indexing only." }
                            ].map((item, i) => (
                                <div key={i} className="p-6 rounded-2xl border border-border bg-card/50 flex flex-col gap-3">
                                    <ShieldCheck className="w-5 h-5 text-brand-primary" />
                                    <div>
                                        <h4 className="text-xs font-bold uppercase text-foreground">{item.t}</h4>
                                        <p className="text-[10px] text-muted-foreground leading-tight mt-1">{item.d}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="lg:w-1/2 order-1 lg:order-2 space-y-6">
                        <h2 className="text-5xl font-black uppercase tracking-tighter leading-none">
                            Security <br /><span className="text-brand-primary italic">Without Friction.</span>
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Every email undergoes a 4-point security scrub. By the time it hits your agent, it's verified, sanitized, and ready for a response.
                        </p>
                        <div className="inline-block p-6 rounded-3xl bg-brand-primary text-white shadow-xl shadow-brand-primary/20">
                            <div className="text-4xl font-black italic tracking-tighter leading-none">99.9%</div>
                            <p className="text-[9px] uppercase font-black opacity-80 mt-1">Phishing Mitigation Accuracy</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function OnboardingStep({ num, title, desc }: { num: string, title: string, desc: string }) {
    return (
        <div className="p-8 rounded-[2.5rem] bg-card border border-border group hover:border-brand-primary/50 transition-all duration-500">
            <div className="text-4xl font-black text-brand-primary/10 group-hover:text-brand-primary/40 transition-colors mb-4">{num}</div>
            <h3 className="text-xl font-black uppercase mb-3 text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
        </div>
    );
}