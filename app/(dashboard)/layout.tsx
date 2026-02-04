"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Footer from './components/footer';
import Header from './components/header';
import Sidebar from './components/sidebar';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setSidebarOpen(false);
    }, [pathname]);

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-(family-name:--font-instrument)">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                <Header onMenuClick={() => setSidebarOpen(true)} />
                <main className="flex-1 overflow-y-auto bg-slate-50/50 focus:outline-none">
                    <div className="py-6 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}