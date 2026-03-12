"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react";
import Link from "next/link";

export default function BlogDetailPage() {
    const { slug } = useParams();
    const router = useRouter();

    // In a real app, you would fetch this from your API using the slug
    const post = {
        title: "The Future of Sovereign Mail Infrastructure",
        content: `
      <p>Communication is the backbone of the digital era, yet most of it resides in centralized silos. Falcon is changing that by leveraging the power of Rust and the Stalwart mail server...</p>
      <h2>Why JMAP?</h2>
      <p>Traditional IMAP is chatty and inefficient for modern mobile networks. JMAP provides a JSON-based, stateless API that makes mail as fast as a real-time chat application.</p>
      <blockquote>The goal isn't just to send mail; it's to own the infrastructure that sends it.</blockquote>
      <p>By using Stalwart, we ensure memory safety and extreme performance, even under heavy load.</p>
    `,
        date: "March 10, 2026",
        readTime: "1 min read",
        author: "Abiodun Marcus",
        category: "Engineering",
        image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1000",
    };

    return (
        <article className="pt-32 pb-20 container mx-auto px-6 max-w-4xl">
            {/* Navigation */}
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-muted-foreground hover:text-brand-primary transition-colors mb-12 font-bold text-xs uppercase tracking-widest"
            >
                <ArrowLeft size={16} /> Back to Blog
            </button>

            {/* Hero Section */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-black uppercase tracking-widest">
                        {post.category}
                    </span>
                    <span className="text-muted-foreground text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                        <Clock size={14} /> {post.readTime}
                    </span>
                </div>

                <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-[1.1]">
                    {post.title}
                </h1>

                <div className="flex items-center justify-between p-6 border-y border-border/40">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center border border-brand-primary/40">
                            <User className="text-brand-primary" size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-bold">{post.author}</p>
                            <p className="text-xs text-muted-foreground">{post.date}</p>
                        </div>
                    </div>
                    <button className="p-3 rounded-full bg-secondary hover:bg-brand-primary/10 transition-colors">
                        <Share2 size={18} />
                    </button>
                </div>
            </div>

            {/* Featured Image */}
            <div className="w-full aspect-video rounded-3xl overflow-hidden mb-16 border border-border/40">
                <img src={post.image} alt="" className="w-full h-full object-cover" />
            </div>

            {/* Content Engine */}
            <div
                className="prose prose-invert prose-lg max-w-none 
          prose-headings:font-black prose-headings:tracking-tighter 
          prose-p:text-muted-foreground prose-p:leading-relaxed
          prose-blockquote:border-l-brand-primary prose-blockquote:bg-brand-primary/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl
          prose-strong:text-foreground prose-a:text-brand-primary"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </article>
    );
}