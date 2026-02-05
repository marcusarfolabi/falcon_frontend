"use client";
import {
  X,
  Paperclip,
  Sparkles,
  Check,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { useState, useRef, ChangeEvent, KeyboardEvent } from "react";
import Editor from "./Editor";
import { useSendEmail } from "@/hooks/useSendEmail";
import { toast } from "react-hot-toast";
import { Attachment } from "@/types/attachments";
import { compressImage } from "@/util/imageCompressor";
import { useUploadAttachment } from "@/hooks/useUploadAttachment";
import { useReply } from "@/hooks/useReply";

interface MailComposerProps {
  onSuccess: () => void;
  initialData?: {
    to?: string[];
    subject?: string;
    threadMessageId?: string;
    references?: string[];
  };
  isReply?: boolean;
}

export default function MailComposer({
  onSuccess,
  initialData,
  isReply = false,
}: MailComposerProps) {
  const [emails, setEmails] = useState<string[]>(initialData?.to || []);
  const [inputValue, setInputValue] = useState("");
  const [cc, setCc] = useState<string[]>([]);
  const [ccInput, setCcInput] = useState("");
  const [bcc, setBcc] = useState<string[]>([]);
  const [bccInput, setBccInput] = useState("");
  const [subject, setSubject] = useState(initialData?.subject || "");
  const [messageHtml, setMessageHtml] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [showCcBcc, setShowCcBcc] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { sendMutation } = useSendEmail();
  const uploadMutation = useUploadAttachment();
  const replyMutation = useReply();

  const createPill = (
    val: string,
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    setInp: React.Dispatch<React.SetStateAction<string>>,
    list: string[],
  ) => {
    const trimmed = val.trim();
    if (trimmed) {
      if (!list.includes(trimmed)) setList([...list, trimmed]);
      setInp("");
    }
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    type: "to" | "cc" | "bcc",
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (type === "to")
        createPill(inputValue, setEmails, setInputValue, emails);
      if (type === "cc") createPill(ccInput, setCc, setCcInput, cc);
      if (type === "bcc") createPill(bccInput, setBcc, setBccInput, bcc);
    } else if (
      e.key === "Backspace" &&
      type === "to" &&
      !inputValue &&
      emails.length > 0
    ) {
      setEmails(emails.slice(0, -1));
    }
  };

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    for (const file of files) {
      const id = Math.random().toString(36).substr(2, 9);
      setAttachments((prev) => [
        ...prev,
        {
          id,
          name: file.name,
          size: file.size,
          progress: 0,
          status: "compressing",
        },
      ]);

      try {
        const processedFile = await compressImage(file);
        setAttachments((current) =>
          current.map((a) => (a.id === id ? { ...a, status: "uploading" } : a)),
        );

        const result = await uploadMutation.mutateAsync({
          file: processedFile,
          onProgress: (percent) => {
            setAttachments((current) =>
              current.map((a) =>
                a.id === id ? { ...a, progress: percent } : a,
              ),
            );
          },
        });

        setAttachments((current) =>
          current.map((a) =>
            a.id === id
              ? {
                  ...a,
                  status: "completed",
                  progress: 100,
                  blobId: result.blobId,
                  file: processedFile,
                }
              : a,
          ),
        );
      } catch (error) {
        setAttachments((current) =>
          current.map((a) => (a.id === id ? { ...a, status: "error" } : a)),
        );
      }
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSend = () => {
    const finalTo = [...emails];
    if (inputValue.trim()) finalTo.push(inputValue.trim());
    if (finalTo.length === 0)
      return toast.error("Please add at least one recipient");

    if (
      attachments.some((a) => ["uploading", "compressing"].includes(a.status))
    ) {
      return toast.error("Please wait for all files to finish uploading");
    }

    // 3. Map Attachment Data
    const attachmentData = attachments
      .filter((a) => a.status === "completed")
      .map((a) => ({
        blobId: a.blobId!,
        name: a.name,
        size: a.size,
        type: a.file?.type || "image/jpeg",
      }));

    const payload: any = {
      to: finalTo,
      cc: [...cc, ...(ccInput.trim() ? [ccInput.trim()] : [])].filter(Boolean),
      bcc: [...bcc, ...(bccInput.trim() ? [bccInput.trim()] : [])].filter(
        Boolean,
      ),
      subject: subject || "(No Subject)",
      body: messageHtml,
      attachments: attachmentData.length > 0 ? attachmentData : undefined,
    };

    if (isReply && initialData?.threadMessageId) {
      payload.threadMessageId = initialData.threadMessageId;
      payload.references = initialData.references;

      replyMutation.mutate(payload, {
        onSuccess: () => {
          onSuccess();
          toast.success("Reply sent");
        },
      });
    } else {
      // Standard Compose
      sendMutation.mutate(payload, {
        onSuccess: () => {
          onSuccess();
        },
      });
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="px-4 py-1.5 border-b border-slate-100 flex flex-wrap items-center gap-2">
        <span className="text-sm text-slate-500 w-8 ">To</span>
        {emails.map((email, i) => (
          <div
            key={i}
            className="flex items-center gap-1 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded-full text-xs text-slate-700"
          >
            {email}{" "}
            <X
              size={12}
              className="cursor-pointer hover:text-red-500"
              onClick={() => setEmails(emails.filter((_, idx) => idx !== i))}
            />
          </div>
        ))}
        <input
          value={inputValue}
          onChange={(e: any) => setInputValue(e.target.value)}
          onKeyDown={(e: any) => handleKeyDown(e, "to")}
          type="text"
          className="flex-1 min-w-30 py-1 text-sm outline-none"
        />
        {!showCcBcc && (
          <button
            aria-label="CcBcc"
            onClick={() => setShowCcBcc(true)}
            className="text-[10px] font-bold text-slate-400 hover:text-slate-600 flex items-center gap-0.5"
          >
            CC/BCC <ChevronDown size={12} />
          </button>
        )}
      </div>

      {showCcBcc && (
        <>
          <div className="px-4 py-1.5 border-b border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-sm text-slate-500 w-8">Cc</span>
            {cc.map((email, i) => (
              <div
                key={i}
                className="flex items-center gap-1 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-full text-xs text-slate-600"
              >
                {email}{" "}
                <X
                  size={12}
                  className="cursor-pointer hover:text-red-500"
                  onClick={() => setCc(cc.filter((_, idx) => idx !== i))}
                />
              </div>
            ))}
            <input
              value={ccInput}
              onChange={(e) => setCcInput(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, "cc")}
              className="flex-1 py-1 text-sm outline-none"
            />
          </div>
          <div className="px-4 py-1.5 border-b border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-sm text-slate-500 w-8">Bcc</span>
            {bcc.map((email, i) => (
              <div
                key={i}
                className="flex items-center gap-1 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-full text-xs text-slate-600"
              >
                {email}{" "}
                <X
                  size={12}
                  className="cursor-pointer hover:text-red-500"
                  onClick={() => setBcc(bcc.filter((_, idx) => idx !== i))}
                />
              </div>
            ))}
            <input
              value={bccInput}
              onChange={(e) => setBccInput(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, "bcc")}
              className="flex-1 py-1 text-sm outline-none"
            />
          </div>
        </>
      )}

      {/* Subject */}
      <div className="px-4 border-b border-slate-100">
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full py-3 text-sm outline-none font-bold placeholder:font-normal placeholder:text-slate-400"
        />
      </div>

      {/* Editor & Attachment Progress List */}
      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
        <Editor content={messageHtml} onChange={setMessageHtml} />

        <div className="px-4 pb-4 mt-4">
          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-0 px-1">
              {attachments.map((file) => (
                <div
                  key={file.id}
                  className={`group relative flex items-center gap-2 border border-slate-100 rounded-full pl-2 pr-1 py-1 transition-all ${file.status === "completed" ? "bg-green-50 border-green-200" : "bg-slate-100 border-slate-200"} hover:shadow-sm`}
                >
                  <div
                    className={
                      file.status === "completed"
                        ? "text-green-600"
                        : "text-slate-500"
                    }
                  >
                    {file.status === "completed" ? (
                      <Check size={12} strokeWidth={3} />
                    ) : (
                      <Paperclip size={12} />
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-[11px] font-medium text-slate-700 truncate max-w-30">
                      {file.name}
                    </span>
                    <span className="text-[9px] text-slate-400 font-mono">
                      {(file.size / 1024).toFixed(0)}KB
                    </span>
                  </div>

                  {file.status !== "completed" && file.status !== "error" && (
                    <div className="flex items-center gap-2 ml-1">
                      <div className="w-12 h-1 bg-slate-300 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 transition-all duration-300"
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                      <span className="text-[9px] font-bold text-blue-600 w-6">
                        {file.progress}%
                      </span>
                    </div>
                  )}

                  {file.status === "error" && (
                    <span className="text-[9px] text-red-500 font-bold ml-1">
                      Failed
                    </span>
                  )}

                  <button
                    aria-label="Remove Attachment"
                    onClick={() =>
                      setAttachments((prev) =>
                        prev.filter((a) => a.id !== file.id),
                      )
                    }
                    className="p-1 rounded-full hover:bg-slate-300 text-slate-500"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-4 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={handleSend}
            aria-label="send"
            disabled={sendMutation.isPending || replyMutation.isPending}
            className="px-8 py-1.5 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {sendMutation.isPending || replyMutation.isPending ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              "Send"
            )}
          </button>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            title="Attach File"
            aria-label="attach"
            className="p-2 hover:bg-slate-100 rounded-full cursor-pointer text-slate-600"
          >
            <Paperclip size={20} />
          </button>
          <button
            aria-label="Write with AI"
            className="p-2 hover:bg-blue-50 rounded-full text-blue-600"
            title="Write with AI - Coming soon"
          >
            <Sparkles size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
