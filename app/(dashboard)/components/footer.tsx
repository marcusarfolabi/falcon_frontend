import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-slate-200 px-4 md:px-8 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                <p>© {new Date().getFullYear()} FalconMail Infra</p>

                <div className="flex items-center space-x-6">
                    <Link
                        href="/support"
                        className="flex items-center gap-2 hover:text-blue-600 transition-colors group"
                    >
                        {/* Animated Status Pulse */}
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span>System Status</span>
                    </Link>

                    <Link href="/docs" className="hover:text-blue-600 transition-colors">
                        Docs
                    </Link>
                </div>
            </div>
        </footer>
    );
}