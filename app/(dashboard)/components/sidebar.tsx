"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard, Globe, Users, Cable,
    ShieldCheck, Bird, X, LogOut,
    Building2, Code2, CreditCard,
    MailPlus, ScrollText
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const menuItems = [
    { name: 'Overview', href: '/account', icon: LayoutDashboard },
    { name: 'Mailboxes', href: '/account/mailboxes', icon: MailPlus },
    { name: 'Domains', href: '/account/domains', icon: Globe },
    { name: 'Organization', href: '/account/org', icon: Building2 },
    // { name: 'Subscription', href: '/account/billing', icon: CreditCard },
    // { name: 'Aliases & Groups', href: '/account/groups', icon: Users, isComingSoon: true },
    // { name: 'Audit Logs', href: '/account/logs', icon: ScrollText, isComingSoon: true },
    // { name: 'Security', href: '/account/security', icon: ShieldCheck, isComingSoon: true },
    { name: 'Connect App', href: '/account/connect', icon: Cable, isComingSoon: true },
    { name: 'API Keys', href: '/account/developer', icon: Code2, isComingSoon: true },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();
    const { logout } = useAuth();

    /**
     * Helper to render links or coming soon placeholders
     */
    const renderNavLink = (item: typeof menuItems[0], isMobile: boolean) => {
        const isActive = pathname === item.href;

        const commonClasses = `group flex items-center justify-between px-4 py-3 md:py-2.5 rounded-xl md:rounded-lg text-sm font-medium transition-all ${isActive
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 md:shadow-md'
                : item.isComingSoon
                    ? 'text-slate-600 cursor-not-allowed opacity-80'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`;

        const content = (
            <>
                <div className="flex items-center">
                    <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : item.isComingSoon ? 'text-slate-700' : 'text-slate-500'
                        }`} />
                    <span>{item.name}</span>
                </div>
                {item.isComingSoon && (
                    <span className="text-[9px] font-black uppercase tracking-widest bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded-md border border-slate-700">
                        Soon
                    </span>
                )}
            </>
        );

        if (item.isComingSoon) {
            return (
                <div key={item.name} className={commonClasses}>
                    {content}
                </div>
            );
        }

        return (
            <Link
                key={item.name}
                href={item.href}
                onClick={isMobile ? onClose : undefined}
                className={commonClasses}
            >
                {content}
            </Link>
        );
    };

    return (
        <>
            {/* MOBILE SIDEBAR OVERLAY */}
            <div
                className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
            >
                <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={onClose} />

                <aside className={`absolute left-0 top-0 h-full w-72 bg-slate-900 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}>
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between px-6 h-16 border-b border-slate-800">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="bg-blue-600 p-1.5 rounded-xl">
                                    <Bird className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-black tracking-tighter text-white uppercase">
                                    Falcon<span className="text-blue-500">Mail</span>
                                </span>
                            </Link>
                            <button onClick={onClose} className="text-slate-400 p-2">
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                            {menuItems.map((item) => renderNavLink(item, true))}
                        </nav>
                        <div className="p-4 border-t border-slate-800">
                            <button onClick={logout} className="flex items-center w-full px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all">
                                <LogOut className="mr-3 h-5 w-5" />
                                <span className="font-medium">Sign Out</span>
                            </button>
                        </div>
                    </div>
                </aside>
            </div>

            {/* DESKTOP SIDEBAR */}
            <aside className="hidden md:flex md:w-64 md:flex-col bg-slate-900 border-r border-slate-800 shrink-0">
                <div className="flex flex-col grow pt-6">
                    <div className="px-6 mb-10">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="bg-blue-600 p-1.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all group-hover:rotate-6">
                                <Bird className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-black tracking-tighter text-white uppercase">
                                Falcon<span className="text-blue-500">Mail</span>
                            </span>
                        </Link>
                    </div>
                    <nav className="flex-1 px-3 space-y-1">
                        {menuItems.map((item) => renderNavLink(item, false))}
                    </nav>
                </div>
                <div className="p-4 border-t border-slate-800">
                    <button
                        onClick={logout}
                        className="flex cursor-pointer items-center w-full px-3 py-2 text-sm font-medium text-slate-400 hover:text-red-400 transition-colors"
                    >
                        <LogOut className="mr-3 h-5 w-5" />
                        Sign Out
                    </button>
                </div>
            </aside>
        </>
    );
}