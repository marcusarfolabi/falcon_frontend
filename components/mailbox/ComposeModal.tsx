"use client";
import { X, Maximize2, Minimize2, Minus } from "lucide-react";
import { useState } from "react";
import MailComposer from "./MailComposer";

export default function ComposeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isOpen) return null;

  return (
    <div className={`fixed z-9999 bg-white shadow-2xl border border-slate-200 transition-all duration-300 flex flex-col
        ${isMaximized ? "inset-0 w-full h-full" : isMinimized ? "bottom-0 right-0 md:right-16 w-full md:w-[320px] h-12 rounded-t-xl" : "bottom-0 right-0 md:right-16 w-full h-[90vh] md:h-137.5 md:w-150 rounded-t-xl md:border-x md:border-t"}`}
    >
      {/* Header */}
      <div onClick={() => isMinimized && setIsMinimized(false)} className={`bg-[#2c3e50] text-white px-4 py-2.5 flex items-center justify-between rounded-t-xl shrink-0 ${isMinimized ? "cursor-pointer" : ""}`}>
        <span className="text-sm font-medium">New Message</span>
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          {!isMaximized && <button onClick={() => setIsMinimized(!isMinimized)} className="p-1 hover:bg-white/10 rounded"><Minus size={16} /></button>}
          {!isMinimized && <button onClick={() => setIsMaximized(!isMaximized)} className="p-1 hover:bg-white/10 rounded hidden md:block">{isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}</button>}
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded"><X size={16} /></button>
        </div>
      </div>

      {!isMinimized && (
        <MailComposer onSuccess={onClose} />
      )}
    </div>
  );
}