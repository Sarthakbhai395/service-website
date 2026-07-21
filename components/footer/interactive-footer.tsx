"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Send, ArrowUpRight, ArrowUp } from "lucide-react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { toast } from "sonner";
import { motion } from "framer-motion";

const linksCompany = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const linksLegal = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

const socialLinks = [
  { icon: FaGithub, href: "https://github.com", label: "GitHub" },
  { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
  { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

export function InteractiveFooter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Successfully subscribed!", {
        description: "You'll receive our engineering insights newsletter.",
      });
      setEmail("");
    }, 1500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/[0.04] bg-void text-ice mt-auto overflow-hidden">
      {/* Subtle aurora bleed */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[300px] rounded-full bg-accent-blue/[0.02] blur-[120px] pointer-events-none" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-16">

          {/* Brand column */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="relative h-8 w-8 flex items-center justify-center">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-accent-blue to-accent-violet opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                <div className="relative h-4 w-4 border-2 border-white/80 rounded-sm rotate-45 group-hover:rotate-[225deg] transition-transform duration-700" />
              </div>
              <span className="font-heading font-bold text-sm tracking-wide text-ice group-hover:text-white transition-colors duration-300">
                NEXUS EDGE
              </span>
            </Link>

            <p className="text-[13px] text-steel leading-relaxed font-sans max-w-sm">
              We design, build, and deploy enterprise-grade software solutions
              that scale. From rapid MVPs to multi-tenant SaaS platforms.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-1">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="h-9 w-9 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-center justify-center text-steel hover:text-white hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Navigation columns */}
          <div className="md:col-span-2 flex flex-col gap-5">
            <h4 className="text-[10px] uppercase font-mono font-medium tracking-[0.2em] text-ghost">
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              {linksCompany.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-steel hover:text-white hover:tracking-wide transition-all duration-300 font-sans"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 flex flex-col gap-5">
            <h4 className="text-[10px] uppercase font-mono font-medium tracking-[0.2em] text-ghost">
              Legal
            </h4>
            <ul className="flex flex-col gap-3">
              {linksLegal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-steel hover:text-white hover:tracking-wide transition-all duration-300 font-sans"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-3 flex flex-col gap-5">
            <h4 className="text-[10px] uppercase font-mono font-medium tracking-[0.2em] text-ghost">
              Stay Updated
            </h4>
            <p className="text-[13px] text-steel leading-relaxed font-sans">
              Engineering insights, architecture patterns, and product updates.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2 mt-1">
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                suppressHydrationWarning
                className="flex-1 h-10 px-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder:text-steel/50 focus:outline-none focus:border-accent-blue/30 focus:ring-1 focus:ring-accent-blue/20 transition-all duration-300"
              />
              <motion.button
                type="submit"
                disabled={loading}
                suppressHydrationWarning
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="h-10 w-10 rounded-xl border border-white/[0.06] bg-white/[0.03] flex items-center justify-center text-steel hover:text-white hover:border-accent-blue/25 transition-all duration-300 cursor-pointer disabled:opacity-50"
              >
                <Send className="h-3.5 w-3.5" />
              </motion.button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.04] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-steel/60 font-sans">
            © {new Date().getFullYear()} Nexus Edge. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-[12px] text-steel/60">
            {/* Status indicator */}
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              All systems operational
            </span>

            {/* Scroll to top */}
            <motion.button
              onClick={scrollToTop}
              suppressHydrationWarning
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="h-8 w-8 rounded-lg border border-white/[0.06] bg-white/[0.02] flex items-center justify-center text-steel hover:text-white hover:border-white/[0.12] transition-all duration-300 cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
