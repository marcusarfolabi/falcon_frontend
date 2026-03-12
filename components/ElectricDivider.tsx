"use client";
import React from "react";
import { motion } from "framer-motion";

export default function ElectricDivider() {
    return (
        <div className="relative w-full h-px mb-16 px-[10%] md:px-[20%] flex justify-between items-center">
            {/* The main wire line */}
            <div className="absolute inset-0 h-px bg-border/40 px-[10%] md:px-[20%] bg-clip-content" />

            {/* The Traveling Spark */}
            <motion.div
                initial={{ left: "0%" }}
                animate={{ left: "100%" }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute h-[2px] w-24 bg-linear-to-r from-transparent via-brand-primary to-transparent z-10 opacity-70 blur-[1px]"
            />

            {/* The Nodes (Dots) */}
            {[0, 1, 2, 3].map((i) => (
                <div key={i} className="relative group">
                    {/* Static Dot */}
                    <div className="w-1.5 h-1.5 bg-border rounded-full relative z-20 transition-colors duration-500 group-hover:bg-brand-primary" />

                    {/* Electric Pulse Glow around the dot */}
                    <motion.div
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.1, 0.4, 0.1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.5
                        }}
                        className="absolute inset-0 bg-brand-primary rounded-full blur-xs"
                    />
                </div>
            ))}

            {/* Extra "Flash" effect traveling across */}
            <motion.div
                animate={{
                    x: ["-100%", "200%"],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: "easeInOut",
                }}
                className="absolute h-px w-40 bg-linear-to-r from-transparent via-white/50 to-transparent"
            />
        </div>
    );
}