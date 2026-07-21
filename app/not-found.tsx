"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { AuroraField } from "@/components/backgrounds/aurora-field";

export default function NotFound() {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden">
      {/* Background */}
      <AuroraField variant="violet" intensity={0.4} interactive />

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-md mx-auto">
        {/* Glitch-style 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <h1 className="text-[10rem] md:text-[14rem] font-heading font-extrabold text-white/[0.04] leading-none tracking-tighter select-none">
            404
          </h1>
          {/* Overlay text with gradient */}
          <h1 className="absolute inset-0 flex items-center justify-center text-[10rem] md:text-[14rem] font-heading font-extrabold gradient-text leading-none tracking-tighter select-none opacity-40">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col items-center gap-3 -mt-16"
        >
          <span className="text-[10px] font-mono tracking-[0.2em] text-accent-blue uppercase">
            Page Not Found
          </span>
          <h2 className="text-xl font-heading font-bold text-ice">
            This page doesn&apos;t exist
          </h2>
          <p className="text-sm text-steel leading-relaxed font-sans max-w-sm">
            The page you&apos;re looking for has been moved, deleted, or never existed.
            Let&apos;s get you back on track.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group/btn px-8 py-3.5 rounded-xl text-[11px] font-heading font-semibold uppercase tracking-[0.14em] text-white border border-white/[0.08] bg-white/[0.03] hover:border-accent-blue/25 transition-all duration-300 cursor-pointer overflow-hidden relative"
            >
              <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
              <span className="relative flex items-center gap-2">
                Return Home <Home className="h-3.5 w-3.5" />
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
