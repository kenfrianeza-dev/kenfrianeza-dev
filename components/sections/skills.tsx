"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { dotsParallax } from "@/lib/gsap/animations";
import {
  Globe,
  Server,
  Database,
  Cloud,
  Wrench,
  Code2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeader } from "@/components/sections/_components";
import StackIcon from "tech-stack-icons";

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  label: string;
  iconName?: string;
}

interface SkillCategory {
  title: string;
  icon: LucideIcon;
  skills: Skill[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend",
    icon: Globe,
    skills: [
      { label: "React.js", iconName: "react" },
      { label: "Next.js", iconName: "nextjs2" },
      { label: "Angular", iconName: "angular17" },
      { label: "TailwindCSS", iconName: "tailwindcss" },
      { label: "ShadcnUI", iconName: "shadcnui" },
      { label: "JavaScript", iconName: "js" },
      { label: "TypeScript", iconName: "typescript" },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    skills: [
      { label: "Laravel", iconName: "laravel" },
      { label: "PHP", iconName: "php" },
      { label: "Node.js", iconName: "nodejs" },
    ],
  },
  {
    title: "APIs & Communication",
    icon: Code2,
    skills: [
      { label: "RESTful APIs" },
      { label: "GraphQL", iconName: "graphql" },
      { label: "Prisma", iconName: "prisma" },
    ],
  },
  {
    title: "Databases",
    icon: Database,
    skills: [
      { label: "MySQL", iconName: "mysql" },
      { label: "PostgreSQL", iconName: "postgresql" },
      { label: "MongoDB", iconName: "mongodb" },
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: [
      { label: "AWS EC2", iconName: "aws" },
      { label: "S3 Bucket", iconName: "aws" },
      { label: "CloudFront", iconName: "aws" },
      { label: "Route 53", iconName: "aws" },
      { label: "Docker", iconName: "docker" },
    ],
  },
  {
    title: "Tools & Version Control",
    icon: Wrench,
    skills: [
      { label: "Linux", iconName: "linux" },
      { label: "Bash", iconName: "bash" },
      { label: "GitHub", iconName: "github" },
      { label: "Jira", iconName: "jira" },
      { label: "Bitbucket", iconName: "bitbucket" },
      { label: "CI/CD" },
      { label: "VSCode", iconName: "vscode" },
      { label: "Antigravity", iconName: "antigravity" },
    ],
  },
];

export default function Skills() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Reveal section heading
      gsap.fromTo(
        containerRef.current.querySelector("[data-skills='heading']"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      // Stagger category cards
      gsap.fromTo(
        containerRef.current.querySelectorAll("[data-skills='category']"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
      // Dot background parallax
      dotsParallax(containerRef.current);
    },
    { scope: containerRef }
  );

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative bg-surface-950 py-24 px-6 md:px-12 lg:px-24"
    >
      {/* Section heading */}
      <div data-skills="heading">
        <SectionHeader
          label="Core Technologies"
          title="Tech Stack"
          subTitle="The technologies and tools I use to engineer reliable, scalable systems."
        />
      </div>

      {/* Skill categories grid */}
      <div className="relative mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SKILL_CATEGORIES.map((category) => {
          const Icon = category.icon;

          return (
            <div
              key={category.title}
              data-skills="category"
              className="group rounded-xl border border-surface-800/60 bg-surface-900/40 p-6 opacity-0 backdrop-blur-sm transition-all duration-300 hover:border-accent-500/25 hover:bg-surface-800/40"
            >
              {/* Category header */}
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-500/10 border border-accent-500/20 transition-colors duration-300 group-hover:bg-accent-500/15">
                  <Icon className="h-4 w-4 text-accent-400" />
                </span>
                <h3 className="text-sm font-semibold text-surface-100 uppercase tracking-wide">
                  {category.title}
                </h3>
              </div>

              {/* Skill pills */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill.label}
                    className="flex items-center gap-2 rounded-full bg-surface-800/80 px-3 py-1.5 text-xs font-medium text-surface-300 border border-surface-700/40 transition-colors duration-200 hover:border-accent-500/30 hover:text-accent-400 group/skill"
                  >
                    {skill.iconName && (
                      <StackIcon name={skill.iconName as any} className="h-3.5 w-3.5 " />
                    )}
                    {skill.label}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
