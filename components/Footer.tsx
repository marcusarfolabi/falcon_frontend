"use client";
import React from "react";
import { Bird, Facebook, Instagram, LucideLinkedin } from "lucide-react";
import Link from "next/link";
import ElectricDivider from "./ElectricDivider";

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.494h2.039L6.486 3.24H4.298l13.311 17.407z" />
  </svg>
);

// 1. Define the social data mapping
const socialLinks = [
  { Icon: LucideLinkedin, href: "https://linkedin.com/company/falconmail", label: "LinkedIn" },
  { Icon: XIcon, href: "https://x.com/falconmail", label: "X (Twitter)" },
  { Icon: Facebook, href: "https://facebook.com/falconmail", label: "Facebook" },
  { Icon: Instagram, href: "https://instagram.com/falconmail", label: "Instagram" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background text-muted-foreground pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <ElectricDivider />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          {/* Brand Column */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center shadow-lg shadow-brand-primary/20">
                <Bird className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                Falcon<span className="text-brand-primary">Mail</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-70">
              Revolutionize your business with next-level AI Support and enhance your business operations.
            </p>

            <div className="mt-4">
              <p className="text-foreground font-bold text-sm mb-4">Get in Touch with Us!</p>
              <div className="flex gap-3">
                {/* 2. Map through the socialLinks array properly */}
                {socialLinks.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-8 h-8 rounded-full bg-secondary/50 border border-border/50 flex items-center justify-center hover:border-brand-primary hover:text-brand-primary transition-all hover:-translate-y-1"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <FooterGroup title="Integrations" links={["Email", "Webchat", "Facebook", "WhatsApp", "Instagram"]} />
            <FooterGroup title="Resources" links={["Pricing", "Integrations", "Blog"]} />
            <FooterGroup title="Company" links={["Contact Us"]} />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between gap-4 text-xs text-muted-foreground/60 font-medium">
          <div className="flex flex-col gap-1">
            <p>Copyright © {currentYear} FalconMail Services Limited. All rights reserved.</p>
            <p>360 Kent, LN. UK</p>
          </div>
          <div className="flex gap-6 items-end">
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms and Conditions</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterGroup({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-foreground font-bold text-sm">{title}</h3>
      <ul className="flex flex-col gap-2">
        {links.map((link) => {
          const href = `/${link.toLowerCase().replace(/\s+/g, "-")}`;
          return (
            <li key={link}>
              <Link
                href={href}
                className="text-sm hover:text-brand-primary transition-colors"
              >
                {link}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}