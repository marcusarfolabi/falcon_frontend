"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, 
  Key, 
  Smartphone, 
  History, 
  Lock, 
  ChevronRight, 
  AlertTriangle,
  Fingerprint
} from "lucide-react";

export default function SecuritySettings() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  return (
    <div className="p-4 sm:p-6 lg:p-12 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700 pb-32">
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Security</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">Protect your account and managed encrypted data.</p>
      </header>

      {/* Fancy Security Score Card */}
      <div className="mb-10 p-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] text-white shadow-2xl shadow-blue-200/50 relative overflow-hidden group">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="text-blue-400" size={20} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Security Status</span>
            </div>
            <h2 className="text-3xl font-black italic">Fairly Secure</h2>
            <p className="text-slate-400 text-xs mt-2 max-w-[240px]">
              Enable Two-Factor authentication to reach <span className="text-white font-bold">Excellent</span> protection.
            </p>
          </div>
          <div className="flex -space-x-3">
             <div className="w-12 h-12 rounded-full border-4 border-slate-800 bg-blue-500 flex items-center justify-center font-black shadow-lg">82</div>
             <div className="w-12 h-12 rounded-full border-4 border-slate-800 bg-slate-700 flex items-center justify-center text-slate-400 text-xs tracking-tighter">/100</div>
          </div>
        </div>
        {/* Abstract background shape */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors duration-700" />
      </div>

      <div className="space-y-4">
        {/* Two-Factor Auth Row */}
        <SecurityRow 
          icon={<Smartphone className="text-purple-500" />}
          title="Two-Factor Authentication"
          description="Secure your login with TOTP (Google Authenticator)"
          status={is2FAEnabled ? "Enabled" : "Off"}
          onClick={() => setIs2FAEnabled(!is2FAEnabled)}
        />

        {/* Encryption at Rest (Stalwart Feature) */}
        <SecurityRow 
          icon={<Lock className="text-blue-500" />}
          title="Encryption at Rest"
          description="Configure S/MIME or OpenPGP for your mailbox"
          status="Configure"
        />

        {/* App Passwords */}
        <SecurityRow 
          icon={<Key className="text-orange-500" />}
          title="App Passwords"
          description="Create unique passwords for IMAP/Outlook/iPhone"
          status="2 Active"
        />

        {/* Session History */}
        <SecurityRow 
          icon={<History className="text-emerald-500" />}
          title="Active Sessions"
          description="Manage devices currently logged into FalconMail"
          status="Check"
        />
        
        {/* Advanced Privacy */}
        <div className="mt-12 pt-8 border-t border-slate-100">
           <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-2">Privacy & Protocol</h3>
           <div className="bg-slate-50 rounded-3xl p-6 space-y-6">
              <div className="flex items-start gap-4">
                 <div className="p-2 bg-white rounded-xl shadow-sm"><Fingerprint size={18} className="text-slate-600" /></div>
                 <div>
                    <h4 className="text-sm font-bold text-slate-900">Rust Memory Safety</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">FalconMail uses the Stalwart backend, ensuring your data is handled by a memory-safe environment to prevent buffer overflow attacks.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

// Sub-component for clean rows
function SecurityRow({ icon, title, description, status, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 sm:p-5 bg-white border border-slate-100 rounded-[1.5rem] hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 transition-all group active:scale-[0.98]"
    >
      <div className="flex items-center gap-4 text-left">
        <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-white transition-colors">
          {icon}
        </div>
        <div>
          <h4 className="text-sm font-black text-slate-900 tracking-tight">{title}</h4>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium line-clamp-1">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-[10px] font-black uppercase tracking-tighter px-2.5 py-1 rounded-full ${
          status === 'Enabled' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
        }`}>
          {status}
        </span>
        <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
      </div>
    </button>
  );
}