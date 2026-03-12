"use client";

import { motion } from "framer-motion";
import {
    MessageCircle, Smartphone, ShoppingCart, CheckCheck,
    Zap, Users, CreditCard, RefreshCcw
} from "lucide-react"; 
import { useEffect, useState } from "react";
import FinalCTA from "@/components/FinalCTA";

const Spark = ({ index = 0 }) => {
    const [style, setStyle] = useState({ x: 0, y: 0, delay: 0 });
    useEffect(() => {
        setStyle({
            x: (Math.random() - 0.5) * 70,
            y: (Math.random() - 0.5) * 70,
            delay: Math.random() * 2.5
        });
    }, []);
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1.3, 0], x: [0, style.x], y: [0, style.y] }}
            transition={{ duration: 0.4, repeat: Infinity, repeatDelay: style.delay, delay: index * 0.1 }}
            className="absolute w-1 h-1 bg-emerald-500 rounded-full blur-[1px] shadow-[0_0_10px_var(--color-emerald-500)]"
        />
    );
};

export default function WhatsAppIntelligencePage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="bg-background min-h-screen">
            <section className="relative w-full pt-32 pb-20 flex flex-col items-center overflow-hidden">

                <div className="container mx-auto px-6 z-20 flex flex-col items-center text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em] mb-8"
                    >
                        <MessageCircle className="w-3 h-3 fill-emerald-500" />
                        Official WhatsApp Business API
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground mb-6 leading-[0.9]">
                        Your Storefront, <br />
                        <span className="text-emerald-500">Inside Their Pocket.</span>
                    </h1>

                    <p className="max-w-2xl text-muted-foreground text-lg md:text-xl leading-relaxed">
                        Don&apos;t make them visit your site. Bring the checkout to the chat. Our AI handles product inquiries, order tracking, and payment links directly in WhatsApp for a 98% open rate.
                    </p>
                </div>

                <div className="relative w-full max-w-5xl h-[450px] flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 400">
                        <defs>
                            <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
                                <stop offset="50%" stopColor="#10b981" stopOpacity="1" />
                                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                            </linearGradient>
                        </defs>

                        <CurvedLine startX={220} startY={80} endX={400} endY={200} strokeColor="url(#emeraldGrad)" />
                        <CurvedLine startX={200} startY={200} endX={400} endY={200} delay={0.3} strokeColor="url(#emeraldGrad)" />
                        <CurvedLine startX={220} startY={320} endX={400} endY={200} delay={0.6} strokeColor="url(#emeraldGrad)" />

                        <CurvedLine startX={580} startY={80} endX={400} endY={200} isRight strokeColor="url(#emeraldGrad)" />
                        <CurvedLine startX={600} startY={200} endX={400} endY={200} isRight delay={0.3} strokeColor="url(#emeraldGrad)" />
                        <CurvedLine startX={580} startY={320} endX={400} endY={200} isRight delay={0.6} strokeColor="url(#emeraldGrad)" />
                    </svg>

                    <div className="absolute inset-0 z-40 flex items-center justify-between px-10 md:px-24">
                        <div className="flex flex-col gap-16">
                            <Node icon={<Smartphone size={22} className="text-emerald-500" />} label="Direct Message" className="translate-x-12" />
                            <Node icon={<Zap size={22} className="text-yellow-500" />} label="Status Reply" />
                            <Node icon={<Users size={22} />} label="Group Broadcast" className="translate-x-12" />
                        </div>

                        <div className="flex flex-col gap-16">
                            <Node icon={<CreditCard size={22} className="text-blue-500" />} label="Instant Pay" className="-translate-x-12" />
                            <Node icon={<ShoppingCart size={22} className="text-emerald-500" />} label="Order Created" />
                            <Node icon={<CheckCheck size={22} className="text-emerald-500" />} label="Auto-Followup" className="-translate-x-12" />
                        </div>
                    </div>

                    <div className="relative z-30 w-28 h-28 md:w-32 md:h-32 bg-[#050505] rounded-[2.5rem] flex items-center justify-center border border-emerald-500/40 shadow-[0_0_60px_rgba(16,185,129,0.2)]">
                        <MessageCircle className="w-12 h-12 text-emerald-500" />
                        <div className="absolute inset-0 bg-emerald-500/10 blur-2xl rounded-full animate-pulse" />
                        {[...Array(6)].map((_, i) => <Spark key={i} index={i} />)}
                    </div>
                </div>
            </section>

            {/* 3. FINAL CTA: WHATSAPP SCALE */}
            <FinalCTA
                title={<>Scale Your <span className="text-emerald-500">Conversations.</span></>}
                description="Connect your business WhatsApp in minutes. Automate repetitive FAQs and start accepting orders in the world's most popular messaging app."
                icon={RefreshCcw}
                primaryBtnText="Link WhatsApp API"
                primaryBtnHref="/register"
            />
        </div>
    );
}

// --- HELPER COMPONENTS ---
function CurvedLine({ startX, startY, endX, endY, isRight = false, delay = 0, strokeColor = "url(#emeraldGrad)" }: any) {
    const controlX = isRight ? startX - 120 : startX + 120;
    const path = `M ${startX} ${startY} Q ${controlX} ${startY} ${endX} ${endY}`;
    return (
        <g>
            <path d={path} fill="none" stroke="var(--color-emerald-500)" strokeWidth="0.5" className="opacity-10" />
            <motion.path
                d={path}
                fill="none"
                stroke={strokeColor}
                strokeWidth="2"
                strokeDasharray="40, 160"
                initial={{ strokeDashoffset: 200 }}
                animate={{ strokeDashoffset: [200, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay }}
            />
        </g>
    );
}

function Node({ icon, label, className }: { icon: any; label: string; className?: string }) {
    return (
        <div className={`group flex flex-col items-center gap-2 ${className}`}>
            <div className="w-14 h-14 md:w-16 md:h-16 cursor-pointer rounded-2xl bg-[#0a0a0a] border border-white/5 flex items-center justify-center text-white/50 shadow-2xl transition-all hover:border-emerald-500/50 hover:text-emerald-500 hover:scale-110">
                {icon}
            </div>
            <span className="text-[8px] font-black uppercase tracking-widest text-foreground/50 group-hover:text-emerald-500 transition-colors">
                {label}
            </span>
        </div>
    );
}