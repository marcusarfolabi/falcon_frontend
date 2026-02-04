"use client";
import { useSearchParams } from "next/navigation";
import { useSearch } from "@/hooks/useSearch";
import { Loader2, SearchX, Mail } from "lucide-react";
import Link from "next/link";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const term = searchParams.get("q") || "";
  const { data: results, isLoading, isError } = useSearch(term);

  if (!term) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-400">
        <p>Enter a keyword in the top bar to search your mail.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Loader2 className="animate-spin text-blue-600 mb-2" size={32} />
        <p className="text-sm font-medium text-slate-500">Searching FalconMail...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-sm font-semibold text-slate-700">
          Search results for <span className="text-blue-600">"{term}"</span>
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {results?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[50vh] text-slate-400">
            <SearchX size={48} className="mb-4 opacity-20" />
            <p className="text-sm">No messages match your search.</p>
          </div>
        ) : (
          results?.map((email: any) => (
            <Link 
              key={email.id} 
              href={`/inbox/${email.id}`} // Or dynamic based on folder
              className="flex items-center px-6 py-3 border-b border-slate-50 hover:bg-slate-50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-sm font-bold text-slate-900 truncate">{email.sender}</span>
                  <span className="text-xs text-slate-400">{email.time}</span>
                </div>
                <p className="text-sm font-medium text-slate-700 truncate">{email.subject}</p>
                <p className="text-xs text-slate-400 truncate mt-0.5">{email.preview}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}