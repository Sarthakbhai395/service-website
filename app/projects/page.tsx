"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/common/section-heading";
import { ProjectCard, ProjectCardData } from "@/components/cards/project-card";
import { AuroraField } from "@/components/backgrounds/aurora-field";
import { apiClient } from "@/services/api-client";

const fallbackProjects: ProjectCardData[] = [
  {
    title: "Apex Finance — Enterprise Asset Management Dashboard",
    slug: "apex-finance",
    description: "Built a secure, real-time portfolio management dashboard with robust JWT RBAC security and multi-tenant billing models.",
    category: "Fintech",
    thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
    tags: ["Next.js", "Express", "Supabase", "Redis"],
  },
  {
    title: "Nova AI — Generative Language Co-processor API",
    slug: "nova-ai",
    description: "Designed a lightweight, high-availability API gateway hosting language model prompts and stream parsing.",
    category: "AI Platform",
    thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800",
    tags: ["Node.js", "Zod", "MongoDB", "AWS"],
  },
  {
    title: "Aura Commerce — Headless Commerce Engine",
    slug: "aura-commerce",
    description: "Structured a globally distributed GraphQL headless ecommerce backend with instant cache invalidation config.",
    category: "E-Commerce",
    thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
    tags: ["GraphQL", "Next.js", "Redis", "Supabase"],
  },
  {
    title: "Vivid Health — Patient Diagnostics Mobile Application",
    slug: "vivid-health",
    description: "Created a HIPAA-compliant cross-platform mobile app containing secure auth and document upload streams.",
    category: "Healthcare",
    thumbnailUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=800",
    tags: ["React Native", "Express", "Supabase", "MongoDB"],
  },
];

const categories = ["All", "Fintech", "AI Platform", "E-Commerce", "Healthcare", "SaaS Platform", "Web App"];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dbProjects, setDbProjects] = useState<any[]>([]);

  useEffect(() => {
    async function loadProjects() {
      try {
        const response = await apiClient.get<any[]>("/projects");
        if (response && response.length > 0) {
          setDbProjects(response);
        }
      } catch (err) {
        console.warn("Failed to fetch projects for workspace collection:", err);
      }
    }
    loadProjects();
  }, []);

  const activeProjectsList = dbProjects.length > 0 ? dbProjects : fallbackProjects;

  const filteredProjects = selectedCategory === "All"
    ? activeProjectsList
    : activeProjectsList.filter((p) => p.category === selectedCategory);

  return (
    <div className="relative min-h-screen">
      {/* Page background */}
      <AuroraField variant="warm" intensity={0.5} interactive={false} />

      <div className="relative z-10 py-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeading
            badge="Case Studies"
            title="Engineered for impact"
            subtitle="Explore our portfolio of enterprise solutions — each measured by uptime, throughput, and real business outcomes."
          />
        </motion.div>

        {/* Filter tabs with animated pill */}
        <div className="flex flex-wrap gap-2 my-8 pb-6 border-b border-white/[0.04]">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-4 py-2 rounded-full text-[11px] font-heading uppercase tracking-[0.12em] cursor-pointer transition-all duration-300 ${
                  isActive
                    ? "text-white"
                    : "text-steel hover:text-ice border border-transparent"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="project-filter-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/[0.06]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Projects grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.slug}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
