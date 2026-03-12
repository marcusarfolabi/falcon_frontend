"use client";
import React from "react";
import Pricing from "@/components/Pricing";
import { Lock, Globe, Database, Cpu, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* 1. Tactical Hero Section */}
            <section className="pt-32 pb-16 px-6">
                <div className="max-w-7xl mx-auto text-center">

                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8">
                        INVEST IN <br />
                        <span className="text-brand-primary">DIGITAL SILENCE.</span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-muted-foreground text-lg md:text-xl leading-relaxed">
                        Standard email is a commodity. Falcon is an asset. Select the tier of privacy
                        required for your executive operations.
                    </p>
                </div>
            </section>

            <Pricing />

            {/* 3. Detailed Feature Deep-Dive */}
            <section className="py-24 bg-secondary/10 border-y border-border/40">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold tracking-tight">Technical Standards</h2>
                        <p className="text-muted-foreground">What powers every Falcon node, regardless of tier.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <FeatureItem
                            icon={<Database className="w-6 h-6 text-brand-primary" />}
                            title="Stalwart JMAP Core"
                            desc="The future of mail protocols. 10x faster than IMAP with native JSON support for seamless AI indexing."
                        />
                        <FeatureItem
                            icon={<Lock className="w-6 h-6 text-brand-primary" />}
                            title="Zero-Knowledge Vault"
                            desc="We don't hold your keys. Your data is encrypted at rest using AES-256-GCM; even we can't read it."
                        />
                        <FeatureItem
                            icon={<Cpu className="w-6 h-6 text-brand-primary" />}
                            title="Volatile AI Logic"
                            desc="Falcon AI processes threads in memory. No data is written to disk for training or external profiling."
                        />
                    </div>
                </div>
            </section>

            {/* 4. Comparison Table (Simplified for Lead Gen) */}
            <section className="py-24 px-6 max-w-5xl mx-auto">
                <h3 className="text-2xl font-bold mb-12 text-center">Feature Matrix</h3>
                <div className="overflow-x-auto border border-border/60 rounded-[2rem] bg-card">
                    <table className="w-full text-sm text-left">
                        <thead className="border-b border-border/60 bg-muted/50">
                            <tr>
                                <th className="p-6 font-bold">Protocol Feature</th>
                                <th className="p-6 text-center font-bold">Solo</th>
                                <th className="p-6 text-center font-bold text-brand-primary">Business</th>
                                <th className="p-6 text-center font-bold">Enterprise</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/40">
                            <ComparisonRow label="Sovereign Identity (Custom Domain)" s="1" b="Up to 6" e="Unlimited" />
                            <ComparisonRow label="Omnichannel Sync (WA/IG/X)" s="Manual" b="2 Suites" e="6 Suites" />
                            <ComparisonRow label="DMARC/BIMI Reputation Management" s="No" b="Yes" e="Advanced" />
                            <ComparisonRow label="Dedicated Cluster IP" s="Shared" b="Dedicated" e="Isolated" />
                        </tbody>
                    </table>
                </div>
            </section>

            {/* 5. Enterprise CTA */}
            <section className="pb-32 px-6">
                <div className="max-w-7xl mx-auto bg-brand-primary p-12 md:p-20 rounded-[3rem] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                        <Globe size={300} />
                    </div>
                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 leading-none">
                            REQUIRING <br />TOTAL ISOLATION?
                        </h2>
                        <p className="text-white/80 text-lg mb-10">
                            For government agencies, legal firms, and billion-dollar entities,
                            we offer custom on-premise deployments and air-gapped clusters.
                        </p>
                        <Link href="/contact"
                            className="bg-white w-1/2 text-brand-primary cursor-pointer px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:gap-5 transition-all">
                            Consult DevOps Team <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
    return (
        <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center">
                {icon}
            </div>
            <h4 className="font-bold text-lg">{title}</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
        </div>
    );
}

function ComparisonRow({ label, s, b, e }: { label: string; s: string; b: string; e: string }) {
    return (
        <tr>
            <td className="p-6 text-muted-foreground font-medium">{label}</td>
            <td className="p-6 text-center font-mono text-[11px]">{s}</td>
            <td className="p-6 text-center font-bold text-brand-primary">{b}</td>
            <td className="p-6 text-center font-mono text-[11px]">{e}</td>
        </tr>
    );
}