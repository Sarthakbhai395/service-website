"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function FloatingNavbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setIsScrolled(currentScrollY > 30);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 w-full px-4 md:px-8 transition-all duration-500",
          isScrolled ? "py-3" : "py-5"
        )}
      >
        <div
          className={cn(
            "mx-auto flex items-center justify-between w-full transition-all duration-500 relative",
            isScrolled
              ? "max-w-5xl px-6 py-2.5 rounded-full glass-panel"
              : "max-w-7xl px-2 py-0 bg-transparent border-transparent"
          )}
        >
          {/* Animated shimmer border (only when scrolled) */}
          {isScrolled && (
            <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.1), rgba(139,92,246,0.1), transparent)",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                  WebkitMaskComposite: "xor",
                  padding: "1px",
                }}
              />
            </div>
          )}

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group relative z-10"
          >
            {/* Logo mark — geometric shape */}
            <div className="relative h-8 w-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-accent-blue to-accent-violet opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="relative h-4 w-4 border-2 border-white/80 rounded-sm rotate-45 group-hover:rotate-[225deg] transition-transform duration-700" />
            </div>
            <span className="font-heading font-bold text-sm tracking-wide text-ice group-hover:text-white transition-colors duration-300">
              NEXUS EDGE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 relative z-10">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 text-[11px] uppercase tracking-[0.15em] font-heading font-medium transition-colors duration-300 rounded-full",
                    isActive
                      ? "text-white"
                      : "text-ghost hover:text-ice"
                  )}
                >
                  {/* Active pill indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/[0.06]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center relative z-10">
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group/btn relative px-5 py-2 rounded-full text-[11px] font-heading font-semibold uppercase tracking-[0.12em] text-white overflow-hidden cursor-pointer border border-white/10 bg-white/[0.04] hover:border-accent-blue/30 transition-colors duration-300"
              >
                {/* Shimmer sweep on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
                <span className="relative flex items-center gap-1.5">
                  Start Project
                  <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </span>
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex md:hidden relative z-10 text-ghost hover:text-white transition-colors duration-300 focus:outline-none cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-void/98 backdrop-blur-2xl flex flex-col justify-center px-10 md:hidden"
          >
            {/* Background accent */}
            <div className="absolute top-1/4 right-1/4 w-[50vw] h-[50vw] rounded-full bg-accent-violet/5 blur-[100px] pointer-events-none" />

            <nav className="flex flex-col gap-2 relative z-10">
              {navItems.map((item, idx) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -40, opacity: 0 }}
                    transition={{
                      delay: idx * 0.08,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "block py-4 text-4xl font-heading font-bold tracking-tight transition-colors duration-300 border-b border-white/5",
                        isActive
                          ? "text-white"
                          : "text-ghost hover:text-white"
                      )}
                    >
                      <span className="flex items-center justify-between">
                        {item.label}
                        {isActive && (
                          <span className="h-2 w-2 rounded-full bg-accent-blue animate-pulse-glow" />
                        )}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                transition={{ delay: navItems.length * 0.08, duration: 0.5 }}
                className="mt-10"
              >
                <Link href="/contact" className="block">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-4 rounded-2xl text-sm font-heading font-semibold uppercase tracking-[0.15em] text-white bg-gradient-to-r from-accent-blue/20 to-accent-violet/20 border border-white/10 hover:border-accent-blue/30 transition-colors duration-300 cursor-pointer"
                  >
                    Start a Project
                  </motion.button>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
