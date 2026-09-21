import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type FeatureItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type FeatureGridProps = {
  items: FeatureItem[];
  /** Columns from `lg` up. Below that the grid folds to two, then one. */
  columns?: 3 | 4;
  className?: string;
};

/**
 * A short set of points — icon, heading and one line of support — as
 * hairline-divided columns rather than cards, which reads lighter for four
 * items. The icon tile fills with the accent on hover, as the process cards do
 * elsewhere on the site, and a short accent rule draws in under the column.
 */
export function FeatureGrid({ items, columns = 4, className }: FeatureGridProps) {
  return (
    <ul
      className={cn(
        "grid gap-y-10 sm:grid-cols-2 lg:gap-y-0",
        columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
        className
      )}
    >
      {items.map((item, index) => (
        <li
          key={item.title}
          className={cn(
            "group relative px-0 sm:px-8 lg:first:pl-0 lg:last:pr-0",
            index > 0 && "lg:border-l lg:border-line"
          )}
        >
          <span className="flex size-12 items-center justify-center rounded-xl bg-tint text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
            <item.icon className="size-6" aria-hidden="true" />
          </span>
          <h3 className="mt-6 text-card text-ink">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-subtle">{item.description}</p>
          <span
            aria-hidden="true"
            className="absolute -bottom-5 left-0 h-0.5 w-0 rounded-full bg-accent transition-all duration-300 group-hover:w-12 sm:left-8 lg:group-first:left-0"
          />
        </li>
      ))}
    </ul>
  );
}

export default FeatureGrid;
