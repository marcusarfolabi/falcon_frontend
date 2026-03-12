"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Terminal, RefreshCw, CheckCircle2 } from "lucide-react";
import SecureContactSection from "./components/SecureContactSection";
import { PagesApi } from "@/lib/api/pages";
import toast from "react-hot-toast";

const CHALLENGES = [
    { question: "What is 12 + 15?", answer: "27", category: "Math" },
    { question: "Square root of 64?", answer: "8", category: "Math" },
    { question: "Opposite of 'Dark'?", answer: "light", category: "English" },
    { question: "Type the word 'Falcon'?", answer: "falcon", category: "English" },
    { question: "Symbol for Water?", answer: "h2o", category: "Physics" },
    { question: "Is the Earth flat or round?", answer: "round", category: "Physics" },
];

export default function ContactPage() {
    const [loading, setLoading] = useState(false);
    const [userAnswer, setUserAnswer] = useState("");
    const [challenge, setChallenge] = useState(CHALLENGES[0]);
    const [isVerified, setIsVerified] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        type: "General Inquiry",
        message: ""
    });

    useEffect(() => {
        refreshChallenge();
    }, []);

    const refreshChallenge = () => {
        const random = CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)];
        setChallenge(random);
        setUserAnswer("");
        setIsVerified(false);
    };

    useEffect(() => {
        if (userAnswer.toLowerCase().trim() === challenge.answer.toLowerCase()) {
            setIsVerified(true);
        } else {
            setIsVerified(false);
        }
    }, [userAnswer, challenge]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isVerified) return;

        setLoading(true);
        try {
            await PagesApi.contactMail(formData);
            toast.success("Transmission successful.");
            // Reset form
            setFormData({ name: "", email: "", type: "General Inquiry", message: "" });
            refreshChallenge();
        } catch (error) {
            console.error("Transmission error:", error);
            toast.error("Transmission failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground pt-32 pb-24 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-20">
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-6">
                        Right <span className="text-brand-primary text-4xl md:text-9xl">Here!</span>
                    </h1>
                    <p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
                        Need technical assistance? Our relay is open 24/7.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    <div className="lg:col-span-4 space-y-12">
                        <SecureContactSection />
                        <section className="p-8 bg-secondary/20 rounded-3xl border border-border/40">
                            <div className="flex items-center gap-3 mb-4">
                                <MapPin className="text-brand-primary w-5 h-5" />
                                <h4 className="font-bold">Mailing Address</h4>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                FalconMail Services Limited<br />
                                360 Kent, LN. UK
                            </p>
                        </section>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-8 bg-card border border-border/60 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <Terminal size={200} />
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Identity</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-background border border-border/60 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary/50 transition-all font-medium"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Digital Address</label>
                                    <input
                                        required
                                        type="email"
                                        placeholder="Email@domain.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-background border border-border/60 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary/50 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Transmission</label>
                                <textarea
                                    required
                                    rows={4}
                                    placeholder="How can we assist your business operations?"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-background border border-border/60 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary/50 transition-all font-medium resize-none"
                                />
                            </div>

                            {/* Human Verification Block */}
                            <div className="p-6 bg-secondary/10 border border-border/40 rounded-3xl space-y-4">
                                <div className="flex justify-between items-center"> 
                                    <button hidden type="button" onClick={refreshChallenge} className="text-muted-foreground hover:text-brand-primary transition-colors">
                                        <RefreshCw size={14} />
                                    </button>
                                </div>

                                <div className="flex flex-col md:flex-row gap-4 items-center">
                                    <p className="flex-1 font-mono text-sm bg-background/50 p-4 rounded-xl border border-border/20">
                                        {challenge.question}
                                    </p>
                                    <div className="relative w-full md:w-48">
                                        <input
                                            type="text"
                                            placeholder="Answer..."
                                            value={userAnswer}
                                            onChange={(e) => setUserAnswer(e.target.value)}
                                            className={`w-full bg-background border ${isVerified ? 'border-green-500/50' : 'border-border/60'} rounded-xl px-4 py-3 outline-none transition-all font-bold text-center`}
                                        />
                                        {isVerified && <CheckCircle2 className="absolute right-3 top-3.5 text-green-500 w-4 h-4" />}
                                    </div>
                                </div>
                            </div>

                            <button
                                disabled={!isVerified || loading}
                                className={`group w-full font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl
                  ${isVerified
                                        ? 'bg-brand-primary text-white hover:scale-[1.02] active:scale-[0.98]'
                                        : 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'}
                `}
                            >
                                {loading ? "Transmitting..." : "Send Transmission"}
                                {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}