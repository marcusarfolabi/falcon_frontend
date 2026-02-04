"use client";

import React, { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  Monitor,
  Layout,
  Paintbrush,
  Check,
  Maximize2,
  Minimize2,
} from "lucide-react";

export default function AppearanceSettings() {
  const [theme, setTheme] = useState("system"); // light, dark, system
  const [density, setDensity] = useState("comfortable"); // comfortable, compact
  const [accent, setAccent] = useState("#2563eb"); // default blue

  // Sync theme with HTML tag
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
    } else {
      // System preference
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", isDark);
    }
  }, [theme]);

  return (
    <div className="p-4 sm:p-6 lg:p-12 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700 pb-32">
      <header className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight dark:text-white">
          Appearance
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Customize how FalconMail looks on your device.
        </p>
      </header>

      {/* Interface Theme */}
      <section className="space-y-6 mb-12">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400">
            <Paintbrush size={18} />
          </div>
          <h3 className="font-black text-slate-800 dark:text-slate-200 uppercase tracking-tighter text-sm">
            Interface Theme
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-6">
          <ThemeCard
            active={theme === "light"}
            onClick={() => setTheme("light")}
            icon={<Sun size={20} />}
            label="Light"
            previewClass="bg-white border-slate-200"
          />
          <ThemeCard
            active={theme === "dark"}
            onClick={() => setTheme("dark")}
            icon={<Moon size={20} />}
            label="Dark"
            previewClass="bg-slate-900 border-slate-800 text-white"
          />
          <ThemeCard
            active={theme === "system"}
            onClick={() => setTheme("system")}
            icon={<Monitor size={20} />}
            label="System"
            previewClass="bg-gradient-to-r from-white to-slate-900 border-slate-200"
          />
        </div>
      </section>

      {/* Density Setting - Great for Power Users */}
      <section className="space-y-6 mb-12">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400">
            <Layout size={18} />
          </div>
          <h3 className="font-black text-slate-800 dark:text-slate-200 uppercase tracking-tighter text-sm">
            Density
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <DensityOption
            active={density === "comfortable"}
            onClick={() => setDensity("comfortable")}
            icon={<Maximize2 size={18} />}
            title="Comfortable"
            desc="Spacious layout for easy reading."
          />
          <DensityOption
            active={density === "compact"}
            onClick={() => setDensity("compact")}
            icon={<Minimize2 size={18} />}
            title="Compact"
            desc="Maximum data density for power users."
          />
        </div>
      </section>

      {/* Accent Color Section */}
      <section className="space-y-6">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
          Accent Color
        </h3>
        <div className="flex flex-wrap gap-4 px-2">
          {["#2563eb", "#7c3aed", "#db2777", "#059669", "#ea580c"].map(
            (color) => (
              <button
                key={color}
                onClick={() => setAccent(color)}
                style={{ backgroundColor: color }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-transform hover:scale-110 active:scale-90 shadow-lg shadow-black/5"
              >
                {accent === color && <Check size={18} strokeWidth={4} />}
              </button>
            ),
          )}
        </div>
      </section>
    </div>
  );
}

// Sub-components for sleekness
function ThemeCard({ active, onClick, icon, label, previewClass }: any) {
  return (
    <button onClick={onClick} className="group flex flex-col gap-3 text-center">
      <div
        className={`h-24 sm:h-32 w-full rounded-2xl border-4 transition-all overflow-hidden flex items-center justify-center ${previewClass} ${active ? "border-blue-500 scale-95 shadow-inner" : "border-transparent opacity-80 group-hover:opacity-100"}`}
      >
        {icon}
      </div>
      <span
        className={`text-xs font-black uppercase tracking-widest ${active ? "text-blue-600" : "text-slate-400"}`}
      >
        {label}
      </span>
    </button>
  );
}

function DensityOption({ active, onClick, icon, title, desc }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-start gap-4 p-5 rounded-3xl border-2 transition-all text-left ${active ? "border-blue-500 bg-blue-50/30" : "border-slate-100 bg-slate-50 hover:border-slate-200"}`}
    >
      <div
        className={`p-2 rounded-xl ${active ? "bg-blue-600 text-white" : "bg-white text-slate-400 shadow-sm"}`}
      >
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-black text-slate-800 dark:text-slate-200">
          {title}
        </h4>
        <p className="text-[10px] sm:text-xs text-slate-500 font-medium leading-tight mt-1">
          {desc}
        </p>
      </div>
    </button>
  );
}
