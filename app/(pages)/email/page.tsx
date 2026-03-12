"use client";

import FinalCTA from "@/components/FinalCTA";
import { motion } from "framer-motion";
import {
    Mail, Shield, Bird, Send,
    Sparkles, UserCheck, BarChart3,
    Zap, Quote, Layers
} from "lucide-react";
import { useEffect, useState } from "react";

const Spark = ({ index = 0 }) => {
    const [style, setStyle] = useState({ x: 0, y: 0, delay: 0 });
    useEffect(() => {
        setStyle({
            x: (Math.random() - 0.5) * 60,
            y: (Math.random() - 0.5) * 60,
            delay: Math.random() * 3
        });
    }, []);
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0], x: [0, style.x], y: [0, style.y] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: style.delay, delay: index * 0.1 }}
            className="absolute w-1 h-1 bg-brand-primary rounded-full blur-[1px] shadow-[0_0_8px_var(--color-brand-primary)]"
        />
    );
};

export default function EmailIntelligenceHero() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="relative w-full pt-32 pb-20 flex flex-col items-center overflow-hidden bg-background">

            <div className="container mx-auto px-6 z-20 flex flex-col items-center text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8"
                >
                    <Sparkles className="w-3 h-3" />
                    Convert Inbound to Revenue
                </motion.div>

                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground mb-6 leading-[0.9]">
                    Turn Every Email into a <br />
                    <span className="text-brand-primary">Paying Customer.</span>
                </h1>

                <p className="max-w-2xl text-muted-foreground text-lg md:text-xl leading-relaxed">
                    Stop managing threads. Start closing leads. Our AI-driven neural relay reframes your responses, summarizes intent, and identifies high-value opportunities before you even hit reply.
                </p>
            </div>

            <div className="relative w-full max-w-5xl h-[450px] flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 400">
                    <defs>
                        <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="var(--color-brand-primary)" stopOpacity="0" />
                            <stop offset="50%" stopColor="var(--color-brand-primary)" stopOpacity="1" />
                            <stop offset="100%" stopColor="var(--color-brand-primary)" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    <CurvedLine startX={220} startY={50} endX={400} endY={200} delay={0} />
                    <CurvedLine startX={200} startY={150} endX={400} endY={200} delay={0.2} />
                    <CurvedLine startX={200} startY={250} endX={400} endY={200} delay={0.4} />
                    <CurvedLine startX={220} startY={350} endX={400} endY={200} delay={0.6} />

                    <CurvedLine startX={580} startY={50} endX={400} endY={200} isRight delay={0.1} />
                    <CurvedLine startX={600} startY={150} endX={400} endY={200} isRight delay={0.3} />
                    <CurvedLine startX={600} startY={250} endX={400} endY={200} isRight delay={0.5} />
                    <CurvedLine startX={580} startY={350} endX={400} endY={200} isRight delay={0.7} />
                </svg>

                <div className="absolute inset-0 z-40 flex items-center justify-between px-10 md:px-24">
                    <div className="flex flex-col gap-12">
                        <Node icon={<Mail size={22} />} label="Cold Lead" className="translate-x-12" />
                        <Node icon={<Zap size={22} className="text-yellow-500" />} label="Urgent Ticket" />
                        <Node icon={<Quote size={22} className="text-blue-400" />} label="Inquiry" />
                        <Node icon={<Layers size={22} />} label="Bulk Feed" className="translate-x-12" />
                    </div>

                    <div className="flex flex-col gap-12">
                        <Node icon={<UserCheck size={22} className="text-emerald-500" />} label="Qualified Close" className="-translate-x-12" />
                        <Node icon={<BarChart3 size={22} className="text-brand-primary" />} label="Revenue Trend" />
                        <Node icon={<Send size={22} className="text-brand-primary" />} label="Perfect Reply" />
                        <Node icon={<Shield size={22} className="text-brand-primary" />} label="Sovereign Safe" className="-translate-x-12" />
                    </div>
                </div>

                <div className="relative z-30 w-28 h-28 md:w-32 md:h-32 bg-[#050505] rounded-[2.5rem] flex items-center justify-center border border-brand-primary/40 shadow-[0_0_60px_rgba(var(--brand-primary-rgb),0.2)]">
                    <Bird className="w-12 h-12 text-brand-primary" />
                    <div className="absolute inset-0 bg-brand-primary/10 blur-2xl rounded-full animate-pulse" />

                    {[...Array(8)].map((_, i) => (
                        <Spark key={i} index={i} />
                    ))}
                </div>
            </div>

            <FinalCTA
                title={<>Convert Threads to <span className="text-brand-primary">Revenue.</span></>}
                description="Stop letting leads die in your inbox. Activate your neural email relay today and turn every interaction into a meaningful business outcome."
                icon={Sparkles}
                primaryBtnText="Start Converting"
            />
        </section>
    );
}

function CurvedLine({ startX, startY, endX, endY, isRight = false, delay = 0 }: any) {
    const controlX = isRight ? startX - 120 : startX + 120;
    const path = `M ${startX} ${startY} Q ${controlX} ${startY} ${endX} ${endY}`;

    return (
        <g>
            <path d={path} fill="none" stroke="var(--color-brand-primary)" strokeWidth="0.5" className="opacity-10" />
            <motion.path
                d={path}
                fill="none"
                stroke="url(#blueGrad)"
                strokeWidth="2"
                strokeDasharray="40, 160"
                initial={{ strokeDashoffset: 200 }}
                animate={{ strokeDashoffset: [200, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear", delay }}
            />
        </g>
    );
}

function Node({ icon, label, className }: { icon: any; label: string; className?: string }) {
    return (
        <div className={`group flex flex-col items-center gap-2 ${className}`}>
            <div className="w-14 h-14 md:w-16 md:h-16 cursor-pointer rounded-2xl bg-[#0a0a0a] border border-white/5 flex items-center justify-center text-white/50 shadow-2xl transition-all hover:border-brand-primary/50 hover:text-brand-primary hover:scale-110">
                {icon}
            </div>
            <span className="text-[8px] font-black uppercase tracking-widest text-foreground/50 group-hover:text-brand-primary transition-colors">
                {label}
            </span>
        </div>
    );
} 