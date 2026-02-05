"use client";
import {
  Square,
  Star,
  RefreshCcw,
  ChevronLeft,
  ChevronRight,
  Trash2,
  MailOpen,
  Paperclip,
  Inbox,
  Send,
  Trash,
  FileText,
  RotateCcw,
  RotateCw,
} from "lucide-react";
import Link from "next/link";

interface MailListProps {
  emails: any[];
  isLoading: boolean;
  isError: boolean;
  isFetching?: boolean;
  onRefetch: () => void;
  folderName: string;
  totalCount?: number;
  emptyTitle?: string;
  emptyMessage?: string;
}

export default function MailList({
  emails,
  isLoading,
  isError,
  isFetching,
  onRefetch,
  folderName,
  totalCount,
  emptyTitle = "You're all caught up!",
  emptyMessage = "Your folder is currently empty.",
}: MailListProps) {
  const getFolderConfig = (folder: string) => {
    const name = folder.toLowerCase();
    if (name === "inbox")
      return {
        icon: <Inbox size={14} />,
        color: "text-blue-600",
        bg: "bg-blue-50",
        border: "border-l-blue-500",
      };
    if (name === "sent")
      return {
        icon: <Send size={14} />,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        border: "border-l-emerald-500",
      };
    if (name === "trash")
      return {
        icon: <Trash size={14} />,
        color: "text-red-600",
        bg: "bg-red-50",
        border: "border-l-red-500",
      };
    if (name === "drafts")
      return {
        icon: <FileText size={14} />,
        color: "text-amber-600",
        bg: "bg-amber-50",
        border: "border-l-amber-500",
      };
    if (name === "junk")
      return {
        icon: <Trash2 size={14} />,
        color: "text-orange-600",
        bg: "bg-orange-50",
        border: "border-l-orange-500",
      };
    return {
      icon: null,
      color: "text-slate-600",
      bg: "bg-slate-50",
      border: "border-l-transparent",
    };
  };

  const config = getFolderConfig(folderName);

  // --- SKELETON ROW COMPONENT ---
  const SkeletonRow = () => (
    <div className="flex items-center px-3 sm:px-4 py-3 border-b border-slate-50 animate-pulse">
      <div className="hidden sm:flex items-center gap-3 mr-4 shrink-0">
        <div className="w-4.5 h-4.5 bg-slate-100 rounded" />
        <div className="w-4.5 h-4.5 bg-slate-100 rounded" />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center flex-1 min-w-0 gap-2 sm:gap-4">
        <div className="h-4 w-32 sm:w-48 bg-slate-100 rounded-md" />
        <div className="h-4 w-full max-w-75 bg-slate-50 rounded-md" />
      </div>
      <div className="ml-2 w-10 h-3 bg-slate-50 rounded" />
    </div>
  );

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <p className="text-red-500 font-medium text-sm">
          Failed to sync with FalconMail.
        </p>
        <button
          onClick={onRefetch}
          className="mt-4 px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* 1. Header Controls - Fixed Mobile Logic */}
      <div className="flex items-center justify-between px-2 py-2 border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur-md z-20">
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hidden sm:block">
            <Square size={18} />
          </button>

          <button
            onClick={onRefetch}
            className={`p-2 hover:bg-slate-100 rounded-lg text-slate-500 ${isFetching ? "animate-spin" : ""}`}
          >
            <RotateCw size={18} />
          </button>

          <div
            className={`ml-1 sm:ml-2 flex items-center gap-1.5 px-3 py-1 rounded-full ${config.bg} ${config.color} border border-current/10`}
          >
            {config.icon}
            <span className="text-[10px] font-black uppercase tracking-wider">
              {folderName}
            </span>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center shrink-0">
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="px-2 text-[12px] font-medium text-slate-600 tabular-nums select-none">
              {isLoading ? (
                <div className="h-3 w-16 bg-slate-100 animate-pulse rounded" />
              ) : (
                <span className="flex items-center gap-1">
                  <span className="text-slate-900 font-semibold">
                    1 - {emails.length}
                  </span>
                  <span className="text-slate-400 font-normal">of</span>
                  <span className="text-slate-900 font-semibold">
                    {totalCount || emails.length}
                  </span>
                </span>
              )}
            </div>

            {/* Gmail Navigation Buttons */}
            <div className="flex items-center">
              <button
                disabled={isLoading}
                className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors disabled:opacity-20 active:bg-slate-200"
                title="Newer"
              >
                <ChevronLeft size={18} strokeWidth={2} />
              </button>

              <button
                disabled={isLoading}
                className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors disabled:opacity-20 active:bg-slate-200"
                title="Older"
              >
                <ChevronRight size={18} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. List Area */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          Array.from({ length: 12 }).map((_, i) => <SkeletonRow key={i} />)
        ) : emails.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center p-6">
            <h3 className="text-lg font-bold text-slate-800 mt-4">
              {emptyTitle}
            </h3>
            <p className="text-slate-400 text-xs max-w-50 mx-auto mt-1">
              {emptyMessage}
            </p>
          </div>
        ) : (
          emails.map((email) => (
            <Link
              key={email.id}
              href={`/mail/${folderName.toLowerCase()}/${email.id}`}
              className={`group flex items-center px-3 sm:px-4 py-3 border-b border-slate-50 transition-all border-l-4 ${config.border} ${
                !email.read ? "bg-white" : "bg-slate-50/40 opacity-80"
              } hover:bg-blue-50/40`}
            >
              {/* Desktop Selectors */}
              <div className="hidden sm:flex items-center gap-3 mr-4 shrink-0">
                <Square size={18} className="text-slate-200" />
                <Star
                  size={18}
                  className={
                    email.starred
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-slate-200"
                  }
                />
              </div>

              {/* Content */}
              <div className="flex flex-col sm:flex-row sm:items-center flex-1 min-w-0 gap-0.5 sm:gap-4">
                <span
                  className={`sm:w-48 truncate text-sm tracking-tight ${!email.read ? "font-black text-slate-900" : "font-medium text-slate-600"}`}
                >
                  {folderName.toLowerCase() === "sent"
                    ? `To: ${email.recipient || "Unknown"}`
                    : email.sender}
                </span>

                <div className="flex-1 truncate text-xs sm:text-sm flex items-center gap-1.5">
                  <span
                    className={
                      !email.read
                        ? "font-bold text-slate-900"
                        : "text-slate-500"
                    }
                  >
                    {email.subject}
                  </span>
                  <span className="text-slate-400 font-normal hidden md:inline">
                    — {email.preview}
                  </span>
                  {email.hasAttachments && (
                    <Paperclip
                      size={12}
                      className="text-slate-300 shrink-0 rotate-45"
                    />
                  )}
                </div>
              </div>

              {/* Time / Actions */}
              <div className="ml-2 flex items-center min-w-12.5 justify-end shrink-0">
                <span
                  className={`text-[10px] font-bold whitespace-nowrap group-hover:hidden ${!email.read ? "text-blue-600" : "text-slate-400"}`}
                >
                  {email.time}
                </span>

                <div className="hidden group-hover:flex items-center gap-0.5">
                  <button className="p-2 hover:bg-white hover:shadow-sm rounded-full text-slate-400 hover:text-red-500 transition-all">
                    <Trash2 size={16} />
                  </button>
                  <button className="p-2 hover:bg-white hover:shadow-sm rounded-full text-slate-400 hover:text-blue-500 transition-all">
                    <MailOpen size={16} />
                  </button>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
