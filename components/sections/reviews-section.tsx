"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from "lucide-react";
import { SectionHeading } from "../common/section-heading";
import { apiClient, fallbackTestimonials } from "@/services/api-client";

export function ReviewsSection() {
  const [reviews, setReviews] = useState<any[]>(fallbackTestimonials);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    async function loadReviews() {
      try {
        const data = await apiClient.get<any[]>("/testimonials");
        if (data && data.length > 0) {
          setReviews(data);
        }
      } catch (e) {
        console.info("Using fallback reviews data:", e);
      }
    }
    loadReviews();
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % reviews.length);
  }, [reviews.length]);

  const prevSlide = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + reviews.length) % reviews.length);
  }, [reviews.length]);

  useEffect(() => {
    if (isPaused || reviews.length <= 1) return;
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide, reviews.length]);

  const current = reviews[activeIdx] || reviews[0] || fallbackTestimonials[0];

  return (
    <section className="relative py-36 px-6 md:px-12 border-t border-gold/10 overflow-hidden bg-void font-sans">
      {/* Background ambient gold radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/[0.04] blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col gap-12">
        <SectionHeading
          badge="Client Reviews & Feedback"
          title="Trusted by engineering leaders worldwide"
          subtitle="What founders, CTOs, and product directors say about partnering with our engineering team."
          align="center"
        />

        {/* Review Showcase Card */}
        <div
          className="relative max-w-4xl mx-auto w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Glass Card Container */}
          <div className="relative p-8 md:p-14 rounded-3xl border border-gold/20 bg-black/60 backdrop-blur-2xl shadow-[0_20px_60px_rgba(212,175,55,0.05)] overflow-hidden">
            
            {/* Glowing gold quote icon */}
            <div className="absolute top-6 right-8 text-gold/15 pointer-events-none">
              <Quote className="h-24 w-24 stroke-1" />
            </div>

            <div className="relative z-10 flex flex-col gap-8">
              {/* Star Ratings Header */}
              <div className="flex items-center gap-1.5">
                {Array.from({ length: current.rating || 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-gold text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
                ))}
                <span className="ml-2 text-xs font-mono font-bold tracking-widest text-gold uppercase">
                  5.0 Verified Review
                </span>
              </div>

              {/* Quote text transition */}
              <div className="min-h-[140px] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={activeIdx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="text-lg md:text-2xl font-sans font-medium text-white/95 leading-relaxed tracking-tight"
                  >
                    &ldquo;{current.quote}&rdquo;
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              {/* Author details footer */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between border-t border-white/10 pt-6 mt-2 flex-wrap gap-4"
                >
                  <div className="flex items-center gap-4">
                    {current.avatar && (
                      <img
                        src={current.avatar}
                        alt={current.author}
                        className="h-12 w-12 rounded-full object-cover border-2 border-gold/40 shadow-[0_0_12px_rgba(212,175,55,0.3)]"
                      />
                    )}
                    <div className="flex flex-col">
                      <h4 className="text-base font-sans font-bold text-white tracking-wide">
                        {current.author}
                      </h4>
                      <span className="text-xs font-mono tracking-wider text-gold font-semibold uppercase">
                        {current.role} {current.company ? `— ${current.company}` : ""}
                      </span>
                    </div>
                  </div>

                  {/* Rating Badge */}
                  <div className="px-3.5 py-1.5 rounded-full border border-gold/30 bg-gold/5 flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-gold" />
                    <span className="text-[10px] font-mono tracking-widest text-gold uppercase font-bold">
                      Enterprise Case Partner
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  suppressHydrationWarning
                  onClick={() => setActiveIdx(idx)}
                  className={`h-2.5 rounded-full transition-all duration-400 cursor-pointer ${
                    idx === activeIdx
                      ? "w-8 bg-gold shadow-[0_0_12px_rgba(212,175,55,0.8)]"
                      : "w-2.5 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                suppressHydrationWarning
                onClick={prevSlide}
                className="p-3 rounded-full border border-white/10 bg-white/5 text-white hover:border-gold/50 hover:text-gold transition-all duration-300 cursor-pointer"
                aria-label="Previous review"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                suppressHydrationWarning
                onClick={nextSlide}
                className="p-3 rounded-full border border-white/10 bg-white/5 text-white hover:border-gold/50 hover:text-gold transition-all duration-300 cursor-pointer"
                aria-label="Next review"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
