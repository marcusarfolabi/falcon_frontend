"use client";
import React from "react";
import { Bird, Globe, Instagram } from "lucide-react";
import Link from "next/link";

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.494h2.039L6.486 3.24H4.298l13.311 17.407z" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background text-muted-foreground pt-16 pb-8 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-6">

        {/* Decorative Top Divider with Dots */}
        <div className="relative w-full h-px bg-border/40 mb-16 flex justify-between items-center px-[10%] md:px-[20%]">
          <div className="w-1 h-1 bg-border rounded-full" />
          <div className="w-1 h-1 bg-border rounded-full" />
          <div className="w-1 h-1 bg-border rounded-full" />
          <div className="w-1 h-1 bg-border rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          {/* Brand Column */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <Bird className="w-5 h-5 text-brand-primary" />
              <span className="text-lg font-bold tracking-tight text-foreground">
                Hypersphere
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-70">
             Revolutionize your business with next level AI Support and enhance your business operations.
            </p>

            <div className="mt-4">
              <h5 className="text-foreground font-bold text-sm mb-4">Get in Touch with Us!</h5>
              <div className="flex gap-3">
                {[Globe, Instagram, XIcon].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-8 h-8 rounded-full bg-secondary/50 border border-border/50 flex items-center justify-center hover:border-brand-primary hover:text-brand-primary transition-all"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <FooterGroup title="Product" links={["Pricing", "Integrations"]} />
            <FooterGroup title="Solutions" links={["Internal Knowledge Base", "Public Docs"]} />
            <FooterGroup title="Resources" links={["Docs", "Blog", "Changelog", "Security", "Newsletter"]} />
            <FooterGroup title="Company" links={["About", "Careers", "Contact and support", "Security", "Newsletter"]} />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between gap-4 text-xs text-muted-foreground/60 font-medium">
          <div className="flex flex-col gap-1">
            <p>Copyright © {currentYear} Hypersphere Inc. All right reserved.</p>
            <p>360 Surakarta Ave #6071, East Java, SR00382, INA. EIN: 400329347</p>
          </div>
          <div className="flex gap-6 items-end">
            <a href="#" className="hover:text-foreground transition-colors">Terms and Conditions</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterGroup({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-foreground font-bold text-sm">{title}</h4>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link}>
            <a href="#" className="text-sm hover:text-brand-primary transition-colors">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}