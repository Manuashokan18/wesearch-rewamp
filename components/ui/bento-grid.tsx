import Image from "next/image";
import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type BentoItem = {
  /** Photograph behind the copy. Decorative — the heading carries the meaning. */
  image: string;
  title: string;
  /** Short label above the heading. */
  label: string;
  description: string;
  href: string;
  cta: string;
  icon: LucideIcon;
};

/**
 * Where each tile sits from `lg` up: wide, narrow / narrow, wide. Four tiles
 * fill a three-column, two-row grid with no gaps. Below `lg` they fall back to
 * two columns, then one.
 */
const span = [
  "lg:col-span-2",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-2",
] as const;

/**
 * An asymmetric bento of photo tiles, each with an icon badge, label, heading,
 * a line of support and a link.
 *
 * Built in the manner of the bento layouts in the 21st.dev catalogue (a grid of
 * mixed-width tiles with a hover lift) rather than from one source: those ship
 * with placeholder art and a hard-coded card set, so this takes its tiles as
 * data. The photograph eases in on hover; a navy scrim rises from the foot so
 * the copy keeps its contrast over any image. Server-rendered — hover is CSS.
 */
export function BentoGrid({ items, className }: { items: BentoItem[]; className?: string }) {
  return (
    <ul className={cn("grid gap-4 sm:grid-cols-2 lg:auto-rows-[21rem] lg:grid-cols-3", className)}>
      {items.map((item, index) => {
        const wide = index === 0 || index === items.length - 1;

        return (
          <li
            key={item.title}
            className={cn("min-h-[20rem]", span[index] ?? "lg:col-span-1")}
          >
            <article className="group relative isolate flex h-full min-h-[inherit] items-end overflow-hidden rounded-2xl bg-navy-deep shadow-xl shadow-navy/15">
              <Image
                src={item.image}
                alt=""
                fill
                sizes={
                  wide
                    ? "(min-width: 1024px) 760px, (min-width: 640px) 50vw, 100vw"
                    : "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                }
                className="-z-20 object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep from-10% via-navy-deep/70 via-50% to-navy-deep/10"
              />

              <span
                aria-hidden="true"
                className="absolute left-6 top-6 flex size-11 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-white/20 backdrop-blur"
              >
                <item.icon className="size-5" />
              </span>

              <div className="w-full p-6 sm:p-7">
                <p className="text-eyebrow text-accent-soft">{item.label}</p>
                <h3 className={cn("mt-2 text-white", wide ? "text-section" : "text-subsection")}>
                  {item.title}
                </h3>
                <p
                  className={cn(
                    "mt-2.5 text-sm leading-relaxed text-white/80",
                    wide ? "max-w-[46ch]" : "max-w-[34ch]"
                  )}
                >
                  {item.description}
                </p>
                <Link
                  href={item.href}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white after:absolute after:inset-0 after:content-['']"
                >
                  {item.cta}
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}

export default BentoGrid;
