import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "default" | "gold" | "accent" | "shimmer";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-[0.15em] uppercase border overflow-hidden transition-all duration-300",
        {
          "border-white/[0.06] bg-white/[0.03] text-ghost hover:text-ice hover:border-white/[0.1]":
            variant === "default",
          "border-amber-500/20 bg-amber-500/[0.05] text-amber-400 hover:bg-amber-500/[0.08]":
            variant === "gold",
          "border-accent-blue/20 bg-accent-blue/[0.05] text-accent-blue hover:bg-accent-blue/[0.08]":
            variant === "accent",
          "border-white/[0.08] bg-white/[0.03] text-ghost":
            variant === "shimmer",
        },
        className
      )}
      {...props}
    >
      {variant === "shimmer" && (
        <span className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/[0.06] to-transparent pointer-events-none" />
      )}
      {children}
    </span>
  );
}
