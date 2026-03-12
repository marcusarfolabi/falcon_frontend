"use client";
import { Lock, Bird, Globe, Sparkles, Phone } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function Services() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            },
        },
    };

    return (
        <section id="solutions" className="py-24 bg-background transition-colors duration-500 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                        One Engine. <span className="text-brand-primary">Every Channel.</span>
                    </h2>
                    <p className="text-muted-foreground/60 text-sm tracking-wide">
                        Omnichannel Sovereignty • AI-Rich Intelligence • JMAP Speed
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >

                    <motion.div variants={itemVariants} className="bg-secondary/10 dark:bg-card rounded-2xl p-8 border border-border/40 flex flex-col h-150 relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-foreground">Omni-Sync Core</h3>
                            <Globe className="text-brand-primary w-5 h-5" />
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                            Unified via JMAP. Experience zero-latency syncing across WhatsApp, Instagram, FB, and Email with a single identity.
                        </p>
                        <div className="mt-auto w-full h-1/2 bg-linear-to-t from-brand-primary/10 to-transparent rounded-t-xl border-x border-t border-border/20 flex flex-col p-6 gap-4 overflow-hidden">

                            {/* WhatsApp Signal */}
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="flex items-center gap-3 p-3 bg-card/80 border border-border/40 rounded-xl shadow-sm"
                            >
                                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                                <span className="text-[10px] font-bold tracking-tight">WhatsApp: New Order Lead</span>
                            </motion.div>

                            {/* Instagram Signal */}
                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="flex items-center gap-3 p-3 bg-card/80 border border-border/40 rounded-xl shadow-sm self-end w-[85%]"
                            >
                                <div className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.6)]" />
                                <span className="text-[10px] font-bold tracking-tight">Instagram: Product Inquiry</span>
                            </motion.div>

                            {/* Email Signal */}
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="flex items-center gap-3 p-3 bg-card/80 border border-border/40 rounded-xl shadow-sm w-[90%]"
                            >
                                <div className="w-2 h-2 rounded-full bg-brand-primary shadow-[0_0_8px_rgba(45,91,255,0.6)]" />
                                <span className="text-[10px] font-bold tracking-tight">Email: New Lead Generated</span>
                            </motion.div>

                            {/* Facebook Signal */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="flex items-center gap-3 p-3 bg-card/80 border border-border/40 rounded-xl shadow-sm self-center w-full"
                            >
                                <div className="w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
                                <span className="text-[10px] font-bold tracking-tight">Facebook: I'm interested in your product</span>
                            </motion.div>

                        </div>
                    </motion.div>

                    <div className="flex flex-col gap-6">
                        <motion.div variants={itemVariants} className="bg-secondary/10 dark:bg-card rounded-2xl p-8 border border-border/40 flex flex-col h-100 group">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-foreground">Rich AI Response</h3>
                                <Sparkles className="text-brand-accent w-5 h-5" />
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Not just text. Our AI interprets 140+ message threads to generate response and take actions instantly.
                            </p>
                            <div className="mt-auto self-center relative">
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-28 h-28 bg-brand-primary/5 rounded-3xl border border-brand-primary/20 flex items-center justify-center shadow-[0_0_50px_-12px_rgba(45,91,255,0.3)] group-hover:border-brand-primary/40 transition-colors"
                                >
                                    <Bird className="text-brand-primary w-10 h-10" />
                                </motion.div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="bg-secondary/10 dark:bg-card rounded-2xl p-8 border border-border/40 h-44 relative group overflow-hidden">
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-lg font-bold text-foreground">Global Presence</h3>
                                <Phone className="w-4 h-4 text-brand-primary" />
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed pr-24">
                                Phone & SMS integrated. Automated routing ensures no lead is left in the void.
                            </p>
                            <div className="absolute bottom-6 right-6">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center gap-3 bg-background/80 border border-border/60 px-4 py-3 rounded-2xl backdrop-blur-md shadow-lg"
                                >
                                    <Lock className="w-5 h-5 text-brand-primary" />
                                    <div className="leading-none">
                                        <p className="text-[10px] font-bold text-foreground tracking-widest uppercase">256-BIT</p>
                                        <p className="text-[8px] text-muted-foreground uppercase">E2E Secure</p>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div variants={itemVariants} className="flex flex-col gap-6">
                        <div className="bg-secondary/10 dark:bg-card rounded-2xl p-8 border border-border/40 h-150 flex flex-col overflow-hidden group">
                            <h3 className="text-xl font-bold text-foreground mb-4">The Rust Engine</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                                Search across all platforms—email to WhatsApp—in under 10ms with our proprietary Rust core.
                            </p>

                            <motion.div
                                whileHover={{ x: -5, y: -5 }}
                                className="mt-auto -mr-8 -mb-8 p-6 bg-[#020617] rounded-tl-2xl border-t border-l border-white/5 font-mono text-[11px] transition-transform duration-500"
                            >
                                <div className="flex gap-1.5 mb-4">
                                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                                </div>
                                <p className="text-brand-primary">falcon <span className="text-white">--omni</span> sync</p>
                                <p className="text-slate-500 mt-2">{"// Aggregating 7 channels..."}</p>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                    className="text-emerald-400"
                                >
                                    {"[✓] WhatsApp Active"}
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 1.2 }}
                                    className="text-emerald-400"
                                >
                                    {"[✓] Instagram Linked"}
                                </motion.p>
                                <p className="text-brand-accent mt-4">{"Ready in 0.002s"}</p>
                            </motion.div>
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
}