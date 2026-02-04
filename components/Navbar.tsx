"use client";
import { useState, useEffect } from 'react';
import { Bird, AlignRight, X } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full z-100 transition-all duration-500 ${isScrolled || mobileMenu
            ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm'
            : 'bg-transparent py-6'
            }`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex justify-between items-center h-12">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="bg-blue-600 p-2 rounded-2xl transition-all group-hover:rotate-6 group-hover:scale-110 shadow-lg shadow-blue-200">
                            <Bird className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-slate-900 uppercase">
                            Falcon<span className="text-blue-600">Mail</span>
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        {['Solutions', 'Security', 'Pricing'].map((item) => (
                            <Link key={item} href={`#${item.toLowerCase()}`} className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 transition">
                                {item}
                            </Link>
                        ))}
                        <div className="h-4 w-px bg-slate-200 mx-2"></div>
                        <Link href="/login" className="text-xs font-black uppercase tracking-widest text-slate-900 hover:text-blue-600 transition">
                            Login
                        </Link>
                        <Link href="/#pricing" className="bg-slate-900 text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 hover:scale-105 transition-all shadow-xl shadow-slate-200">
                            Get Started
                        </Link>
                    </div>

                    <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-2 text-slate-900">
                        {mobileMenu ? <X className="w-8 h-8" /> : <AlignRight className="w-8 h-8" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenu && (
                <div className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-2xl md:hidden px-6 py-12 flex flex-col gap-8">
                    {['Solutions', 'Security', 'Pricing'].map((item) => (
                        <Link key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenu(false)} className="text-3xl font-black uppercase tracking-tighter text-slate-900">
                            {item}
                        </Link>
                    ))}
                    <hr className="border-slate-100" />
                    <Link href="/login" className="text-xl font-bold text-slate-600">Login</Link>
                    <Link href="/#pricing" className="w-full py-5 rounded-3xl bg-blue-600 text-white text-center text-xl font-black uppercase">
                        Start Free Trial
                    </Link>
                </div>
            )}
        </nav>
    );
}