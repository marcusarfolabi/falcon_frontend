"use client";

import React, { useEffect, useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  Globe,
  Check,
  ChevronDown,
  Clock,
  Layers,
  Signature,
} from "lucide-react";
import SignatureSettings from "@/components/mailbox/SignatureSettings";

const popularLanguages = [
  { code: "en-US", name: "English (US)" },
  { code: "zh-CN", name: "Chinese (Simplified)" },
  { code: "es-ES", name: "Spanish" },
  { code: "hi-IN", name: "Hindi" },
  { code: "ar-SA", name: "Arabic" },
  { code: "pt-BR", name: "Portuguese (Brazil)" },
  { code: "fr-FR", name: "French" },
  { code: "ru-RU", name: "Russian" },
  { code: "ja-JP", name: "Japanese" },
  { code: "de-DE", name: "German" },
];

export default function GeneralSettings() {
  const [selectedLang, setSelectedLang] = useState(popularLanguages[0]);
  const [detectedLocale, setDetectedLocale] = useState("Loading...");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const browserLang = navigator.language;
      const autoMatch =
        popularLanguages.find((l) =>
          browserLang.startsWith(l.code.split("-")[0]),
        ) || popularLanguages[0];
      setSelectedLang(autoMatch);

      try {
        const regionCode = new Intl.Locale(browserLang).region;
        const regionName = new Intl.DisplayNames(["en"], { type: "region" }).of(
          regionCode || "US",
        );
        setDetectedLocale(regionName || "Global");
      } catch (e) {
        setDetectedLocale("Global");
      }
    }
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-12 max-w-4xl animate-in fade-in duration-500 pb-32">
      <header className="mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
          General
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Configure your workspace and mail preferences.
        </p>
      </header>

      <div className="space-y-10 sm:space-y-12">
        {/* Language & Region Section */}
        <section className="flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-6">
          <div className="flex items-center gap-3 self-start">
            <div className="p-2 bg-slate-100 rounded-lg text-slate-600 shrink-0">
              <Globe size={18} />
            </div>
            <h3 className="font-black text-slate-800 uppercase tracking-tighter text-xs sm:text-sm">
              Language & Region
            </h3>
          </div>

          <div className="md:col-span-2 space-y-6">
            {/* Headless UI Listbox */}
            <div className="grid gap-1.5 relative">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                Display Language
              </label>

              <Listbox value={selectedLang} onChange={setSelectedLang}>
                <div className="relative">
                  <Listbox.Button className="relative w-full cursor-pointer rounded-xl bg-slate-50 border border-slate-100 py-3 pl-4 pr-10 text-left text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-100 transition-all hover:bg-slate-100/50">
                    <span className="block truncate text-slate-900">
                      {selectedLang.name}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <ChevronDown
                        size={16}
                        className="text-slate-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-2xl bg-white p-1 text-base shadow-2xl shadow-slate-200/50 ring-1 ring-slate-100 focus:outline-none sm:text-sm custom-scrollbar">
                      {popularLanguages.map((lang) => (
                        <Listbox.Option
                          key={lang.code}
                          className={({ active }) =>
                            `relative cursor-pointer select-none rounded-xl py-2.5 pl-10 pr-4 transition-colors ${
                              active
                                ? "bg-blue-50 text-blue-600"
                                : "text-slate-700"
                            }`
                          }
                          value={lang}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${selected ? "font-bold" : "font-medium"}`}
                              >
                                {lang.name}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                  <Check size={16} strokeWidth={3} />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>

            {/* Region Detection (Static Display) */}
            <div className="grid gap-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                Detected Region
              </label>
              <div className="flex items-center justify-between p-3 bg-blue-50/50 border border-blue-100 rounded-xl">
                <div className="flex items-center gap-3">
                  <Clock size={14} className="text-blue-600 shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-blue-900">
                    {detectedLocale}
                  </span>
                </div>
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
                  Auto
                </span>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-slate-100" />

        {/* Composition Section */}
        <SignatureSettings />

        <hr className="border-slate-100" />
      </div>

      {/* Save Actions Bar: Sticky for Mobile */}
      <footer className="fixed bottom-0 left-0 right-0 md:relative md:mt-16 p-4 md:p-0 md:pt-8 bg-white/80 backdrop-blur-md border-t border-slate-100 flex flex-row justify-end gap-3 z-10">
        <button className="flex-1 md:flex-none px-6 py-3 text-xs sm:text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
          Cancel
        </button>
        <button className="flex-2 md:flex-none px-8 py-3 bg-slate-900 text-white text-xs sm:text-sm font-black rounded-xl hover:bg-black transition-all shadow-xl active:scale-95">
          Save Changes
        </button>
      </footer>
    </div>
  );
}
