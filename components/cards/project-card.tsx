import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export interface ProjectCardData {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  thumbnailUrl: string;
  tags?: string[];
}

interface ProjectCardProps {
  project: ProjectCardData;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="block group">
      <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden transition-all duration-500 hover:border-white/[0.1] hover:-translate-y-1 hover:shadow-[0_24px_64px_rgba(0,0,0,0.4)]">
        {/* Image Container with parallax-style zoom */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink">
          <Image
            src={project.thumbnailUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none" />

          {/* Category pill overlay */}
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/[0.06] text-[10px] font-mono tracking-[0.12em] uppercase text-ghost">
            {project.category}
          </div>

          {/* Arrow indicator */}
          <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/[0.06] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0">
            <ArrowUpRight className="h-3.5 w-3.5 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-3">
          <h3 className="text-base font-heading font-bold text-ice group-hover:text-white transition-colors duration-300 leading-snug line-clamp-2">
            {project.title}
          </h3>

          <p className="text-[13px] text-steel line-clamp-2 leading-relaxed font-sans">
            {project.description}
          </p>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.04] text-[10px] font-mono text-steel tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
