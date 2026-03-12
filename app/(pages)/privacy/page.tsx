"use client";
import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { EyeOff, Database, Share2, Binary, HardDrive, Bell, ShieldCheck } from "lucide-react";

const PRIVACY_SECTIONS = [
    { id: "collection", title: "Data Collection", icon: <Database className="w-4 h-4" /> },
    { id: "processing", title: "AI Processing", icon: <Binary className="w-4 h-4" /> },
    { id: "storage", title: "Storage & Nodes", icon: <HardDrive className="w-4 h-4" /> },
    { id: "sharing", title: "Third-Party Sync", icon: <Share2 className="w-4 h-4" /> },
    { id: "rights", title: "User Sovereignty", icon: <ShieldCheck className="w-4 h-4" /> },
];

export default function PrivacyPage() {
    const [activeSection, setActiveSection] = useState("collection");
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { threshold: 0.3, rootMargin: "-10% 0px -70% 0px" }
        );

        PRIVACY_SECTIONS.forEach((s) => {
            const el = document.getElementById(s.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground pt-32 pb-24 transition-colors duration-500 font-sans">
            <motion.div className="fixed top-0 left-0 right-0 h-1 bg-brand-accent z-50 origin-left" style={{ scaleX }} />

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16">

                {/* Navigation Sidebar */}
                <aside className="hidden lg:block sticky top-32 h-fit">
                    <div className="space-y-1 relative">
                        <div className="absolute left-0 top-0 bottom-0 w-px bg-border/40 ml-[11px]" />
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-accent mb-6 px-3">Privacy Protocol</p>
                        {PRIVACY_SECTIONS.map((section) => (
                            <a
                                key={section.id}
                                href={`#${section.id}`}
                                className={`flex items-center gap-4 px-3 py-3 rounded-xl text-sm font-medium transition-all group relative ${activeSection === section.id ? "text-brand-accent" : "text-muted-foreground/60 hover:text-foreground"
                                    }`}
                            >
                                <div className={`z-10 w-6 h-6 rounded-full flex items-center justify-center border transition-all ${activeSection === section.id
                                    ? "bg-brand-accent border-brand-accent text-white scale-110 shadow-[0_0_15px_rgba(0,212,255,0.4)]"
                                    : "bg-background border-border group-hover:border-brand-accent/50 text-muted-foreground"
                                    }`}>
                                    {section.icon}
                                </div>
                                {section.title}
                            </a>
                        ))}
                    </div>
                </aside>

                {/* Content Area */}
                <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl">
                    <header className="mb-16">
                        <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-6 leading-none">
                            Privacy Policy
                        </h1>
                        <div className="flex items-center gap-4 text-muted-foreground/60 font-mono text-[11px] uppercase tracking-widest">
                            <span>Ref: FLCN-01-JAN-2026-V1</span>
                            <span className="w-1 h-1 bg-border rounded-full" />
                            <span>Ayokah Services Ltd</span>
                        </div>
                    </header>

                    <section id="collection" className="mb-20 scroll-mt-32">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <span className="text-brand-accent font-mono text-sm">01.</span> Information Collection
                        </h2>
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                            <p>
                                Falcon is engineered to minimize data footprint. We categorize collected data into two tiers:
                            </p>
                            <ul className="space-y-4">
                                <li className="p-4 bg-secondary/20 rounded-2xl border border-border/40">
                                    <span className="text-foreground font-bold block mb-1">Account Metadata:</span>
                                    <span className="text-sm">Email address, billing information, and node status. This is the only data Falcon can see to manage your subscription.</span>
                                </li>
                                <li className="p-4 bg-brand-accent/5 rounded-2xl border border-brand-accent/20">
                                    <span className="text-brand-accent font-bold block mb-1 underline decoration-brand-accent/20">Communication Data:</span>
                                    <span className="text-sm italic text-foreground/70">End-to-end encrypted. Falcon staff cannot access, read, or sell the content of your messages, attachments, or contact lists.</span>
                                </li>
                            </ul>
                        </div>
                    </section>



                    <section id="processing" className="mb-20 scroll-mt-32">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <span className="text-brand-accent font-mono text-sm">02.</span> AI Processing & Logic
                        </h2>
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                            <p>
                                Our "Rich AI" engine operates on a <strong>Volatile Memory</strong> basis. When interpreting a 140+ message thread:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                                <div className="p-4 border border-border/40 rounded-xl">
                                    <h4 className="text-foreground font-bold text-xs mb-2 flex items-center gap-2"><EyeOff className="w-3 h-3 text-brand-accent" /> No Training</h4>
                                    <p className="text-[12px]">Your private business conversations are never used to train global AI models.</p>
                                </div>
                                <div className="p-4 border border-border/40 rounded-xl">
                                    <h4 className="text-foreground font-bold text-xs mb-2 flex items-center gap-2"><Bell className="w-3 h-3 text-brand-accent" /> Local Indexing</h4>
                                    <p className="text-[12px]">Processing occurs on your dedicated Stalwart node, ensuring speed without exposure.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="storage" className="mb-20 scroll-mt-32">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <span className="text-brand-accent font-mono text-sm">03.</span> Storage & Node Sovereignty
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                            All data indexed for the <span className="text-foreground font-semibold">10ms search</span> is stored in a sandboxed Rust environment. We utilize <strong>Stalwart JMAP Core</strong> which ensures that even in the event of a physical server breach, your data remains unreadable without your Sovereign Master Key.
                        </p>
                    </section>

                    <section id="sharing" className="mb-20 scroll-mt-32">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <span className="text-brand-accent font-mono text-sm">04.</span> Third-Party Syncing (Meta/X/Google)
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            When you connect WhatsApp or Instagram, Falcon acts as a <strong>Secure Relay</strong>. We do not store copies of your messages on our central servers; we relay them directly between your device and the platform provider via encrypted tunnels.
                        </p>
                    </section>

                    <section id="rights" className="mb-20 scroll-mt-32 p-8 border border-brand-accent/20 bg-brand-accent/5 rounded-3xl relative overflow-hidden">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <span className="text-brand-accent font-mono text-sm">05.</span> Your Rights & Sovereignty
                        </h2>
                        <div className="space-y-4 text-sm text-muted-foreground/80">
                            <p>Under global privacy standards (GDPR, CCPA), you have the absolute right to:</p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 list-none">
                                <li className="flex items-center gap-2">✓ <span className="text-foreground">Full Data Portability</span></li>
                                <li className="flex items-center gap-2">✓ <span className="text-foreground">Instant Node Decommissioning</span></li>
                                <li className="flex items-center gap-2">✓ <span className="text-foreground">Zero-Trace Erasure</span></li>
                                <li className="flex items-center gap-2">✓ <span className="text-foreground">Encryption Key Auditing</span></li>
                            </ul>
                        </div>
                    </section>

                    <footer className="mt-32 pt-12 border-t border-border/40 text-center">
                        <p className="text-[10px] text-muted-foreground/40 uppercase tracking-[0.4em]">
                            GDPR Compliant • E2EE Verified • Ayokah Services Ltd
                        </p>
                    </footer>
                </motion.main>
            </div>
        </div>
    );
}