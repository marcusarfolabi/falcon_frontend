"use client";
import Link from 'next/link';
import { Menu as Hamburger, Bell, Bird, Shield, LogOut, PlusCircle, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface HeaderProps {
    onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shrink-0 relative z-30">
            <div className="flex items-center gap-4">
                {/* --- MOBILE: HAMBURGER --- */}
                <button
                    onClick={onMenuClick}
                    className="p-2 -ml-2 text-slate-500 md:hidden hover:bg-slate-100 rounded-lg transition-colors"
                    aria-label="Open Menu"
                >
                    <Hamburger className="h-6 w-6" />
                </button>

                {/* --- MOBILE: LOGO --- */}
                <div className="md:hidden flex items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-blue-600 p-1.5 rounded-lg shadow-sm">
                            <Bird className="w-4 h-4 text-white" />
                        </div>
                    </Link>
                </div>

                {/* --- DESKTOP: BREADCRUMB --- */}
                <nav className="hidden md:flex items-center gap-2 text-sm font-semibold">
                    <span className="text-slate-400 tracking-wide uppercase text-[11px]">Management</span>
                    <span className="text-slate-200">/</span>
                    <span className="text-slate-900 capitalize">
                        {pathname.split('/').pop()?.replace(/-/g, ' ') || 'Overview'}
                    </span>
                </nav>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                
                <div className="hidden lg:flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full">
                    <div className="h-2 w-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                    <span className="text-[11px] font-bold text-slate-600 uppercase tracking-tight">Admin Console</span>
                </div>

                {/* --- NOTIFICATIONS --- */}
                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                {/* --- USER MENU --- */}
                <Menu as="div" className="relative inline-block text-left">
                    <MenuButton className="group flex items-center gap-2 outline-none">
                        <div className="h-9 w-9 rounded-full bg-linear-to-tr from-slate-800 to-slate-900 flex items-center justify-center text-white font-bold text-xs ring-2 ring-offset-2 ring-transparent group-hover:ring-slate-200 transition-all shadow-sm">
                            {user?.name?.charAt(0).toUpperCase() || 'A'}
                        </div>
                        <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors hidden sm:block" />
                    </MenuButton>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <MenuItems className="absolute right-0 mt-3 w-64 origin-top-right divide-y divide-slate-100 rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none overflow-hidden border border-slate-100">
                            {/* User Profile Summary */}
                            <div className="px-4 py-4 bg-slate-50/50">
                                <div className="flex items-center gap-3">
                                    <div className="h-9 w-9 rounded-full bg-linear-to-tr from-slate-800 to-slate-900 flex items-center justify-center text-white font-bold text-xs ring-2 ring-offset-2 ring-transparent group-hover:ring-slate-200 transition-all shadow-sm">
                                        {user?.name?.charAt(0).toUpperCase() || 'A'}
                                    </div>
                                    <div className="flex flex-col truncate">
                                        <span className="text-sm font-bold text-slate-900 truncate">{user?.name || 'Administrator'}</span>
                                        <span className="text-xs text-slate-500 truncate">{user?.email}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Main Actions */}
                            <div className="p-2">
                                <MenuItem>
                                    {({ active }) => (
                                        <Link href="/account/mailboxes" className={`${active ? 'bg-blue-50 text-blue-600' : 'text-slate-700'} flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors`}>
                                            <PlusCircle className="h-4 w-4 opacity-70" />
                                            Provision Account
                                        </Link>
                                    )}
                                </MenuItem>
                                <MenuItem>
                                    {({ active }) => (
                                        <Link href="/account/security" className={`${active ? 'bg-blue-50 text-blue-600' : 'text-slate-700'} flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors`}>
                                            <Shield className="h-4 w-4 opacity-70" />
                                            Privacy & Security
                                        </Link>
                                    )}
                                </MenuItem>
                            </div>

                            {/* Logout Area */}
                            <div className="p-2 bg-slate-50/30">
                                <MenuItem>
                                    {({ active }) => (
                                        <button
                                            onClick={() => logout?.()}
                                            className={`${active ? 'bg-red-50 text-red-600' : 'text-slate-600'} flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors`}
                                        >
                                            <LogOut className="h-4 w-4 opacity-70" />
                                            Sign Out
                                        </button>
                                    )}
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </Transition>
                </Menu>
            </div>
        </header>
    );
}