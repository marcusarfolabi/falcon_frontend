"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isDashboard = pathname.startsWith("/account");

  const isMailBox = pathname.startsWith("/mail");

  const hidePublicLayout = isDashboard || isMailBox;

  return (
    <AuthProvider>
      <div className="relative z-10 flex flex-col min-h-screen">
        {!hidePublicLayout && <Navbar />}

        <main className="grow">{children}</main>

        {!hidePublicLayout && <Footer />}
      </div>
    </AuthProvider>
  );
}
