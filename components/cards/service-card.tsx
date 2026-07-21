"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code, LayoutTemplate, Smartphone, Gamepad2, Brain, Database, ShieldAlert, CloudUpload, Palette, Layers, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ServiceCardData {
  slug: string;
  name: string;
  description: string;
  details?: string[];
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

const glowColors = [
  "rgba(59, 130, 246, 0.10)",   // blue
  "rgba(139, 92, 246, 0.10)",   // violet
  "rgba(6, 182, 212, 0.10)",    // cyan
  "rgba(244, 63, 94, 0.08)",    // rose
  "rgba(245, 158, 11, 0.08)",   // amber
  "rgba(16, 185, 129, 0.08)",   // emerald
];

const accentColors = [
  "text-accent-blue",
  "text-accent-violet",
  "text-accent-cyan",
  "text-accent-rose",
  "text-accent-amber",
  "text-emerald-400",
];

export function ServiceCard({ service, index }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const IconComponent = iconMap[service.slug] || Code;
  const glowColor = glowColors[index % glowColors.length];
  const accentColor = accentColors[index % accentColors.length];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setTilt({
      x: -(y - centerY) / 18,
      y: (x - centerX) / 18,
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
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-md overflow-hidden min-h-[300px] flex flex-col justify-between transition-all duration-500 hover:border-white/[0.12] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
      >
        {/* Cursor spotlight */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-400"
            style={{
              background: `radial-gradient(250px circle at ${coords.x}px ${coords.y}px, ${glowColor}, transparent 70%)`,
            }}
          />
        )}

        {/* Border beam on hover */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background: `radial-gradient(200px circle at ${coords.x}px ${coords.y}px, rgba(255,255,255,0.05), transparent 60%)`,
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
              padding: "1px",
            }}
          />
        )}

        {/* Top edge highlight */}
        <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 p-8 flex flex-col h-full" style={{ transform: "translateZ(20px)" }}>
          {/* Header */}
          <div className="flex items-start justify-between mb-auto">
            <div className={cn(
              "h-12 w-12 rounded-xl border border-white/[0.06] bg-white/[0.03] flex items-center justify-center transition-all duration-500",
              isHovered && "bg-white/[0.06] border-white/[0.1]"
            )}>
              <IconComponent className={cn("h-5 w-5 transition-colors duration-500", accentColor)} />
            </div>

            {/* Live pulse dot */}
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className={cn(
                  "animate-ping absolute inline-flex h-full w-full rounded-full opacity-50",
                  accentColor.replace("text-", "bg-")
                )} />
                <span className={cn(
                  "relative inline-flex rounded-full h-1.5 w-1.5",
                  accentColor.replace("text-", "bg-")
                )} />
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-3 mt-8" style={{ transform: "translateZ(30px)" }}>
            <h3 className="text-lg font-heading font-bold text-ice tracking-tight group-hover:text-white transition-colors duration-300">
              {service.name}
            </h3>
            <p className="text-[13px] text-steel leading-relaxed font-sans line-clamp-3">
              {service.description}
            </p>
          </div>

          {/* Footer CTA */}
          <div className="flex items-center gap-1.5 mt-8 pt-5 border-t border-white/[0.04]" style={{ transform: "translateZ(25px)" }}>
            <span className={cn(
              "text-[11px] font-heading font-semibold tracking-[0.12em] uppercase transition-colors duration-300",
              accentColor
            )}>
              Learn More
            </span>
            <ArrowRight className={cn(
              "h-3.5 w-3.5 transition-all duration-300 group-hover:translate-x-1.5",
              accentColor
            )} />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
