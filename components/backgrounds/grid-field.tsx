"use client";

import React, { useRef, useEffect, useState } from "react";

interface GridFieldProps {
  /** Dot size in pixels */
  dotSize?: number;
  /** Grid gap in pixels */
  gap?: number;
  /** Base dot opacity */
  opacity?: number;
  /** Enable mouse spotlight */
  spotlight?: boolean;
  /** Spotlight radius in pixels */
  spotlightRadius?: number;
}

export function GridField({
  dotSize = 1,
  gap = 32,
  opacity = 0.15,
  spotlight = true,
  spotlightRadius = 200,
}: GridFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number>(0);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ w: window.innerWidth, h: window.innerHeight });
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (!spotlight) return;
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [spotlight]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.w === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = dimensions.w;
    canvas.height = dimensions.h;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width / gap);
      const rows = Math.ceil(canvas.height / gap);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * gap + gap / 2;
          const y = row * gap + gap / 2;

          let dotOpacity = opacity;

          if (spotlight && mx > 0) {
            const dist = Math.sqrt((x - mx) ** 2 + (y - my) ** 2);
            if (dist < spotlightRadius) {
              const factor = 1 - dist / spotlightRadius;
              dotOpacity = Math.min(1, opacity + factor * 0.6);
            }
          }

          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(148, 163, 184, ${dotOpacity})`;
          ctx.fill();
        }
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [dimensions, dotSize, gap, opacity, spotlight, spotlightRadius]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.5 }}
      aria-hidden="true"
    />
  );
}
