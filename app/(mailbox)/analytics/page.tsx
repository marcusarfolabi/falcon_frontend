"use client";
import { useAnalytics } from "@/hooks/useAnalytics";
import {
  BarChart3,
  Mail,
  Send,
  ShieldAlert,
  Database,
  Info,
} from "lucide-react";
import { motion } from "framer-motion";

export default function AnalyticsPage() {
  const { data, isLoading, error } = useAnalytics();

  if (error)
    return (
      <div className="p-8 m-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 font-bold">
        Failed to load analytics. Please check your connection to Stalwart.
      </div>
    );

  // Define the base stats structure even if data is loading
  const stats = [
    {
      label: "Total Emails",
      value: data?.summary.totalMessages,
      icon: <Mail size={20} />,
      color: "text-blue-600",
      bg: "bg-blue-50",
      tip: "Cumulative count of all messages across all mailboxes.",
    },
    {
      label: "Sent Items",
      value: data?.summary.sentMessages,
      icon: <Send size={20} />,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      tip: "Messages successfully delivered from this account.",
    },
    {
      label: "Unread",
      value: data?.summary.unreadCount,
      icon: <BarChart3 size={20} />,
      color: "text-amber-600",
      bg: "bg-amber-50",
      tip: "New messages in your inbox awaiting attention.",
    },
    {
      label: "Spam Ratio",
      value: data?.summary.spamPercentage,
      icon: <ShieldAlert size={20} />,
      color: "text-orange-600",
      bg: "bg-orange-50",
      tip: "The percentage of incoming mail identified as Junk by Stalwart.",
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
            Account Insights
          </h1>
          <p className="text-slate-500 font-medium">
            Real-time performance data for your Stalwart mailbox.
          </p>
        </div>
        <div className="hidden md:block text-right">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">
            Last Updated: {isLoading ? "..." : new Date().toLocaleTimeString()}
          </span>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            //   initial={{ opacity: 0, y: 20 }}
            //   animate={{ opacity: 1, y: 0 }}
            //   transition={{ delay: index * 0.1 }}
            className="group relative bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300"
          >
            {/* TOOLTIP CONTAINER */}
            <div className="absolute top-4 right-4 flex flex-col items-center group/tip">
              <Info
                size={16}
                className="text-slate-300 hover:text-slate-600 transition-colors cursor-help"
              />

              {/* THE ACTUAL TIP BUBBLE */}
              <div className="absolute bottom-full mb-2 hidden group-hover/tip:block w-48 p-3 bg-slate-900 text-white text-[11px] font-bold rounded-xl shadow-2xl z-50 leading-relaxed animate-in fade-in zoom-in duration-200">
                {stat.tip}
                {/* Tooltip Arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900" />
              </div>
            </div>

            <div
              className={`${stat.bg} ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}
            >
              {stat.icon}
            </div>

            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
              {stat.label}
            </p>

            {isLoading ? (
              <div className="h-10 w-24 bg-slate-100 rounded-lg animate-pulse" />
            ) : (
              <p className="text-4xl font-black text-slate-900 tracking-tighter">
                {stat.value?.toLocaleString()}
              </p>
            )}
          </motion.div>
        ))}
      </div>
      {/* Storage Section */}
      <motion.div className="relative overflow-hidden bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-slate-900/20">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4 flex-1">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <Database size={20} className="text-blue-400" />
              </div>
              <p className="text-blue-400 text-xs font-black uppercase tracking-widest">
                Storage Utilization
              </p>
            </div>

            {/* SKELETON STORAGE VALUE */}
            {isLoading ? (
              <div className="h-16 w-48 bg-white/5 rounded-2xl animate-pulse" />
            ) : (
              <h2 className="text-6xl font-black tracking-tighter">
                {data?.storageEstimate}
              </h2>
            )}

            <div className="w-full max-w-md bg-white/10 h-3 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: isLoading ? "10%" : "35%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className={`h-full bg-linear-to-r from-blue-500 to-indigo-500 ${isLoading ? "animate-pulse" : ""}`}
              />
            </div>
          </div>

          <div className="hidden lg:block opacity-20 rotate-12 scale-150 pointer-events-none">
            <Database size={180} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
