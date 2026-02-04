"use client";
import React, { useEffect, useState } from 'react';
import {
    ShieldCheck, Globe, Zap, Key, AlertCircle, ChevronRight,
    HardDrive, Clock, CreditCard, Users, Loader2
} from 'lucide-react';
import Link from 'next/link'; 
import { getAccountOverview } from '@/lib/api/accountOverview';
import { AccountOverviewResponse } from '@/types/overview';

export default function AccountPage() {
    const [data, setData] = useState<AccountOverviewResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadDashboard() {
            try {
                const res = await getAccountOverview();
                setData(res);
            } catch (error) {
                console.error("Failed to load dashboard data", error);
            } finally {
                setIsLoading(false);
            }
        }
        loadDashboard();
    }, []);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                <p className="text-slate-500 font-medium animate-pulse">Syncing your sovereign cloud...</p>
            </div>
        );
    }

    if (!data) return <div className="p-8 text-center text-red-500">Error loading account overview.</div>;

    // Derived values for easy use
    const { subscription, infrastructure, security_score, recent_activity } = data;

    const stats = [
        { label: 'Current Plan', value: subscription.plan_name, icon: CreditCard, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Seats Occupied', value: `${subscription.seats.used} / ${subscription.seats.total}`, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Security Score', value: `${security_score}%`, icon: ShieldCheck, color: 'text-green-600', bg: 'bg-green-50' },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-12 animate-in fade-in duration-500">

            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Account Overview</h1>
                    <p className="text-slate-500 text-sm mt-1">Global settings, subscription health, and security for your organization.</p>
                </div> 
            </div>

            {/* --- DYNAMIC RENEWAL BANNER --- */}
            {subscription.next_billing_date && (
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="bg-blue-100 p-2 rounded-full">
                            <Clock className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-900">Next Billing Cycle</p>
                            <p className="text-xs text-slate-600">Your plan renews on <span className="font-bold">{subscription.next_billing_date}</span>.</p>
                        </div>
                    </div>
                    <Link href='/account/billing' prefetch className="bg-white border border-blue-200 text-blue-700 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-50 transition-colors shadow-sm">
                        Manage Billing
                    </Link>
                </div>
            )}

            {/* --- TOP LEVEL STATS --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                            <p className="text-xl font-black text-slate-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- MAIN MANAGEMENT GRID --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Plan & Team Card */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col border-t-4 border-t-indigo-500">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-slate-900">Subscription & Team</h3>
                            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">{subscription.status}</span>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm font-bold text-slate-700">Seats Used</span>
                                    <span className="text-sm font-medium text-slate-500">{subscription.seats.used} of {subscription.seats.total} seats</span>
                                </div>
                                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex">
                                    <div 
                                        className="bg-indigo-600 h-full rounded-full transition-all duration-1000" 
                                        style={{ width: `${subscription.seats.percentage}%` }}
                                    ></div>
                                </div>
                                {subscription.seats.available <= 1 && (
                                    <p className="text-[11px] text-amber-500 mt-2 italic font-medium">You are at your seat limit.</p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                    <p className="text-[10px] text-slate-400 uppercase font-bold">Billing Status</p>
                                    <p className="text-sm font-bold text-slate-700 uppercase">{subscription.status}</p>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                    <p className="text-[10px] text-slate-400 uppercase font-bold">Payment Method</p>
                                    <p className="text-sm font-bold text-slate-700">
                                        {subscription.card_last_four ? `•••• ${subscription.card_last_four}` : 'Linked Card'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-auto border-t border-slate-100 bg-indigo-50/30 p-4 flex items-center justify-between">
                        <Link href="/account/mailboxes" className="text-indigo-600 text-sm font-bold hover:underline flex items-center gap-1">Manage Mailboxes <ChevronRight className="w-4 h-4" /></Link>
                        <Link hidden href="/account/upgrade" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-indigo-700 transition-all shadow-sm">
                            Upgrade Plan
                        </Link>
                    </div>
                </div>

                {/* Infrastructure & Storage Usage */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <HardDrive className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-bold text-slate-400 uppercase">Storage</p>
                                <p className="text-sm font-bold text-slate-900">{infrastructure.storage.allocated_readable} / {infrastructure.storage.limit_readable}</p>
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">System Resources</h3>
                        <p className="text-sm text-slate-500 mt-1 mb-4">Instance Status: <span className="text-emerald-500 font-bold capitalize">{infrastructure.mailbox_status}</span></p>

                        <div className="mt-4 space-y-3">
                            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                                <div 
                                    className="bg-blue-600 h-full transition-all duration-1000" 
                                    style={{ width: `${infrastructure.storage.percentage}%` }}
                                ></div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap className="w-3.5 h-3.5 text-amber-500" />
                                <p className="text-xs text-slate-500">Your Stalwart cluster is optimized for {infrastructure.domains_count} domain(s).</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-auto border-t border-slate-100 bg-slate-50/50 p-4 text-start">
                        <Link href="/account/domains" className="text-blue-600 text-sm font-bold inline-flex items-center gap-1 hover:gap-2 transition-all">
                            Manage Domains <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                {/* Recent Activity Card */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col lg:col-span-2">
                    <div className="p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <Clock className="w-5 h-5 text-slate-400" />
                            <h3 className="text-lg font-bold text-slate-900">Recent Infrastructure Events</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {recent_activity.map((log, i) => (
                                <div key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                        <div>
                                            <p className="font-bold text-sm text-slate-800">{log.event}</p>
                                            <p className="text-[11px] text-slate-400">{log.device}</p>
                                        </div>
                                    </div>
                                    <span className="text-slate-400 text-[11px] font-medium">{log.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}