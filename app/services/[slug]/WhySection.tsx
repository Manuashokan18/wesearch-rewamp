import type { LucideIcon } from "lucide-react";
import { CardGrid } from "@/components/sections/CardGrid";
import { Eyebrow } from "@/components/sections/SectionIntro";
import { InteractiveTravelCard } from "@/components/ui/3d-card";
import { GlowCards } from "@/components/ui/glow-cards";
import { ImageAccordion } from "@/components/ui/image-accordion";
import { WhyBento } from "@/components/ui/why-bento";
import { WhyShowcase } from "@/components/ui/why-showcase";
import { companyStats } from "@/lib/data/company";
import type { ServiceDetailPage } from "@/lib/data/services";
import { Highlighted } from "./parts";

/**
 * Why choose WeSearch: the header and the company figures on a navy band, then
 * the reasons in whichever presentation the page picks (see `WhyStyle`) —
 * tilting photo cards, a photo that follows a list, a checkerboard bento,
 * a photo accordion, or glowing cards for a page with no photographs to spare.
 */
export function WhySection({ page }: { page: ServiceDetailPage }) {
  const { whyWeSearch } = page;

  return (
    <section id="why-wesearch" className="relative scroll-mt-20 overflow-hidden bg-navy text-white">
      <div
        className="pointer-events-none absolute -left-40 -top-40 size-[34rem] rounded-full bg-accent/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:22px_22px] opacity-15"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
          <div>
            <Eyebrow>{whyWeSearch.eyebrow}</Eyebrow>
            <h2 className="text-section-lg">
              <Highlighted
                text={whyWeSearch.title}
                highlight={whyWeSearch.highlight}
                className="text-accent-soft"
              />
            </h2>
            <p className="mt-4 max-w-lg text-white/70">{whyWeSearch.subtitle}</p>
          </div>

          <dl className="grid grid-cols-3 gap-6 sm:gap-10">
            {companyStats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <dt className="mt-1 text-sm text-white/60">{stat.label}</dt>
                <dd className="order-first text-2xl font-bold text-accent-soft sm:text-4xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-14">
          <WhyReasons page={page} />
        </div>
      </div>
    </section>
  );
}

/** The reasons themselves, in whichever of the five presentations the page picks. */
function WhyReasons({ page }: { page: ServiceDetailPage }) {
  const { hero, whyWeSearch } = page;
  const icon = (Icon: LucideIcon) => <Icon className="size-5" aria-hidden="true" />;

  switch (whyWeSearch.style) {
    case "photo":
      return (
        <CardGrid
          items={whyWeSearch.items}
          keyExtractor={(item) => item.title}
          columns={4}
          renderItem={(item) => (
            <div className="perspective-[1000px]">
              <InteractiveTravelCard
                title={item.title}
                subtitle={item.description}
                imageUrl={item.image ?? hero.image.src}
                icon={<item.icon className="h-5 w-5" />}
                className="h-[24rem] w-full border-white/10 bg-white/5 shadow-black/30"
              />
            </div>
          )}
        />
      );

    case "showcase":
      return (
        <WhyShowcase
          items={whyWeSearch.items.map((item) => ({
            image: item.image ?? hero.image.src,
            title: item.title,
            description: item.description,
            icon: icon(item.icon),
          }))}
        />
      );

    case "accordion":
      return (
        <ImageAccordion
          className="lg:h-[30rem]"
          items={whyWeSearch.items.map((item) => ({
            image: item.image ?? hero.image.src,
            title: item.title,
            description: item.description,
            icon: icon(item.icon),
          }))}
        />
      );

    case "bento":
      return <WhyBento items={whyWeSearch.items} />;

    case "glow":
      return <GlowCards items={whyWeSearch.items} />;
  }
}
