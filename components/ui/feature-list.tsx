import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type FeatureListItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The items as an editorial index: one hairline-ruled row each, with the
 * number, an icon, the heading set large and the copy beside it. Hovering a
 * row washes it with the tint colour, draws an accent rule down its edge and
 * fills its icon.
 *
 * Follows the "interactive list" pattern in the 21st.dev catalogue — a
 * typographic list that lights the row under the pointer — without the image
 * preview, which these short capability lists have no use for. Rows are not
 * links, so there is no arrow to suggest they are. A phone folds the copy
 * under the heading and drops the number. Pure CSS, so a Server Component.
 */
export function FeatureList({
  items,
  className,
}: {
  items: FeatureListItem[];
  className?: string;
}) {
  return (
    <ol className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item, index) => (
        <li key={item.title} className="group relative">
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-0.5 origin-center scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100 motion-reduce:transition-none"
          />
          <div
            className={cn(
              "grid items-center gap-x-6 gap-y-2 px-1 py-6 transition-colors duration-300 group-hover:bg-tint/60 motion-reduce:transition-none",
              "sm:px-6 md:grid-cols-[2.5rem_minmax(0,1.05fr)_minmax(0,1fr)] md:gap-x-8 md:py-8"
            )}
          >
            <span
              aria-hidden="true"
              className="hidden text-sm font-semibold tabular-nums text-subtle transition-colors duration-300 group-hover:text-accent md:block"
            >
              {pad(index + 1)}
            </span>

            <div className="flex items-center gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-tint text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white motion-reduce:transition-none">
                <item.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="text-subsection text-ink sm:text-2xl">{item.title}</h3>
            </div>

            <p className="text-subtle md:max-w-[40ch]">{item.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default FeatureList;
