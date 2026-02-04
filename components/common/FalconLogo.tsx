import { Bird } from "lucide-react";
import Link from "next/link";

export default function FalconLogo() {
  return (
    <Link href="/" className="flex items-center gap-3 group mb-8">
      <div className="bg-blue-600 p-2 rounded-2xl transition-all group-hover:rotate-6 group-hover:scale-110 shadow-lg shadow-blue-500/20">
        <Bird className="w-6 h-6 text-white" />
      </div>
      <span className="text-2xl font-black tracking-tighter text-black uppercase">
        Falcon<span className="text-blue-500">Mail</span>
      </span>
    </Link>
  );
}
