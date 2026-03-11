"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Popover, PopoverButton, PopoverPanel, PopoverBackdrop } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Bird } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Solutions", href: "#products" },
  { name: "Security", href: "#security" },
  { name: "Pricing", href: "#pricing" },
  { name: "About", href: "#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6 pointer-events-none">
      <Popover className="w-full max-w-7xl pointer-events-auto">
        {({ open, close }) => (
          <>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }} 
              className={`flex items-center justify-between w-full px-6 py-3 rounded-2xl border transition-all duration-500 
                ${scrolled || open
                  ? "bg-background/80 backdrop-blur-xl border-border shadow-lg"
                  : "bg-background/5 backdrop-blur-sm border-foreground/5"
                }`}
            >
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(var(--brand-primary-rgb),0.5)]">
                  <Bird className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight hidden sm:block text-foreground">
                  Falcon<span className="text-brand-primary">Mail</span>
                </span>
              </Link>

              {/* Desktop Links */}
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm font-medium text-foreground/60 hover:text-brand-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <ThemeToggle />
                <Link
                  href="/login"
                  className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-full text-sm font-semibold hover:opacity-90 transition-all active:scale-95"
                >
                  Login
                </Link>

                <PopoverButton className="md:hidden p-2 text-foreground outline-none focus:ring-0">
                  {open ? <X size={24} /> : <Menu size={24} />}
                </PopoverButton>
              </div>
            </motion.div>

            <AnimatePresence>
              {open && (
                <>
                  <PopoverBackdrop
                    static
                    as={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40 bg-background/40 backdrop-blur-md md:hidden"
                  />

                  <PopoverPanel
                    static
                    as={motion.div}
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute top-24 left-4 right-4 z-50 p-6 bg-background border border-border shadow-2xl md:hidden flex flex-col gap-6 rounded-3xl"
                  >
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => close()}
                        className="text-lg font-medium border-b border-border pb-2 text-foreground/80 hover:text-brand-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}

                    <div className="flex flex-col gap-3">
                      <Link
                        href="/login"
                        onClick={() => close()}
                        className="w-full py-4 bg-muted text-foreground rounded-2xl text-center font-bold flex items-center justify-center gap-2 border border-border"
                      >
                        Login <ArrowRight size={18} />
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => close()}
                        className="w-full py-4 bg-brand-primary text-white rounded-2xl text-center font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/20"
                      >
                        Get Started <ArrowRight size={18} />
                      </Link>
                    </div>
                  </PopoverPanel>
                </>
              )}
            </AnimatePresence>
          </>
        )}
      </Popover>
    </nav>
  );
}