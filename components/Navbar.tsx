"use client";
import { useState, useEffect, Fragment } from "react";
import {
  Bird,
  AlignRight,
  X,
  Layers,
  ShieldCheck,
  Tag,
  LogIn,
  Rocket,
} from "lucide-react";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Solutions", href: "/#solutions", icon: Layers },
    { name: "Security", href: "/#security", icon: ShieldCheck },
    { name: "Pricing", href: "/#pricing", icon: Tag },
  ];

  return (
    <Popover
      as="nav"
      className={`fixed top-0 left-0 w-full z-100 transition-all duration-500 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/50 py-3"
          : "bg-transparent py-6"
      }`}
    >
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center h-12">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group z-[110]">
                <div className="bg-blue-600 p-2 rounded-xl transition-all group-hover:rotate-6 group-hover:scale-110 shadow-lg shadow-blue-200">
                  <Bird className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-black tracking-tighter uppercase text-slate-900">
                  Falcon<span className="text-blue-600">Mail</span>
                </span>
              </Link>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-blue-600 transition"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="h-4 w-px bg-slate-200 mx-2"></div>
                <Link
                  href="/login"
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 hover:text-blue-600 transition"
                >
                  Login
                </Link>
                <Link
                  href="/#pricing"
                  className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-600 hover:scale-105 transition-all shadow-lg shadow-slate-200"
                >
                  Get Started
                </Link>
              </div>

              {/* Mobile Toggle */}
              <div className="md:hidden flex items-center">
                <Popover.Button className="p-2 text-slate-900 focus:outline-none z-[110] bg-slate-100 rounded-xl">
                  {open ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <AlignRight className="w-6 h-6" />
                  )}
                </Popover.Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Overlay */}
          <Transition
            as={Fragment}
            enter="duration-300 ease-out"
            enterFrom="opacity-0 scale-95 -translate-y-10"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="duration-200 ease-in"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 -translate-y-10"
          >
            <Popover.Panel className="absolute top-0 left-0 w-full h-screen bg-white/95 backdrop-blur-2xl md:hidden z-[100] pt-28 px-6 overflow-hidden">
              <div className="flex flex-col gap-3">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2 px-4">
                  Menu
                </p>

                {navLinks.map((item) => (
                  <Link key={item.name} href={item.href} className="group">
                    <Popover.Button className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-white rounded-xl shadow-sm group-hover:text-blue-600">
                          <item.icon className="w-5 h-5 text-slate-600 group-hover:text-blue-600" />
                        </div>
                        <span className="text-lg font-bold tracking-tight text-slate-900">
                          {item.name}
                        </span>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-slate-200 group-hover:bg-blue-400 transition-colors" />
                    </Popover.Button>
                  </Link>
                ))}

                <div className="my-4 border-t border-slate-100" />

                <div className="grid grid-cols-2 gap-3 mt-4">
                  {/* Login Button */}
                  <Link href="/login">
                    <Popover.Button className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-all">
                      <LogIn className="w-4 h-4 text-slate-600" />
                      <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        Login
                      </span>
                    </Popover.Button>
                  </Link>

                  <Link href="/register">
                    <Popover.Button className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-all shadow-md shadow-slate-200">
                      <Rocket className="w-4 h-4 text-white" />
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Join Now
                      </span>
                    </Popover.Button>
                  </Link>
                </div>
              </div>

              {/* Decorative Brand Text */}
              <div className="absolute bottom-12 left-0 w-full text-center opacity-20 pointer-events-none">
                <Bird className="w-12 h-12 mx-auto text-slate-400 mb-2" />
                <p className="text-xs font-black uppercase tracking-[0.5em] text-slate-400">
                  FalconMail Sovereign
                </p>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
