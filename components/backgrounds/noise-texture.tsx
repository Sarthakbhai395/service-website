"use client";

import React from "react";

interface NoiseTextureProps {
  /** Opacity of the noise overlay */
  opacity?: number;
}

export function NoiseTexture({ opacity = 0.03 }: NoiseTextureProps) {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ opacity, mixBlendMode: "overlay" }}
      aria-hidden="true"
    >
      <svg className="w-full h-full animate-grain" xmlns="http://www.w3.org/2000/svg">
        <filter id="noise-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect
          width="150%"
          height="150%"
          x="-25%"
          y="-25%"
          filter="url(#noise-filter)"
        />
      </svg>
    </div>
  );
}
