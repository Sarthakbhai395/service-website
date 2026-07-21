"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { AuroraField } from "../backgrounds/aurora-field";
import { GridField } from "../backgrounds/grid-field";

const floatingPanels = [
  {
    content: "const deploy = await edge.ship();",
    x: "-38%", y: "-20%", rotate: -6, delay: 0.3, depth: 60,
  },
  {
    content: "<Dashboard metrics={realtime} />",
    x: "32%", y: "-28%", rotate: 4, delay: 0.6, depth: 45,
  },
  {
    content: "latency: 12ms • uptime: 99.99%",
    x: "-30%", y: "18%", rotate: 3, delay: 0.9, depth: 35,
  },
  {
    content: "type Safety = Guaranteed;",
    x: "35%", y: "22%", rotate: -5, delay: 1.2, depth: 50,
  },
];

const stats = [
  { value: "150+", label: "Products Shipped" },
  { value: "99.98%", label: "Uptime Record" },
  { value: "12+", label: "Industry Awards" },
  { value: "$45M+", label: "Client Revenue" },
];

function AnimatedCounter({ value, inView }: { value: string; inView: boolean }) {
  // Extract number and suffix
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) return <span>{value}</span>;

  const numericPart = parseFloat(match[1]);
  const suffix = match[2];
  const [displayNum, setDisplayNum] = React.useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayNum(eased * numericPart);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, numericPart]);

  const formatted = numericPart % 1 !== 0
    ? displayNum.toFixed(2)
    : Math.round(displayNum).toString();

  return (
    <span>
      {formatted}{suffix}
    </span>
  );
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  // Mouse tracking for parallax layers
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 60, damping: 30, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax depths
  const panelX = useTransform(smoothX, [-600, 600], [-25, 25]);
  const panelY = useTransform(smoothY, [-600, 600], [-25, 25]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX.set(e.clientX - cx);
      mouseY.set(e.clientY - cy);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Background layers */}
      <AuroraField variant="default" intensity={1} interactive />
      <GridField dotSize={1} gap={40} opacity={0.12} spotlight spotlightRadius={250} />

      {/* Floating 3D glass panels */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block perspective-container">
        {floatingPanels.map((panel, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 0.5, 0.3],
              scale: 1,
              y: ["0px", "-12px", "0px"],
            }}
            transition={{
              delay: panel.delay,
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ x: panelX, y: panelY }}
            className="absolute"
          >
            <div
              className="px-4 py-2.5 rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-lg text-[11px] font-mono text-ghost/60 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
              style={{
                position: "absolute",
                left: `calc(50% + ${panel.x})`,
                top: `calc(50% + ${panel.y})`,
                transform: `rotate(${panel.rotate}deg) translateZ(${panel.depth}px)`,
                transformStyle: "preserve-3d",
              }}
            >
              {panel.content}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center gap-8 px-6 py-32 md:py-40">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.03] backdrop-blur-md text-[10px] font-mono tracking-[0.18em] uppercase text-ghost">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-blue opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-blue" />
            </span>
            Engineering the Future
          </span>
        </motion.div>

        {/* Massive headline */}
        <motion.h1
          className="text-[clamp(2.5rem,7vw,6rem)] font-heading font-extrabold leading-[1.05] tracking-[-0.03em] text-snow max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          We build software{" "}
          <span className="gradient-text text-glow">
            that scales empires
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-base md:text-lg text-steel font-sans max-w-2xl leading-relaxed"
        >
          From MVPs to enterprise platforms — we architect, design, and ship
          production-grade software with obsessive attention to craft.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 mt-4"
        >
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group/cta relative px-8 py-4 rounded-2xl text-[12px] font-heading font-semibold uppercase tracking-[0.14em] text-white overflow-hidden cursor-pointer bg-gradient-to-r from-accent-blue/20 via-accent-violet/15 to-accent-blue/20 border border-white/10 hover:border-accent-blue/30 transition-colors duration-400"
            >
              <div className="absolute inset-0 -translate-x-full group-hover/cta:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
              <span className="relative flex items-center gap-2">
                Start a Project
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
              </span>
            </motion.button>
          </Link>

          <Link href="/projects">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-2xl text-[12px] font-heading font-medium uppercase tracking-[0.14em] text-ghost hover:text-white border border-white/[0.06] hover:border-white/[0.1] bg-transparent transition-all duration-300 cursor-pointer"
            >
              View Our Work
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        ref={statsRef}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-4xl mx-auto mb-20 px-6"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-1 py-6 px-4 text-center bg-white/[0.01] border-white/[0.04]"
              style={{
                borderLeft: idx > 0 ? "1px solid rgba(255,255,255,0.04)" : undefined,
              }}
            >
              <span className="text-2xl md:text-3xl font-heading font-bold text-white tracking-tight">
                <AnimatedCounter value={stat.value} inView={statsInView} />
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-steel">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 flex flex-col items-center gap-2 opacity-30"
      >
        <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-steel">
          Scroll to explore
        </span>
        <ChevronDown className="h-4 w-4 text-accent-blue" />
      </motion.div>
    </section>
  );
}
