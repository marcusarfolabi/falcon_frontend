"use client";
import { Globe, ArrowRight, Zap } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-56 lg:pb-40 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-8 animate-bounce">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">Next-Gen Mail Engine Ready</span>
                </div>

                {/* Headline */}
                <h1 className="text-6xl md:text-9xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.85]">
                    Email at the <br />
                    <span className="relative inline-block group">
                        <span className="relative z-10 italic pb-1">speed of Falcon.</span>
                        <div className="absolute bottom-1 left-0 w-full h-1.5 bg-slate-100 rounded-full -z-10" />
                    </span>
                </h1>

                <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
                    Secure, ad-free business communication. Built for teams that demand privacy and extreme performance.
                </p>

                {/* Domain Checker Input */}
                <div className="max-w-2xl mx-auto bg-white p-2 rounded-4xl shadow-2xl border border-slate-100 flex flex-col sm:flex-row gap-2">
                    <div className="flex-1 flex items-center px-4 py-4 sm:py-0">
                        <Globe className="w-6 h-6 text-slate-400 mr-3" />
                        <input
                            type="text"
                            placeholder="enter your business domain..."
                            className="w-full text-lg font-bold outline-none border-none focus:ring-0"
                        />
                    </div>
                    <button className="bg-slate-900 text-white px-8 py-5 rounded-3xl font-bold text-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-2 group">
                        Check Availability
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <p className="mt-6 text-sm font-bold text-slate-400 uppercase tracking-widest">No Credit Card • 14 Day Free Trial</p>
            </div>

            {/* Background Blobs */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0">
                <div className="absolute top-20 left-[-10%] w-125 h-125 bg-blue-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-pulse" />
                <div className="absolute top-40 right-[-10%] w-125 h-125 bg-indigo-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-pulse" />
            </div>
        </section>
    );
}