import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import LayoutWrapper from "./LayoutWrapper";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  title: "FalconMail | Sovereign JMAP Infrastructure",
  description: "Next-gen mail engine powered by Rust and Stalwart.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${instrumentSans.variable} antialiased selection:bg-blue-100`}>

        {/* Background Layer (Stays on Server for performance) */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[60%] bg-blue-50/50 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[url('https://play.tailwindcss.com/img/grid.svg')] bg-center opacity-20" />
        </div>

        <LayoutWrapper>
          {children}
        </LayoutWrapper>

        <Toaster />
      </body>
    </html>
  );
}