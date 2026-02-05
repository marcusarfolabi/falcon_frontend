"use client";
import { useAnalytics } from "@/hooks/useAnalytics";
import {
  BarChart3,
  Mail,
  Send,
  ShieldAlert,
  Database,
  Info,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";

export default function AnalyticsPage() {
  const { data, isLoading, error } = useAnalytics();

  if (error)
    return (
      <div className="p-4 sm:p-8 m-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 font-bold text-sm">
        Failed to load analytics. Please check your connection to Stalwart.
      </div>
    );

  const stats = [
    {
      label: "Total Emails",
      value: data?.summary.totalMessages,
      icon: <Mail size={18} />,
      color: "text-blue-600",
      bg: "bg-blue-50",
      tip: "Cumulative count of all messages across all mailboxes.",
    },
    {
      label: "Sent Items",
      value: data?.summary.sentMessages,
      icon: <Send size={18} />,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      tip: "Messages successfully delivered from this account.",
    },
    {
      label: "Unread",
      value: data?.summary.unreadCount,
      icon: <BarChart3 size={18} />,
      color: "text-amber-600",
      bg: "bg-amber-50",
      tip: "New messages in your inbox awaiting attention.",
    },
    {
      label: "Spam Ratio",
      value: data?.summary.spamPercentage,
      icon: <ShieldAlert size={18} />,
      color: "text-orange-600",
      bg: "bg-orange-50",
      tip: "The percentage of incoming mail identified as Junk.",
    },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6 sm:space-y-8">
      {/* Header - More compact on mobile */}
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tighter">
            Account Insights
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Real-time performance data for your Stalwart mailbox.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 w-fit px-3 py-1 rounded-full">
          <Clock size={10} />
          Last Sync: {isLoading ? "..." : new Date().toLocaleTimeString()}
        </div>
      </header>

      {/* Stats Cards - Grid optimized for mobile (2 columns) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            className="group relative bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all"
          >
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 group/tip">
              <Info size={14} className="text-slate-300 cursor-help" />
              <div className="absolute bottom-full right-0 mb-2 hidden group-hover/tip:block w-40 p-2 bg-slate-900 text-white text-[10px] rounded-lg shadow-xl z-50">
                {stat.tip}
              </div>
            </div>

            <div
              className={`${stat.bg} ${stat.color} w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-6`}
            >
              {stat.icon}
            </div>

            <p className="text-slate-400 text-[9px] sm:text-[10px] font-black uppercase tracking-widest mb-0.5">
              {stat.label}
            </p>

            {isLoading ? (
              <div className="h-6 w-16 bg-slate-100 rounded animate-pulse" />
            ) : (
              <p className="text-xl sm:text-3xl font-black text-slate-900 tracking-tighter">
                {stat.value}
              </p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Storage Section - Mobile First Layout */}
      <motion.div className="relative overflow-hidden bg-slate-900 rounded-[2rem] p-6 sm:p-10 text-white shadow-xl">
        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database size={18} className="text-blue-400" />
              <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest">
                Storage Utilization
              </p>
            </div>
            {!isLoading && (
              <span className="text-[10px] font-bold px-2 py-0.5 bg-white/10 rounded-md">
                {data?.storage.usagePercentage}% Used
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              {isLoading ? (
                <div className="h-12 w-32 bg-white/5 rounded-xl animate-pulse" />
              ) : (
                <div className="flex items-baseline gap-2">
                  <h2 className="text-4xl sm:text-6xl font-black tracking-tighter">
                    {data?.storage.usedHuman}
                  </h2>
                  <span className="text-slate-400 font-bold text-sm sm:text-xl">
                    / {data?.storage.limitHuman}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="w-full bg-white/10 h-2 sm:h-3 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: isLoading ? "5%" : `${data?.storage.usagePercentage}%`,
                }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-400"
              />
            </div>
            <p className="text-[10px] text-slate-400 font-medium text-right">
              {data?.storage.limitHuman} total capacity per mailbox
            </p>
          </div>
        </div>

        {/* Decorative Background Icon - Hidden on smallest screens */}
        <div className="absolute -right-10 -bottom-10 opacity-10 hidden sm:block pointer-events-none">
          <Database size={240} />
        </div>
      </motion.div>
    </div>
  );
}
