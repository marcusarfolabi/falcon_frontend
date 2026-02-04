"use client";

import React, { useState, useEffect } from "react";
import { User, Camera, Check, Loader2, Globe, ShieldCheck } from "lucide-react";
import { useAccountSettings } from "@/hooks/useAccountSettings";

export default function AccountSettings() {
  const { identity, updateIdentity, isLoading } = useAccountSettings();
  
  const [tempName, setTempName] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [userRegion, setUserRegion] = useState("Global");

  useEffect(() => {
    if (identity?.name) setTempName(identity.name);
    
    // Detect Region from Browser
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setUserRegion(tz.split('/')[1]?.replace('_', ' ') || tz);
    } catch (e) {
      setUserRegion("Detected");
    }
  }, [identity]);

  const handleSaveName = () => {
    updateIdentity.mutate(tempName, {
      onSuccess: () => setIsEditingName(false),
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 lg:p-12 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-32">
      <header className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">Account</h1>
        <p className="text-sm text-slate-500 mt-2 font-medium">Your FalconMail identity and profile.</p>
      </header>

      {/* Main Profile Card */}
      <section className="bg-white rounded-[2.5rem] p-6 sm:p-8 mb-6 border border-slate-200/60 shadow-xl shadow-slate-200/50 flex flex-col items-center sm:flex-row sm:items-center gap-8 transition-all">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="w-28 h-28 rounded-full bg-linear-to-br from-blue-600 via-indigo-500 to-violet-500 p-1 shadow-2xl">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden border-[6px] border-white">
              <User size={48} className="text-slate-200" />
            </div>
          </div>
          <button className="absolute bottom-1 right-1 p-2.5 bg-slate-900 text-white rounded-full shadow-lg border-4 border-white hover:bg-blue-600 transition-all active:scale-90">
            <Camera size={16} />
          </button>
        </div>

        {/* Identity Info */}
        <div className="flex-1 w-full text-center sm:text-left space-y-6">
          <div className="space-y-1">
            {isEditingName ? (
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <input
                  autoFocus
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
                  className="text-2xl font-black text-slate-900 bg-slate-50 border border-blue-200 rounded-2xl px-4 py-2 outline-none ring-4 ring-blue-50 w-full max-w-62.5"
                />
                <button 
                  disabled={updateIdentity.isPending}
                  onClick={handleSaveName} 
                  className="p-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 disabled:opacity-50 active:scale-95"
                >
                  {updateIdentity.isPending ? <Loader2 size={20} className="animate-spin" /> : <Check size={20} strokeWidth={3} />}
                </button>
              </div>
            ) : (
              <h2
                onClick={() => setIsEditingName(true)}
                className="text-2xl font-black text-slate-900 tracking-tight cursor-pointer hover:text-blue-600 transition-colors inline-block"
              >
                {identity?.name || "Set Display Name"}
              </h2>
            )}
            <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.15em] bg-blue-50 px-2 py-0.5 rounded-md">Verified Persona</span>
            </div>
          </div>

          {/* Core Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-4 p-4 bg-slate-50/80 rounded-3xl border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-blue-600">
                <ShieldCheck size={20} />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</p>
                <p className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  Active
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-slate-50/80 rounded-3xl border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-indigo-600">
                <Globe size={20} />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Region</p>
                <p className="text-sm font-bold text-slate-700">{userRegion}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Email Display Card */}
      <div className="p-6 bg-slate-900 rounded-[2.5rem] text-white flex items-center justify-between group overflow-hidden relative shadow-2xl shadow-blue-900/20">
        <div className="relative z-10">
           <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-1">Primary Mailbox</p>
           <h3 className="text-lg font-bold tracking-tight">{identity?.email}</h3>
        </div>
        <div className="absolute -right-4 -bottom-4 text-white/5 group-hover:text-white/10 transition-colors transform rotate-12">
            <User size={120} />
        </div>
      </div>
    </div>
  );
}