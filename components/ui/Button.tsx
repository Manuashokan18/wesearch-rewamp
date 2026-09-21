import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "outlineInverse"
  | "solidLight"
  | "softInverse";
type ButtonSize = "sm" | "md";

type ButtonProps = {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-accent text-accent-foreground hover:bg-accent/90",
  secondary: "bg-ink text-white hover:bg-ink/90",
  outline: "border border-line text-ink hover:bg-muted",
  outlineInverse: "border border-white/30 text-white hover:bg-white/10",
  // The paired solid/soft treatment used on the dark hero.
  solidLight: "bg-white text-navy hover:bg-white/90",
  softInverse: "bg-white/10 text-white hover:bg-white/20",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5",
  md: "px-6 py-3",
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  children,
}: ButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

export default Button;
