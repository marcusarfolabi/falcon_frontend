"use client";

import React, { useState } from "react";
import { Signature, Plus, Trash2, Info } from "lucide-react";

export default function SignatureSettings() {
  const [hasSignature, setHasSignature] = useState(true);
  const [signature, setSignature] = useState("Best regards,\nDavid | FalconMail Team");

  return (
    <section className="flex flex-col md:grid md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-2 duration-700">
      {/* Label and Icon */}
      <div className="flex items-center gap-3 self-start">
        <div className="p-2.5 bg-slate-100 rounded-xl text-slate-600 shrink-0 shadow-sm">
          <Signature size={20} />
        </div>
        <div className="flex flex-col">
          <h3 className="font-black text-slate-800 uppercase tracking-tighter text-sm">Signature</h3>
          <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">JMAP Identity</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="md:col-span-2 space-y-4">
        {/* Toggle between No Signature and Editor */}
        <div className="flex flex-col gap-3 p-1 bg-slate-50 rounded-2xl border border-slate-100">
          <button 
            onClick={() => setHasSignature(false)}
            className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${!hasSignature ? 'bg-white shadow-sm text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <span className="text-sm">No signature</span>
            {!hasSignature && <div className="w-2 h-2 rounded-full bg-blue-600" />}
          </button>
          
          <button 
            onClick={() => setHasSignature(true)}
            className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${hasSignature ? 'bg-white shadow-sm text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <span className="text-sm">Custom Signature</span>
            {hasSignature && <div className="w-2 h-2 rounded-full bg-blue-600" />}
          </button>
        </div>

        {/* Editor (Only shows if Custom is selected) */}
        {hasSignature && (
          <div className="space-y-3 animate-in fade-in zoom-in-95 duration-300">
            <div className="group relative">
              <textarea 
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                rows={4}
                className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all placeholder:text-slate-300 font-medium text-slate-700 shadow-inner"
                placeholder="Write your signature here..."
              />
              <button className="absolute bottom-4 right-4 p-2 text-slate-300 hover:text-red-500 transition-colors">
                <Trash2 size={16} />
              </button>
            </div>

            {/* Reply Prefs */}
            <label className="group flex items-center gap-3 p-4 bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl cursor-pointer hover:bg-white hover:border-blue-200 transition-all">
              <div className="relative flex items-center justify-center">
                <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded-lg checked:bg-blue-600 checked:border-blue-600 transition-all" />
                <Plus size={12} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" strokeWidth={4} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black text-slate-700 uppercase tracking-tight">Insert before quotes</span>
                <span className="text-[10px] text-slate-400 font-medium leading-none mt-0.5">Recommended for business replies</span>
              </div>
            </label>
          </div>
        )}

        {/* Helper Note */}
        <div className="flex items-start gap-2 px-1">
          <Info size={14} className="text-slate-400 shrink-0 mt-0.5" />
          <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
            FalconMail signatures support up to 2048 characters. Large images should be linked via URL rather than embedded as base64.
          </p>
        </div>
      </div>
    </section>
  );
}