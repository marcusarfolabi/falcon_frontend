import { useAccountSettings } from "@/hooks/useAccountSettings";

export const SignaturePreview = () => {
  const { identity, isLoading } = useAccountSettings();
  
  const signatureHtml = identity?.htmlSignature || identity?.html_signature;

  if (isLoading || !signatureHtml) return null;

  return (
    <div className="px-6 py-4 mt-2 border-t border-slate-50 opacity-60 hover:opacity-100 transition-opacity">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-px bg-slate-200 flex-1" />
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Signature</span>
        <div className="h-px bg-slate-200 flex-1" />
      </div>
      <div 
        className="text-xs text-slate-600 italic prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: signatureHtml }} 
      />
    </div>
  );
};