import type { LucideIcon } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { cn } from "@/lib/utils";

export type GlowCardItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Four reasons as wide cards in a two-by-two grid, for a navy band. Each has a
 * glowing icon and a hairline ring of light (`beam-card`, in globals.css) that
 * rests as a faint arc and travels around the edge while the card is hovered.
 *
 * After the "Border Beam" and "Glowing Effect" cards in the 21st.dev
 * catalogue, written as a few lines of CSS rather than a component: the beam
 * is a masked conic gradient whose angle is animated, so the cards stay
 * Server Components (the spotlight wrapper aside). Without `@property` support
 * or under reduced motion the ring simply stays still.
 */
export function GlowCards({ items, className }: { items: GlowCardItem[]; className?: string }) {
  return (
    <ul className={cn("grid gap-5 md:grid-cols-2", className)}>
      {items.map((item, index) => (
        <li key={item.title}>
          <SpotlightCard
            tone="dark"
            className="beam-card flex h-full items-start gap-5 rounded-3xl border-white/[0.06] p-7 sm:gap-6 sm:p-9"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-7 top-6 select-none text-5xl font-bold leading-none text-white/[0.07] transition-colors duration-500 group-hover:text-accent-soft/20"
            >
              {pad(index + 1)}
            </span>

            <span className="relative flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-soft text-white shadow-lg shadow-accent/30 ring-1 ring-inset ring-white/25 transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
              <item.icon className="size-7" aria-hidden="true" />
            </span>

            <div className="relative">
              <h3 className="text-subsection text-white">{item.title}</h3>
              <p className="mt-2 max-w-[38ch] leading-relaxed text-white/70">{item.description}</p>
            </div>
          </SpotlightCard>
        </li>
      ))}
    </ul>
  );
}

export default GlowCards;
