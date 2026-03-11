"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <div className="w-[100px] h-9 bg-slate-100 dark:bg-slate-800/50 rounded-full animate-pulse" />
    );

  const options = [
    { id: "light", icon: Sun },
    { id: "system", icon: Monitor },
    { id: "dark", icon: Moon },
  ];

  return (
    <div className="relative flex items-center gap-1 rounded-full border border-border bg-background/50 p-1 backdrop-blur-md">
      {options.map((opt) => {
        const Icon = opt.icon;
        const isActive = theme === opt.id;

        return (
          <button
            key={opt.id}
            onClick={() => setTheme(opt.id)}
            className={`relative p-1.5 rounded-full transition-colors z-10 ${
              isActive
                ? "text-brand-primary dark:text-white"
                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            }`}
          >
            <Icon size={14} />
            {isActive && (
              <motion.div
                layoutId="activeTheme"
                className="absolute inset-0 bg-white dark:bg-brand-primary rounded-full -z-10 shadow-sm"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
