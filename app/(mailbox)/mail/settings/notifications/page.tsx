"use client";

import React, { useState } from "react";
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Volume2, 
  Vibrate, 
  Smartphone, 
  Zap,
  ShieldAlert
} from "lucide-react";

export default function NotificationSettings() {
  const [prefs, setPrefs] = useState({
    allEmails: true,
    importantOnly: false,
    falconAI: true,
    sound: true,
    vibrate: true,
    desktop: true,
  });

  const toggle = (key: keyof typeof prefs) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-12 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700 pb-32">
      <header className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Notifications</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">Control how FalconMail reaches out to you.</p>
      </header>

      {/* Main Channel Selection */}
      <section className="space-y-4 mb-10">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Alert Channels</h3>
        
        <NotificationToggle 
          icon={<Smartphone size={18} />}
          title="Push Notifications"
          desc="Receive alerts on your mobile device even when the app is closed."
          active={prefs.allEmails}
          onClick={() => toggle('allEmails')}
          accent="bg-blue-600"
        />

        <NotificationToggle 
          icon={<Zap size={18} />}
          title="Falcon AI Smart Alerts"
          desc="Only get notified for emails Falcon AI deems 'Urgent' or 'High Priority'."
          active={prefs.falconAI}
          onClick={() => toggle('falconAI')}
          accent="bg-amber-500"
        />
      </section>

      {/* Sound & Haptics Section */}
      <section className="space-y-4 mb-10">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Sound & Haptics</h3>
        <div className="bg-slate-50 rounded-[2rem] p-2 space-y-1 border border-slate-100">
           <SimpleRow 
             icon={<Volume2 size={18} />} 
             title="Play notification sound" 
             active={prefs.sound} 
             onToggle={() => toggle('sound')} 
           />
           <SimpleRow 
             icon={<Vibrate size={18} />} 
             title="Vibrate on new mail" 
             active={prefs.vibrate} 
             onToggle={() => toggle('vibrate')} 
           />
        </div>
      </section>

      {/* Security Alerts (Stalwart Specific) */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Server & Security</h3>
        <div className="p-5 bg-red-50/30 border border-red-100 rounded-[2rem] flex items-start gap-4">
          <div className="p-2 bg-white rounded-xl shadow-sm">
            <ShieldAlert size={18} className="text-red-500" />
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-900">Critical Security Alerts</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Notifications for new logins from unknown IP addresses cannot be disabled. 
              These are managed by your Stalwart security policy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

// Complex Toggle Row for main features
function NotificationToggle({ icon, title, desc, active, onClick, accent }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between p-5 rounded-[2rem] border-2 transition-all text-left group ${
        active ? 'bg-white border-slate-100 shadow-xl shadow-slate-200/50' : 'bg-slate-50 border-transparent opacity-70'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-2xl transition-all ${active ? `${accent} text-white` : 'bg-white text-slate-400 shadow-sm'}`}>
          {icon}
        </div>
        <div className="max-w-[200px] sm:max-w-none">
          <h4 className="text-sm font-black text-slate-900 tracking-tight">{title}</h4>
          <p className="text-[11px] font-medium text-slate-500 mt-0.5 leading-snug">{desc}</p>
        </div>
      </div>
      <div className={`w-12 h-6 rounded-full relative transition-colors duration-300 shrink-0 ${active ? accent : 'bg-slate-200'}`}>
        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${active ? 'left-7' : 'left-1'}`} />
      </div>
    </button>
  );
}

// Simple Row for secondary features
function SimpleRow({ icon, title, active, onToggle }: any) {
  return (
    <div className="flex items-center justify-between p-4 px-6 hover:bg-white rounded-2xl transition-colors cursor-pointer" onClick={onToggle}>
      <div className="flex items-center gap-3">
        <span className="text-slate-400">{icon}</span>
        <span className="text-xs font-bold text-slate-700">{title}</span>
      </div>
      <div className={`w-10 h-5 rounded-full relative transition-colors ${active ? 'bg-blue-600' : 'bg-slate-300'}`}>
         <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${active ? 'left-5.5' : 'left-0.5'}`} />
      </div>
    </div>
  );
}