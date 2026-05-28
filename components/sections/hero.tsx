"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { heroEntrance, dotsParallax } from "@/lib/gsap/animations";
import {
  ArrowDown,
  ArrowRight,
  FileText,
  Layers,
  Database,
  Globe,
  Terminal,
  Plus,
} from "lucide-react";
import Link from "next/link";
import RippleGrid from "@/components/ui/ripple-grid";
import Threads from "../ui/threads";
import DarkVeil from "../ui/dark-veil";

const TECH_STACK = [
  { label: "React", iconName: "react" },
  { label: "Next.js", iconName: "nextjs2" },
  { label: "Node.js", iconName: "nodejs" },
  { label: "Laravel", iconName: "laravel" },
  { label: "Python", iconName: "python" },
  { label: "PostgreSQL", iconName: "postgresql" },
];

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (containerRef.current) {
        heroEntrance(containerRef.current);
        dotsParallax(containerRef.current);
      }
    },
    { scope: containerRef }
  );

  const RenderBackground = ({ variant = 'dark-veil' } : { variant?: 'dark-veil' | 'ripple-grid' | 'threads' }) => {
    switch (variant) {
      case "dark-veil":
        return (
          <DarkVeil
            speed={0.85}
            hueShift={360}
            noiseIntensity={0}
            scanlineFrequency={0}
            scanlineIntensity={0}
            warpAmount={2}
          />
        )
      case "ripple-grid":
        return (
          <>
            <RippleGrid
              enableRainbow={false}
              gridColor="#60A5FA"
              rippleIntensity={0.03}
              gridSize={10}
              gridThickness={100}
              gridRotation={0}
              mouseInteraction={true}
              mouseInteractionRadius={1.7}
              opacity={0.2}
              glowIntensity={0.05}
              fadeDistance={3}
              vignetteStrength={5}
            />
            <RippleGrid
              enableRainbow={false}
              gridColor="#60A5FA"
              rippleIntensity={0.03}
              gridSize={7}
              gridThickness={100}
              gridRotation={45}
              mouseInteraction={true}
              mouseInteractionRadius={2}
              opacity={0.2}
              glowIntensity={0.05}
              fadeDistance={10}
              vignetteStrength={5}
            />
          </>
        )
      case "threads":
        return (
          <Threads
            color={[1, 1, 1]}
            amplitude={1}
            distance={1.5}
            enableMouseInteraction={true}
          />
        )
    }
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-surface-950 px-6 md:px-12 lg:px-24"
    >
      {/* Interactive RippleGrid background */}
      <div className="absolute inset-0 pointer-events-auto">
        <RenderBackground variant="ripple-grid" />
      </div>

      {/* Bottom gradient transition */}
      <div className="absolute bottom-0 left-0 right-0 z-0 h-48 bg-linear-to-t from-surface-950 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div data-hero="badge" className="mb-8 inline-flex items-center gap-2 rounded-full border border-surface-700 bg-surface-900/50 px-4 py-2 text-sm text-surface-400 opacity-0">
          <span className="h-2 w-2 rounded-full bg-accent-500 animate-pulse" />
          <span className="text-accent-500">Available</span> for new opportunities
        </div>

        {/* Headline */}
        <h1
          data-hero="headline"
          className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-surface-50 sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ perspective: "600px" }}
        >
          <>
            <span className="word inline-block opacity-0">I Build</span>{" "}
            <span className="word inline-block text-accent-400 opacity-0">
              Systems
            </span>{" "}
            <br className="hidden sm:block" />
            <span className="word inline-block text-surface-400 font-light opacity-0">
              That Make a
            </span>{" "}
            <span className="word inline-block opacity-0">Real-World Impact</span>{" "}
          </>
        </h1>

        {/* Sub-headline */}

        <p
          data-hero="subheadline"
          className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-surface-400 opacity-0 md:text-xl"
        >
          I value clean architecture, maintainable code and systems that don&apos;t just work — but continue to scale and support real users over time.
        </p>

        {/* CTA Buttons */}
        <div className="mb-14 flex flex-col items-center justify-center gap-4">
          {/* ── Unique Resume Button (Dead Center) ── */}
          <Link
            data-hero="cta"
            href="/cv-updated-2-6-26_compressed.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="resume-btn group inline-flex items-center gap-3 rounded-xl border border-surface-700/60 bg-surface-900 px-7 py-3.5 text-sm font-semibold text-surface-200 opacity-0 transition-colors duration-300 hover:text-accent-400 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
          >
            {/* Decorations Wrapper (prevents empty space/gap issues in flex) */}
            <span className="absolute inset-0 pointer-events-none">
              <span className="corner-bracket tl" />
              <span className="corner-bracket tr" />
              <span className="corner-bracket bl" />
              <span className="corner-bracket br" />
              <span className="resume-btn-sweep" />
            </span>

            {/* Icon with glow ring */}
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-500/10 border border-accent-500/20 transition-all duration-300 group-hover:bg-accent-500/20 group-hover:shadow-[0_0_12px_rgba(59,130,246,0.2)]">
              <FileText className="h-4 w-4 text-accent-400" />
            </span>

            {/* Label stack */}
            <span className="flex flex-col items-center leading-none">
              <span className="text-[13px] font-semibold tracking-wide">
                View Resume
              </span>
              <span className="mt-1 font-mono text-[10px] text-surface-500 tracking-wider transition-colors duration-300 group-hover:text-surface-400">
                ~/resume.pdf
              </span>
            </span>

            {/* Arrow that slides on hover */}
            <ArrowRight className="ml-1 h-4 w-4 text-surface-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent-400" />
          </Link>
        </div>

        {/* Tech Stack Pills */}
        {/* <div className="flex flex-wrap items-center justify-center gap-3">
          {TECH_STACK.map(({ label, iconName }) => (
            <span
              key={label}
              data-hero="tech"
              className="inline-flex items-center gap-2 rounded-full border border-surface-700/50 bg-surface-900/60 px-4 py-2 text-sm font-medium text-surface-300 opacity-0 backdrop-blur-sm transition-colors duration-200 hover:border-accent-500/30 hover:text-accent-400"
            >
              <StackIcon name={iconName as any} className="h-4 w-4" />
              {label}
            </span>
          ))}
        </div> */}
      </div>

      {/* Scroll indicator */}
      <div
        data-hero="scroll"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-surface-500 opacity-0"
      >
        <span className="text-xs font-medium uppercase tracking-widest">
          Scroll
        </span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </div>
    </section>
  );
}
