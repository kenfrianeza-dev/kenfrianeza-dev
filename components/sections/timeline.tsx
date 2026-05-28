"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { timelineScrollReveal } from "@/lib/gsap/animations";
import Card, {
  CardHeader,
  CardTitle,
  CardBadge,
  CardDescription,
  CardTechStack,
} from "@/components/ui/card";
import { Briefcase, GraduationCap } from "lucide-react";
import { SectionHeader } from "@/components/sections/_components";
import type { TechTag } from "@/components/ui/card";

/* ─── Types ─── */

interface TimelineEntry {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: TechTag[];
  type: "work" | "education";
}

/* ─── Resume Data ─── */

const TIMELINE_DATA: TimelineEntry[] = [
  // ── Work Experience ──
  {
    year: "2024",
    title: "Software Developer",
    subtitle: "Ascendens Asia \nJuly 2024 – Present",
    description:
      "Reduced System Logs module load time from 10 minutes to 3 seconds for over 30 million log entries by optimizing SQL queries and implementing efficient pagination. Optimized student search queries across a 30,000–40,000 population. Deployed feature branches to UAT and Production environments. Configured and maintained AWS EC2, S3, CloudFront, and Route 53 infrastructure. Built complex SQL queries for automated CSV reporting.",
    technologies: [
      { label: "Angular", iconName: "angular17" },
      { label: "GraphQL", iconName: "graphql" },
      { label: "MySQL", iconName: "mysql" },
      { label: "Laravel", iconName: "laravel" },
      { label: "Docker", iconName: "docker" },
      { label: "AWS", iconName: "aws" },
      { label: "Linux", iconName: "linux" }
    ],
    type: "work",
  },
  {
    year: "2023",
    title: "Web Developer (Part-time)",
    subtitle: "FindX Solutions PH \nMar 2023 – Sep 2023",
    description:
      "Developed a responsive landing page with modern UI/UX using Next.js and TailwindCSS. Built a dynamic product catalog with category-based filtering and interactive \"Request a Quote\" functionality. Implemented SEO-friendly practices, clean URL routing, and API routes for product retrieval and quote submissions.",
    technologies: [
      { label: "Next.js", iconName: "nextjs2" },
      { label: "TailwindCSS", iconName: "tailwindcss" },
      { label: "Figma", iconName: "figma" },
      { label: "REST APIs" }
    ],
    type: "work",
  },

  // ── Education ──
  {
    year: "2024",
    title: "BS Computer Engineering",
    subtitle: "Bestlink College of the Philippines \n2019 – 2024",
    description:
      "Completed a comprehensive engineering program covering software development, digital systems, and computer architecture. Focused on full-stack web development and database systems as core specializations.",
    technologies: [],
    type: "education",
  },
  {
    year: "2019",
    title: "Information Communication Technology",
    subtitle: "New Era University (Senior High School) \n2017 – 2019",
    description:
      "Built foundational knowledge in programming, networking, and information systems. Developed early proficiency in web technologies and database fundamentals.",
    technologies: [],
    type: "education",
  },
];

/* ─── Component ─── */

export default function Timeline() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (containerRef.current) {
        timelineScrollReveal(containerRef.current);
      }
    },
    { scope: containerRef }
  );

  // Split data by type for section labels
  const workEntries = TIMELINE_DATA.filter((e) => e.type === "work");
  const educationEntries = TIMELINE_DATA.filter((e) => e.type === "education");

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative bg-surface-950 py-24 px-6 md:px-12 lg:px-24"
    >
      {/* Section header */}
      <SectionHeader
        label="Architecture History"
        title="Experience & Education"
        subTitle="A timeline of roles and milestones where I focused on clean architecture, performance optimization and engineering."
      />

      {/* Timeline */}
      <div className="relative mx-auto max-w-3xl">
        {/* Vertical line */}
        <div
          data-timeline="line"
          className="timeline-line absolute left-[24px] top-0 bottom-0 w-px origin-top md:left-1/2 md:-translate-x-1/2"
        />

        {/* ── Work Experience ── */}
        <TimelineSegmentLabel icon={Briefcase} label="Work Experience" />

        <div className="space-y-12 md:space-y-16">
          {workEntries.map((entry, index) => (
            <TimelineItem key={entry.title} entry={entry} index={index} />
          ))}
        </div>

        {/* ── Education ── */}
        <div id="education" className="scroll-mt-24">
          <TimelineSegmentLabel icon={GraduationCap} label="Education" className="mt-20" />

          <div className="space-y-12 md:space-y-16">
            {educationEntries.map((entry, index) => (
              <TimelineItem
                key={entry.title}
                entry={entry}
                index={index + workEntries.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Timeline Item ─── */

function TimelineItem({
  entry,
  index,
}: {
  entry: TimelineEntry;
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <div className="relative flex items-start gap-6 md:gap-0">
      {/* Node dot */}
      <div
        data-timeline="node"
        className={`
          timeline-node relative z-10 mt-1.5 flex h-12 w-12 shrink-0 items-center justify-center
          rounded-full border-2 bg-surface-950
          md:absolute md:left-1/2 md:-ml-6
          ${entry.type === "education" ? "border-accent-300" : "border-accent-500"}
        `}
      >
        <span
          className={`text-xs font-bold ${
            entry.type === "education" ? "text-accent-300" : "text-accent-400"
          }`}
        >
          {entry.year}
        </span>
      </div>

      {/* Card — alternating sides on desktop */}
      <div
        data-timeline="card"
        className={`
          flex-1 min-w-0 opacity-0
          md:flex-none md:w-[calc(50%-40px)]
          ${isEven ? "md:mr-auto md:pr-4" : "md:ml-auto md:pl-4"}
        `}
      >
        <Card>
          <CardHeader>
            <div className="min-w-0">
              <CardTitle className="wrap-break-word">{entry.title}</CardTitle>
              <p className="mt-1 text-sm text-surface-500 whitespace-pre-wrap wrap-break-word">{entry.subtitle}</p>
            </div>
            <CardBadge className="shrink-0">{entry.year}</CardBadge>
          </CardHeader>
          <CardDescription className="wrap-break-word">{entry.description}</CardDescription>
          {entry.technologies.length > 0 && (
            <CardTechStack technologies={entry.technologies} />
          )}
        </Card>
      </div>
    </div>
  );
}

/* ─── Segment Label ─── */

function TimelineSegmentLabel({
  icon: Icon,
  label,
  className,
}: {
  icon: typeof Briefcase;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`relative z-10 mb-12 flex justify-center ${className ?? ""}`}
    >
      <div className="flex items-center gap-3 bg-surface-950 px-4 py-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-500/10 border border-accent-500/20">
          <Icon className="h-4 w-4 text-accent-400" />
        </span>
        <span className="text-sm font-semibold uppercase tracking-widest text-surface-400">
          {label}
        </span>
      </div>
    </div>
  );
}
