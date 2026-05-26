"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
] as const;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    const handleCloseMenu = () => setMobileOpen(false);
    window.addEventListener("closeMobileMenu", handleCloseMenu);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("closeMobileMenu", handleCloseMenu);
    };
  }, []);

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-surface-950/60 backdrop-blur-sm transition-all duration-300 md:hidden",
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      <header
        className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-surface-950/70 backdrop-blur-xl border-b border-surface-800/50 shadow-lg shadow-black/10"
          : mobileOpen
            ? "bg-surface-950/70 backdrop-blur-xl border-b border-surface-800/50 shadow-lg shadow-black/10 md:bg-transparent md:backdrop-blur-none md:border-transparent md:shadow-none"
            : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        {/* Logo */}
        <a
          href="#hero"
          onClick={() => setMobileOpen(false)}
          className="group flex items-center gap-1.5 text-xl font-bold tracking-tight text-surface-50 transition-colors duration-200"
        >
          <span className="relative flex h-1.5 w-1.5 transition-transform duration-300 group-hover:-translate-x-1 translate-y-[-5.5px]">
            {/* Animated Wiring - Top Left */}
            <span className="absolute top-1/2 right-1/2 h-px w-0 -translate-y-1/4 bg-accent-500 transition-all duration-500 ease-out group-hover:w-4 opacity-0 group-hover:opacity-100"></span>
            <span className="absolute bottom-1/2 left-1/2 w-px h-0 -translate-x-1/4 bg-accent-500 transition-all duration-500 ease-out group-hover:h-3 opacity-0 group-hover:opacity-100"></span>
            
            <span className="absolute inline-flex h-full w-full animate-ping bg-accent-500 opacity-75"></span>
            <span className="relative inline-flex h-1.5 w-1.5 bg-accent-500"></span>
          </span>
          <span className="transition-all duration-300 group-hover:text-white group-hover:[text-shadow:0_0_15px_var(--color-accent-500)]">
            KEN
          </span>
          <span className="relative flex h-1.5 w-1.5 transition-transform duration-300 group-hover:translate-x-1 translate-y-[5.5px]">
            {/* Animated Wiring - Bottom Right */}
            <span className="absolute top-1/2 left-1/2 h-px w-0 -translate-y-1/4 bg-accent-500 transition-all duration-500 ease-out group-hover:w-4 opacity-0 group-hover:opacity-100"></span>
            <span className="absolute top-1/2 left-1/2 w-px h-0 -translate-x-1/4 bg-accent-500 transition-all duration-500 ease-out group-hover:h-3 opacity-0 group-hover:opacity-100"></span>

            <span className="absolute inline-flex h-full w-full animate-ping bg-accent-500 opacity-75"></span>
            <span className="relative inline-flex h-1.5 w-1.5 bg-accent-500"></span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "relative px-4 py-2 text-sm font-medium text-surface-400 transition-colors duration-200",
                "hover:text-surface-50",
                "after:absolute after:bottom-0.5 after:left-1/2 after:h-px after:w-0 after:bg-accent-500",
                "after:transition-all after:duration-300 after:-translate-x-1/2",
                "hover:after:w-3/5"
              )}
            >
              {link.label}
            </a>  
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden cursor-pointer"
          aria-label="Toggle menu"
        >
          <span
            className={cn(
              "block h-px w-5 bg-surface-200 transition-all duration-300 origin-center",
              mobileOpen && "rotate-45 translate-y-[3.5px]"
            )}
          />
          <span
            className={cn(
              "block h-px w-5 bg-surface-200 transition-all duration-300 origin-center",
              mobileOpen && "-rotate-45 translate-y-[-3.5px]"
            )}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 md:hidden",
          mobileOpen ? "max-h-60 border-b border-surface-800/50" : "max-h-0"
        )}
      >
        <nav className="flex flex-col gap-1 px-6 pb-4 bg-surface-950/90 backdrop-blur-xl">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-2.5 text-sm font-medium text-surface-400 transition-colors duration-200 hover:text-surface-50"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
    </>
  );
}
