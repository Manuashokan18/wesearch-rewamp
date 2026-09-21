import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { cn } from "@/lib/utils";

export type WhyBentoItem = {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Photograph for a photo tile. The first and last items are the photo tiles. */
  image?: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Four reasons as a checkerboard bento for a navy band: the first and last are
 * wide photograph tiles, the two between are quiet glass tiles, so the grid
 * reads photo · glass / glass · photo. On a phone they stack; on a tablet the
 * photo tiles span both columns.
 *
 * Built in the manner of the bento layouts in the 21st.dev catalogue — mixed
 * tiles on one grid — taking its tiles as data. A glass tile uses the site's
 * pointer spotlight; a photo tile eases its picture in on hover under a navy
 * scrim that keeps the copy legible.
 */
export function WhyBento({ items, className }: { items: WhyBentoItem[]; className?: string }) {
  const last = items.length - 1;

  return (
    <ul className={cn("grid gap-4 sm:grid-cols-2 lg:auto-rows-[17rem] lg:grid-cols-3", className)}>
      {items.map((item, index) => {
        const isPhoto = Boolean(item.image) && (index === 0 || index === last);

        return (
          <li
            key={item.title}
            className={cn("min-h-[16rem]", isPhoto && "sm:col-span-2 lg:col-span-2")}
          >
            {isPhoto && item.image ? (
              <article className="group relative isolate flex h-full min-h-[inherit] items-end overflow-hidden rounded-2xl bg-navy-deep ring-1 ring-white/10">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 720px, 100vw"
                  className="-z-20 object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep from-8% via-navy-deep/65 via-50% to-navy-deep/15"
                />

                <span
                  aria-hidden="true"
                  className="absolute left-6 top-6 flex size-11 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-white/20 backdrop-blur"
                >
                  <item.icon className="size-5" />
                </span>
                <span
                  aria-hidden="true"
                  className="absolute right-6 top-5 select-none text-4xl font-bold leading-none text-white/30"
                >
                  {pad(index + 1)}
                </span>

                <div className="w-full p-6 sm:p-8">
                  <h3 className="text-section text-white">{item.title}</h3>
                  <p className="mt-2.5 max-w-[42ch] text-white/80">{item.description}</p>
                </div>
              </article>
            ) : (
              <SpotlightCard tone="dark" className="flex h-full min-h-[inherit] flex-col p-7">
                {/* Two thin rings behind the corner, drawn for depth. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-14 -top-14 size-44 rounded-full border border-white/[0.07]"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full border border-white/[0.05]"
                />

                <div className="relative flex items-start justify-between">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-white/10 text-accent-soft ring-1 ring-inset ring-white/15 transition-colors duration-300 group-hover:bg-accent group-hover:text-white motion-reduce:transition-none">
                    <item.icon className="size-6" aria-hidden="true" />
                  </span>
                  <span
                    aria-hidden="true"
                    className="select-none text-4xl font-bold leading-none text-white/15 transition-colors duration-300 group-hover:text-accent-soft/40 motion-reduce:transition-none"
                  >
                    {pad(index + 1)}
                  </span>
                </div>

                <div className="relative mt-auto pt-8">
                  <h3 className="text-subsection text-white">{item.title}</h3>
                  <p className="mt-2 max-w-[30ch] text-sm leading-relaxed text-white/70">
                    {item.description}
                  </p>
                </div>
              </SpotlightCard>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default WhyBento;
