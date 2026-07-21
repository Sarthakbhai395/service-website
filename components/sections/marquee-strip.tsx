"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MarqueeStripProps {
  items: string[];
  /** Speed in seconds for one full loop */
  speed?: number;
  /** Reverse direction */
  reverse?: boolean;
  className?: string;
}

export function MarqueeStrip({
  items,
  speed = 35,
  reverse = false,
  className,
}: MarqueeStripProps) {
  const displayItems = items && items.length > 0 ? items : [
    "APEX WEALTH", "NOVA LABS", "AURA COMMERCE", "VIVID HEALTH",
    "MICROSOFT", "VERCEL", "AWS", "STRIPE", "OPENAI", "DOCKER", "REDIS"
  ];
  
  // Duplicate items for continuous looping marquee
  const doubled = [...displayItems, ...displayItems, ...displayItems];

  return (
    <div className={cn("relative overflow-hidden fade-mask-x py-2", className)}>
      <div
        className={cn(
          "flex gap-14 whitespace-nowrap w-max items-center",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((brand, idx) => (
          <div key={idx} className="flex items-center gap-14">
            <span className="text-xl md:text-3xl font-heading font-extrabold uppercase tracking-[0.15em] text-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:text-white transition-all duration-300 cursor-default select-none">
              {brand}
            </span>
            <span className="text-gold/30 text-lg">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
