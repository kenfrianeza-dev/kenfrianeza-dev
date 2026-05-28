"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "@/components/sections/_components";
import { ProjectCard } from "@/components/sections/_components";
import type { ProjectType } from "@/components/sections/_components/project-card";
import { LayoutTemplate, Database, Smartphone } from "lucide-react";
import { dotsParallax } from "@/lib/gsap/animations";
import StarBorder from "@/components/ui/star-border";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS: ProjectType[] = [
  {
    id: "proj-1",
    title: "DTR Generator for Maclang",
    description: "A modern, dynamic web application designed to encode Daily Time Records (DTR) and generate perfectly formatted Excel reports matching the Civil Service Form No. 48 standard. Built specifically for the needs of Maclang Hospital.",
    image: "/dtr-generator-for-maclang-preview.png",
    icon: LayoutTemplate,
    tags: [
      { label: "React.js", iconName: "react" },
      { label: "TypeScript", iconName: "typescript" },
      { label: "Vite", iconName: "vitejs" },
      { label: "Tailwind CSS", iconName: "tailwindcss" },
      { label: "ExcelJS" },
      { label: "Shadcn UI", iconName: "shadcnui" },
      { label: "React Hook Form" }
    ],
    liveUrl: "https://dtr-generator-for-maclang.vercel.app/",
    githubUrl: "https://github.com/kenfrianeza-dev/dtr-generator-for-maclang",
    status: "done",
  },
  {
    id: "proj-2",
    title: "Next Prisma Postgres Template",
    description: "A modern, production-ready boilerplate for building full-stack web applications with Next.js, Prisma ORM, and PostgreSQL. Includes authentication, role-based access control, and a polished UI with shadcn/ui components.",
    image: "/nextjs-prisma-postgres-boilerplate-preview.png",
    icon: Database,
    tags: [
      { label: "Next.js", iconName: "nextjs2" },
      { label: "TypeScript", iconName: "typescript" },
      { label: "Prisma", iconName: "prisma" },
      { label: "PostgreSQL", iconName: "postgresql" },
      { label: "Docker", iconName: "docker" },
      { label: "Vite", iconName: "vitejs" },
      { label: "Tailwind CSS", iconName: "tailwindcss" },
      { label: "Shadcn UI", iconName: "shadcnui" }
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/kenfrianeza-dev/nextjs-prisma-postgres-boilerplate",
    status: "in progress",
  },
  {
    id: "proj-3",
    title: "Android Settings UI",
    description: "A modern frontend showcase replicating the Android settings interface to demonstrate advanced UI development skills. Built entirely with React and Tailwind CSS, this project highlights pixel-perfect attention to native design patterns, responsive layouts, and modern aesthetics.",
    image: "/android-settings-ui-preview.png",
    icon: Smartphone,
    tags: [
      { label: "React.js", iconName: "react" },
      { label: "Vite", iconName: "vitejs" },
      { label: "Tailwind CSS", iconName: "tailwindcss" },
    ],
    liveUrl: "https://ken-frianeza-android-settings-ui.vercel.app/",
    githubUrl: "https://github.com/kenfrianeza-dev/android-settings-ui",
    status: "done",
  }
];

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Reveal section heading
      gsap.fromTo(
        containerRef.current.querySelector("[data-projects='heading']"),
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

      // Stagger project cards
      gsap.fromTo(
        containerRef.current.querySelectorAll("[data-projects='card']"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
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
      id="projects"
      ref={containerRef}
      className="relative bg-surface-950 py-24 px-6 md:px-12 lg:px-24"
    >
      {/* Section heading */}
      <div data-projects="heading">
        <SectionHeader
          label="Portfolio"
          title="Featured Projects"
          subTitle="A selection of recent work highlighting my technical skills and problem-solving approach."
        />
      </div>

      {/* Projects Grid */}
      <div className="relative mx-auto mt-12 grid max-w-6xl gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 z-10">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      <div className="text-center mt-12 flex justify-center">
        <StarBorder as="div" color="var(--color-accent-500)" speed="5s" className="text-muted-foreground font-semibold">
          Cooking up more projects 🔥 ...
        </StarBorder>
      </div>
    </section>
  );
}