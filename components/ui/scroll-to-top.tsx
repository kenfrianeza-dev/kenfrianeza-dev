"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    // Alternatively you can target the hero section:
    // document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    window.dispatchEvent(new Event("closeMobileMenu"));
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={cn(
        "fixed bottom-8 right-8 z-50 group flex h-14 w-14 items-center justify-center rounded-full overflow-hidden transition-all duration-500",
        "bg-surface-900/60 backdrop-blur-md border border-surface-700/50 shadow-lg shadow-black/20",
        "hover:border-accent-500/50 hover:bg-surface-800/80 hover:shadow-accent-500/20 cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-950",
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-16 opacity-0 pointer-events-none"
      )}
    >
      {/* Decorative gradient aura that appears on hover */}
      <div className="absolute inset-0 rounded-full bg-linear-to-b from-accent-500/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      {/* The Arrow icon container for the fly-up animation */}
      <div className="relative flex h-full w-full items-center justify-center">
        {/* Main arrow - moves up and fades out on hover */}
        <ArrowUp className="absolute h-6 w-6 text-surface-200 transition-all duration-300 ease-in-out group-hover:-translate-y-6 group-hover:opacity-0 group-hover:text-accent-400" />
        
        {/* Secondary arrow - comes from bottom and replaces the main arrow on hover */}
        <ArrowUp className="absolute h-6 w-6 text-accent-400 translate-y-6 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100" />
      </div>
    </button>
  );
}
