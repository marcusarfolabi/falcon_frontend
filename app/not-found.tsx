"use client";

import { ArrowLeft, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card border border-border shadow-2xl rounded-3xl p-10 max-w-md w-full text-center relative overflow-hidden"
      >
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-brand-primary/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="flex justify-center mb-6 relative z-10">
          <div className="bg-brand-primary/10 p-6 rounded-full border border-brand-primary/20">
            <TriangleAlert className="text-brand-primary" size={60} />
          </div>
        </div>

        <h1 className="text-3xl font-black tracking-tighter text-foreground mb-4 relative z-10">
          Neural Link <span className="text-brand-primary">Severed</span>
        </h1>

        <p className="text-muted-foreground leading-relaxed mb-8 relative z-10 font-medium">
          The coordinates you provided do not exist within the Falcon network.
          The page has been moved or deleted.
        </p>

        <div className="flex flex-col gap-3 relative z-10">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 py-4 bg-foreground text-background rounded-2xl text-sm font-black uppercase tracking-widest hover:opacity-90 transition-all active:scale-95 cursor-pointer shadow-lg shadow-black/5"
          >
            <ArrowLeft size={16} />
            Previous Page
          </button> 
        </div>
      </motion.div>
    </div>
  );
}