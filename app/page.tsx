"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { HeroSection } from "@/components/sections/hero";
import { MarqueeStrip } from "@/components/sections/marquee-strip";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { SectionHeading } from "@/components/common/section-heading";

import { ServiceCard } from "@/components/cards/service-card";
import { GlassCard } from "@/components/cards/glass-card";
import { AuroraField } from "@/components/backgrounds/aurora-field";
import { apiClient } from "@/services/api-client";

/* ─── DATA ─────────────────────────────────────────── */

const techList = [
  "Next.js", "React", "TypeScript", "Node.js", "Express",
  "MongoDB", "Supabase", "PostgreSQL", "Redis", "Docker",
  "GraphQL", "Tailwind CSS", "GSAP", "Framer Motion", "Vercel",
  "AWS", "WebSockets", "Zod",
];

const services = [
  {
    slug: "mvp-development",
    name: "MVP Development",
    description: "Validate fast. We ship fully functional minimum viable products with decoupled architectures and CI/CD from day one.",
  },
  {
    slug: "ai-development",
    name: "AI Integration",
    description: "Embed intelligence. We design API gateways for LLM orchestration, RAG pipelines, and real-time inference endpoints.",
  },
  {
    slug: "saas-development",
    name: "SaaS Platforms",
    description: "Scale without limits. Multi-tenant databases, Stripe billing, role-based access, and real-time analytics dashboards.",
  },
  {
    slug: "web-development",
    name: "Web Development",
    description: "Pixel-perfect execution. Server components, edge rendering, custom animations, and Lighthouse scores above 95.",
  },
  {
    slug: "mobile-app-development",
    name: "Mobile Apps",
    description: "Native performance. Cross-platform applications with offline-first architecture, biometric auth, and push notifications.",
  },
  {
    slug: "ui-ux-design",
    name: "UI/UX Design",
    description: "Award-worthy interfaces. Design systems, micro-interactions, accessibility compliance, and user research-driven layouts.",
  },
];

// Fallback high-fidelity projects if database is empty
const fallbackProjects = [
  {
    title: "Apex Finance — Asset Management Platform",
    category: "Fintech",
    description: "Architected a secure portfolio management interface processing $1.2B in transactions with 99.99% uptime and sub-12ms latency.",
    stats: [
      { label: "Uptime", value: "99.99%" },
      { label: "Latency", value: "<12ms" },
      { label: "Volume", value: "8.4TB" },
    ],
    tags: ["Next.js", "Express", "Supabase", "Redis"],
    thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
    slug: "apex-finance",
  },
  {
    title: "Nova AI — Language Prompt Router",
    category: "AI Platform",
    description: "High-throughput API gateway processing 1.2M requests per minute with parallel stream validation and intelligent token routing.",
    stats: [
      { label: "Throughput", value: "1.2M/min" },
      { label: "TTFB", value: "85ms" },
      { label: "Cost Saved", value: "42%" },
    ],
    tags: ["Node.js", "Zod", "MongoDB", "AWS"],
    thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200",
    slug: "nova-ai",
  },
];

const techLogos = [
  "Next.js", "React", "TypeScript", "Node.js", "MongoDB",
  "Supabase", "Redis", "Docker", "AWS", "Vercel",
  "GraphQL", "Tailwind", "GSAP", "Framer", "Zod", "PostgreSQL",
];

/* ─── PAGE ─────────────────────────────────────────── */

export default function Home() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const [dbProjects, setDbProjects] = useState<any[]>([]);
  const [brands, setBrands] = useState<string[]>([]);

  // Fetch projects & brands from backend
  useEffect(() => {
    async function loadData() {
      try {
        const pResponse = await apiClient.get<any[]>("/projects?featured=true");
        if (pResponse && pResponse.length > 0) {
          setDbProjects(pResponse);
        }
      } catch (err) {
        console.info(err);
      }

      try {
        const bResponse = await apiClient.get<string[]>("/brands");
        if (bResponse && bResponse.length > 0) {
          setBrands(bResponse);
        }
      } catch (err) {
        console.info(err);
      }
    }
    loadData();
  }, []);

  const projectsToRender = dbProjects.length > 0 ? dbProjects : fallbackProjects;

  const { scrollYProgress: ctaProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "end end"],
  });
  const ctaScale = useTransform(ctaProgress, [0, 1], [0.94, 1]);

  return (
    <div className="flex flex-col w-full bg-void text-snow overflow-hidden font-sans">

      {/* ━━━ 1. HERO ━━━ */}
      <HeroSection />

      {/* ━━━ 2. MARQUEE — Brands & Partners ━━━ */}
      <section className="py-12 border-y border-gold/10 relative bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-void via-black/80 to-void pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4">
          <div className="text-center">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold font-bold">
              Trusted Industry Partners & Brands
            </span>
          </div>
          <MarqueeStrip
            items={brands}
            speed={30}
          />
        </div>
      </section>

      {/* ━━━ 3. SERVICES — Bento Grid ━━━ */}
      <section className="relative py-40 px-6 md:px-12">
        {/* Ambient gold glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-gold/[0.03] blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeading
            badge="What We Build"
            title="Software that moves industries forward"
            subtitle="From rapid MVPs to enterprise-grade platforms — every engagement is architected for scale, security, and visual excellence."
          />

          {/* Asymmetric Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-5 mt-4">
            <div className="md:col-span-3">
              <ServiceCard index={0} service={services[0]} />
            </div>
            <div className="md:col-span-3">
              <ServiceCard index={1} service={services[1]} />
            </div>
            <div className="md:col-span-2">
              <ServiceCard index={2} service={services[2]} />
            </div>
            <div className="md:col-span-2">
              <ServiceCard index={3} service={services[3]} />
            </div>
            <div className="md:col-span-2">
              <ServiceCard index={4} service={services[4]} />
            </div>
            <div className="md:col-span-6">
              <ServiceCard index={5} service={services[5]} />
            </div>
          </div>

          {/* CTA */}
          <div className="flex justify-center mt-14">
            <Link href="/services" className="inline-block">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group/btn px-8 py-3.5 rounded-xl text-[11px] font-heading font-semibold uppercase tracking-[0.14em] text-white border border-white/[0.08] bg-white/[0.03] hover:border-gold/30 transition-all duration-300 cursor-pointer overflow-hidden relative inline-flex items-center justify-center"
              >
                <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
                <span className="relative flex items-center gap-2">
                  Explore All Services <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* ━━━ 4. CASE STUDIES ━━━ */}
      <section className="relative py-40 px-6 md:px-12 border-t border-white/[0.04]">
        {/* Gold highlight glow */}
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-gold/[0.03] blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeading
            badge="Case Studies"
            title="Proven results, real metrics"
            subtitle="Enterprise architectures deployed at scale — measured by uptime, throughput, and business impact."
          />

          <div className="flex flex-col gap-12 mt-4">
            {projectsToRender.map((study, idx) => (
              <motion.div
                key={study.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Fixed grid wrapper: styled directly as a glass container to avoid unstyled column compression bugs */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.01] backdrop-blur-xl transition-all duration-500 hover:border-gold/20 hover:shadow-[0_20px_50px_rgba(212,175,55,0.06)]">
                  
                  {/* Image column */}
                  <div className={`lg:col-span-7 relative min-h-[320px] lg:min-h-[450px] overflow-hidden bg-ink ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                    <img
                      src={study.thumbnailUrl || study.image}
                      alt={study.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-transparent opacity-80 pointer-events-none" />

                    {/* Category tag */}
                    <div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/[0.06] text-[10px] font-mono tracking-[0.12em] uppercase text-ghost">
                      {study.category}
                    </div>
                  </div>

                  {/* Details column */}
                  <div className={`lg:col-span-5 p-8 md:p-12 flex flex-col justify-between gap-8 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                    <div className="flex flex-col gap-4">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-heading font-bold text-white tracking-tight leading-tight group-hover:text-gold transition-colors duration-300">
                          {study.title}
                        </h3>
                      </div>
                      <p className="text-[13px] text-steel leading-relaxed font-sans">
                        {study.description}
                      </p>

                      {/* Performance metrics display */}
                      {study.stats && study.stats.length > 0 && (
                        <div className="grid grid-cols-3 gap-4 mt-4 pt-6 border-t border-white/[0.05]">
                          {study.stats.map((stat: any, sIdx: number) => (
                            <div key={sIdx} className="flex flex-col gap-0.5">
                              <span className="text-[9px] font-mono text-steel/70 uppercase tracking-[0.15em]">
                                {stat.label}
                              </span>
                              <span className="text-lg font-heading font-bold text-gold">
                                {stat.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Tags & Action CTA */}
                    <div className="flex items-center justify-between gap-4 mt-auto">
                      <div className="flex flex-wrap gap-1.5">
                        {(study.tags || []).slice(0, 3).map((tag: string) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.04] text-[10px] font-mono text-steel tracking-wide"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link href={`/projects/${study.slug}`} className="inline-block">
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="px-4 py-2 rounded-lg text-[10px] font-heading font-semibold uppercase tracking-[0.12em] text-white border border-white/[0.08] bg-white/[0.03] hover:border-gold/30 transition-all duration-300 cursor-pointer flex items-center gap-1.5 inline-flex"
                        >
                          View Case <ArrowUpRight className="h-3 w-3 text-gold" />
                        </motion.div>
                      </Link>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ 5. PROCESS TIMELINE (Vertical Animation) ━━━ */}
      <ProcessTimeline />

      {/* ━━━ 6. REVIEWS ━━━ */}
      <ReviewsSection />


      {/* ━━━ 7. TECH STACK GLOBE ━━━ */}
      <section className="relative py-32 px-6 md:px-12 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeading
            badge="Technology"
            title="Built with the modern stack"
            subtitle="We use production-proven technologies trusted by the world's best engineering teams."
            align="center"
          />

          {/* Circular tech arrangement */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8 max-w-3xl mx-auto">
            {techLogos.map((tech, idx) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.03, duration: 0.4 }}
              >
                <div className="px-4 py-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] text-[12px] font-mono text-steel hover:text-gold hover:border-gold/20 hover:bg-white/[0.04] transition-all duration-300 cursor-default">
                  {tech}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ 8. FINAL CTA ━━━ */}
      <motion.section
        ref={ctaRef}
        style={{ scale: ctaScale }}
        className="relative py-40 px-6 md:px-12 my-20 mx-4 md:mx-8 rounded-3xl overflow-hidden"
      >
        <AuroraField variant="warm" intensity={1} interactive={false} />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-void/60 via-transparent to-void/60 pointer-events-none rounded-3xl" />
        <div className="absolute inset-0 rounded-3xl border border-white/[0.06] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center gap-8 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className="h-8 w-8 text-gold animate-pulse" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white tracking-tighter leading-[1.05]"
          >
            Let&apos;s build something{" "}
            <span className="gradient-text text-glow">extraordinary</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-base text-steel font-sans max-w-xl leading-relaxed"
          >
            Partner with an elite engineering team that ships production-grade software
            with obsessive attention to quality, performance, and design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Link href="/contact" className="inline-block">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group/cta px-10 py-5 rounded-2xl text-[13px] font-heading font-semibold uppercase tracking-[0.14em] text-white bg-gradient-to-r from-accent-rose/25 via-gold/15 to-accent-rose/25 border border-white/[0.1] hover:border-gold/30 transition-all duration-400 cursor-pointer relative overflow-hidden inline-flex items-center justify-center"
              >
                <div className="absolute inset-0 -translate-x-full group-hover/cta:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
                <span className="relative flex items-center gap-2">
                  Start Your Project
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
                </span>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
