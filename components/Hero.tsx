"use client";

import { motion } from "framer-motion";
import {
    Mail, MessageSquare, Shield, Bird,
    Instagram, Facebook, PhoneCall, Bot,
    MessageCircle,
    Send,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const XIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.494h2.039L6.486 3.24H4.298l13.311 17.407z" />
    </svg>
);

export default function Hero() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    return (
        <section className="relative w-full pt-32 pb-20 flex flex-col items-center overflow-hidden bg-background">

            <div className="container mx-auto px-6 z-20 flex flex-col items-center text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-6">
                    Revolutionize Your Business with <br />
                    <span className="text-brand-primary">Next-Level AI Support</span>
                </h1>
            </div>

            <div className="relative w-full max-w-5xl h-112.5 flex items-center justify-center">

                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 400">
                    <defs>
                        <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="var(--color-brand-primary)" stopOpacity="0" />
                            <stop offset="50%" stopColor="var(--color-brand-primary)" stopOpacity="1" />
                            <stop offset="100%" stopColor="var(--color-brand-primary)" stopOpacity="0.5" />
                        </linearGradient>
                    </defs>

                    <CurvedLine startX={220} startY={50} endX={400} endY={200} delay={0} />
                    <CurvedLine startX={200} startY={150} endX={400} endY={200} delay={0.2} />
                    <CurvedLine startX={200} startY={250} endX={400} endY={200} delay={0.4} />
                    <CurvedLine startX={280} startY={350} endX={400} endY={200} delay={0.6} />

                    <CurvedLine startX={580} startY={50} endX={400} endY={200} isRight delay={0.1} />
                    <CurvedLine startX={600} startY={150} endX={400} endY={200} isRight delay={0.3} />
                    <CurvedLine startX={600} startY={250} endX={400} endY={200} isRight delay={0.5} />
                    <CurvedLine startX={520} startY={350} endX={400} endY={200} isRight delay={0.7} />
                </svg>

                <div className="absolute inset-0 z-40 flex items-center justify-between px-10 md:px-24">

                    {/* Left Column: Socials & Messaging */}
                    <div className="flex flex-col gap-12">
                        <Node icon={<XIcon />} className="translate-x-12" />
                        <Node icon={<Facebook size={20} className="text-blue-600" />} />
                        <Node icon={<MessageCircle size={20} className="text-green-500" />} />
                        <Node icon={<Send size={20} className="text-sky-500" />} className="translate-x-12" />
                    </div>

                    {/* Right Column: Infrastructure & AI */}
                    <div className="flex flex-col gap-12">
                        <Node icon={<Mail size={20} className="text-brand-primary" />} className="-translate-x-12" />
                        <Node icon={<PhoneCall size={14} />} />
                        <Node icon={<Instagram size={20} className="text-pink-500" />} />
                        <Node icon={<Bot />} className="-translate-x-12" />
                    </div>
                </div>

                {/* Central Core (Hub) */}
                <div className="relative z-30 w-24 h-24 md:w-28 md:h-28 bg-[#0a0a0a] rounded-3xl flex items-center justify-center border border-brand-primary/50 shadow-[0_0_50px_rgba(45,91,255,0.3)]">
                    <Bird className="w-10 h-10 text-brand-primary" />
                    <div className="absolute inset-0 bg-brand-primary/20 blur-xl rounded-full animate-pulse" />
                </div>
            </div>

            <div className="mt-24 flex flex-col items-center gap-10">
                <span className="text-foreground/30 font-black uppercase tracking-[0.4em] text-[10px]">
                    Trusted by innovative companies
                </span>

                <div className="relative flex w-full max-w-4xl overflow-hidden mask-[linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
                    {mounted ? (
                        <motion.div
                            className="flex gap-16 items-center whitespace-nowrap px-8"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{
                                duration: 25,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        >
                            {[...companies, ...companies].map((company, index) => (
                                <Link
                                    key={index}
                                    href={company.href}
                                    target="_blank"
                                    className="group flex items-center gap-3 transition-all duration-300"
                                >
                                    <Image
                                        src={company.logo}
                                        alt={company.name}
                                        width={40}
                                        height={40}
                                        className="h-10 w-auto min-w-10 block object-contain"
                                    />
                                    <span className="text-foreground font-bold tracking-tight text-lg md:text-xl">
                                        {company.name}
                                    </span>
                                </Link>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="h-12 w-full" />
                    )}
                </div>
            </div>
        </section>
    );
}

const companies = [
    {
        name: "African Market Hub",
        logo: "https://africanmarkethub.ca/logo.svg",
        href: "https://africanmarkethub.ca",
    },
    {
        name: "HonourWorld",
        logo: "https://www.honourworld.com/static/media/hw.75584060016b19cac5564410c2b1bc00.svg",
        href: "https://www.honourworld.com",
    },
];

function CurvedLine({ startX, startY, endX, endY, isRight = false, delay = 0 }: any) {
    const controlX = isRight ? startX - 100 : startX + 100;
    const path = `M ${startX} ${startY} Q ${controlX} ${startY} ${endX} ${endY}`;

    return (
        <g>
            <path d={path} fill="none" stroke="var(--color-brand-primary)" strokeWidth="1" className="opacity-20" />
            <motion.path
                d={path}
                fill="none"
                stroke="url(#blueGrad)"
                strokeWidth="2"
                strokeDasharray="50, 150"
                initial={{ strokeDashoffset: 200 }}
                animate={{ strokeDashoffset: [200, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay }}
            />
        </g>
    );
}

function Node({ icon, className }: { icon: any; className?: string }) {
    return (
        <div className={`w-12 h-12 md:w-16 md:h-16 cursor-pointer rounded-2xl bg-[#111] border border-white/10 flex items-center justify-center text-white/80 shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all hover:border-brand-primary hover:text-brand-primary hover:shadow-[0_0_20px_rgba(45,91,255,0.2)] ${className}`}>
            {icon}
        </div>
    );
} 