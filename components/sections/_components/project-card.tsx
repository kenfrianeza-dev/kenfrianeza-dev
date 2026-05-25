"use client";

import { FC } from "react";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/sections/_components/icons";
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
}

interface ProjectCardProps {
  project: ProjectType;
  index: number;
}

const ProjectCard: FC<ProjectCardProps> = ({ project, index }) => {
  const Icon = project.icon;

  return (
    <div 
      data-projects="card"
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-surface-800/60 bg-surface-900/40 backdrop-blur-md transition-all duration-500 hover:border-accent-500/30 hover:bg-surface-800/60 opacity-0"
    >
      {/* Image / Placeholder Area */}
      <div className="relative aspect-video w-full overflow-hidden bg-surface-950/50">
        {project.image ? (
          <Image 
            src={project.image} 
            alt={project.title} 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-105"
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
        
        {/* Overlay links */}
        <div className="absolute inset-0 bg-surface-950/60 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100 flex items-center justify-center gap-4">
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
        <h3 className="mb-2 text-xl font-bold text-surface-50 transition-colors duration-300 group-hover:text-accent-400">
          {project.title}
        </h3>
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
      </div>
    </div>
  );
};

export default ProjectCard;
