"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings, X, Menu, ChevronRight, User, ShieldCheck } from "lucide-react";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      id: "general",
      label: "General",
      icon: <Settings size={18} />,
      href:"/mail/settings",
    },
    // {
    //   id: "security",
    //   label: "Security & Privacy",
    //   icon: <ShieldCheck size={18} />,
    //   href:"/mail/settings/security",
    // },
    {
      id: "account",
      label: "Account",
      icon: <User size={18} />,
      href:"/mail/settings/account",
    },
    // {
    //   id: "appearance",
    //   label: "Appearance",
    //   icon: <Palette size={18} />,
    //   href:"/mail/settings/appearance",
    // },
    // {
    //   id: "notifications",
    //   label: "Notifications",
    //   icon: <Bell size={18} />,
    //   href:"/mail/settings/notifications",
    // },
  ];

  return (
    <div className="flex flex-col h-full bg-white z-50 fixed inset-0 overflow-hidden font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-6 h-16 border-b border-slate-100 bg-white/80 backdrop-blur-md shrink-0 z-50">
        <div className="flex items-center gap-3">

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 -ml-2 hover:bg-slate-100 rounded-xl md:hidden text-slate-600 transition-colors"
          >
            <Menu size={20} strokeWidth={2.5} />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-blue-600 rounded-lg text-white shadow-lg shadow-blue-200">
              <Settings size={18} strokeWidth={2.5} />
            </div>
            <h1 className="text-lg font-black text-slate-900 tracking-tight hidden xs:block">
              Falcon Settings
            </h1>
          </div>
        </div>

        <Link
          href="/mail/inbox"
          className="flex items-center gap-1.5 px-4 py-2 bg-red-50 hover:bg-red-50 text-slate-500 hover:text-red-600 rounded-full text-xs font-black transition-all active:scale-95 group"
        >
          <span className="hidden sm:inline">Close</span>
          <X
            size={14}
            className="group-hover:rotate-90 transition-transform duration-300"
          />
        </Link>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Slide-over Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-60 md:hidden animate-in fade-in duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar (Desktop & Mobile) */}
        <aside
          className={`
          fixed inset-y-0 left-0 w-72 bg-white z-70 transform transition-transform duration-500 ease-spring md:relative md:translate-x-0 md:w-64 md:bg-slate-50/30 md:border-r md:border-slate-50 p-4 flex flex-col
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        >
          <div className="flex items-center justify-between mb-8 md:hidden">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
              Menu
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-slate-400"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                    isActive
                      ? "bg-white text-blue-600 shadow-xl shadow-slate-200/50 ring-1 ring-slate-100"
                      : "text-slate-500 hover:bg-white hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={isActive ? "text-blue-600" : "text-slate-400"}
                    >
                      {item.icon}
                    </span>
                    {item.label}
                  </div>
                  {isActive && (
                    <ChevronRight size={14} className="text-blue-300" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-6">
            <div className="p-4 bg-emerald-50/50 border border-emerald-100/50 rounded-2xl">
              <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-tighter">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Falcon JMAP Active
              </div>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-white custom-scrollbar scroll-smooth">
          {children}
        </main>
      </div>
    </div>
  );
}
