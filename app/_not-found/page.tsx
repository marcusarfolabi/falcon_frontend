"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bird, ArrowLeft, Search, ShieldAlert } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6">
            <div className="max-w-3xl w-full text-center">
                {/* 1. Animated Icon Stage */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative inline-block mb-12"
                >
                    <div className="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full animate-pulse" />
                    <div className="relative bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-2xl">
                        <Bird className="w-16 h-16 text-blue-600 animate-bounce" strokeWidth={1.5} />
                        <div className="absolute -top-2 -right-2 bg-slate-900 text-white p-2 rounded-xl shadow-lg">
                            <ShieldAlert className="w-5 h-5 text-blue-400" />
                        </div>
                    </div>
                </motion.div>

                {/* 2. Headline with Brand Typography */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <h1 className="text-7xl md:text-9xl font-black text-slate-900 tracking-tighter mb-6">
                        404<span className="text-blue-600">.</span>
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 tracking-tight">
                        Packet Lost in Transmission.
                    </h2>
                    <p className="text-lg text-slate-500 mb-12 max-w-md mx-auto font-medium leading-relaxed">
                        The resource you are looking for has been encrypted, moved, or never existed in the Falcon ecosystem.
                    </p>
                </motion.div>

                {/* 3. Action Buttons */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        href="/"
                        className="w-full sm:w-auto bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-blue-600 hover:scale-105 transition-all shadow-xl shadow-slate-200"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Terminal
                    </Link>

                    <Link
                        href="/support"
                        className="w-full sm:w-auto bg-white border border-slate-200 text-slate-900 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-slate-50 transition-all"
                    >
                        <Search className="w-4 h-4 text-blue-600" />
                        Check Status
                    </Link>
                </motion.div>

                {/* 4. Subtle System Tag */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-20 flex items-center justify-center gap-4 opacity-30"
                >
                    <div className="h-px w-12 bg-slate-300" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                        Falcon OS // Error Code: 0x404_NULL
                    </span>
                    <div className="h-px w-12 bg-slate-300" />
                </motion.div>
            </div>
        </div>
    );
}