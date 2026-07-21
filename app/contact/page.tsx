"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/common/section-heading";
import { ContactForm } from "@/components/forms/contact-form";
import { GlassCard } from "@/components/cards/glass-card";
import { AuroraField } from "@/components/backgrounds/aurora-field";
import { Mail, Phone, MapPin, Clock, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";

const contactDetails = [
  {
    title: "Email",
    value: siteConfig.contact.email,
    description: "Our team responds within 24 hours.",
    icon: Mail,
    accent: "text-accent-blue",
  },
  {
    title: "Phone",
    value: siteConfig.contact.phone,
    description: "Mon – Fri, 9:00 AM – 6:00 PM EST.",
    icon: Phone,
    accent: "text-accent-violet",
  },
  {
    title: "Office",
    value: siteConfig.contact.address,
    description: "Schedule an in-person meeting.",
    icon: MapPin,
    accent: "text-accent-cyan",
  },
  {
    title: "Hours",
    value: "Mon – Fri, 9 AM – 6 PM EST",
    description: "Weekend support available for active clients.",
    icon: Clock,
    accent: "text-accent-amber",
  },
];

export default function ContactPage() {
  return (
    <div className="relative min-h-screen">
      {/* Warm aurora background */}
      <AuroraField variant="warm" intensity={0.5} interactive={false} />

      <div className="relative z-10 py-32 px-6 md:px-12 max-w-7xl mx-auto w-full flex flex-col gap-16">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeading
            badge="Get in Touch"
            title="Let's build something remarkable"
            subtitle="Whether you're launching an MVP or scaling an enterprise platform — we're ready to discuss your vision."
          />
        </motion.div>

        {/* Main grid: Info left, Form right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Info column */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {contactDetails.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <GlassCard className="p-5 flex items-start gap-4">
                    <div className={`h-10 w-10 shrink-0 rounded-xl border border-white/[0.06] bg-white/[0.03] flex items-center justify-center ${item.accent}`}>
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                      <h4 className="text-[11px] font-mono uppercase tracking-[0.15em] text-ghost">
                        {item.title}
                      </h4>
                      <span className="text-sm font-heading font-semibold text-white break-words">
                        {item.value}
                      </span>
                      <p className="text-[12px] text-steel font-sans mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}

            {/* Security note */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <GlassCard className="p-5 flex items-start gap-4">
                <ShieldCheck className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                <div className="flex flex-col gap-1">
                  <h4 className="text-[11px] font-mono uppercase tracking-[0.15em] text-ghost">
                    Security
                  </h4>
                  <p className="text-[12px] text-steel leading-relaxed font-sans">
                    All form submissions are encrypted in transit. For vulnerability reports
                    or security audits, contact our security team directly.
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Form column */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
