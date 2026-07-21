"use client";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/common/section-heading";
import { GlassCard } from "@/components/cards/glass-card";
import { ShinyButton } from "@/components/buttons/shiny-button";
import { AuroraField } from "@/components/backgrounds/aurora-field";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ServiceDetailsPage({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const slug = resolvedParams.slug;
  
  // Find service config metadata matching slug
  const service = siteConfig.services.find((s) => s.slug === slug);
  if (!service) {
    notFound();
  }

  // Construct detailed points for each type of service
  const featuresList = [
    "Strict type-safe specifications mapping out payload structures.",
    "Integrated unit tests verifying data mutations and validations.",
    "High-performance assets optimized for low bandwidth and latency.",
    "Responsive interface bindings with dynamic animations (GSAP / Framer).",
    "Continuous delivery integration with automated deployment workflows.",
  ];

  return (
    <div className="relative min-h-screen">
      <AuroraField variant="warm" intensity={0.4} interactive={false} />

      <div className="relative z-10 py-24 px-6 md:px-12 max-w-7xl mx-auto w-full flex flex-col gap-12">
        {/* Back button */}
        <div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-widest text-steel hover:text-white transition-colors duration-300"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Services
          </Link>
        </div>

        {/* Main Grid: Details on left, CTA card on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Info Column */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <SectionHeading
              badge="Service Division"
              title={service.name}
              subtitle={`${service.name} engineering division focused on building robust, security-hardened systems for high-load platforms.`}
            />

            <div className="flex flex-col gap-4 text-sm text-steel leading-relaxed font-sans mt-4">
              <p>
                Our squad of senior architects builds customized solutions using modern libraries. We prioritize performance constraints, ensuring your platforms are fast, responsive, and secure.
              </p>
              <p>
                By leveraging Next.js 15 Server Components, we keep client-side JS bundles low, shifting database queries to the server to prevent heavy resource parsing overhead on client engines.
              </p>
            </div>

            {/* Features check checklist */}
            <div className="flex flex-col gap-4 border-t border-white/[0.05] pt-8 mt-4">
              <h3 className="text-lg font-heading font-semibold text-white">Core Pillars of Delivery</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {featuresList.map((feature, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-steel font-sans">
                    <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA Card Column */}
          <div className="lg:col-span-4 sticky top-24">
            <GlassCard className="p-8 flex flex-col gap-6" hoverLift={false}>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono tracking-widest text-gold uppercase">Inquiry</span>
                <h3 className="text-xl font-heading font-bold text-white">Need {service.name}?</h3>
                <p className="text-xs text-steel leading-relaxed font-sans">
                  Schedule a consultation call with our solutions architect to map out your product specifications.
                </p>
              </div>
              
              <Link href="/contact" className="w-full">
                <ShinyButton className="w-full justify-center">
                  Configure Project <ArrowRight className="ml-2 h-4 w-4" />
                </ShinyButton>
              </Link>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
