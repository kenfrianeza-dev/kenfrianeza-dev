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

gsap.registerPlugin(ScrollTrigger);

const PROJECTS: ProjectType[] = [
  {
    id: "proj-1",
    title: "DTR Generator for Maclang",
    description: "A modern, dynamic web application designed to encode Daily Time Records (DTR) and generate perfectly formatted Excel reports matching the Civil Service Form No. 48 standard. Built specifically for the needs of Maclang Hospital.",
    image: "/dtr-generator-for-maclang-preview.png",
    icon: LayoutTemplate,
    tags: [
      { label: "React 19", iconName: "react" },
      { label: "TypeScript", iconName: "typescript" },
      { label: "Vite", iconName: "vitejs" },
      { label: "Tailwind CSS v4", iconName: "tailwindcss" },
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
    description: "A scalable authentication microservice with OAuth2, multi-tenant support, and biometric integration.",
    image: "/nextjs-prisma-postgres-boilerplate-preview.png",
    icon: Database,
    tags: [
      { label: "Node.js", iconName: "nodejs" },
      { label: "Express", iconName: "expressjs" },
      { label: "Redis", iconName: "redis" },
      { label: "Docker", iconName: "docker" }
    ],
    liveUrl: "#",
    githubUrl: "#",
    status: "in progress",
  },
  {
    id: "proj-3",
    title: "Aura Mobile App",
    description: "A cross-platform mobile application for mental health tracking with AI-driven insights and journaling.",
    icon: Smartphone,
    tags: [
      { label: "React Native", iconName: "react" },
      { label: "Expo", iconName: "expo" },
      { label: "GraphQL", iconName: "graphql" },
      { label: "Firebase", iconName: "firebase" }
    ],
    liveUrl: "#",
    githubUrl: "#",
    status: "in progress",
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
      <div className="relative mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3 z-10">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}