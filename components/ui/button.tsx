import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "solid" | "outlined" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  href?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  solid:
    "bg-accent-500 text-white hover:bg-accent-600 shadow-lg shadow-accent-500/20 hover:shadow-accent-500/30",
  outlined:
    "border border-surface-500 text-surface-200 hover:border-accent-400 hover:text-accent-400 bg-transparent",
  ghost:
    "text-surface-400 hover:text-surface-200 bg-transparent hover:bg-surface-800/50",
};

const sizeStyles: Record<"sm" | "md" | "lg", string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-3.5 text-base",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "solid", size = "md", href, children, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center gap-2 rounded-lg font-medium",
      "transition-all duration-300 ease-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-950",
      "cursor-pointer select-none",
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if (href) {
      return (
        <a href={href} className={classes} role="button" {...(props as any)}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
