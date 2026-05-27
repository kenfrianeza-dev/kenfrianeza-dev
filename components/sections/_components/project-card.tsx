"use client";

import { FC } from "react";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/sections/_components/icons";
import BorderGlow from "@/components/ui/border-glow";
import type { LucideIcon } from "lucide-react";
import StackIcon from "tech-stack-icons";
import Image from "next/image";

export interface ProjectTag {
  label: string;
  iconName?: string;
}

export interface ProjectType {
  id: string;
  title: string;
  description: string;
  image?: string;
  icon: LucideIcon;
  tags: ProjectTag[];
  liveUrl: string;
  githubUrl: string;
  status?: "done" | "in progress";
}

interface ProjectCardProps {
  project: ProjectType;
  index: number;
}

const ProjectCard: FC<ProjectCardProps> = ({ project, index }) => {
  const Icon = project.icon;

  return (
    <BorderGlow
      data-projects="card"
      className="group relative flex flex-col rounded-2xl transition-all duration-500 opacity-0 h-full w-full"
      animated={false}
      glowColor="210 100 60"
      backgroundColor="#09090b"
      borderRadius={16}
      glowRadius={50}
      colors={["#3b82f6", "#a855f7", "#ec4899"]}
    >
      <div className="flex flex-col h-full overflow-hidden rounded-2xl border border-surface-800/60 bg-surface-900/40 backdrop-blur-md transition-all duration-500 hover:border-accent-500/30 hover:bg-surface-800/60">
        {/* Image / Placeholder Area */}
      <div className="relative aspect-video w-full overflow-hidden bg-surface-950/50">
        {project.image ? (
          <Image 
            src={project.image} 
            alt={project.title} 
            fill 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-fit transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-surface-900 to-surface-950">
            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-surface-800/50 border border-surface-700/50 shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
              <Icon className="h-10 w-10 text-accent-500/70 transition-colors duration-500 group-hover:text-accent-400" />
            </div>
            {/* Decorative background elements */}
            <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-accent-500/5 blur-3xl transition-all duration-500 group-hover:bg-accent-500/10"></div>
          </div>
        )}
        
        {/* Overlay links (Desktop Only) */}
        <div className="absolute inset-0 bg-surface-950/60 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100 hidden md:flex items-center justify-center gap-4">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 translate-y-8 items-center justify-center rounded-full bg-accent-500 text-surface-50 opacity-0 transition-all duration-500 delay-100 hover:bg-accent-400 group-hover:translate-y-0 group-hover:opacity-100"
            aria-label="Live Preview"
          >
            <ExternalLink className="h-5 w-5" />
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 translate-y-8 items-center justify-center rounded-full bg-surface-800 text-surface-300 border border-surface-700 opacity-0 transition-all duration-500 delay-150 hover:text-surface-50 hover:bg-surface-700 group-hover:translate-y-0 group-hover:opacity-100"
            aria-label="GitHub Repository"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-start justify-between gap-4">
          <h3 className="flex-1 min-w-0 text-xl font-bold text-surface-50 transition-colors duration-300 group-hover:text-accent-400">
            {project.title}
          </h3>
          {project.status && (
            <span
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider border ${
                project.status === "done"
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : "bg-amber-500/10 text-amber-400 border-amber-500/20"
              }`}
            >
              <span className="relative flex h-1.5 w-1.5">
                {project.status === "in progress" && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                )}
                <span
                  className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
                    project.status === "done" ? "bg-emerald-400" : "bg-amber-500"
                  }`}
                ></span>
              </span>
              {project.status}
            </span>
          )}
        </div>
        
        <p className="mb-6 flex-1 text-sm text-surface-400 leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag.label}
              className="flex items-center gap-1.5 rounded-full bg-surface-800/80 px-3 py-1 text-[11px] font-medium text-surface-300 border border-surface-700/40 group/tag transition-colors duration-200 hover:border-accent-500/30 hover:text-accent-400"
            >
              {tag.iconName && (
                <StackIcon name={tag.iconName as any} className="h-3 w-3" />
              )}
              {tag.label}
            </span>
          ))}
        </div>
        
        {/* Mobile Action Buttons (Visible only on small screens) */}
        <div className="mt-6 flex items-center gap-3 md:hidden">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent-500/10 border border-accent-500/20 py-2.5 text-sm font-semibold text-accent-400 transition-colors hover:bg-accent-500/20"
          >
            <ExternalLink className="h-4 w-4" />
            Preview
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-surface-800 border border-surface-700 py-2.5 text-sm font-medium text-surface-300 transition-colors hover:text-surface-50 hover:bg-surface-700"
          >
            <GithubIcon className="h-4 w-4" />
            GitHub
          </a>
        </div>
        </div>
      </div>
    </BorderGlow>
  );
};

export default ProjectCard;
