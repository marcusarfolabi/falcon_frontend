"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    
    // Check if we are in the "App" environment (Dashboard, Mail, or Settings)
    const isDashboard = pathname.startsWith("/account") || pathname.startsWith("/dashboard");
    
    // Added /settings here so the Public Nav/Footer stays hidden
    const isMailBox = 
        pathname.startsWith("/inbox") || 
        pathname.startsWith("/search") || 
        pathname.startsWith("/junk") || 
        pathname.startsWith("/analytics") || 
        pathname.startsWith("/sent") || 
        pathname.startsWith("/drafts") || 
        pathname.startsWith("/spam") || 
        pathname.startsWith("/trash") ||
        pathname.startsWith("/settings"); // <--- Add this

    // Combine them for cleaner conditional rendering
    const hidePublicLayout = isDashboard || isMailBox;

    return (
        <AuthProvider>
            <div className="relative z-10 flex flex-col min-h-screen">
                {/* Only show Navbar if we ARE NOT in Dashboard/Mail/Settings */}
                {!hidePublicLayout && <Navbar />}

                <main className="grow">
                    {children}
                </main>

                {/* Only show Footer if we ARE NOT in Dashboard/Mail/Settings */}
                {!hidePublicLayout && <Footer />}
            </div>
        </AuthProvider>
    );
}