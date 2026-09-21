import { Eyebrow } from "@/components/sections/SectionIntro";
import { BentoGrid } from "@/components/ui/bento-grid";
import { Button } from "@/components/ui/Button";
import { FeatureTabs } from "@/components/ui/feature-tabs";
import { ImageAccordion } from "@/components/ui/image-accordion";
import { CardsParallax } from "@/components/ui/scroll-cards";
import type { ServiceDetailPage } from "@/lib/data/services";
import { Highlighted, SectionHeading, dots } from "./parts";

type PageProps = { page: ServiceDetailPage };

/** Shared ground for the solutions section: the soft gradient and the corner glow. */
function SolutionsGround({ children }: { children: React.ReactNode }) {
  return (
    <section
      id="solutions"
      // `overflow-clip`, not `overflow-hidden`: hidden makes the section a scroll
      // container, which stops the pinned heading and cards of the stack style.
      className="relative scroll-mt-20 overflow-clip bg-gradient-to-b from-muted to-tint/50"
    >
      <div
        className="pointer-events-none absolute -right-48 -top-48 h-[560px] w-[560px] rounded-full bg-tint blur-3xl"
        aria-hidden="true"
      />
      {children}
    </section>
  );
}

/**
 * The solutions as the pinned photo stack beside a pinned heading — the home
 * page's service stack. Every card's Learn More lands on a section further down,
 * so the stack doubles as the page's navigation.
 */
function StackSolutions({ page }: PageProps) {
  const { hero, solutions } = page;

  const cards = solutions.items.map((item) => ({
    label: item.tag ?? solutions.eyebrow,
    title: item.title,
    description: item.description,
    cta: "Learn More",
    href: item.href ?? "/contact",
    image: item.image ?? hero.image.src,
    icon: item.icon,
  }));

  return (
    <SolutionsGround>
      <svg
        viewBox="0 0 700 260"
        fill="none"
        className="pointer-events-none absolute -left-10 bottom-0 hidden h-[260px] w-[700px] text-accent/15 lg:block"
        aria-hidden="true"
      >
        <path d="M0 150C150 20 330 50 450 170S640 280 700 250" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-16 lg:py-24">
        <div className="lg:sticky lg:top-28">
          <Eyebrow>{solutions.eyebrow}</Eyebrow>
          <h2 className="text-hero text-ink">
            <Highlighted text={solutions.title} highlight={solutions.highlight} />
          </h2>
          <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-subtle">
            {solutions.subtitle}
          </p>
          <div className="mt-9">
            <Button href="/contact">{hero.primaryCtaLabel}</Button>
          </div>

          <p className="mt-16 hidden items-center gap-4 text-sm tracking-wide text-subtle lg:flex">
            <span className="h-px w-10 bg-accent" aria-hidden="true" />
            Right Talent. Real Impact.
          </p>
        </div>

        <div className="relative">
          <div className={`${dots} -left-8 -top-8 h-36 w-28`} aria-hidden="true" />
          <div className={`${dots} -bottom-8 -right-8 h-32 w-24`} aria-hidden="true" />

          <CardsParallax items={cards} annotation={solutions.annotation} />
        </div>
      </div>
    </SolutionsGround>
  );
}

/** The solutions as a row of photo panels, one open at a time, under a split header. */
function AccordionSolutions({ page }: PageProps) {
  const { hero, solutions } = page;

  const items = solutions.items.map((item) => ({
    image: item.image ?? hero.image.src,
    title: item.title,
    label: item.tag ?? solutions.eyebrow,
    description: item.description,
    href: item.href ?? "/contact",
    cta: "Learn More",
    icon: <item.icon className="size-5" aria-hidden="true" />,
  }));

  return (
    <SolutionsGround>
      <div className="relative mx-auto max-w-6xl px-6 py-20 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16">
          <div>
            <Eyebrow>{solutions.eyebrow}</Eyebrow>
            <h2 className="text-section-lg text-ink">
              <Highlighted text={solutions.title} highlight={solutions.highlight} />
            </h2>
          </div>
          <div>
            <p className="max-w-[46ch] leading-relaxed text-subtle">{solutions.subtitle}</p>
            <div className="mt-7">
              <Button href="/contact">{hero.primaryCtaLabel}</Button>
            </div>
          </div>
        </div>

        <ImageAccordion items={items} className="mt-12" />
      </div>
    </SolutionsGround>
  );
}

/** The solutions as an asymmetric bento of photo tiles under a centred header. */
function BentoSolutions({ page }: PageProps) {
  const { hero, solutions } = page;

  const items = solutions.items.map((item) => ({
    image: item.image ?? hero.image.src,
    title: item.title,
    label: item.tag ?? solutions.eyebrow,
    description: item.description,
    href: item.href ?? "/contact",
    cta: "Learn More",
    icon: item.icon,
  }));

  return (
    <SolutionsGround>
      <div className="relative mx-auto max-w-6xl px-6 py-20 lg:py-24">
        <SectionHeading
          eyebrow={solutions.eyebrow}
          title={solutions.title}
          highlight={solutions.highlight}
          subtitle={solutions.subtitle}
        />

        <BentoGrid items={items} className="mt-14" />

        <div className="mt-12 flex justify-center">
          <Button href="/contact">{hero.primaryCtaLabel}</Button>
        </div>
      </div>
    </SolutionsGround>
  );
}

/** The solutions as a tab list beside one large photograph, under a centred header. */
function TabsSolutions({ page }: PageProps) {
  const { hero, solutions } = page;

  const items = solutions.items.map((item) => ({
    image: item.image ?? hero.image.src,
    title: item.title,
    label: item.tag ?? solutions.eyebrow,
    description: item.description,
    href: item.href ?? "/contact",
    cta: "Learn More",
    icon: <item.icon className="size-5" aria-hidden="true" />,
  }));

  return (
    <SolutionsGround>
      <div className="relative mx-auto max-w-6xl px-6 py-20 lg:py-24">
        <SectionHeading
          eyebrow={solutions.eyebrow}
          title={solutions.title}
          highlight={solutions.highlight}
          subtitle={solutions.subtitle}
        />

        <FeatureTabs items={items} className="mt-14" />

        <div className="mt-12 flex justify-center">
          <Button href="/contact">{hero.primaryCtaLabel}</Button>
        </div>
      </div>
    </SolutionsGround>
  );
}

/** The solutions section, in whichever of the four presentations the page picks. */
export function SolutionsSection({ page }: PageProps) {
  switch (page.solutions.style) {
    case "stack":
      return <StackSolutions page={page} />;
    case "accordion":
      return <AccordionSolutions page={page} />;
    case "bento":
      return <BentoSolutions page={page} />;
    case "tabs":
      return <TabsSolutions page={page} />;
  }
}
