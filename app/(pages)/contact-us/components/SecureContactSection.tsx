"use client";
import React from "react";
import { Mail, MessageSquare, Globe, ExternalLink } from "lucide-react";

export default function SecureContactSection() {
    const handleContact = (type: "email" | "phone" | "chat") => {
        const data = {
            email: "support@falconmail.online",
            phone: "+1447930173135",
        };

        if (type === "email") {
            window.location.href = `mailto:${data.email}?subject=Inquiry to Falcon Operations`;
        } else if (type === "phone") {
            window.location.href = `tel:${data.phone}`;
        } else if (type === "chat") {
            console.log("Opening dashboard...");
        }
    };

    return (
        <section>
            <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground/40 mb-6">
                Secure Handshake
            </h3>
            <div className="space-y-6">
                <ContactButton
                    icon={<Mail className="w-5 h-5" />}
                    title="Email"
                    description="Mail Us"
                    onClick={() => handleContact("email")}
                />
                <ContactButton
                    icon={<MessageSquare className="w-5 h-5" />}
                    title="Live Webchat"
                    description="Chat Now"
                    onClick={() => handleContact("chat")}
                />
                <ContactButton
                    icon={<Globe className="w-5 h-5" />}
                    title="Phone"
                    description="Call Us"
                    onClick={() => handleContact("phone")}
                />
            </div>
        </section>
    );
}

function ContactButton({
    icon,
    title,
    description,
    onClick
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick: () => void
}) {
    return (
        <button
            onClick={onClick}
            className="flex w-full items-center gap-4 group text-left transition-all active:scale-[0.98]"
        >
            <div className="w-12 h-12 rounded-2xl bg-secondary/50 border border-border/50 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary transition-all duration-500 shadow-sm group-hover:shadow-[0_0_20px_rgba(45,91,255,0.3)]">
                {icon}
            </div>
            <div className="flex-1">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-0.5 group-hover:text-brand-primary transition-colors">
                    {title}
                </h4>
                <div className="flex items-center gap-2">
                    <p className="font-bold text-foreground text-sm tracking-tight">
                        {description}
                    </p>
                </div>
            </div>
        </button>
    );
}