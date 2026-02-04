"use client";

import React, { useState } from "react";
import { Signature, Trash2, Info, Eye, Code } from "lucide-react";

interface SignatureProps {
  value: {
    text: string;
    html: string;
  };
  onChange: (newValue: { text: string; html: string }) => void;
}

export default function SignatureSettings({ value, onChange }: SignatureProps) {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const hasSignature = value.text.length > 0 || value.html.length > 0;

  const handleClear = () => {
    onChange({ text: "", html: "" });
  };

  return (
    <section className="flex flex-col md:grid md:grid-cols-3 gap-6 p-6 sm:p-8 animate-in slide-in-from-bottom-2 duration-700">
      {/* Label and Icon */}
      <div className="flex items-center gap-3 self-start">
        <div className="p-2.5 bg-slate-100 rounded-xl text-slate-600 shrink-0 shadow-sm">
          <Signature size={20} />
        </div>
        <div className="flex flex-col">
          <h3 className="font-black text-slate-800 uppercase tracking-tighter text-sm">
            Signature
          </h3>
          <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">
            JMAP Identity
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="md:col-span-2 space-y-6">
        {/* Toggle between Edit and Preview */}
        <div className="flex p-1 bg-slate-100 rounded-2xl w-full sm:w-fit">
          <button
            onClick={() => setActiveTab("edit")}
            className={`flex-1 sm:flex-none flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === "edit"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Code size={14} />
            Editor
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex-1 sm:flex-none flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === "preview"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Eye size={14} />
            Preview
          </button>
        </div>

        {activeTab === "edit" ? (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="group relative">
              <textarea
                value={value.html || value.text}
                onChange={(e) =>
                  onChange({ text: e.target.value, html: e.target.value })
                }
                rows={6}
                className="w-full p-5 bg-white border-2 border-slate-100 rounded-3xl text-sm focus:border-blue-500 focus:ring-8 focus:ring-blue-50/50 outline-none transition-all placeholder:text-slate-300 font-mono text-slate-700 shadow-inner"
                placeholder="<b>Best regards,</b><br/>FalconMail User"
              />
              {hasSignature && (
                <button
                  onClick={handleClear}
                  className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Sleek HTML Preview Card */
          <div className="animate-in zoom-in-95 duration-300">
            <div className="p-6 bg-white border-2 border-slate-100 rounded-3xl shadow-sm min-h-[150px] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 bg-slate-50 text-[10px] font-black text-slate-400 uppercase border-bl border-slate-100 rounded-bl-xl">
                Rendered Output
              </div>
              {hasSignature ? (
                <div
                  className="prose prose-sm max-w-none text-slate-700 font-medium"
                  dangerouslySetInnerHTML={{ __html: value.html }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-24 text-slate-300">
                  <Signature size={32} strokeWidth={1} />
                  <p className="text-xs font-bold mt-2">
                    No signature content to preview
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Helper Note */}
        <div className="flex items-start gap-3 px-4 py-4 bg-blue-50/40 rounded-[1.5rem] border border-blue-100/60">
          <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
              <strong className="text-blue-700 uppercase tracking-widest mr-1">
                Pro Tip:
              </strong>
              Use HTML tags like{" "}
              <code className="text-blue-600">&lt;b&gt;</code> or{" "}
              <code className="text-blue-600">&lt;img&gt;</code> with a hosted
              URL for logos. Avoid backslashes to prevent Stalwart config
              errors.
            </p>
            <p className="text-[10px] font-bold">
              <span className="text-slate-400">Need a design?</span>
              <a
                href="https://www.hubspot.com/email-signature-generator"
                target="_blank"
                className="ml-1 text-blue-600 hover:underline inline-flex items-center gap-1"
              >
                Try Signature Generator →
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
