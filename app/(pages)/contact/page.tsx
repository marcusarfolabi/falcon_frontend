"use client";
import React from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, MapPin, Globe, ArrowRight, Terminal } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background text-foreground pt-32 pb-24 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 mb-4"
                    > 
                    </motion.div>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-6">
                        Right <span className="text-brand-primary">Here!</span>
                    </h1>
                    <p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
                        Need technical assistance or interested in enterprise-grade sovereignty?
                        Our relay is open 24/7.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    <div className="lg:col-span-4 space-y-12">
                        <section>
                            <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground/40 mb-6">Direct Channels</h3>
                            <div className="space-y-6">
                                <ContactMethod
                                    icon={<Mail className="w-5 h-5" />}
                                    title="Secure Email"
                                    value="support@falconmail.online"
                                />
                                <ContactMethod
                                    icon={<MessageSquare className="w-5 h-5" />}
                                    title="Live Webchat"
                                    value="Available in Dashboard"
                                />
                                <ContactMethod
                                    icon={<Globe className="w-5 h-5" />}
                                    title="Global Presence"
                                    value="+1 (44) 7930 173135"
                                />
                            </div>
                        </section>

                        <section className="p-8 bg-secondary/20 rounded-3xl border border-border/40">
                            <div className="flex items-center gap-3 mb-4">
                                <MapPin className="text-brand-primary w-5 h-5" />
                                <h4 className="font-bold">Headquarters</h4>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Ayokah Services Limited<br />
                                360 Surakarta Ave #6071,<br />
                                East Java, SR00382, LN.
                            </p>
                        </section>
                    </div>

                    {/* Right: The Command Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-8 bg-card border border-border/60 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <Terminal size={200} />
                        </div>

                        <form className="space-y-8 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Identity</label>
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        className="w-full bg-background border border-border/60 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary/50 transition-all font-medium"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Digital Address</label>
                                    <input
                                        type="email"
                                        placeholder="Email@domain.com"
                                        className="w-full bg-background border border-border/60 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary/50 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Request Type</label>
                                <select className="w-full bg-background border border-border/60 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary/50 transition-all font-medium appearance-none">
                                    <option>General Inquiry</option>
                                    <option>Technical Node Support</option>
                                    <option>Enterprise Integration</option>
                                    <option>Security Audit</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Transmission</label>
                                <textarea
                                    rows={5}
                                    placeholder="How can we assist your business operations?"
                                    className="w-full bg-background border border-border/60 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary/50 transition-all font-medium resize-none"
                                />
                            </div>

                            <button className="group w-full bg-brand-primary text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_-10px_rgba(45,91,255,0.4)]">
                                Send Transmission
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

function ContactMethod({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
    return (
        <div className="flex gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-brand-primary/5 border border-brand-primary/20 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-500">
                {icon}
            </div>
            <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-1">{title}</h4>
                <p className="font-bold text-foreground">{value}</p>
            </div>
        </div>
    );
}