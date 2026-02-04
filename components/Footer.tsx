"use client";
import React from 'react';
import {
    ShieldCheck,
    Mail,
    Globe,
    Linkedin,
    Twitter,
    FileText,
    Server,
    ArrowUpRight,
} from 'lucide-react'; 
import FalconLogo from './common/FalconLogo';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-950 text-slate-400 py-20 border-t border-slate-900">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand & Mission - Unified with Navbar Branding */}
                    <div className="lg:col-span-1">
                       <FalconLogo />

                        <p className="text-sm leading-relaxed mb-8 pr-4">
                            The world’s first JMAP-native mail infrastructure designed for
                            high-stakes communication. We prioritize domain sovereignty and
                            zero-trust data privacy.
                        </p>

                        <div className="flex gap-4">
                            <a href="#" className="p-2.5 bg-slate-900 rounded-xl hover:text-white hover:bg-blue-600 transition-all">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2.5 bg-slate-900 rounded-xl hover:text-white hover:bg-blue-600 transition-all">
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2.5 bg-slate-900 rounded-xl hover:text-white hover:bg-blue-600 transition-all">
                                <Mail className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Governance Section */}
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-[10px]">Governance</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li className="flex items-center gap-2 group cursor-pointer hover:text-blue-400 transition-colors">
                                <FileText className="w-4 h-4 text-slate-600 group-hover:text-blue-400" />
                                Security Whitepaper
                                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                            </li>
                            <li className="flex items-center gap-2 group cursor-pointer hover:text-blue-400 transition-colors">
                                <ShieldCheck className="w-4 h-4 text-slate-600 group-hover:text-blue-400" />
                                Privacy & GDPR
                            </li>
                            <li className="flex items-center gap-2 group cursor-pointer hover:text-blue-400 transition-colors">
                                <Globe className="w-4 h-4 text-slate-600 group-hover:text-blue-400" />
                                Data Residency
                            </li>
                        </ul>
                    </div>

                    {/* Infrastructure Section */}
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-[10px]">Infrastructure</h4>
                        <ul className="space-y-4 text-sm font-medium text-slate-500">
                            <li className="hover:text-blue-400 cursor-pointer transition-colors">Stalwart JMAP Protocol</li>
                            <li className="hover:text-blue-400 cursor-pointer transition-colors">S3 Object Storage</li>
                            <li className="hover:text-blue-400 cursor-pointer transition-colors">Rust Management API</li>
                        </ul>
                    </div>

                    {/* Enterprise Readiness Card */}
                    <div className="bg-slate-900/40 p-6 rounded-4xl border border-slate-800/50 backdrop-blur-sm">
                        <h4 className="text-white font-bold mb-5 text-xs uppercase tracking-tight">Trust & Compliance</h4>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                                <span className="text-[11px] font-bold text-slate-300">SOC2 TYPE II</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                                <span className="text-[11px] font-bold text-slate-300">HIPAA COMPLIANT</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                                <span className="text-[11px] font-bold text-slate-300">256-BIT AES</span>
                            </div>
                        </div>
                        <div className="mt-6 pt-5 border-t border-slate-800 flex items-center gap-2 text-[9px] font-mono text-slate-600 uppercase">
                            <Server className="w-3 h-3" /> Region: US-EAST-01
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black tracking-[0.2em] uppercase">

                    <div className="flex items-center gap-6 order-2 md:order-1">
                        <div className="flex items-center gap-3 group cursor-pointer">
                            <div className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </div>
                            <span className="text-slate-500 group-hover:text-emerald-400 transition-colors">
                                Systems Live
                            </span>
                        </div>
                        <div className="hidden md:block h-3 w-px bg-slate-800" />
                        <p className="text-slate-600">
                            &copy; {currentYear} FalconMail Infrastructure.
                        </p>
                    </div>

                    <div className="flex gap-8 order-1 md:order-2">
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">SLA</a>
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}