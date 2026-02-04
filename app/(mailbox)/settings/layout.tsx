import React from "react";
import Link from "next/link";
import { X, Settings, ShieldCheck, Bell, Palette, User, Database } from "lucide-react";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { id: "general", label: "General", icon: <Settings size={18} />, href: "/settings" },
    { id: "security", label: "Security & Privacy", icon: <ShieldCheck size={18} />, href: "/settings/security" },
    { id: "account", label: "Account", icon: <User size={18} />, href: "/settings/account" },
    { id: "appearance", label: "Appearance", icon: <Palette size={18} />, href: "/settings/appearance" },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} />, href: "/settings/notifications" },
  ];

  return (
    <div className="flex flex-col h-full bg-white z-50 fixed inset-0">
      {/* Header: Full width like Gmail */}
      <header className="flex items-center justify-between px-6 h-16 border-b border-slate-100 bg-white">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg text-white">
            <Settings size={20} />
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Falcon Settings</h1>
        </div>
        
        <Link 
          href="/inbox" 
          className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-all hover:rotate-90"
        >
          <X size={24} />
        </Link>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Settings-Specific Sidebar */}
        <aside className="w-64 border-r border-slate-50 bg-slate-50/30 p-4 hidden md:block">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-500 hover:bg-white hover:text-blue-600 hover:shadow-sm transition-all"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
          
          {/* Quick Server Status Footer */}
          <div className="mt-auto pt-4 border-t border-slate-100 absolute bottom-6 w-52">
             <div className="flex items-center gap-2 px-4 text-[10px] font-black text-emerald-500 uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Stalwart Connected
             </div>
          </div>
        </aside>

        {/* Settings Content Area */}
        <main className="flex-1 overflow-y-auto bg-white custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}