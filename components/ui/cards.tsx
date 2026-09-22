import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { cn } from "@/lib/utils";

export type ImageCardItem = {
  /** Photograph above the copy. Remote hosts must be allowed in next.config.ts. */
  image: string;
  /** Describes the photograph. Defaults to decorative, since the title carries the meaning. */
  imageAlt?: string;
  title: string;
  /** Short accent label, e.g. a category or a step number. */
  tag: string;
  /** Optional icon shown before the tag. */
  icon?: LucideIcon;
  description?: string;
};

type ImageCardsProps = {
  items: ImageCardItem[];
  /** Renders an ordered list, for sequences such as process steps. */
  ordered?: boolean;
  /** Merged over the grid classes, e.g. `lg:grid-cols-4` to change the column count. */
  className?: string;
  /** Reveals each card in a short stagger as the row scrolls into view, instead of rendering flat. */
  animated?: boolean;
  /** Which edge each card enters from, when `animated`. Defaults to a rise from below. */
  direction?: "bottom" | "left" | "right";
  /** How far each card travels into place, in pixels, when `animated`. */
  distance?: number;
};

/**
 * A row of photo-led cards: image, accent label, heading, one line of support.
 *
 * Adapted from the 21st.dev "cards" block. The source hard-coded a blog
 * listing and injected Poppins through a global `*` rule, which would have
 * re-fonted the entire site; this takes its items as data, uses the site's
 * type scale and palette, and swaps `<img>` for `next/image`. No state, so it
 * stays a Server Component.
 */
export function ImageCards({
  items,
  ordered = false,
  className,
  animated = false,
  direction,
  distance,
}: ImageCardsProps) {
  const List = ordered ? "ol" : "ul";

  return (
    <List className={cn("grid gap-8 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((item, index) => {
        const card = (
          <>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-tint">
              <Image
                src={item.image}
                alt={item.imageAlt ?? ""}
                fill
                sizes="(min-width: 1024px) 270px, (min-width: 640px) 45vw, 90vw"
                className="object-cover"
              />
            </div>

            <p className="mt-4 flex items-center gap-1.5 text-xs font-medium text-accent">
              {item.icon && <item.icon className="h-3.5 w-3.5" aria-hidden="true" />}
              {item.tag}
            </p>
            <h3 className="mt-1.5 text-card text-ink">{item.title}</h3>
            {item.description && (
              <p className="mt-1 text-sm leading-relaxed text-subtle">{item.description}</p>
            )}
          </>
        );

        return (
          <li
            key={item.title}
            className="transition duration-300 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            {animated ? (
              <AnimatedContainer
                delay={Math.min(index * 0.1, 0.4)}
                direction={direction}
                distance={distance}
              >
                {card}
              </AnimatedContainer>
            ) : (
              card
            )}
          </li>
        );
      })}
    </List>
  );
}

export default ImageCards;
