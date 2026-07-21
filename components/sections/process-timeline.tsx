"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, FlaskConical, Palette, Code, TestTube, Rocket, HeartHandshake } from "lucide-react";

const phases = [
  {
    num: "01",
    title: "Discovery",
    description: "We map your business objectives, user personas, and technical constraints into a structured brief.",
    icon: Search,
    accent: "border-accent-blue/30 text-accent-blue",
  },
  {
    num: "02",
    title: "Research",
    description: "Competitive analysis, technology audits, and architecture feasibility assessments.",
    icon: FlaskConical,
    accent: "border-accent-violet/30 text-accent-violet",
  },
  {
    num: "03",
    title: "Design",
    description: "Wireframes, high-fidelity prototypes, micro-interaction specs, and design system definition.",
    icon: Palette,
    accent: "border-accent-blue/30 text-accent-blue",
  },
  {
    num: "04",
    title: "Development",
    description: "Type-safe implementation with CI/CD pipelines, code reviews, and incremental staging deploys.",
    icon: Code,
    accent: "border-accent-violet/30 text-accent-violet",
  },
  {
    num: "05",
    title: "Testing",
    description: "End-to-end testing, load benchmarks, accessibility audits, and security penetration scans.",
    icon: TestTube,
    accent: "border-accent-blue/30 text-accent-blue",
  },
  {
    num: "06",
    title: "Deployment",
    description: "Zero-downtime deployment to edge networks with automated rollback and monitoring setup.",
    icon: Rocket,
    accent: "border-accent-violet/30 text-accent-violet",
  },
  {
    num: "07",
    title: "Maintenance",
    description: "Ongoing performance monitoring, security patches, feature iterations, and dedicated support.",
    icon: HeartHandshake,
    accent: "border-accent-blue/30 text-accent-blue",
  },
];

export function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll inside container to animate progress line height
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative py-40 px-6 md:px-12 bg-void">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full bg-accent-blue/[0.02] blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center gap-4 mb-24">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] text-[10px] font-mono tracking-[0.15em] uppercase text-ghost">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-blue animate-pulse-glow" />
            Our Workflow
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white tracking-tight">
            How We Build Excellence
          </h2>
          <p className="text-sm text-steel font-sans max-w-lg mt-2">
            A comprehensive, rigorous process designed to ship clean code and stable, resilient product architectures.
          </p>
        </div>

        {/* Vertical Timeline Structure */}
        <div className="relative flex flex-col gap-12 mt-12 pl-6 md:pl-0">
          
          {/* Base timeline vertical trace line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] bg-white/[0.04] -translate-x-1/2" />
          
          {/* Active scroll animated trace line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-6 md:left-1/2 top-4 w-[2px] bg-gradient-to-b from-accent-blue to-accent-violet -translate-x-1/2 origin-top"
          />

          {phases.map((phase, idx) => {
            const Icon = phase.icon;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={idx}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Left/Right content block */}
                <div className="w-full md:w-1/2 md:px-12 flex flex-col gap-3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="p-6 md:p-8 rounded-2xl border border-white/[0.06] bg-white/[0.01] backdrop-blur-md hover:border-accent-blue/20 transition-all duration-500 flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-[0.2em] text-accent-blue uppercase font-semibold">
                        Phase {phase.num}
                      </span>
                      <span className="text-[11px] font-mono text-steel font-bold">
                        {phase.title}
                      </span>
                    </div>
                    <p className="text-[13px] text-steel font-sans leading-relaxed">
                      {phase.description}
                    </p>
                  </motion.div>
                </div>

                {/* Timeline node marker indicator */}
                <div className="absolute left-6 md:left-1/2 top-6 md:top-auto -translate-x-1/2 z-10 flex items-center justify-center">
                  <div className={`h-12 w-12 rounded-full bg-void border-2 ${phase.accent} flex items-center justify-center shadow-lg transition-transform duration-500 hover:scale-110`}>
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                </div>

                {/* Empty side placeholder for layout symmetry */}
                <div className="hidden md:block w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
