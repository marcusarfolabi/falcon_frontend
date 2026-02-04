"use client";
import  { useEffect, useState } from 'react';
import {
    Building2, Database, Users2,
    ShieldCheck, Activity, Loader2, ArrowUpRight,
    Globe
} from 'lucide-react'; 
import { getOrgOverview } from '@/lib/api/organization';
import { OrgOverviewResponse } from '@/types/organization';

export default function OrganizationPage() {
    const [data, setData] = useState<OrgOverviewResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getOrgOverview()
            .then(setData)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Loader2 className="animate-spin m-auto" />;
    if (!data) return null;

    const { org_details, asset_summary } = data;

    return (
        <div className="max-w-7xl mx-auto space-y-8 p-6">
            {/* --- ORG IDENTITY HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-slate-900 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-slate-200">
                        <Building2 className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">{org_details.name}</h1>
                        <p className="text-slate-400 font-medium flex items-center gap-2">
                            Global Enterprise Account • <span className="text-[11px] uppercase font-black">ID: {org_details.id}</span>
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 bg-emerald-50 px-4 py-2 rounded-2xl">
                    <Activity className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-black text-emerald-700 uppercase tracking-widest">System Operational</span>
                </div>
            </div>

            {/* --- ASSET GRID --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* DOMAIN HEALTH */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-6">
                        <Globe className="w-6 h-6 text-blue-600" />
                        <span className="text-[10px] font-black bg-blue-50 text-blue-600 px-2 py-1 rounded-lg uppercase tracking-widest">Domain Assets</span>
                    </div>
                    <p className="text-5xl font-black text-slate-900 mb-2">{asset_summary.domains.total}</p>
                    <p className="text-sm font-bold text-slate-400 mb-6">Active Web Identities</p>
                    <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase">
                        <ShieldCheck className="w-4 h-4" /> {asset_summary.domains.health_score}% Secured
                    </div>
                </div>

                {/* GLOBAL SEAT CAPACITY */}
                <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <Users2 className="w-6 h-6 text-blue-400 mb-6" />
                        <p className="text-5xl font-black mb-2">{asset_summary.seats.occupied}</p>
                        <p className="text-sm font-bold text-slate-400 mb-6">Seats Occupied / {asset_summary.seats.total_capacity} Capacity</p>

                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-500 transition-all duration-1000"
                                style={{ width: `${(asset_summary.seats.occupied / asset_summary.seats.total_capacity) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* GLOBAL STORAGE */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-6">
                        <Database className="w-6 h-6 text-slate-400" />
                        <span className="text-[10px] font-black bg-slate-50 text-slate-500 px-2 py-1 rounded-lg uppercase tracking-widest">Storage</span>
                    </div>
                    <p className="text-5xl font-black text-slate-900 mb-2">{formatStorage(asset_summary.storage.total_gb)}GB</p>
                    <p className="text-sm font-bold text-slate-400 mb-6">Allocated Firm-wide</p>
                    <div className="flex justify-between text-[10px] font-black uppercase text-slate-500">
                        <span>{asset_summary.storage.utilization}% Used</span>
                        <ArrowUpRight className="w-4 h-4" />
                    </div>
                </div>

            </div>
        </div>
    );
} 

const formatStorage = (value:any) => {
    const strValue = value.toString();
    if (strValue.length >= 10) {
        const bytes = parseFloat(strValue);
        const gb = bytes / (1024 * 1024 * 1024);
        return gb % 1 === 0 ? gb.toFixed(0) : gb.toFixed(1);
    }

    return strValue;
};