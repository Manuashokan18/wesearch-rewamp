import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { EcosystemDiagram } from "@/components/sections/EcosystemDiagram";
import { Eyebrow } from "@/components/sections/SectionIntro";
import { Button } from "@/components/ui/Button";
import { FeatureList } from "@/components/ui/feature-list";
import { FeatureTabs } from "@/components/ui/feature-tabs";
import { FeatureTiles } from "@/components/ui/feature-tiles";
import type { ServiceDetailPage } from "@/lib/data/services";
import { Highlighted, SectionHeading, dots } from "./parts";

type PageProps = { page: ServiceDetailPage };

/**
 * "What we can deliver" — the page's six capabilities under a centred header,
 * on the white ground between the solutions and the process. The page picks
 * how they read: mixed-width `tiles`, an editorial `list`, or `tabs` beside a
 * photograph (see `CapabilitiesStyle`).
 */
export function CapabilitiesSection({ page }: PageProps) {
  const { capabilities, hero } = page;
  if (!capabilities) return null;

  return (
    <section id="capabilities" className="relative scroll-mt-20 overflow-hidden bg-surface">
      <div className={`${dots} -right-6 top-12 hidden h-40 w-56 lg:block`} aria-hidden="true" />
      <div className={`${dots} -bottom-6 -left-6 hidden h-32 w-44 lg:block`} aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-6 py-20 lg:py-24">
        <SectionHeading
          eyebrow={capabilities.eyebrow}
          title={capabilities.title}
          highlight={capabilities.highlight}
          subtitle={capabilities.subtitle}
        />

        {capabilities.style === "tiles" && (
          <FeatureTiles items={capabilities.items} className="mt-14" />
        )}
        {capabilities.style === "list" && (
          <FeatureList items={capabilities.items} className="mt-14" />
        )}
        {capabilities.style === "tabs" && (
          <FeatureTabs
            className="mt-14"
            items={capabilities.items.map((item) => ({
              image: item.image ?? hero.image.src,
              title: item.title,
              description: item.description,
              icon: <item.icon className="size-5" aria-hidden="true" />,
            }))}
          />
        )}
      </div>
    </section>
  );
}

/**
 * The priorities that shape the work — four short blocks in hairline-divided
 * columns, which reads lighter than cards for a set this small.
 */
export function FocusSection({ page }: PageProps) {
  const { focusAreas } = page;
  if (!focusAreas) return null;

  return (
    <section id="focus" className="scroll-mt-20 bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
        <SectionHeading
          eyebrow={focusAreas.eyebrow}
          title={focusAreas.title}
          highlight={focusAreas.highlight}
          subtitle={focusAreas.subtitle}
        />
        <FeatureGrid items={focusAreas.items} columns={4} className="mt-16" />
      </div>
    </section>
  );
}

/** The stakeholder flow: the heading and call to action beside the diagram. MSP only. */
export function EcosystemSection({ page }: PageProps) {
  const { ecosystem } = page;
  if (!ecosystem) return null;

  return (
    <section id="ecosystem" className="relative scroll-mt-20 overflow-hidden bg-surface">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 lg:py-24">
        <div>
          <Eyebrow>{ecosystem.eyebrow}</Eyebrow>
          <h2 className="text-section-lg text-ink">
            <Highlighted text={ecosystem.title} highlight={ecosystem.highlight} />
          </h2>
          <p className="mt-4 max-w-[46ch] text-subtle">{ecosystem.subtitle}</p>
          <div className="mt-8">
            <Button href="/contact">{ecosystem.ctaLabel}</Button>
          </div>
        </div>

        <EcosystemDiagram layers={ecosystem.layers} pillars={ecosystem.pillars} />
      </div>
    </section>
  );
}
