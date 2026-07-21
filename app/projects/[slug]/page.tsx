"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Calendar, Users, Cpu } from "lucide-react";
import { SectionHeading } from "@/components/common/section-heading";
import { GlassCard } from "@/components/cards/glass-card";
import { ShinyButton } from "@/components/buttons/shiny-button";
import { Badge } from "@/components/common/badge";
import { apiClient } from "@/services/api-client";
import { AuroraField } from "@/components/backgrounds/aurora-field";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const fallbackProjects = {
  "apex-finance": {
    title: "Apex Finance — Enterprise Asset Management Dashboard",
    category: "Fintech",
    clientName: "Apex Wealth LLC",
    date: "Q1 2026",
    description: "Built a secure, real-time portfolio management dashboard with robust JWT RBAC security and multi-tenant billing models.",
    thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
    tags: ["Next.js", "Express", "Supabase", "Redis"],
    challenge: "Developing synchronous real-time dashboards mapping updates from multiple stock indices and trading feeds without locking client thread execution loops.",
    solution: "We wired up WebSocket connection threads decoupled from the primary Express request pipelines, leveraging Redis caching layers for instant database reads.",
    stats: [
      { label: "Uptime", value: "99.99%" },
      { label: "Latency", value: "<12ms" },
      { label: "Volume", value: "8.4TB" },
    ],
  },
  "nova-ai": {
    title: "Nova AI — Generative Language Co-processor API",
    category: "AI Platform",
    clientName: "Nova Labs Inc",
    date: "Q2 2026",
    description: "Designed a lightweight, high-availability API gateway hosting language model prompts and stream parsing.",
    thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200",
    tags: ["Node.js", "Zod", "MongoDB", "AWS"],
    challenge: "Handling variable latency constraints on AI prompt completion streams, ensuring backend validation checks did not buffer or choke responses.",
    solution: "We structured progressive parser wrappers utilizing native Node streams, feeding chunks to Zod schemas in real-time as they arrived.",
    stats: [
      { label: "Throughput", value: "1.2M/min" },
      { label: "TTFB", value: "85ms" },
      { label: "Cost Saved", value: "42%" },
    ],
  },
  "aura-commerce": {
    title: "Aura Commerce — Headless Commerce Engine",
    category: "E-Commerce",
    clientName: "Aura Retail",
    date: "Q2 2026",
    description: "Structured a globally distributed GraphQL headless ecommerce backend with instant cache invalidate configurations.",
    thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200",
    tags: ["GraphQL", "Next.js", "Redis", "Supabase"],
    challenge: "Maintaining dynamic product inventories across multiple regional warehouses with sub-second synchronization latency limits.",
    solution: "We deployed globally distributed Edge databases configured with transaction batch listeners, caching catalog pages on CDN layers.",
    stats: [
      { label: "Throughput", value: "800 req/s" },
      { label: "Cache Hit", value: "98.4%" },
      { label: "Load Time", value: "140ms" },
    ],
  },
  "vivid-health": {
    title: "Vivid Health — Patient Diagnostics Mobile Application",
    category: "Healthcare",
    clientName: "Vivid Health Group",
    date: "Q3 2026",
    description: "Created a HIPAA-compliant cross-platform mobile app containing secure auth and document upload streams.",
    thumbnailUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1200",
    tags: ["React Native", "Express", "Supabase", "MongoDB"],
    challenge: "Ensuring patient identity encryption and file integrity checks during file transfers under variable cellular network coverage conditions.",
    solution: "We configured multi-part chunked uploads mapping progress tokens, validating hashes before writing files to secure S3 storage blocks.",
    stats: [
      { label: "Compliance", value: "HIPAA" },
      { label: "Security", value: "AES-256" },
      { label: "Upload Speed", value: "5MB/s" },
    ],
  },
};

export default function ProjectDetailsPage({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const slug = resolvedParams.slug;

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjectDetails() {
      try {
        const response = await apiClient.get<any>(`/projects/${slug}`);
        if (response) {
          setProject(response);
        }
      } catch (err) {
        console.warn("Project details not found in API, matching fallback catalog:", err);
        const fallback = fallbackProjects[slug as keyof typeof fallbackProjects];
        if (fallback) {
          setProject(fallback);
        }
      } finally {
        setLoading(false);
      }
    }
    loadProjectDetails();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[70vh] bg-void flex items-center justify-center text-gold">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin h-8 w-8 border-2 border-gold rounded-full border-t-transparent" />
          <span className="font-mono text-xs uppercase tracking-widest">Loading Details...</span>
        </div>
      </div>
    );
  }

  if (!project) {
    notFound();
  }

  // Parse challenges and solutions from content markdown if it is from the database
  let challengeText = project.challenge || "";
  let solutionText = project.solution || "";

  if (project.content && (!challengeText || !solutionText)) {
    const parts = project.content.split("\n\n");
    parts.forEach((part: string) => {
      if (part.startsWith("Challenge:")) {
        challengeText = part.replace("Challenge:", "").trim();
      } else if (part.startsWith("Solution:")) {
        solutionText = part.replace("Solution:", "").trim();
      }
    });
  }

  // Fallback description if content parsing was too simple
  if (!challengeText && project.content) {
    challengeText = project.content;
  }

  return (
    <div className="relative min-h-screen">
      <AuroraField variant="warm" intensity={0.4} interactive={false} />

      <div className="relative z-10 py-24 px-6 md:px-12 max-w-7xl mx-auto w-full flex flex-col gap-12">
        {/* Back to list link */}
        <div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-widest text-steel hover:text-white transition-colors duration-300"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Case Studies
          </Link>
        </div>

        {/* Hero image banner */}
        <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden border border-white/[0.06] bg-neutral-900 shadow-2xl">
          <Image
            src={project.thumbnailUrl || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200"}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-transparent" />
          
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-10 flex flex-col gap-2 max-w-3xl">
            <Badge variant="gold" className="max-w-fit">{project.category}</Badge>
            <h1 className="text-2xl md:text-5xl font-heading font-extrabold text-white leading-tight">
              {project.title}
            </h1>
          </div>
        </div>

        {/* Dynamic details grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-4">
          <div className="lg:col-span-8 flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-heading font-bold text-white uppercase tracking-wider">Project Overview</h3>
              <p className="text-sm text-steel leading-relaxed font-sans">{project.description}</p>
            </div>

            {challengeText && (
              <div className="flex flex-col gap-4 border-t border-white/[0.05] pt-8">
                <h3 className="text-xl font-heading font-bold text-white uppercase tracking-wider">The Engineering Challenge</h3>
                <p className="text-sm text-steel leading-relaxed font-sans">{challengeText}</p>
              </div>
            )}

            {solutionText && (
              <div className="flex flex-col gap-4 border-t border-white/[0.05] pt-8">
                <h3 className="text-xl font-heading font-bold text-white uppercase tracking-wider">Our Architectural Solution</h3>
                <p className="text-sm text-steel leading-relaxed font-sans">{solutionText}</p>
              </div>
            )}
          </div>

          {/* Specifications sidebar */}
          <div className="lg:col-span-4 sticky top-24">
            <GlassCard className="p-8 flex flex-col gap-6" hoverLift={false}>
              <h3 className="text-base font-heading font-bold text-white uppercase tracking-wider border-b border-white/[0.05] pb-4">
                Specifications
              </h3>
              
              <div className="flex flex-col gap-4 font-sans text-xs text-steel">
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-gold shrink-0" />
                  <span className="font-mono uppercase tracking-widest text-[9px]">Client:</span>
                  <span className="text-white font-bold ml-auto">{project.clientName || project.client || "Nexus Partner"}</span>
                </div>

                <div className="flex items-center gap-3 border-t border-white/[0.04] pt-4">
                  <Calendar className="h-4 w-4 text-gold shrink-0" />
                  <span className="font-mono uppercase tracking-widest text-[9px]">Timeline:</span>
                  <span className="text-white font-bold ml-auto">{project.date || "Completed"}</span>
                </div>

                <div className="flex items-start gap-3 border-t border-white/[0.04] pt-4">
                  <Cpu className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                  <span className="font-mono uppercase tracking-widest text-[9px]">Stack:</span>
                  <div className="flex flex-wrap gap-1 ml-auto justify-end max-w-[200px]">
                    {(project.tags || []).map((tag: string) => (
                      <span key={tag} className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-[9px] font-mono text-white">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <Link href="/contact" className="w-full pt-4">
                <ShinyButton className="w-full justify-center">
                  Start Similar Build <ExternalLink className="ml-2 h-3.5 w-3.5" />
                </ShinyButton>
              </Link>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
