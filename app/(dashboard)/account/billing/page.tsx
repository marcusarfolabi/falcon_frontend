"use client";
import React, { useEffect, useState } from 'react';
import {
    Download, Receipt, CreditCard, Calendar, CheckCircle2,
    Loader2, ArrowUpRight, ChevronLeft, ChevronRight
} from 'lucide-react';
import { BillingOverviewResponse } from "@/types/billing";
import { getBillingOverview } from '@/lib/api/accountOverview';

export default function BillingPage() {
    const [data, setData] = useState<BillingOverviewResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(5);
    const [isSyncing, setIsSyncing] = useState(false);

    const fetchBillingData = async (currentLimit: number) => {
        try {
            const result = await getBillingOverview(currentLimit);
            setData(result);
        } finally {
            setLoading(false);
            setIsSyncing(false);
        }
    };

    useEffect(() => {
        fetchBillingData(limit);
    }, [limit]);

    const handleNextPage = () => {
        if (data && data.has_more) {
            setIsSyncing(true);
            setLimit(prev => prev + 5);
        }
    };

    const handlePrevPage = () => {
        if (limit > 5) {
            setIsSyncing(true);
            setLimit(prev => Math.max(5, prev - 5));
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-100 space-y-4">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                <p className="text-slate-500 font-medium">Retrieving billing records...</p>
            </div>
        );
    }

    if (!data) return null;

    // Calculate Gmail-style range
    const rangeStart = 1;
    const rangeEnd = Math.min(limit, data.total_count || data.invoices.length);

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* --- TOP SECTION: CURRENT STATUS --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Active Plan Card */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded">Current Plan</span>
                            <span className={`flex items-center gap-1 text-xs font-bold ${data.subscription.status === 'active' ? 'text-emerald-600' : 'text-amber-600'}`}>
                                <CheckCircle2 className="w-3 h-3" /> {data.subscription.status.toUpperCase()}
                            </span>
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 mb-1">Business Sovereign</h2>
                        <p className="text-slate-500 text-sm italic">ID: {data.subscription.plan_id}</p>
                    </div>

                    <div className="mt-8 flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <div className="text-sm">
                                <p className="text-slate-400 text-[10px] font-bold uppercase">Next Billing</p>
                                <p className="text-slate-900 font-bold">{data.subscription.next_billing}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Method Card - Hidden if brand/last4 is missing */}
                {data.payment_method.last4 && (
                    <div className="bg-slate-900 p-6 rounded-2xl shadow-xl text-white flex flex-col justify-between relative overflow-hidden transition-all hover:scale-[1.01]">
                        <div className="relative z-10">
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Linked Payment</h3>
                            <div className="space-y-1">
                                <p className="text-lg font-bold capitalize">{data.payment_method.brand}</p>
                                <p className="text-slate-400 font-mono tracking-tighter text-xl">•••• •••• •••• {data.payment_method.last4}</p>
                            </div>
                        </div>
                        <div className="relative z-10 mt-4">
                            <button className="text-[10px] font-bold text-slate-400 hover:text-white transition-colors flex items-center gap-1 uppercase tracking-widest">
                                Update Card <ArrowUpRight className="w-3 h-3" />
                            </button>
                        </div>
                        <CreditCard className="absolute -bottom-4 -right-4 w-32 h-32 text-white/5 -rotate-12" />
                    </div>
                )}
            </div>

            {/* --- INVOICE HISTORY TABLE --- */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                    <div className="flex items-center gap-4">
                        <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                            <Receipt className="w-4 h-4 text-slate-400" /> Billing History
                        </h3>
                        {isSyncing && <Loader2 className="w-3 h-3 text-blue-500 animate-spin" />}
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-[11px] font-bold text-slate-500 tabular-nums">
                            {rangeStart}-{rangeEnd} of {data.total_count || data.invoices.length}
                        </span>
                        <div className="flex items-center border gap-4 border-slate-200 rounded-lg bg-white overflow-hidden shadow-sm">
                            <button
                                onClick={handlePrevPage}
                                aria-label='previous'
                                disabled={limit <= 5 || isSyncing}
                                className="p-1.5 cursor-pointer hover:bg-slate-50 disabled:opacity-30 transition-colors border-r border-slate-100"
                            >
                                <ChevronLeft className="w-4 h-4 text-slate-600" />
                            </button>
                            <button
                                onClick={handleNextPage}
                                aria-label='next'
                                disabled={!data.has_more || isSyncing}
                                className="p-1.5 cursor-pointer hover:bg-slate-50 disabled:opacity-30 transition-colors"
                            >
                                <ChevronRight className="w-4 h-4 text-slate-600" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            <tr>
                                <th className="px-6 py-4">Invoice ID</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {data.invoices.length > 0 ? data.invoices.map((invoice) => (
                                <tr key={invoice.id} className="group hover:bg-blue-50/30 transition-all duration-200">
                                    <td title={invoice.id} className="px-6 py-4 text-xs font-mono text-slate-400">
                                        {invoice.id.substring(0, 20)}...
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-700">
                                        {invoice.date}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-black text-slate-900">
                                        {invoice.total}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-tighter ${invoice.status === 'paid'
                                                ? 'bg-emerald-100 text-emerald-700'
                                                : 'bg-amber-100 text-amber-700'
                                            }`}>
                                            {invoice.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {invoice.status === 'paid' ? (
                                            <a
                                                href={invoice.pdf_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-slate-600 text-xs font-bold hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm"
                                            >
                                                Download <Download className="w-3.5 h-3.5" />
                                            </a>
                                        ) : (
                                            <a
                                                href={invoice.pdf_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-2 bg-blue-600 border border-blue-600 px-3 py-1.5 rounded-lg text-white text-xs font-bold hover:bg-blue-700 transition-all shadow-sm shadow-blue-100 animate-pulse-subtle"
                                            >
                                                Pay Now <CreditCard className="w-3.5 h-3.5" />
                                            </a>
                                        )}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center opacity-40">
                                            <Receipt className="w-8 h-8 mb-2" />
                                            <p className="text-sm font-medium">No billing history found.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}