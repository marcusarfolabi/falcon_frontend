"use client";
import {
  Inbox,
  Send,
  FileText,
  Trash2,
  Plus,
  LogOut,
  Settings,
  BarChart2,
  AlertOctagon,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import Link from "next/link";
import FalconLogo from "../common/FalconLogo";
import { useInbox } from "@/hooks/useInbox";

export default function Sidebar({
  onClose,
  onCompose,
}: {
  onClose?: () => void;
  onCompose: () => void;
}) {
  const { logout, user } = useAuth();
  const pathname = usePathname();
  const { data } = useInbox();
  const counts = data?.counts;

  const navItems = [
    {
      icon: <Inbox size={18} />,
      label: "Inbox",
      href: "/mail/inbox",
      count: counts?.inbox,
      activeColor: "bg-blue-600 shadow-blue-100",
      hoverColor: "hover:text-blue-600",
    },
    {
      icon: <Send size={18} />,
      label: "Sent",
      href: "/mail/sents",
      count: counts?.sent,
      activeColor: "bg-emerald-600 shadow-emerald-100",
      hoverColor: "hover:text-emerald-600",
    },
    {
      icon: <FileText size={18} />,
      label: "Drafts",
      href: "/mail/drafts",
      count: counts?.drafts,
      activeColor: "bg-amber-600 shadow-amber-100",
      hoverColor: "hover:text-amber-600",
    },
    {
      icon: <Trash2 size={18} />,
      label: "Trash",
      href: "/mail/trash",
      count: counts?.trash,
      activeColor: "bg-red-600 shadow-red-100",
      hoverColor: "hover:text-red-600",
    },
    {
      icon: <AlertOctagon size={18} />,
      label: "Junk",
      href: "/mail/junks",
      count: counts?.junk,
      activeColor: "bg-orange-500 shadow-orange-100",
      hoverColor: "hover:text-orange-500",
    },
  ];

  const handleLogout = async () => {
    await logout();
    window.location.href = "https://falconmail.online";
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/50 border-r border-slate-200">
      {/* 1. Header */}
      <div className="p-6 flex items-center justify-between">
        <FalconLogo />
        <button
          onClick={onClose}
          className="lg:hidden p-2 text-slate-400 hover:bg-slate-100 rounded-lg"
        ></button>
      </div>

      {/* 2. Compose Action */}
      <div className="px-6 mb-8">
        <button
          aria-label="compose mail"
          onClick={onCompose}
          className="w-full flex items-center justify-center gap-3 cursor-pointer bg-slate-900 hover:bg-black text-white py-4 px-4 rounded-t-3xl font-black transition-all shadow-xl shadow-slate-200 active:scale-95"
        >
          <Plus size={20} strokeWidth={4} />
          <span className="text-sm uppercase tracking-widest">Compose</span>
        </button>
      </div>

      {/* 3. Navigation Links */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        <p className="text-[10px] font-black text-slate-400 px-3 mb-4 uppercase tracking-[0.2em]">
          Mailboxes
        </p>

        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <div key={item.label} className="space-y-1">
              <Link
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-t-3xl transition-all group ${
                  isActive
                    ? `${item.activeColor} text-white shadow-lg`
                    : `text-slate-600 hover:bg-white hover:shadow-sm`
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={
                      isActive
                        ? "text-white"
                        : `text-slate-400 group-${item.hoverColor}`
                    }
                  >
                    {item.icon}
                  </span>
                  <span className="text-sm font-bold">{item.label}</span>
                </div>
                {item.count > 0 && (
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"}`}
                  >
                    {item.count}
                  </span>
                )}
              </Link>
            </div>
          );
        })}

        <div className="pt-8">
          <p className="text-[10px] font-black text-slate-400 px-3 mb-2 uppercase tracking-[0.2em]">
            Insights
          </p>
          <Link
            href="/mail/analytics"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-t-3xl transition-all text-sm font-bold ${
              pathname === "/analytics"
                ? "bg-slate-900 text-white shadow-lg"
                : "text-slate-600 hover:bg-white"
            }`}
          >
            <BarChart2
              size={18}
              className={
                pathname === "/analytics" ? "text-white" : "text-slate-400"
              }
            />
            Analytics
          </Link>
        </div>
      </nav>

      {/* 4. Fancy Footer Section */}
      <div className="m-4 p-4 rounded-t-3xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-black shadow-inner">
            {user?.display_name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-black text-slate-900 truncate uppercase tracking-tighter">
              {user?.display_name}
            </p>
            <p className="text-[10px] font-bold text-blue-600 truncate uppercase">
              {user?.role || "User Member"}
            </p>
          </div>
        </div>
        <div className="flex gap-2 px-2 mt-auto pb-4">
          <Link
            href="/mail/settings"
            className="flex-1 flex items-center cursor-pointer justify-center py-2.5 bg-slate-50 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all group relative"
            title="Settings"
          >
            <Settings
              size={18}
              className="group-hover:rotate-45 transition-transform duration-300"
            />
          </Link>

          <button
            onClick={handleLogout}
            className="flex-1 flex items-center cursor-pointer justify-center py-2.5 bg-red-50 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all group"
            title="Logout"
          >
            <LogOut
              size={18}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
