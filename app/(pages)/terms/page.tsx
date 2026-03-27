"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Shield, Scale, Lock, Globe, Zap, AlertTriangle, Fingerprint, Cpu } from "lucide-react";

const SECTIONS = [
    { id: "acceptance", title: "Acceptance", icon: <Scale className="w-4 h-4" /> },
    { id: "licensing", title: "Proprietary Licensing", icon: <Cpu className="w-4 h-4" /> },
    { id: "sovereignty", title: "Data Sovereignty", icon: <Shield className="w-4 h-4" /> },
    { id: "usage", title: "Acceptable Use", icon: <Lock className="w-4 h-4" /> },
    { id: "security", title: "Encryption Protocols", icon: <Fingerprint className="w-4 h-4" /> },
    { id: "liability", title: "Liability & Warranty", icon: <AlertTriangle className="w-4 h-4" /> },
];

export default function TermsPage() {
    const [activeSection, setActiveSection] = useState("acceptance");
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.3, rootMargin: "-10% 0px -70% 0px" }
        );

        SECTIONS.forEach((section) => {
            const el = document.getElementById(section.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground pt-32 pb-24 transition-colors duration-500 font-sans">
            {/* Top Progress Bar */}
            <motion.div className="fixed top-0 left-0 right-0 h-1 bg-brand-primary z-50 origin-left" style={{ scaleX }} />

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16">

                {/* Interactive Sidebar */}
                <aside className="hidden lg:block sticky top-32 h-fit">
                    <div className="space-y-1 relative">
                        <div className="absolute left-0 top-0 bottom-0 w-px bg-border/40 ml-[11px]" />
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary mb-6 px-3">Legal Framework</p>
                        {SECTIONS.map((section) => (
                            <a
                                key={section.id}
                                href={`#${section.id}`}
                                className={`flex items-center gap-4 px-3 py-3 rounded-xl text-sm font-medium transition-all group relative ${activeSection === section.id
                                        ? "text-brand-primary"
                                        : "text-muted-foreground/60 hover:text-foreground"
                                    }`}
                            >
                                <div className={`z-10 w-6 h-6 rounded-full flex items-center justify-center border transition-all ${activeSection === section.id
                                        ? "bg-brand-primary border-brand-primary text-white scale-110"
                                        : "bg-background border-border group-hover:border-brand-primary/50 text-muted-foreground"
                                    }`}>
                                    {section.icon}
                                </div>
                                {section.title}
                            </a>
                        ))}
                    </div>
                </aside>

                {/* Descriptive Content */}
                <motion.main
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="max-w-3xl"
                >
                    <header className="mb-16">
                        <h5 className="text-4xl md:text-7xl font-black tracking-tighter mb-6 leading-none">
                            Terms & Conditions
                        </h5>
                        <div className="flex items-center gap-4 text-muted-foreground/60 font-mono text-[11px] uppercase tracking-widest">
                            <span>Ref: FLCN-01-JAN-2026-V1</span>
                            <span className="w-1 h-1 bg-border rounded-full" />
                            <span>FalconMail Services Ltd</span>
                        </div>
                    </header>

                    <section id="acceptance" className="mb-20 scroll-mt-32">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <span className="text-brand-primary font-mono text-sm">01.</span> Acceptance of Terms
                        </h2>
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                            <p>
                                By engaging with the Falcon Engine (the "Service"), you enter into a legally binding agreement with Ayokah Services Limited. These terms govern your use of our proprietary Rust-based communication infrastructure, JMAP relays, and AI-driven automation tools.
                            </p>
                            <p>
                                If you do not agree to these terms, you must immediately cease all access to the platform and decommission any active Falcon nodes associated with your identity.
                            </p>
                        </div>
                    </section>

                    <section id="licensing" className="mb-20 scroll-mt-32">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <span className="text-brand-primary font-mono text-sm">02.</span> Proprietary Licensing
                        </h2>
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                            <p>
                                Falcon grants you a limited, revocable, non-transferable license to utilize the "Omni-Sync" core. This license is strictly for your business operations and does not constitute a sale of the underlying source code.
                            </p>
                            <div className="bg-secondary/30 border border-border/40 p-6 rounded-2xl">
                                <h4 className="text-foreground font-bold text-sm mb-2">Restricted Actions:</h4>
                                <ul className="list-disc pl-5 space-y-2 text-sm italic">
                                    <li>Attempting to decompile the Rust-compiled binary files.</li>
                                    <li>Using the JMAP bridge to circumvent third-party platform rate limits.</li>
                                    <li>Automating interactions on Instagram or WhatsApp in violation of Meta's TOS.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section id="sovereignty" className="mb-20 scroll-mt-32">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-brand-primary">
                            <span className="font-mono text-sm">03.</span> Data Sovereignty & AI
                        </h2>
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                            <p>
                                <strong>The Zero-Read Policy:</strong> Our 10ms search engine indexes your data locally on your provisioned node. Ayokah Services Limited maintains zero visibility into the content of your messages or AI-generated drafts.
                            </p>
                            <p>
                                <strong>AI Responsibilities:</strong> The Falcon AI interprets message threads to provide suggested actions. While highly accurate, you remain solely responsible for the final dispatch of any communication. Falcon is not liable for outcomes resulting from automated "Rich AI" responses.
                            </p>
                        </div>
                    </section>

                    <section id="usage" className="mb-20 scroll-mt-32">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <span className="text-brand-primary font-mono text-sm">04.</span> Acceptable Use
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            You agree not to use the Service for any unlawful activities, including but not limited to the transmission of malware, the hosting of fraudulent "phishing" web-chats, or the unauthorized harvesting of contact data through our global presence features.
                        </p>
                    </section>

                    <section id="security" className="mb-20 scroll-mt-32 p-8 border border-brand-primary/20 bg-brand-primary/5 rounded-3xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Fingerprint size={80} />
                        </div>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <span className="text-brand-primary font-mono text-sm">05.</span> Encryption Protocols
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
                            Encryption is handled via 256-bit E2EE. Users are issued a "Sovereign Key" upon account initialization.
                        </p>
                        <p className="text-brand-primary font-bold text-sm italic border-l-2 border-brand-primary pl-4">
                            WARNING: Ayokah Services cannot recover lost Sovereign Keys. Loss of this key results in permanent data inaccessibility.
                        </p>
                    </section>

                    <section id="liability" className="mb-20 scroll-mt-32">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <span className="text-brand-primary font-mono text-sm">06.</span> Limitation of Liability
                        </h2>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                            To the maximum extent permitted by law, Falcon (FalconMail Services Ltd) provides the service "AS IS" and "AS AVAILABLE". We are not liable for business interruptions caused by third-party API outages (e.g., WhatsApp downtime) or "Stalwart Config Errors" resulting from user-side modifications.
                        </p>
                    </section>

                    <footer className="mt-32 pt-12 border-t border-border/40 text-center">
                        <p className="text-[10px] text-muted-foreground/40 uppercase tracking-[0.4em]">
                            Security Verified • Falcon Engine v1.0 • FalconMail Services Ltd
                        </p>
                    </footer>
                </motion.main>
            </div>
        </div>
    );
}