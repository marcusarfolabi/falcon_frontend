"use client";
import React, { useEffect, useState } from 'react';
import {
    Globe, ShieldCheck, ShieldAlert, Users, HardDrive,
    ExternalLink, ChevronLeft, ChevronRight, Loader2, Plus, Zap
} from 'lucide-react'; 
import { getDomainOverview } from '@/lib/api/domain';
import { DomainOverviewResponse, DomainEntry } from '@/types/domain';

export default function DomainsPage() {
    const [data, setData] = useState<DomainOverviewResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const LIMIT = 10;

    useEffect(() => {
        setLoading(true);
        getDomainOverview(LIMIT, offset)
            .then(setData)
            .catch(err => console.error("Domain fetch error:", err))
            .finally(() => setLoading(false));
    }, [offset]);

    if (loading && !data) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                <p className="text-slate-500 font-medium">Analyzing Domain Assets...</p>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* --- SUMMARY STATS FOR CEO --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded inline-block mb-4">
                                Domain Portfolio
                            </h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-6xl font-black text-slate-900 tracking-tighter">
                                    {data.summary.total_domains}
                                </span>
                                <span className="text-xl font-bold text-slate-400">Registered Domains</span>
                            </div>
                        </div>
                        <div className="bg-emerald-50 text-emerald-600 p-4 rounded-3xl border border-emerald-100 flex items-center gap-3">
                            <ShieldCheck className="w-6 h-6" />
                            <div>
                                <p className="text-xs font-black uppercase">{data.summary.verified_domains} Secured</p>
                                <p className="text-[10px] opacity-70">DNS Verification Active</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-[2rem] p-8 text-white flex flex-col justify-between shadow-xl relative overflow-hidden group">
                    <div className="relative z-10">
                        <Zap className="w-8 h-8 text-blue-400 mb-4" />
                        <h4 className="text-xl font-bold mb-2">New Identity</h4>
                        <p className="text-slate-400 text-xs leading-relaxed">
                            Connect your external domain to begin provisioning mailboxes.
                        </p>
                    </div>
                    <button className="relative z-10 mt-6 w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-500 transition-all flex items-center justify-center gap-2">
                        <Plus className="w-4 h-4" /> Add New Domain
                    </button>
                    <Globe className="absolute -bottom-6 -right-6 w-32 h-32 text-white/5 -rotate-12" />
                </div>
            </div>

            {/* --- DOMAIN TABLE --- */}
            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-3 ml-2">
                        <Globe className="w-4 h-4 text-slate-400" />
                        <h3 className="font-bold text-slate-900 text-sm">Asset Registry</h3>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-[11px] font-bold text-slate-500 tabular-nums">
                            {offset + 1}-{Math.min(offset + LIMIT, data.pagination.total)} of {data.pagination.total}
                        </span>
                        <div className="flex items-center border border-slate-200 rounded-xl bg-white overflow-hidden shadow-sm">
                            <button
                                onClick={() => setOffset(prev => Math.max(0, prev - LIMIT))}
                                disabled={offset === 0 || loading}
                                className="p-2 hover:bg-slate-50 disabled:opacity-20 transition-colors border-r border-slate-100"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setOffset(prev => prev + LIMIT)}
                                disabled={!data.pagination.has_more || loading}
                                className="p-2 hover:bg-slate-50 disabled:opacity-20 transition-colors"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/30 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                            <tr>
                                <th className="px-8 py-4">Domain Detail</th>
                                <th className="px-6 py-4">Resource Plan</th>
                                <th className="px-6 py-4">DNS Config</th>
                                <th className="px-8 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {data.domains.map((domain: DomainEntry) => (
                                <tr key={domain.id} className="group hover:bg-slate-50/50 transition-all">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 ${domain.verification.is_verified ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100'
                                                }`}>
                                                <Globe className={`w-6 h-6 ${domain.verification.is_verified ? 'text-emerald-600' : 'text-amber-600'}`} />
                                            </div>
                                            <div>
                                                <p className="text-lg font-black text-slate-900 leading-none mb-1">{domain.name}</p>
                                                <div className="flex items-center gap-2">
                                                    {domain.verification.is_verified ? (
                                                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                                                            <ShieldCheck className="w-3 h-3" /> Encrypted & Verified
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 uppercase tracking-widest">
                                                            <ShieldAlert className="w-3 h-3" /> DNS Setup Required
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="space-y-1">
                                            <p className="text-xs font-black text-slate-900 uppercase tracking-tighter">{domain.plan.label}</p>
                                            <div className="flex gap-4 text-[11px] text-slate-500 font-medium">
                                                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {domain.plan.seats} Seats</span>
                                                <span className="flex items-center gap-1"><HardDrive className="w-3.5 h-3.5" /> {domain.plan.storage_gb}GB</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="flex flex-col">
                                            <span className="text-[11px] font-bold text-slate-400 uppercase">Verification Token</span>
                                            <code className="text-[10px] bg-slate-100 px-2 py-1 rounded mt-1 text-slate-600 border border-slate-200 w-fit font-mono tracking-tighter">
                                                {domain.verification.token}
                                            </code>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-black text-slate-700 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                                            Manage DNS <ExternalLink className="w-3.5 h-3.5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}