"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import Image from "next/image";

// Sample Data for Validation
const SAMPLE_POSTS = [
    {
        id: 1,
        title: "The Future of Sovereign Mail Infrastructure",
        excerpt: "Why we built Falcon on JMAP and Rust for the next generation of secure communication.",
        date: "March 10, 2026",
        readTime: "1 min read",
        author: "Abiodun Marcus",
        category: "Engineering",
        slug: "future-of-sovereign-mail",
        image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1000",
    },
    {
        id: 2,
        title: "Migrating to Stalwart: A Technical Guide",
        excerpt: "Step-by-step instructions on moving your enterprise workload to a modern Rust-based mail server.",
        date: "March 05, 2026",
        readTime: "1 min read",
        author: "Falcon Team",
        category: "Tutorial",
        slug: "migrating-to-stalwart",
        image: "https://ix-marketing.imgix.net/global.jpg?auto=format&fit=crop&q=80&w=1000",
    }, 
];

export default function BlogPage() {
    return (
        <div className="pt-32 pb-20 container mx-auto px-6">
            {/* Header */}
            <div className="max-w-3xl mb-16">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
                    Falcon <span className="text-brand-primary">Intelligence</span>
                </h1>
                <p className="text-muted-foreground text-lg">
                    Deep dives into secure protocols, AI reframing, and sovereign infrastructure.
                </p>
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {SAMPLE_POSTS.map((post, index) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative flex flex-col bg-card/50 backdrop-blur-sm border border-border/40 rounded-3xl overflow-hidden hover:border-brand-primary/50 transition-all"
                    >
                        <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10" />

                        <div className="aspect-video overflow-hidden">
                            <Image
                                width={100}
                                height={100}
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                            />
                        </div>

                        <div className="p-6 flex flex-col flex-1">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-widest">
                                    {post.category}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold mb-3 group-hover:text-brand-primary transition-colors">
                                {post.title}
                            </h3>

                            <p className="text-muted-foreground text-sm line-clamp-2 mb-6">
                                {post.excerpt}
                            </p>

                            <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/40 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                                    <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                                </div>
                                <ArrowRight size={16} className="-rotate-45 group-hover:rotate-0 transition-transform text-brand-primary" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}