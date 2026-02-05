"use client";
import { Suspense, useState } from "react";
import Sidebar from "@/components/mailbox/Sidebar";
import Topbar from "@/components/mailbox/Topbar";
import { Menu, X } from "lucide-react";
import ComposeModal from "@/components/mailbox/ComposeModal";
import QueryProvider from "@/providers";

export default function MailboxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  return (
    <QueryProvider>
      <div className="flex h-screen bg-white text-slate-900 overflow-hidden">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* 1. Sidebar - Hidden on mobile, slide-in drawer effect */}
        <aside
          className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white transition-transform duration-300 ease-in-out transform
        lg:relative lg:translate-x-0 lg:z-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
        >
          <Sidebar
            onClose={() => setSidebarOpen(false)}
            onCompose={() => setIsComposeOpen(true)}
          />
        </aside>

        {/* 2. Main Content Area */}
        <div className="flex flex-1 flex-col min-w-0 overflow-hidden relative">
          <header className="h-16 lg:h-20 border-b border-slate-100 flex items-center px-4 lg:px-8 gap-4 bg-white/80 backdrop-blur-md sticky top-0 z-30">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 lg:hidden hover:bg-slate-100 rounded-lg text-slate-600"
            >
              <Menu size={24} />
            </button>

           <Suspense fallback={<div className="flex-1 h-10 bg-slate-100 rounded-2xl animate-pulse" />}>
              <Topbar />
            </Suspense>
          </header>

          <main className="flex-1 overflow-y-auto bg-slate-50/30">
           <Suspense fallback={<div className="p-8 text-slate-400">Loading insight data...</div>}>
              {children}
            </Suspense>
          </main>
          <ComposeModal
            isOpen={isComposeOpen}
            onClose={() => setIsComposeOpen(false)}
          />
        </div>
      </div>
    </QueryProvider>
  );
}
