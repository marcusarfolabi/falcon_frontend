"use client";
import React, { useState } from "react";
import Integration from "@/components/Integration"; // Your existing interactive demo
import { AnimatePresence, motion } from "framer-motion";
import {
    Cpu, Bot, Repeat, ShieldAlert,
    ArrowRight, Layers, Workflow, Share2,
    Instagram,
    Smartphone,
    Globe,
    MessageSquare,
    ShieldCheck,
    Link
} from "lucide-react";

const NODES = [
    {
        id: 1,
        name: "Social DMs",
        icon: <Instagram className="w-6 h-6" />,
        detail: "Bridges Instagram & Messenger API directly into your private JMAP stream.",
        color: "text-pink-500"
    },
    {
        id: 2,
        name: "Mobile Apps",
        icon: <Smartphone className="w-6 h-6" />,
        detail: "WhatsApp Business integration with full E2EE (End-to-End Encryption) parity.",
        color: "text-green-500"
    },
    {
        id: 3,
        name: "Web Chats",
        icon: <Globe className="w-6 h-6" />,
        detail: "Secure web-based chat integration with end-to-end encryption.",
        color: "text-blue-500"
    },
    {
        id: 4,
        name: "Legacy Mail",
        icon: <MessageSquare className="w-6 h-6" />,
        detail: "Routes standard SMTP/IMAP through Falcon's security sanitization layer.",
        color: "text-brand-primary"
    },
];

export default function IntegrationsPage() {
    const [activeNode, setActiveNode] = useState<typeof NODES[0] | null>(null);
    return (
        <div className="min-h-screen bg-background">
            {/* 1. ARCHITECTURAL HERO */}
            <section className="pt-32 pb-20 px-6 border-b border-border/40">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
                        <div>
                            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8">
                                ONE CORE. <br />
                                <span className="text-brand-primary">EVERY INLET.</span>
                            </h1>
                        </div>
                        <div className="pb-2">
                            <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                                Stop fragmenting your data across unsecured social platforms.
                                Falcon routes every DM, Comment, and VoIP call through your
                                private Stalwart cluster.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. THE INTERACTIVE PROTOCOL DEMO */}
            {/* We reuse your component here as the "Live Simulator" */}
            <div className="bg-secondary/5 py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-[1px] flex-1 bg-border" />
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Live Protocol Simulator</span>
                        <div className="h-[1px] flex-1 bg-border" />
                    </div>
                    <Integration />
                </div>
            </div>

            {/* 3. TECHNICAL CAPABILITIES GRID */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <CapabilityCard
                            icon={<Cpu className="text-brand-primary" />}
                            title="Real-Time Relay"
                            description="Our middleware decodes incoming social payloads and re-encrypts them for your private JMAP storage in milliseconds."
                        />
                        <CapabilityCard
                            icon={<Bot className="text-brand-primary" />}
                            title="Agentic Filtering"
                            description="Falcon AI analyzes intent across WhatsApp and Email simultaneously, preventing duplicate tickets and identifying VIP priority."
                        />
                        <CapabilityCard
                            icon={<ShieldAlert className="text-brand-primary" />}
                            title="Data Sanitization"
                            description="Links and attachments from external platforms are sandboxed and scanned before they ever reach your local device."
                        />
                    </div>
                </div>
            </section>

            {/* 4. THE "SOVEREIGN BRIDGE" EXPLAINER */}
            <section className="py-24 bg-card border-y border-border/60 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">

                        {/* LEFT SIDE: THE INTERACTIVE GRID */}
                        <div className="lg:w-1/2 relative">
                            <div className="grid grid-cols-2 gap-4 relative z-10">
                                {NODES.map((node) => (
                                    <motion.div
                                        key={node.id}
                                        onMouseEnter={() => setActiveNode(node)}
                                        onMouseLeave={() => setActiveNode(null)}
                                        whileHover={{ scale: 1.02, borderColor: "var(--color-brand-primary)" }}
                                        className="aspect-square rounded-[2rem] bg-background border border-border/60 flex flex-col items-center justify-center p-6 transition-colors cursor-help group"
                                    >
                                        <div className={`${node.color} opacity-40 group-hover:opacity-100 transition-opacity mb-3`}>
                                            {node.icon}
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 group-hover:text-foreground transition-colors">
                                            {node.name}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* THE CORE: Visual Connector */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="relative">
                                    {/* Pulsing rings when a node is active */}
                                    <AnimatePresence>
                                        {activeNode && (
                                            <motion.div
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1.5, opacity: 1 }}
                                                exit={{ scale: 2, opacity: 0 }}
                                                className="absolute inset-0 rounded-full border-2 border-brand-primary/30"
                                            />
                                        )}
                                    </AnimatePresence>

                                    <div className="w-24 h-24 rounded-full bg-brand-primary shadow-[0_0_50px_rgba(45,91,255,0.5)] flex items-center justify-center border-4 border-card relative z-20">
                                        <Layers className={`text-white w-8 h-8 ${activeNode ? 'animate-bounce' : ''}`} />
                                    </div>
                                </div>
                            </div>

                            {/* FLOATING DATA TOOLTIP */}
                            <AnimatePresence>
                                {activeNode && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                        exit={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                                        className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-full max-w-[280px] bg-foreground text-background p-4 rounded-2xl shadow-2xl z-30 pointer-events-none"
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <ShieldCheck className="w-3 h-3 text-brand-primary" />
                                            <span className="text-[9px] font-black uppercase tracking-tighter">Protocol Secure</span>
                                        </div>
                                        <p className="text-[11px] leading-relaxed font-medium">
                                            {activeNode.detail}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* RIGHT SIDE: CONTENT */}
                        <div className="lg:w-1/2 space-y-8">
                            <h2 className="text-4xl font-black tracking-tight uppercase leading-none">
                                The Death of <br />
                                <span className="text-brand-primary text-5xl">Context-Switching.</span>
                            </h2>

                            <div className="space-y-6">
                                <StepItem
                                    num="01"
                                    title="Inbound Aggregation"
                                    desc="Falcon's bridge intercepts metadata from social silos and standardizes it into a sovereign schema."
                                />
                                <StepItem
                                    num="02"
                                    title="Sovereign Indexing"
                                    desc="Data is indexed locally in your Stalwart cluster. No third-party platform retains your history."
                                />
                                <StepItem
                                    num="03"
                                    title="Unified Command"
                                    desc="Reply via any protocol from one terminal. Falcon handles the platform-specific delivery logic."
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 5. CALL TO ACTION */}
            <section className="py-32 px-6 text-center">
                <div className="max-w-3xl mx-auto space-y-8">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter">READY TO SYNC?</h2>
                    <p className="text-muted-foreground text-lg">
                        Connect your first three channels in under 5 minutes. No code required.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                            onClick={() => window.location.href = "/register"}
                            className="px-8 py-4 cursor-pointer bg-brand-primary text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:scale-105 transition-all">
                            Start Integration
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

// Sub-components for better organization
function CapabilityCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="p-8 rounded-[2rem] border border-border/60 bg-card hover:border-brand-primary/40 transition-colors group">
            <div className="w-14 h-14 rounded-2xl bg-secondary/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>
    );
}

function StepItem({ num, title, desc }: { num: string; title: string; desc: string }) {
    return (
        <div className="flex gap-6 group">
            <span className="text-brand-primary font-mono font-bold text-lg group-hover:scale-110 transition-transform tracking-tighter">
                {num}
            </span>
            <div>
                <h4 className="font-bold text-lg uppercase tracking-tight group-hover:text-brand-primary transition-colors">
                    {title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}