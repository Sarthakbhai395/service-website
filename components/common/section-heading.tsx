"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) {
  // Split title into words for staggered animation
  const words = title.split(" ");

  return (
    <div
      className={cn(
        "flex flex-col gap-5 max-w-3xl mb-16",
        {
          "text-left items-start": align === "left",
          "text-center items-center mx-auto": align === "center",
        },
        className
      )}
    >
      {/* Badge */}
      {badge && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-[10px] font-mono tracking-[0.15em] uppercase text-gold font-bold shadow-[0_0_12px_rgba(212,175,55,0.15)]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-glow" />
          {badge}
        </motion.span>
      )}

      {/* Animated title — word by word stagger */}
      <h2
        className={cn(
          "text-3xl md:text-5xl lg:text-[3.5rem] font-heading font-extrabold text-gold leading-[1.1] tracking-tight text-glow",
          align === "center" && "max-w-2xl"
        )}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              delay: i * 0.06,
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block mr-[0.3em] bg-gradient-to-r from-white via-gold to-amber-300 bg-clip-text text-transparent"
          >
            {word}
          </motion.span>
        ))}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: words.length * 0.06 + 0.1, duration: 0.6 }}
          className={cn(
            "text-sm md:text-[15px] text-white/80 font-sans leading-relaxed",
            align === "center" ? "max-w-xl" : "max-w-lg"
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
