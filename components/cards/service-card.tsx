"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code, Smartphone, Gamepad2, Brain, Database, CloudUpload, Palette, Layers, Wrench, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ServiceCardData {
  slug: string;
  name: string;
  description: string;
  features?: string[];
}

interface ServiceCardProps {
  service: ServiceCardData;
  index: number;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "mvp-development": Code,
  "prototype-development": Layers,
  "end-to-end-product": Smartphone,
  "web-development": Code,
  "mobile-app-development": Smartphone,
  "game-development": Gamepad2,
  "saas-development": Database,
  "ai-development": Brain,
  "ui-ux-design": Palette,
  "api-development": Database,
  "cloud-deployment": CloudUpload,
  "maintenance-support": Wrench,
};

const glowGradients = [
  "from-amber-500/20 via-gold/10 to-transparent",
  "from-violet-500/20 via-amber-400/10 to-transparent",
  "from-cyan-500/20 via-blue-500/10 to-transparent",
  "from-rose-500/20 via-gold/10 to-transparent",
  "from-emerald-500/20 via-teal-400/10 to-transparent",
];

export function ServiceCard({ service, index }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const IconComponent = iconMap[service.slug] || Code;
  const gradientClass = glowGradients[index % glowGradients.length];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setTilt({
      x: -(y - centerY) / 15,
      y: (x - centerX) / 15,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <Link href={`/services/${service.slug}`} className="block h-full group">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX: tilt.x, rotateY: tilt.y, scale: isHovered ? 1.02 : 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative h-full rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl overflow-hidden min-h-[310px] flex flex-col justify-between transition-all duration-500 hover:border-gold/40 hover:shadow-[0_20px_50px_rgba(212,175,55,0.12)] p-7"
      >
        {/* Animated background ambient glow */}
        <div className={cn("absolute -top-24 -right-24 w-64 h-64 rounded-full bg-gradient-to-br blur-3xl opacity-20 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none", gradientClass)} />

        {/* Cursor spotlight */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-400"
            style={{
              background: `radial-gradient(220px circle at ${coords.x}px ${coords.y}px, rgba(212, 175, 55, 0.12), transparent 75%)`,
            }}
          />
        )}

        {/* Floating animated sparkles icon overlay */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-gold pointer-events-none" style={{ transform: "translateZ(30px)" }}>
          <Sparkles className="h-4 w-4 animate-pulse" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col h-full justify-between gap-6" style={{ transform: "translateZ(25px)" }}>
          <div>
            {/* Icon & Live indicator */}
            <div className="flex items-center justify-between mb-6">
              <div className="h-14 w-14 rounded-2xl border border-gold/30 bg-gold/5 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/10 transition-all duration-500 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                <IconComponent className="h-6 w-6 text-gold group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-[9px] font-mono tracking-widest text-gold uppercase font-bold">
                0{index + 1}
              </span>
            </div>

            {/* Title & Description */}
            <h3 className="text-xl font-heading font-extrabold text-white group-hover:text-gold transition-colors duration-300 tracking-tight leading-snug">
              {service.name}
            </h3>
            <p className="text-xs text-steel leading-relaxed font-sans mt-2.5 line-clamp-3">
              {service.description}
            </p>
          </div>

          {/* Features pills if present */}
          {service.features && service.features.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {service.features.slice(0, 3).map((feature) => (
                <span
                  key={feature}
                  className="px-2.5 py-0.5 rounded-md border border-white/5 bg-white/[0.03] text-[10px] font-mono text-steel/90 tracking-wide"
                >
                  {feature}
                </span>
              ))}
            </div>
          )}

          {/* Interactive Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
            <span className="text-[11px] font-mono tracking-widest text-gold font-bold uppercase group-hover:tracking-wider transition-all duration-300">
              Explore Capability
            </span>
            <div className="h-8 w-8 rounded-full border border-gold/20 bg-gold/5 flex items-center justify-center group-hover:border-gold group-hover:bg-gold text-gold group-hover:text-black transition-all duration-300">
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
