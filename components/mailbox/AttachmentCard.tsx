import { useState, useEffect } from "react";
import { Download, FileText, Loader2 } from "lucide-react";
import Image from "next/image";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function AttachmentCard({ attachment }: { attachment: any }) {
  const isImage = attachment.type.startsWith("image/");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [blobData, setBlobData] = useState<Blob | null>(null);
  const [isLoading, setIsLoading] = useState(isImage);

  useEffect(() => {
    if (!isImage) return;

    const fetchPreview = async () => {
      try {
        const response = await api.get(
          `/api/v1/mail/download/${attachment.blobId}`,
          {
            params: { name: attachment.name, type: attachment.type },
            responseType: "blob",
            cache: false,
          },
        );

        if (response.data.type.includes("html")) {
          throw new Error("Received HTML instead of Image");
        }

        const blob =
          response.data instanceof Blob
            ? response.data
            : new Blob([response.data], { type: attachment.type });

        const url = window.URL.createObjectURL(blob);

        setBlobData(blob);
        setPreviewUrl(url); // This changes the state
      } catch (error) {
        console.error("Preview failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPreview();

    return () => {
      // We use a local reference or check the state here
      if (previewUrl) window.URL.revokeObjectURL(previewUrl);
    };

    // REMOVED previewUrl from here:
  }, [attachment.blobId, isImage, attachment.name, attachment.type]);

  const handleDownload = async () => {
    try {
      let downloadBlob = blobData;

      // If it's not an image (no preview) or preview failed, fetch it now
      if (!downloadBlob) {
        const loadingToast = toast.loading("Downloading...");
        const response = await api.get(
          `/api/v1/mail/download/${attachment.blobId}`,
          {
            params: { name: attachment.name, type: attachment.type },
            responseType: "blob",
            cache: false,
          },
        );
        downloadBlob = response.data;
        toast.dismiss(loadingToast);
      }

      if (!downloadBlob) return;

      const url = window.URL.createObjectURL(downloadBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = attachment.name;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("File downloaded");
    } catch (error) {
      toast.error("Download failed");
    }
  };

  return (
    <div className="group w-48 border border-slate-200 rounded-lg overflow-hidden bg-white hover:border-blue-300 transition-all shadow-sm">
      {/* Preview Section */}
      <div className="h-24 w-full flex items-center justify-center bg-slate-50 relative border-b border-slate-100">
        {isImage ? (
          <>
            {isLoading ? (
              <Loader2 className="animate-spin text-slate-300" size={20} />
            ) : previewUrl ? (
              <Image
                src={previewUrl}
                alt={attachment.name}
                className="object-cover"
                fill
                sizes="192px"
                unoptimized
              />
            ) : (
              <div className="flex flex-col items-center gap-1">
                <FileText size={24} className="text-slate-300" />
                <span className="text-[10px] text-slate-400">
                  Preview failed
                </span>
              </div>
            )}
          </>
        ) : (
          <FileText size={32} className="text-slate-300" />
        )}
      </div>

      {/* Info Section */}
      <div className="p-2 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p
            className="text-[11px] font-bold text-slate-700 truncate"
            title={attachment.name}
          >
            {attachment.name}
          </p>
          <p className="text-[10px] text-slate-400">
            {(attachment.size / 1024).toFixed(1)} KB
          </p>
        </div>

        <button
          onClick={handleDownload}
          className="p-1.5 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-md transition-colors border border-transparent hover:border-blue-100"
        >
          <Download size={14} />
        </button>
      </div>
    </div>
  );
}
