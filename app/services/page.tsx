"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/common/section-heading";
import { ServiceCard } from "@/components/cards/service-card";
import { AuroraField } from "@/components/backgrounds/aurora-field";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const serviceDescriptions: Record<string, string> = {
  "mvp-development": "Validate your concept fast. We ship fully functional MVPs with decoupled frontends, secure APIs, and CI/CD pipelines from day one.",
  "prototype-development": "Interactive prototypes that communicate your vision. High-fidelity mockups with real data flows and animation specifications.",
  "end-to-end-product": "Complete product lifecycle management — from discovery workshops through architecture, development, testing, deployment, and ongoing iteration.",
  "web-development": "Pixel-perfect, performance-optimized web applications built with Next.js, server components, edge rendering, and custom animation systems.",
  "mobile-app-development": "Cross-platform mobile applications with native performance, offline-first architecture, biometric authentication, and push notifications.",
  "game-development": "Interactive game experiences with real-time physics, multiplayer networking, asset optimization, and cross-platform deployment.",
  "saas-development": "Multi-tenant SaaS platforms with Stripe billing, role-based access control, real-time analytics, and database pooling at scale.",
  "ai-development": "AI-powered features including LLM orchestration, RAG pipelines, inference endpoints, and intelligent automation workflows.",
  "ui-ux-design": "Research-driven design systems with micro-interactions, accessibility compliance, and award-worthy visual interfaces.",
  "api-development": "RESTful and GraphQL APIs with rate limiting, JWT authentication, request validation, comprehensive logging, and API documentation.",
  "cloud-deployment": "Infrastructure automation with Docker, Kubernetes, CI/CD pipelines, edge networks, auto-scaling, and monitoring dashboards.",
  "maintenance-support": "Ongoing performance monitoring, security patches, dependency updates, feature iterations, and dedicated engineering support.",
};

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen">
      {/* Page background */}
      <AuroraField variant="violet" intensity={0.6} interactive={false} />

      <div className="relative z-10 py-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeading
            badge="Our Capabilities"
            title="End-to-end software engineering solutions"
            subtitle="From initial concept to global deployment — we architect, design, build, and maintain production-grade software for ambitious teams."
          />
        </motion.div>

        {/* Bento grid of services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
          {siteConfig.services.map((service, idx) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <ServiceCard
                index={idx}
                service={{
                  ...service,
                  description: serviceDescriptions[service.slug] || `${service.name} services built with enterprise-grade architecture, type safety, and responsive design.`,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col items-center gap-4 mt-24 text-center"
        >
          <p className="text-sm text-steel font-sans max-w-md">
            Not sure which service fits your project? Let&apos;s discuss your requirements.
          </p>
          <Link href="/contact" className="inline-block">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group/btn px-8 py-3.5 rounded-xl text-[11px] font-heading font-semibold uppercase tracking-[0.14em] text-white border border-white/[0.08] bg-white/[0.03] hover:border-accent-violet/25 transition-all duration-300 cursor-pointer overflow-hidden relative inline-flex items-center justify-center"
            >
              <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
              <span className="relative flex items-center gap-2">
                Get a Custom Proposal <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
