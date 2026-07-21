"use client";

import React, { useRef, useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShinyButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  magnetic?: boolean;
  variant?: "primary" | "ghost" | "accent";
}

export function ShinyButton({
  children,
  className,
  magnetic = true,
  variant = "primary",
  ...props
}: ShinyButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });

    if (magnetic) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const pullX = (x - centerX) * 0.25;
      const pullY = (y - centerY) * 0.25;
      setMagneticOffset({ x: pullX, y: pullY });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMagneticOffset({ x: 0, y: 0 });
  };

  const baseStyles = {
    primary:
      "border-white/10 bg-white/[0.04] text-white hover:border-accent-blue/30 hover:bg-white/[0.06]",
    ghost:
      "border-white/[0.06] bg-transparent text-ghost hover:text-white hover:border-white/10",
    accent:
      "border-accent-blue/20 bg-accent-blue/[0.08] text-accent-blue hover:bg-accent-blue/[0.14] hover:border-accent-blue/30",
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{ x: magneticOffset.x, y: magneticOffset.y }}
      transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.1 }}
      className={cn(
        "relative overflow-hidden group/shiny px-6 py-3 rounded-xl border font-heading text-[11px] tracking-[0.14em] uppercase transition-all duration-400 cursor-pointer active:scale-[0.97]",
        baseStyles[variant],
        className
      )}
      {...props}
    >
      {/* Cursor-tracking spotlight */}
      {isHovered && (
        <span
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(140px circle at ${coords.x}px ${coords.y}px, rgba(59, 130, 246, 0.12), transparent 70%)`,
          }}
        />
      )}

      {/* Shimmer sweep on hover */}
      <span className="absolute inset-0 pointer-events-none -translate-x-full group-hover/shiny:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

      {/* Top edge highlight */}
      <span className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none" />

      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}
