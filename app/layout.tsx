import type { Metadata, Viewport } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import LayoutWrapper from "./LayoutWrapper";
import { ThemeProvider } from "@/components/theme-provider";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  title: {
    default: "FalconMail | Sovereign JMAP Mail Infrastructure",
    template: "%s | FalconMail"
  },
  description: "Next-gen mail engine powered by Rust and Stalwart. Secure, sovereign, and blazingly fast.",
  openGraph: {
    title: "FalconMail",
    description: "Sovereign JMAP Infrastructure",
    url: "https://falconmail.online",
    siteName: "FalconMail",
    images: [
      {
        url: "https://falconmail.online/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FalconMail",
    description: "Sovereign JMAP Infrastructure",
    images: ["https://falconmail.online/og-image.png"],
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${instrumentSans.variable} font-sans antialiased selection:bg-blue-100 dark:selection:bg-blue-900 transition-colors duration-300 min-h-screen overflow-x-hidden max-w-[100vw]`}
      >
        <ThemeProvider>
          <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-[-10%] left-[-10%] w-[70%] h-[60%] 
                         bg-blue-50/50 dark:bg-blue-900/20 
                         rounded-full blur-[120px]"
            />

            <div
              className="absolute inset-0 bg-[url('https://play.tailwindcss.com/img/grid.svg')] 
                         bg-center`mask-[linear-gradient(180deg,white,rgba(255,255,255,0))]
                         opacity-10 dark:opacity-20 invert dark:invert-0 bg-repeat"
            />
          </div>

          <div className="relative z-10 w-full overflow-x-hidden">
            <LayoutWrapper>{children}</LayoutWrapper>
          </div>

          <Toaster
            position="bottom-left"
            toastOptions={{
              style: {
                background: "var(--toast-bg, #0f172a)",
                color: "#fff",
                borderRadius: "12px",
                fontSize: "14px",
                border: "1px solid rgba(255,255,255,0.1)",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}