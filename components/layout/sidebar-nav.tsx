"use client";

import { useState, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { setupScrollSpy } from "@/lib/gsap/animations";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

export default function SidebarNav() {
  const [activeSection, setActiveSection] = useState<string>("hero");

  const handleActiveChange = useCallback((id: string) => {
    setActiveSection(id);
  }, []);

  useGSAP(() => {
    setupScrollSpy(
      NAV_ITEMS.map((item) => item.id),
      handleActiveChange
    );
  });



  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    gsap.fromTo(
      e.currentTarget,
      { scale: 0.3 },
      { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.4)" }
    );
  };

  return (
    <div>
      <nav
        className="fixed left-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-5 lg:flex"
        aria-label="Section navigation"
      >
        {/* Vertical progress line behind squares */}
        <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-surface-800" />

        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-label={`Navigate to ${item.label}`}
              className="group relative z-10 flex items-center"
            >
              {/* Outer container for Active Scale (Tailwind) */}
              <div
                className={cn(
                  "relative flex items-center justify-center transition-all duration-300",
                  isActive ? "scale-150" : "scale-100"
                )}
              >
                {isActive && (
                  <span className="absolute h-full w-full animate-ping rounded-[2px] bg-accent-500 opacity-75" />
                )}
                {/* Inner animated Square (GSAP) */}
                <span
                  onClick={handleClick}
                  className={cn(
                    "relative block h-2.5 w-2.5 rounded-[2px] border-2 transition-colors duration-300",
                    isActive
                      ? "border-accent-500 bg-accent-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                      : "border-surface-600 bg-surface-950 group-hover:border-surface-400"
                  )}
                />
              </div>

              {/* Label tooltip */}
              <span
                className={cn(
                  "absolute left-6 whitespace-nowrap rounded-md bg-surface-800 px-3 py-1.5 text-xs font-medium text-surface-200",
                  "opacity-0 scale-95 transition-all duration-200 pointer-events-none",
                  "group-hover:opacity-100 group-hover:scale-100"
                )}
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
