"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MessageSquare, Instagram, Facebook, Smartphone,
    Send, Bot, BarChart3, ListChecks, Zap, Globe,
    Twitter, PhoneCall, Mail, MessageCircle
} from "lucide-react";

const PLATFORMS = [
    { icon: <MessageSquare className="w-4 h-4" />, name: "WebChat", color: "text-brand-primary" },
    { icon: <Smartphone className="w-4 h-4" />, name: "WhatsApp", color: "text-green-500" },
    { icon: <Instagram className="w-4 h-4" />, name: "Instagram", color: "text-pink-500" },
    { icon: <Facebook className="w-4 h-4" />, name: "Messenger", color: "text-blue-500" },
    { icon: <Twitter className="w-4 h-4" />, name: "X (Twitter)", color: "text-foreground" },
    { icon: <MessageCircle className="w-4 h-4" />, name: "SMS Gateway", color: "text-yellow-500" },
    { icon: <PhoneCall className="w-4 h-4" />, name: "3CX VoIP", color: "text-brand-accent" },
    { icon: <Mail className="w-4 h-4" />, name: "Falcon Mail", color: "text-indigo-500" },
];

// Animated Spark Component
const ElectricWire = ({ className, delay = 0 }: { className?: string, delay?: number }) => (
    <svg className={`absolute pointer-events-none overflow-visible ${className}`} width="100%" height="100%">
        <motion.path
            d="M 0 50 L 100 50"
            fill="transparent"
            stroke="url(#spark-gradient)"
            strokeWidth="2"
            strokeDasharray="20 100"
            initial={{ strokeDashoffset: 120 }}
            animate={{ strokeDashoffset: -120 }}
            transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                delay: delay
            }}
        />
        <defs>
            <linearGradient id="spark-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="var(--color-brand-primary)" />
                <stop offset="100%" stopColor="transparent" />
            </linearGradient>
        </defs>
    </svg>
);

export default function Integration() {
    const [messages, setMessages] = useState([
        { role: "customer", text: "Is the server migration complete?", platform: "WhatsApp" }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        const sequence = async () => {
            await new Promise(res => setTimeout(res, 3000));
            setMessages(prev => [...prev, { role: "customer", text: "Checking status via SMS.", platform: "SMS" }]);
            await new Promise(res => setTimeout(res, 2000));
            setIsTyping(true);
            await new Promise(res => setTimeout(res, 2500));
            setIsTyping(false);
            setMessages(prev => [...prev, {
                role: "ai",
                text: "Sync complete. All nodes green.",
                platform: "Falcon AI"
            }]);
        };
        sequence();
    }, []);

    return (
        <section id="integration" className="py-24 bg-background relative overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-0 -left-4 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl animate-blob" />
            <div className="absolute bottom-0 -right-4 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl animate-blob [animation-delay:2s]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="mb-12">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-4">
                        Unified <span className="text-brand-primary">Sovereignty.</span>
                    </h2>
                    <p className="text-muted-foreground/60 text-sm tracking-[0.2em] font-black uppercase">
                        Connected Intelligence • Real-Time Routing
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:h-[700px] relative">

                    <div className="hidden lg:block absolute top-1/2 left-[23%] w-[10%] h-[2px] z-0">
                        <ElectricWire delay={0} />
                    </div>
                    <div className="hidden lg:block absolute top-1/2 left-[73%] w-[10%] h-[2px] z-0">
                        <ElectricWire delay={1.5} />
                    </div>

                    {/* 1. CHANNEL FEED */}
                    <div className="lg:col-span-3 flex flex-col gap-3 overflow-y-auto pr-2 scrollbar-hide relative z-10">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 mb-2">Social Inlets</span>
                        {PLATFORMS.map((p, i) => (
                            <div key={i} className="flex items-center cursor-pointer gap-3 p-4 rounded-2xl border border-border bg-card shadow-sm group hover:border-brand-primary/30 transition-all">
                                <div className={`${p.color}`}>{p.icon}</div>
                                <span className="text-[11px] font-bold">{p.name}</span>
                                <div className="ml-auto w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                            </div>
                        ))}
                    </div>

                    <div className="lg:col-span-6 border border-border rounded-[2.5rem] bg-card overflow-hidden flex flex-col shadow-2xl relative z-10">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-linear-to-r from-transparent via-brand-primary to-transparent animate-light-bar" />

                        <div className="p-6 border-b border-border bg-background/40 backdrop-blur-md flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
                                    <Bot className="w-5 h-5 text-brand-primary" />
                                </div>
                                <p className="text-sm font-bold">Falcon Core Agent</p>
                            </div>
                            <Globe className="w-4 h-4 text-muted-foreground/30" />
                        </div>

                        <div className="flex-1 p-8 space-y-6 overflow-y-auto">
                            {messages.map((m, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex flex-col ${m.role === "ai" ? "items-end" : "items-start"}`}>
                                    <span className="text-[9px] font-black uppercase text-muted-foreground/40 mb-1">{m.platform}</span>
                                    <span className={`max-w-[85%] p-4 rounded-2xl text-[13px] ${m.role === "ai" ? "bg-brand-primary text-white rounded-tr-none" : "bg-background border border-border rounded-tl-none"}`}>
                                        {m.text}
                                    </span>
                                </motion.div>
                            ))}
                            {isTyping && <div className="text-[10px] text-brand-primary animate-pulse font-bold text-right">Analysing cross-channel intent...</div>}
                        </div>

                        <div className="p-6 bg-background/50 border-t border-border flex gap-3">
                            <div className="flex-1 h-12 bg-background border border-border rounded-2xl px-4 flex items-center text-[11px] text-muted-foreground italic">
                                Waiting for inbound triggers...
                            </div>
                            <div className="w-12 h-12 bg-brand-primary rounded-2xl flex items-center justify-center text-white"><Send className="w-4 h-4" /></div>
                        </div>
                    </div>

                    {/* 3. ACTION & SUMMARY */}
                    <div className="lg:col-span-3 flex flex-col gap-6 relative z-10">
                        <div className="p-6 rounded-[2rem] border border-border bg-card">
                            <h4 className="text-[11px] font-black uppercase tracking-widest mb-4">Live Metrics</h4>
                            <div className="space-y-4">
                                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                                    <motion.div initial={{ width: 0 }} animate={{ width: "94%" }} className="h-full bg-brand-accent" />
                                </div>
                                <p className="text-[10px] font-bold text-brand-accent uppercase">0.002s Processing</p>
                            </div>
                        </div>

                        <div className="flex-1 p-6 rounded-[2rem] border border-border bg-card flex flex-col">
                            <h4 className="text-[11px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Zap className="w-3 h-3 text-brand-primary" /> Auto-Actions
                            </h4>
                            <div className="space-y-2 mb-6">
                                {["Update CRM", "Ping 3CX", "Falcon Mail Sent"].map((t, i) => (
                                    <span key={i} className="p-1.5 rounded-xl bg-background border border-border text-[10px] font-bold">
                                        {t}
                                    </span>
                                ))}
                            </div>
                            <button className="mt-auto w-full py-4 bg-foreground text-background rounded-2xl text-[11px] font-black uppercase tracking-widest hover:brightness-125 transition-all">
                                Commit Summary
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}