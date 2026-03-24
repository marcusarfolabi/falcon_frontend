"use client";
import { useEffect, useState } from 'react';
import {
    Globe, ShieldCheck, ShieldAlert, Users, HardDrive,
    ChevronLeft, ChevronRight, Loader2, Plus, Zap,
    CheckCircle2,
    ShieldPlus
} from 'lucide-react'; 
import { addDomain, getDomainOverview } from '@/lib/api/domain';
import { DomainOverviewResponse } from '@/types/domain';
import { Modal } from '@/components/common/Modal';

export default function DomainsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [domainName, setDomainName] = useState("");
    const [selectedPlan, setSelectedPlan] = useState("prod_business_sovereign");
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
            <div className="flex flex-col items-center justify-center min-h-100 space-y-4">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                <p className="text-slate-500 font-medium">Analyzing Domain Assets...</p>
            </div>
        );
    }

    if (!data) return null;
   

    const isValidDomain = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(domainName);
    const handleAddDomain = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // Logic to call your backend
            const result = await addDomain(domainName);
            setIsModalOpen(false);
            setDomainName("");
            // You'd ideally refresh your data list here
            window.location.reload();
        } catch (err) {
            console.error("Failed to add domain:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* --- SUMMARY STATS FOR CEO --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-white rounded-4xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
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

                <div className="bg-slate-900 rounded-4xl p-8 text-white flex flex-col justify-between shadow-xl relative overflow-hidden group">
                    <div className="relative z-10">
                        <Zap className="w-8 h-8 text-blue-400 mb-4" />
                        <h4 className="text-xl font-bold mb-2">New Identity</h4>
                        <p className="text-slate-400 text-xs leading-relaxed">
                            Connect your external domain to begin provisioning mailboxes.
                        </p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                         className="relative z-10 cursor-pointer mt-6 w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-500 transition-all flex items-center justify-center gap-2">
                        <Plus className="w-4 h-4" /> Add New Domain
                    </button>
                    <Globe className="absolute -bottom-6 -right-6 w-32 h-32 text-white/5 -rotate-12" />
                </div>
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => !isSubmitting && setIsModalOpen(false)}
                    title="Link New Domain"
                    subtitle="Infrastructure Setup"
                >
                    <form onSubmit={handleAddDomain} className="space-y-6">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    Domain Address
                                </label>
                                {isValidDomain && (
                                    <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-500 uppercase">
                                        <CheckCircle2 className="w-3 h-3" /> Format Valid
                                    </span>
                                )}
                            </div>
                            <div className="relative">
                                <input
                                    required
                                    type="text"
                                    placeholder="yourdomain.com"
                                    value={domainName}
                                    onChange={(e) => setDomainName(e.target.value.toLowerCase().trim())}
                                    className={`w-full bg-slate-50 border-2 rounded-2xl px-5 py-4 text-sm font-bold text-slate-900 outline-none transition-all ${domainName && !isValidDomain ? 'border-red-100 focus:border-red-400' : 'border-slate-100 focus:border-blue-500'
                                        }`}
                                />
                                <ShieldPlus className="absolute right-5 top-4 w-5 h-5 text-slate-300" />
                            </div>
                        </div>

                        <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                            <h5 className="text-[10px] font-black text-slate-900 uppercase mb-2">Next Steps</h5>
                            <ul className="space-y-2">
                                {['Ownership validation token will be generated', 'You must update your DNS TXT records'].map((step, i) => (
                                    <li key={i} className="flex items-start gap-2 text-[10px] text-slate-500 font-medium">
                                        <div className="w-1 h-1 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                                        {step}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || !isValidDomain}
                            className="w-full bg-slate-900 text-white py-5 rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-lg shadow-slate-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" /> Analyzing...
                                </>
                            ) : (
                                "Start Verification"
                            )}
                        </button>
                    </form>
                </Modal>
            </div>

            <div className="bg-white rounded-4xl border border-slate-200 shadow-sm overflow-hidden">
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
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {data.domains.map((domain: any) => {
                                const isVerified = domain.verification?.is_verified ?? domain.is_verified ?? false;
                                const token = domain.verification?.token ?? domain.dns_verification_token ?? "Pending...";
                                const planLabel = domain.plan?.label ?? domain.plan_name ?? "Standard Plan";
                                const seats = domain.plan?.seats ?? domain.max_seats ?? 0;
                                const storage = domain.plan?.storage_gb ?? domain.max_storage ?? 0;
                                const domainName = domain.name ?? domain.domain_name;

                                return (
                                    <tr key={domain.id} className="group hover:bg-slate-50/50 transition-all">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 ${isVerified ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100'
                                                    }`}>
                                                    <Globe className={`w-6 h-6 ${isVerified ? 'text-emerald-600' : 'text-amber-600'}`} />
                                                </div>
                                                <div>
                                                    <p className="text-lg font-black text-slate-900 leading-none mb-1">{domainName}</p>
                                                    <div className="flex items-center gap-2">
                                                        {isVerified ? (
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
                                                <p className="text-xs font-black text-slate-900 uppercase tracking-tighter">{planLabel}</p>
                                                <div className="flex gap-4 text-[11px] text-slate-500 font-medium">
                                                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {seats} Seats</span>
                                                    <span className="flex items-center gap-1"><HardDrive className="w-3.5 h-3.5" /> {storage}GB</span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-6">
                                            <div className="flex flex-col">
                                                <span className="text-[11px] font-bold text-slate-400 uppercase">Verification Token</span>
                                                <code className="text-[10px] bg-slate-100 px-2 py-1 rounded mt-1 text-slate-600 border border-slate-200 w-fit font-mono tracking-tighter">
                                                    {token}
                                                </code>
                                            </div>
                                        </td>
 
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}