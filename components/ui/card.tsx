import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import StackIcon from "tech-stack-icons";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-surface-200/15 bg-surface-900/60 backdrop-blur-sm",
        "p-6 transition-all duration-300",
        "hover:border-accent-500/30 hover:bg-surface-800/60",
        "hover:shadow-lg hover:shadow-accent-500/5",
        className
      )}
    >
      {children}
    </div>
  );
}

/* ─── Sub-components for clean internal hierarchy ─── */

export function CardHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-3 flex items-start justify-between gap-4", className)}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "text-lg font-semibold text-surface-50 leading-snug",
        className
      )}
    >
      {children}
    </h3>
  );
}

export function CardBadge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-accent-500/10 px-2.5 py-1 text-xs font-medium text-accent-400",
        "border border-accent-500/20",
        className
      )}
    >
      {children}
    </span>
  );
}

export function CardDescription({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-sm leading-relaxed text-surface-400", className)}>
      {children}
    </p>
  );
}

export interface TechTag {
  label: string;
  iconName?: string;
}

export function CardTechStack({
  technologies,
  className,
}: {
  technologies: TechTag[];
  className?: string;
}) {
  return (
    <div className={cn("mt-4 flex flex-wrap gap-2", className)}>
      {technologies.map((tech) => (
        <span
          key={tech.label}
          className="flex items-center gap-1.5 rounded-full bg-surface-800 px-2.5 py-1 text-[11px] font-medium text-surface-300 border border-surface-700/50 group/tag transition-colors duration-200 hover:border-accent-500/30 hover:text-accent-400"
        >
          {tech.iconName && (
            <StackIcon name={tech.iconName as any} className="h-3 w-3" />
          )}
          {tech.label}
        </span>
      ))}
    </div>
  );
}
