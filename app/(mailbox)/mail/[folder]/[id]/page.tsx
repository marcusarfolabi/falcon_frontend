"use client";
import { use, useState } from "react";
import {
  ArrowLeft,
  Reply,
  Sparkles,
  MessageSquareQuote,
  X,
  Loader2,
  Paperclip,
} from "lucide-react";
import Link from "next/link";
import { useEmailDetails } from "@/hooks/useEmailDetails";
import DOMPurify from "dompurify";
import MailComposer from "@/components/mailbox/MailComposer";
import AttachmentCard from "@/components/mailbox/AttachmentCard";
import { formatEmailDate } from "@/util/formatedDate";
import EmailActions from "@/components/mailbox/EmailActions";

type Params = Promise<{ folder: string; id: string }>;

export default function EmailDetail(props: { params: Params }) {
  const { folder, id } = use(props.params);
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [isReplyExpanded, setIsReplyExpanded] = useState(false);

  const { data: email, isLoading, isError } = useEmailDetails(id);

  const isInbox = folder.toLowerCase() === "inbox"; 
  const isTrash = folder.toLowerCase() === "trash"; 

  if (isLoading) {
    return (
      <div className="flex h-full bg-white overflow-hidden relative animate-pulse">
        <div className="flex-1 flex flex-col min-w-0 bg-slate-50/30">
          {/* TOP NAV SKELETON */}
          <nav className="h-14 border-b border-slate-200 bg-white flex items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-slate-100 rounded-lg" />
              <div className="h-4 w-24 bg-slate-100 rounded-md" />
            </div>
            <div className="w-24 h-8 bg-blue-50 rounded-full" />
          </nav>

          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto w-full px-4 py-6 sm:px-8 sm:py-10 lg:px-12">
              <header className="mb-8">
                {/* SUBJECT SKELETON */}
                <div className="h-10 w-3/4 bg-slate-200 rounded-xl mb-6" />

                <div className="flex items-start gap-3">
                  {/* AVATAR SKELETON */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-200 shrink-0" />

                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="h-4 w-32 bg-slate-200 rounded-md" />
                      <div className="h-4 w-16 bg-slate-900/10 rounded-full" />
                    </div>
                    <div className="h-3 w-48 bg-slate-100 rounded-md" />
                    <div className="h-3 w-12 bg-slate-100 rounded-md" />
                  </div>
                </div>
              </header>

              {/* BODY CONTENT SKELETON */}
              <div className="space-y-4 mb-12">
                <div className="h-4 w-full bg-slate-100 rounded-md" />
                <div className="h-4 w-full bg-slate-100 rounded-md" />
                <div className="h-4 w-[90%] bg-slate-100 rounded-md" />
                <div className="h-4 w-full bg-slate-100 rounded-md" />
                <div className="h-4 w-[40%] bg-slate-100 rounded-md" />

                <div className="pt-8 space-y-4">
                  <div className="h-4 w-full bg-slate-100 rounded-md" />
                  <div className="h-4 w-[85%] bg-slate-100 rounded-md" />
                  <div className="h-4 w-[70%] bg-slate-100 rounded-md" />
                </div>
              </div>

              {/* REPLY BOX SKELETON */}
              <div className="h-16 w-full bg-white border border-slate-100 rounded-2xl" />
            </div>
          </div>
        </div>

        {/* RIGHT ACTION STRIP SKELETON (Desktop Only) */}
        <div className="hidden lg:flex w-14 border-l border-slate-100 flex-col items-center py-4 gap-6 bg-white shrink-0">
          <div className="w-10 h-10 bg-blue-50 rounded-xl" />
          <div className="w-6 h-6 bg-slate-50 rounded-md" />
          <div className="w-6 h-6 bg-slate-50 rounded-md" />
        </div>
      </div>
    );
  }

  if (isError || !email) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-white">
        <div className="w-14 h-14 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
          <X size={28} />
        </div>
        <h2 className="text-md font-bold text-slate-900">Message not found</h2>
        <Link
          href={`/mail/${folder}`}
          className="px-5 py-2 bg-slate-900 text-white rounded-lg text-xs mt-4"
        >
          Back to Inbox
        </Link>
      </div>
    );
  }

  const sanitizedBody =
    typeof window !== "undefined" ? DOMPurify.sanitize(email.body) : email.body;

  return (
    <div className="flex h-full bg-white overflow-hidden relative">
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50/30">
        {/* TOP NAV: Mobile Optimized */}
        <nav className="sticky top-0 bg-white/90 backdrop-blur-md z-20 px-2 sm:px-4 h-14 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              href={`/mail/${folder}`}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
              title={`Back to ${folder}`}
            >
              <ArrowLeft size={20} />
            </Link>

            <div className="h-4 w-px bg-slate-200 mx-1" />

            <div className="flex items-center">
              <EmailActions emailId={email.id} isTrash={isTrash} />
            </div>
          </div>

          <button
            onClick={() => setAiPanelOpen(true)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              aiPanelOpen
                ? "bg-blue-600 text-white"
                : "bg-blue-50 text-blue-600 lg:hidden"
            }`}
          >
            <Sparkles size={14} />
            <span className="hidden xs:inline">Falcon AI</span>
          </button>
        </nav>

        <div className="flex-1 overflow-y-auto scroll-smooth">
          {/* Main Content: Responsive Padding */}
          <div className="max-w-4xl mx-auto w-full px-4 py-6 sm:px-8 sm:py-10 lg:px-12">
            <header className="mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-6 leading-tight">
                {email.subject}
              </h1>

              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-lg">
                  {(email.from.name || email.from.email)[0].toUpperCase()}
                </div>

                {/* Sender Info & Time Container */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap justify-between items-center gap-x-2 gap-y-1">
                    {/* Name & Primary Email */}
                    <div className="flex items-center gap-2">
                      <span className="font-black text-slate-900 text-sm sm:text-base truncate">
                        {email.from.name || "Unknown"}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium lowercase">
                        &lt;{email.from.email}&gt;
                      </span>
                    </div>

                    {/* Dark Badge Time */}
                    <time className="text-[9px] font-black text-white bg-slate-900 px-2 py-0.5 rounded-full uppercase tracking-tighter shrink-0">
                      {formatEmailDate(email.date)}
                    </time>
                  </div>

                  {/* Recipient Rows (Gmail Style) */}
                  <div className="flex flex-col gap-0.5 mt-1">
                    {/* TO Recipients */}
                    {email.to && email.to.length > 0 && (
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                        <span className="text-slate-400 w-4">to</span>
                        <span className="truncate max-w-50">
                          {email.to[0].name || email.to[0].email}
                        </span>
                        {email.to.length > 1 && (
                          <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-sm text-[9px] font-bold">
                            +{email.to.length - 1} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* CC Recipients - Only show if present */}
                    {email.cc && email.cc.length > 0 && (
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                        <span className="text-slate-400 w-4 font-semibold uppercase text-[8px]">cc</span>
                        <span className="truncate max-w-50">
                          {email.cc[0].name || email.cc[0].email}
                        </span>
                        {email.cc.length > 1 && (
                          <span className="text-slate-400 text-[9px]">
                            & {email.cc.length - 1} others
                          </span>
                        )}
                      </div>
                    )}

                    {/* BCC Recipients - Only show if present (usually for Sent items) */}
                    {email.bcc && email.bcc.length > 0 && (
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-500 border-l-2 border-amber-100 pl-2">
                        <span className="text-amber-600 w-6 font-semibold uppercase text-[8px]">bcc</span>
                        <span className="truncate max-w-50">
                          {email.bcc[0].name || email.bcc[0].email}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </header>

            {/* Typography optimized for small screens */}
            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-slate-800 mb-12 overflow-hidden wrap-break-words">
              <div
                className="leading-relaxed"
                dangerouslySetInnerHTML={{ __html: sanitizedBody }}
              />
            </article>

            {/* REPLY SECTION */}
            {isInbox && (
              <section className="mt-10 pt-6 border-t border-slate-100">
                {!isReplyExpanded ? (
                  <button
                    onClick={() => setIsReplyExpanded(true)}
                    className="w-full flex items-center cursor-pointer justify-center gap-2 p-4 bg-white border border-slate-200 rounded-2xl text-slate-500 hover:border-blue-300 hover:bg-blue-50/30 transition-all shadow-sm"
                  >
                    <Reply size={18} />
                    <span className="text-sm font-bold">
                      Reply to this message
                    </span>
                  </button>
                ) : (
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex items-center justify-between p-3 bg-slate-50 border-b border-slate-100">
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest px-2">
                        Drafting Reply
                      </span>
                      <button
                        onClick={() => setIsReplyExpanded(false)}
                        className="p-1.5 hover:bg-slate-200 rounded-full transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <MailComposer
                      isReply={true}
                      initialData={{
                        to: [email.from.email],
                        subject: email.subject.startsWith("Re:")
                          ? email.subject
                          : `Re: ${email.subject}`,
                        threadMessageId: email.id,
                      }}
                      onSuccess={() => setIsReplyExpanded(false)}
                    />
                  </div>
                )}
              </section>
            )}

            {/* ATTACHMENTS */}
            {email.attachments && email.attachments.length > 0 && (
              <div className="mt-10 pt-8 border-t border-slate-100">
                <div className="flex items-center gap-2 mb-5 text-slate-900 font-black text-xs uppercase tracking-wider">
                  <Paperclip size={14} className="text-blue-600" />
                  <span>{email.attachments.length} Attachments</span>
                </div>
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3">
                  {email.attachments.map((at: any) => (
                    <AttachmentCard key={at.blobId} attachment={at} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Sidebar: Slides over content on mobile */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 bg-white border-l border-slate-200 shadow-2xl transition-all duration-500 lg:relative lg:translate-x-0 ${
          aiPanelOpen
            ? "w-[90%] sm:w-80 translate-x-0"
            : "w-80 translate-x-full lg:hidden"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-[0.2em]">
            <Sparkles size={16} fill="currentColor" /> Falcon AI
          </div>
          <button
            onClick={() => setAiPanelOpen(false)}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-400"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-5">
          <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 text-sm text-slate-700 leading-relaxed italic">
            {email.subject.includes("Stalwart")
              ? "The sender is reporting a JSON deserialization error and suggesting a fix for the config file."
              : "Summarizing conversation..."}
          </div>
        </div>
      </aside>

      {/* Desktop AI Toggle Strip */}
      <div className="hidden lg:flex w-14 border-l border-slate-100 flex-col items-center py-4 gap-6 bg-white shrink-0">
        <button
          onClick={() => setAiPanelOpen(!aiPanelOpen)}
          className={`p-2 rounded-xl transition-all ${aiPanelOpen ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600 hover:bg-blue-100"}`}
        >
          <Sparkles size={20} className={aiPanelOpen ? "" : "animate-pulse"} />
        </button>
      </div>
    </div>
  );
}
