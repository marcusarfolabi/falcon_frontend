"use client";

import React, { useEffect, useState } from "react";
import { Loader2, Save, X } from "lucide-react";
import SignatureSettings from "@/components/mailbox/SignatureSettings";
import { useAccountSettings } from "@/hooks/useAccountSettings";
import toast from "react-hot-toast";

export default function GeneralSettings() {
  const { identity, updateSignature, isLoading } = useAccountSettings();
  
  // Local state to hold edits before saving
  const [signatureData, setSignatureData] = useState({
    text: "",
    html: ""
  });

  // Sync with server data when it loads
  useEffect(() => {
    if (identity) {
      setSignatureData({
        text: identity.signature || "",
        html: identity.html_signature || ""
      });
    }
  }, [identity]);

  const handleSave = () => {
    updateSignature.mutate(signatureData, {
      onSuccess: () => {
        toast.success("Signature updated successfully");
      },
      onError: () => {
        toast.error("Failed to update signature");
      }
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
    <div className="p-4 sm:p-8 lg:p-12 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-32">
      <header className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">
          Mail Settings
        </h1>
        <p className="text-sm text-slate-500 mt-2 font-medium">
          Personalize how your emails look to others.
        </p>
      </header>

      <div className="space-y-8">
        {/* Signature Section */}
        <section className="bg-white rounded-[2.5rem] p-1 border border-slate-200/60 shadow-sm overflow-hidden">
          <SignatureSettings 
            value={signatureData} 
            onChange={(newData: any) => setSignatureData(newData)} 
          />
        </section>
      </div>

      {/* Sleek Sticky Footer for Mobile */}
      <footer className="fixed bottom-0 left-0 right-0 md:relative md:mt-12 p-4 md:p-0 md:pt-8 bg-white/90 backdrop-blur-xl border-t border-slate-100 md:border-none flex items-center justify-between md:justify-end gap-4 z-50">
        <button 
          onClick={() => window.location.reload()}
          className="flex-1 md:flex-none px-6 py-4 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-2xl transition-all flex items-center justify-center gap-2"
        >
          <X size={18} />
          <span>Reset</span>
        </button>
        
        <button 
          onClick={handleSave}
          disabled={updateSignature.isPending}
          className="flex-[2] md:flex-none px-10 py-4 bg-slate-900 text-white text-sm font-black rounded-2xl hover:bg-black transition-all shadow-xl shadow-slate-200 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {updateSignature.isPending ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Save size={18} />
          )}
          <span>{updateSignature.isPending ? "Saving..." : "Save Changes"}</span>
        </button>
      </footer>
    </div>
  );
}