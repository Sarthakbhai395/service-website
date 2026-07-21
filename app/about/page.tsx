"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeading } from "@/components/common/section-heading";
import { GlassCard } from "@/components/cards/glass-card";
import { AuroraField } from "@/components/backgrounds/aurora-field";
import { ShieldCheck, Cpu, Activity, Eye, Target, Zap, Users, Sparkles } from "lucide-react";
import { apiClient, fallbackTeamMembers } from "@/services/api-client";

const coreValues = [
  {
    title: "Architectural Precision",
    description: "Every project starts with data models, API contracts, and type definitions — before a single line of implementation code is written.",
    icon: Cpu,
    accent: "text-gold",
  },
  {
    title: "Security-First Engineering",
    description: "Rate limiting, input sanitization, JWT authentication, RBAC, and cryptographic hashing are non-negotiable defaults on every endpoint.",
    icon: ShieldCheck,
    accent: "text-accent-violet",
  },
  {
    title: "Performance Obsession",
    description: "We target 95+ Lighthouse scores, sub-100ms API responses, optimal Core Web Vitals, and minimal client-side JavaScript bundles.",
    icon: Activity,
    accent: "text-accent-cyan",
  },
  {
    title: "Visual Excellence",
    description: "Award-worthy interfaces with custom animations, micro-interactions, and design systems that feel handcrafted — never templated.",
    icon: Eye,
    accent: "text-accent-rose",
  },
  {
    title: "Scalable Architecture",
    description: "Database pooling, horizontal scaling, edge deployment, and infrastructure-as-code ensure your platform grows without technical debt.",
    icon: Target,
    accent: "text-accent-amber",
  },
  {
    title: "Rapid Execution",
    description: "Agile sprints with CI/CD pipelines, incremental staging deploys, and daily standups keep momentum high and surprises at zero.",
    icon: Zap,
    accent: "text-emerald-400",
  },
];

const milestones = [
  { year: "2019", event: "Founded CodeNova with a vision to bridge design and high-performance engineering" },
  { year: "2020", event: "Shipped first enterprise SaaS platform — 50K daily active users" },
  { year: "2021", event: "Expanded to 25+ senior engineers and product architects" },
  { year: "2022", event: "Launched AI integration practice — LLM orchestration services" },
  { year: "2023", event: "Surpassed 150+ products shipped, $45M+ in client revenue enabled" },
  { year: "2024", event: "Recognized as a top engineering studio by industry leaders" },
];

const stats = [
  { value: "150+", label: "Products Shipped" },
  { value: "99.98%", label: "Uptime Record" },
  { value: "45+", label: "Enterprise Clients" },
  { value: "25+", label: "Senior Engineers" },
];

function AnimatedStat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const match = value.match(/^([\d.]+)(.*)$/);
  const [displayNum, setDisplayNum] = useState(0);

  useEffect(() => {
    if (!inView || !match) return;
    const target = parseFloat(match[1]);
    const duration = 2000;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayNum(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, match]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="flex flex-col items-center gap-1 text-center py-8"
    >
      <span className="text-3xl md:text-4xl font-heading font-extrabold text-gold tracking-tight">
        {match ? `${match[1].includes('.') ? displayNum.toFixed(2) : Math.round(displayNum)}${match[2]}` : value}
      </span>
      <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-steel font-semibold">
        {label}
      </span>
    </motion.div>
  );
}

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<any[]>(fallbackTeamMembers);

  useEffect(() => {
    async function loadTeam() {
      try {
        const data = await apiClient.get<any[]>("/team");
        if (data && data.length > 0) {
          setTeamMembers(data);
        }
      } catch (e) {
        console.info("Using fallback team data:", e);
      }
    }
    loadTeam();
  }, []);

  return (
    <div className="relative min-h-screen bg-black">
      {/* Page background */}
      <AuroraField variant="default" intensity={0.5} interactive={false} />

      <div className="relative z-10 py-32 px-6 md:px-12 max-w-7xl mx-auto w-full flex flex-col gap-32">

        {/* ━━━ Hero section ━━━ */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionHeading
              badge="Our Story & Vision"
              title="Engineering craft & product architecture"
              subtitle="CodeNova is a premier studio of senior architects, AI engineers, and visual designers building mission-critical software globally."
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex flex-col gap-5 text-sm text-steel leading-relaxed font-sans"
            >
              <p>
                <strong className="text-white">CodeNova</strong> was founded on the belief that digital products deserve both obsessive visual refinement and rock-solid, hardened engineering foundations.
              </p>
              <p>
                Our core stack centers on Next.js, React, TypeScript, Node.js, and Supabase. By maintaining extreme specialization, we build complex features — real-time billing, AI orchestration streams, multi-tenant databases — with rapid turnaround and zero technical debt.
              </p>
              <p>
                Every product we ship is measured by real metrics: uptime, latency, Lighthouse scores, and business revenue impact. We don&apos;t build basic websites — we engineer competitive advantages.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <GlassCard className="p-8 flex flex-col gap-4 border-gold/30 bg-black/60 shadow-[0_20px_50px_rgba(212,175,55,0.08)]">
                <div className="h-12 w-12 rounded-2xl border border-gold/40 bg-gold/10 flex items-center justify-center text-gold">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-heading font-extrabold text-white">Our Mission</h3>
                <p className="text-xs text-steel leading-relaxed font-sans">
                  To build secure, blazing-fast, and visually stunning software platforms that empower ambitious teams to scale globally — without compromising on quality or performance.
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </div>

        {/* ━━━ Stats section ━━━ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-3xl overflow-hidden border border-gold/20 bg-black/60 backdrop-blur-xl shadow-[0_16px_48px_rgba(0,0,0,0.6)]">
          {stats.map((stat, idx) => (
            <AnimatedStat
              key={idx}
              value={stat.value}
              label={stat.label}
              delay={idx * 0.1}
            />
          ))}
        </div>

        {/* ━━━ TEAM & LEADERSHIP — Dynamic Alternating Zigzag Layout ━━━ */}
        <div className="flex flex-col gap-12">
          <SectionHeading
            badge="Leadership & Architects"
            title="Meet the minds behind CodeNova"
            subtitle="Uploaded and managed dynamically via our secure Admin Panel."
          />

          <div className="flex flex-col gap-16">
            {teamMembers.map((member, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={member.id || idx}
                  className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center"
                >
                  {/* Left Column in Zigzag: Text if Even, Image if Odd */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className={`md:col-span-6 flex flex-col gap-4 ${isEven ? "md:order-1" : "md:order-2"}`}
                  >
                    {isEven ? (
                      /* Description Card */
                      <GlassCard className="p-8 md:p-10 border-gold/30 bg-black/80 flex flex-col gap-4 shadow-[0_20px_50px_rgba(212,175,55,0.06)]">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-gold" />
                          <span className="text-[10px] font-mono tracking-widest text-gold uppercase font-bold">
                            0{idx + 1} • Key Leader
                          </span>
                        </div>
                        <h3 className="text-2xl font-heading font-extrabold text-white">
                          {member.name}
                        </h3>
                        <span className="text-xs font-mono tracking-wider text-gold font-bold uppercase -mt-2">
                          {member.role}
                        </span>
                        <p className="text-xs md:text-sm text-steel leading-relaxed font-sans pt-2 border-t border-white/10">
                          {member.description}
                        </p>
                      </GlassCard>
                    ) : (
                      /* Image Card */
                      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-gold/30 shadow-[0_20px_50px_rgba(212,175,55,0.12)] group">
                        <img
                          src={member.imageUrl || member.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800"}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                          <h4 className="text-lg font-heading font-bold text-white">{member.name}</h4>
                          <p className="text-xs font-mono text-gold uppercase">{member.role}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>

                  {/* Right Column in Zigzag: Image if Even, Text if Odd */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className={`md:col-span-6 flex flex-col gap-4 ${isEven ? "md:order-2" : "md:order-1"}`}
                  >
                    {isEven ? (
                      /* Image Card */
                      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-gold/30 shadow-[0_20px_50px_rgba(212,175,55,0.12)] group">
                        <img
                          src={member.imageUrl || member.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800"}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                          <h4 className="text-lg font-heading font-bold text-white">{member.name}</h4>
                          <p className="text-xs font-mono text-gold uppercase">{member.role}</p>
                        </div>
                      </div>
                    ) : (
                      /* Description Card */
                      <GlassCard className="p-8 md:p-10 border-gold/30 bg-black/80 flex flex-col gap-4 shadow-[0_20px_50px_rgba(212,175,55,0.06)]">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-gold" />
                          <span className="text-[10px] font-mono tracking-widest text-gold uppercase font-bold">
                            0{idx + 1} • Key Leader
                          </span>
                        </div>
                        <h3 className="text-2xl font-heading font-extrabold text-white">
                          {member.name}
                        </h3>
                        <span className="text-xs font-mono tracking-wider text-gold font-bold uppercase -mt-2">
                          {member.role}
                        </span>
                        <p className="text-xs md:text-sm text-steel leading-relaxed font-sans pt-2 border-t border-white/10">
                          {member.description}
                        </p>
                      </GlassCard>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ━━━ Timeline ━━━ */}
        <div>
          <SectionHeading
            badge="Our Journey"
            title="Building scalable software since 2019"
            subtitle="Key milestones in our evolution into a global engineering studio."
          />

          <div className="relative mt-6">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-gold/30 via-accent-violet/30 to-transparent" />

            <div className="flex flex-col gap-8">
              {milestones.map((milestone, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                  className={`relative flex items-start gap-6 pl-12 md:pl-0 ${
                    idx % 2 === 0 ? "md:pr-[52%]" : "md:pl-[52%]"
                  }`}
                >
                  {/* Dot on the line */}
                  <div className="absolute left-2.5 md:left-1/2 md:-translate-x-1/2 top-1 h-3 w-3 rounded-full border-2 border-gold bg-black shadow-[0_0_8px_rgba(212,175,55,0.6)]" />

                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-mono tracking-[0.15em] text-gold uppercase font-bold">
                      {milestone.year}
                    </span>
                    <p className="text-xs md:text-sm text-steel leading-relaxed font-sans">
                      {milestone.event}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ━━━ Core Values ━━━ */}
        <div>
          <SectionHeading
            badge="Core Values"
            title="The engineering standards we live by"
            subtitle="Non-negotiable principles that guide every line of code we write."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
            {coreValues.map((value, idx) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.06, duration: 0.5 }}
                >
                  <GlassCard className="p-8 flex flex-col gap-4 h-full border-white/10 hover:border-gold/40 transition-colors">
                    <div className={`h-12 w-12 rounded-2xl border border-gold/30 bg-gold/5 flex items-center justify-center ${value.accent}`}>
                      <Icon className="h-6 w-6 text-gold" />
                    </div>
                    <h4 className="text-lg font-heading font-extrabold text-white mt-1">
                      {value.title}
                    </h4>
                    <p className="text-xs text-steel leading-relaxed font-sans">
                      {value.description}
                    </p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
