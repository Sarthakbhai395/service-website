"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote: "Nexus Edge delivered a HIPAA-compliant medical platform with obsessive attention to micro-interactions. Their architecture decisions saved us months of technical debt.",
    author: "Dr. Sarah Jenkins",
    role: "CTO",
    company: "Vivid Health",
  },
  {
    quote: "Our API latency dropped from 800ms to 45ms. The engineering team genuinely understood performance at a systems level — not just surface optimization.",
    author: "Marcus Vance",
    role: "VP of Product",
    company: "Nova Labs",
  },
  {
    quote: "The visual finish of our enterprise dashboard has been compared to Linear and Vercel. Our clients are completely wowed by the level of polish.",
    author: "Elena Rostova",
    role: "CEO",
    company: "Apex Wealth",
  },
  {
    quote: "They rebuilt our entire checkout flow in 6 weeks — zero downtime migration, fully type-safe, and conversion rates jumped 34%. Remarkable execution.",
    author: "James Park",
    role: "Head of Engineering",
    company: "Aura Commerce",
  },
];

export function TestimonialCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const current = testimonials[activeIdx];

  return (
    <div
      className="relative max-w-4xl mx-auto text-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Large quotation mark */}
      <div className="flex justify-center mb-8">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          className="opacity-20"
        >
          <path
            d="M14 24c-4.4 0-8-3.6-8-8s3.6-8 8-8c6.6 0 12 5.4 12 12 0 8.8-7.2 16-16 16l-1-4c4.4-1 8-4.6 8-8.8 0-.4 0-.8-.1-1.2H14zm22 0c-4.4 0-8-3.6-8-8s3.6-8 8-8c6.6 0 12 5.4 12 12 0 8.8-7.2 16-16 16l-1-4c4.4-1 8-4.6 8-8.8 0-.4 0-.8-.1-1.2H36z"
            fill="url(#quote-gradient)"
          />
          <defs>
            <linearGradient id="quote-gradient" x1="6" y1="8" x2="48" y2="40">
              <stop stopColor="#3b82f6" />
              <stop offset="1" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Quote text with crossfade */}
      <div className="min-h-[160px] md:min-h-[120px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={activeIdx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-2xl font-heading font-medium text-ice/90 leading-relaxed tracking-tight max-w-3xl"
          >
            &ldquo;{current.quote}&rdquo;
          </motion.blockquote>
        </AnimatePresence>
      </div>

      {/* Author info */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col items-center gap-1 mt-8"
        >
          <span className="text-sm font-heading font-semibold text-white">
            {current.author}
          </span>
          <span className="text-[11px] font-mono tracking-[0.12em] text-steel uppercase">
            {current.role}, {current.company}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Navigation dots */}
      <div className="flex items-center justify-center gap-2.5 mt-10">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className="relative h-2 w-2 rounded-full cursor-pointer transition-all duration-300 focus:outline-none"
            aria-label={`Go to testimonial ${idx + 1}`}
          >
            <span
              className={`absolute inset-0 rounded-full transition-all duration-400 ${
                idx === activeIdx
                  ? "bg-accent-blue scale-125 shadow-[0_0_12px_rgba(59,130,246,0.4)]"
                  : "bg-white/[0.12] hover:bg-white/[0.2]"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
