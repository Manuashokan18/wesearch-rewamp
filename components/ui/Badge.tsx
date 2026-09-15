import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-subtle ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;
