"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevents hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-[110px] h-9 bg-muted rounded-full animate-pulse" />;

  const options = [
    { id: "light", icon: Sun, label: "Light" },
    { id: "dark", icon: Moon, label: "Dark" },
    // { id: "system", icon: Monitor, label: "System" },
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
            className={`relative p-2 rounded-full transition-all z-10 outline-none
              ${isActive
                ? "text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
              }`}
            aria-label={`Switch to ${opt.label} mode`}
          >
            <Icon size={14} strokeWidth={2.5} />

            {isActive && (
              <motion.div
                layoutId="activeTheme"
                className="absolute inset-0 bg-secondary rounded-full -z-10 border border-border/50"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}