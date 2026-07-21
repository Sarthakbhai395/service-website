"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface AuroraFieldProps {
  /** Color scheme: 'default' | 'violet' | 'cyan' | 'warm' */
  variant?: "default" | "violet" | "cyan" | "warm";
  /** Intensity multiplier for opacity (0-1) */
  intensity?: number;
  /** Enable mouse-reactive parallax */
  interactive?: boolean;
}

const colorSchemes = {
  default: {
    orb1: "from-blue-600/20 via-indigo-500/15 to-violet-600/20",
    orb2: "from-violet-600/15 via-purple-500/10 to-pink-500/15",
    orb3: "from-cyan-500/10 via-sky-400/8 to-blue-500/12",
    orb4: "from-indigo-400/8 via-blue-500/6 to-cyan-400/10",
  },
  violet: {
    orb1: "from-violet-600/25 via-purple-500/15 to-fuchsia-500/20",
    orb2: "from-pink-500/15 via-rose-500/10 to-violet-400/15",
    orb3: "from-purple-400/12 via-indigo-400/8 to-violet-500/10",
    orb4: "from-fuchsia-400/8 via-purple-500/6 to-pink-400/10",
  },
  cyan: {
    orb1: "from-cyan-500/20 via-teal-400/15 to-sky-500/20",
    orb2: "from-sky-500/15 via-blue-400/10 to-cyan-400/15",
    orb3: "from-teal-400/12 via-emerald-400/8 to-cyan-500/10",
    orb4: "from-blue-400/8 via-sky-500/6 to-teal-400/10",
  },
  warm: {
    orb1: "from-amber-500/15 via-orange-400/10 to-yellow-500/15",
    orb2: "from-rose-500/12 via-pink-400/8 to-amber-400/12",
    orb3: "from-orange-400/10 via-amber-400/6 to-rose-400/8",
    orb4: "from-yellow-400/6 via-amber-500/4 to-orange-400/8",
  },
};

export function AuroraField({
  variant = "default",
  intensity = 1,
  interactive = true,
}: AuroraFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scheme = colorSchemes[variant];

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 50, damping: 30, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax layers at different intensities
  const orb1X = useTransform(smoothX, [-600, 600], [-40, 40]);
  const orb1Y = useTransform(smoothY, [-600, 600], [-40, 40]);
  const orb2X = useTransform(smoothX, [-600, 600], [30, -30]);
  const orb2Y = useTransform(smoothY, [-600, 600], [30, -30]);
  const orb3X = useTransform(smoothX, [-600, 600], [-20, 20]);
  const orb3Y = useTransform(smoothY, [-600, 600], [-20, 20]);

  useEffect(() => {
    if (!interactive) return;
    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX.set(e.clientX - cx);
      mouseY.set(e.clientY - cy);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [interactive, mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ opacity: intensity }}
      aria-hidden="true"
    >
      {/* Orb 1 — Large primary orb (top-left quadrant) */}
      <motion.div
        style={interactive ? { x: orb1X, y: orb1Y } : undefined}
        className={`absolute -top-[20%] -left-[15%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full bg-gradient-to-br ${scheme.orb1} blur-[100px] animate-aurora`}
      />

      {/* Orb 2 — Secondary orb (bottom-right quadrant) */}
      <motion.div
        style={interactive ? { x: orb2X, y: orb2Y } : undefined}
        className={`absolute -bottom-[25%] -right-[15%] w-[65vw] h-[65vw] max-w-[850px] max-h-[850px] rounded-full bg-gradient-to-tl ${scheme.orb2} blur-[120px] animate-aurora-reverse`}
      />

      {/* Orb 3 — Subtle center accent */}
      <motion.div
        style={interactive ? { x: orb3X, y: orb3Y } : undefined}
        className={`absolute top-[30%] left-[40%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-r ${scheme.orb3} blur-[100px] animate-float`}
      />

      {/* Orb 4 — Faint ambient fill */}
      <div
        className={`absolute top-[60%] left-[15%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] rounded-full bg-gradient-to-tr ${scheme.orb4} blur-[80px] animate-float-delayed`}
      />

      {/* Radial vignette overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#030014_70%)]" />
    </div>
  );
}
