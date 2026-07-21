"use client";

import React, { useState, useEffect } from "react";
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

  const nextSlide = () => {
    setActiveIdx((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setActiveIdx((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  useEffect(() => {
    if (isPaused || reviews.length <= 1) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, reviews.length]);

  return (
    <section className="relative py-28 px-6 md:px-12 border-t border-gold/10 overflow-hidden bg-black font-sans">
      {/* Background ambient gold radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/[0.04] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-12">
        <SectionHeading
          badge="Verified Client Reviews"
          title="Engineered for world-class founders"
          subtitle="What CTOs, VPs of Product, and engineering directors say about partnering with CodeNova."
          align="center"
        />

        {/* Sliding Carousel Wrapper with Left & Right Gradient Fade Corner Masks */}
        <div
          className="relative max-w-5xl mx-auto w-full fade-mask-x"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden px-4 py-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* 2 Compact cards visible per slide */}
                {[0, 1].map((offset) => {
                  const itemIndex = (activeIdx + offset) % reviews.length;
                  const review = reviews[itemIndex] || fallbackTestimonials[0];
                  return (
                    <motion.div
                      key={review.id || itemIndex}
                      whileHover={{ scale: 1.02, y: -4 }}
                      className="relative p-6 md:p-8 rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between gap-6 transition-all duration-300 hover:border-gold/40 hover:shadow-[0_16px_48px_rgba(212,175,55,0.1)]"
                    >
                      <div className="flex flex-col gap-4">
                        {/* Rating stars & verified badge */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {Array.from({ length: review.rating || 5 }).map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-gold text-gold drop-shadow-[0_0_6px_rgba(212,175,55,0.5)]" />
                            ))}
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full border border-gold/30 bg-gold/10 text-[9px] font-mono tracking-widest text-gold uppercase font-bold">
                            Verified Case
                          </span>
                        </div>

                        {/* Quote */}
                        <blockquote className="text-xs md:text-sm font-sans text-white/90 leading-relaxed font-normal italic">
                          &ldquo;{review.quote}&rdquo;
                        </blockquote>
                      </div>

                      {/* Author */}
                      <div className="flex items-center gap-3.5 pt-4 border-t border-white/10 mt-2">
                        {review.avatar ? (
                          <img
                            src={review.avatar}
                            alt={review.author}
                            className="h-10 w-10 rounded-full object-cover border border-gold/40 shadow-[0_0_10px_rgba(212,175,55,0.2)]"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full border border-gold/40 bg-gold/10 flex items-center justify-center font-bold text-gold text-xs">
                            {review.author?.[0] || "C"}
                          </div>
                        )}
                        <div className="flex flex-col min-w-0">
                          <h4 className="text-xs font-sans font-bold text-white tracking-wide truncate">
                            {review.author}
                          </h4>
                          <span className="text-[10px] font-mono tracking-wider text-gold font-semibold uppercase truncate">
                            {review.role} {review.company ? `— ${review.company}` : ""}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sliding Controls */}
          <div className="flex items-center justify-between mt-6 px-4">
            <div className="flex items-center gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  suppressHydrationWarning
                  onClick={() => setActiveIdx(idx)}
                  className={`h-2 rounded-full transition-all duration-400 cursor-pointer ${
                    idx === activeIdx
                      ? "w-8 bg-gold shadow-[0_0_12px_rgba(212,175,55,0.8)]"
                      : "w-2 bg-white/20 hover:bg-white/40"
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
                className="p-2.5 rounded-full border border-white/10 bg-white/5 text-white hover:border-gold/50 hover:text-gold transition-all duration-300 cursor-pointer"
                aria-label="Previous review"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                suppressHydrationWarning
                onClick={nextSlide}
                className="p-2.5 rounded-full border border-white/10 bg-white/5 text-white hover:border-gold/50 hover:text-gold transition-all duration-300 cursor-pointer"
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
