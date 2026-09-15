import type { Metadata } from "next";
import { Fragment } from "react";
import { notFound } from "next/navigation";
import { ArrowDown, Check } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { CardGrid } from "@/components/sections/CardGrid";
import { CTASection } from "@/components/sections/CTASection";
import { Button } from "@/components/ui/Button";
import {
  getServiceBySlug,
  services,
  type ServiceDetailPage,
} from "@/lib/data/services";

function SectionIntro({
  eyebrow,
  title,
  subtitle,
  center = false,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : ""}>
      <p
        className={`mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-accent ${
          center ? "justify-center" : ""
        }`}
      >
        <span className="h-px w-8 bg-accent" />
        {eyebrow}
      </p>
      <h2 className="text-2xl font-bold text-ink sm:text-3xl">{title}</h2>
      <p className={`mt-4 text-subtle ${center ? "" : "max-w-2xl"}`}>{subtitle}</p>
    </div>
  );
}

function IconListSection({
  section,
}: {
  section: NonNullable<ServiceDetailPage["capabilities"]>;
}) {
  // Keep the last row full: 6 items read best as 3 columns, 4 items as 2.
  const columnClass =
    section.items.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-2";

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionIntro
        eyebrow={section.eyebrow}
        title={section.title}
        subtitle={section.subtitle}
      />
      <div className={`mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2 ${columnClass}`}>
        {section.items.map((item) => (
          <div key={item.title} className="flex gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-tint text-accent">
              <item.icon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-semibold text-ink">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-subtle">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata(
  props: PageProps<"/services/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return { title: service.title, description: service.description };
}

export default async function ServiceDetailPage(
  props: PageProps<"/services/[slug]">
) {
  const { slug } = await props.params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  const { detailPage } = service;

  if (!detailPage) {
    return (
      <>
        <Hero
          eyebrow="Service"
          title={service.title}
          subtitle={service.description}
          primaryCta={{ label: "Request Talent", href: "/contact" }}
        />

        <section className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="text-xl font-semibold text-ink">What This Includes</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-subtle">
            {service.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </section>

        <CTASection
          title="Let's Talk About Your Hiring Needs"
          description="Tell us what you're hiring for and we'll put together a delivery approach built around it."
          primaryCta={{ label: "Request Talent", href: "/contact" }}
        />
      </>
    );
  }

  const {
    hero,
    solutions,
    comparison,
    capabilities,
    ecosystem,
    process,
    focusAreas,
    whyWeSearch,
    finalCta,
  } = detailPage;

  return (
    <>
      <Hero
        eyebrow={hero.eyebrow}
        title={hero.title}
        highlight={hero.highlight}
        subtitle={hero.subtitle}
        primaryCta={{ label: hero.primaryCtaLabel, href: "/contact" }}
        secondaryCta={{ label: hero.secondaryCtaLabel, href: "#solutions" }}
        features={hero.features}
        badgeItems={hero.badgeItems}
        annotation={hero.annotation}
        image={hero.image}
        showDecoration
      />

      <section id="solutions" className="mx-auto max-w-6xl px-6 py-20">
        <SectionIntro
          eyebrow={solutions.eyebrow}
          title={solutions.title}
          subtitle={solutions.subtitle}
        />
        <div className="mt-10">
          <CardGrid
            items={solutions.items}
            keyExtractor={(solution) => solution.title}
            columns={4}
            renderItem={(solution) => (
              <div className="flex h-full flex-col rounded-2xl border border-line p-6">
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-full ${solution.colorClass}`}
                >
                  <solution.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink">{solution.title}</h3>
                <p className="mt-3 text-sm text-subtle">{solution.description}</p>
              </div>
            )}
          />
        </div>
      </section>

      {comparison && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <SectionIntro
            eyebrow={comparison.eyebrow}
            title={comparison.title}
            subtitle={comparison.subtitle}
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {comparison.columns.map((column) => (
              <div key={column.title} className={`rounded-2xl p-8 ${column.cardClass}`}>
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-full ${column.colorClass}`}
                >
                  <column.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink">{column.title}</h3>
                <p className="mt-3 text-sm font-medium text-accent">{column.flow}</p>
                <ul className="mt-4 space-y-2">
                  {column.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-sm text-subtle">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {capabilities && <IconListSection section={capabilities} />}

      {ecosystem && (
        <section className="border-t border-line bg-muted">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <SectionIntro
                eyebrow={ecosystem.eyebrow}
                title={ecosystem.title}
                subtitle={ecosystem.subtitle}
              />
              <div className="mt-8 flex flex-wrap gap-2">
                {ecosystem.pillars.map((pillar) => (
                  <span
                    key={pillar}
                    className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-ink"
                  >
                    {pillar}
                  </span>
                ))}
              </div>
              <div className="mt-8">
                <Button href="/contact">{ecosystem.ctaLabel}</Button>
              </div>
            </div>

            <ol className="flex flex-col items-stretch gap-2">
              {ecosystem.layers.map((layer, index) => (
                <Fragment key={layer.label}>
                  <li
                    className={`flex items-center gap-4 rounded-2xl border p-5 ${
                      layer.highlight
                        ? "border-transparent bg-navy text-white shadow-lg"
                        : "border-line bg-surface"
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                        layer.highlight ? "bg-white/10 text-accent" : "bg-tint text-accent"
                      }`}
                    >
                      <layer.icon className="h-5 w-5" />
                    </span>
                    <span
                      className={`font-semibold ${layer.highlight ? "text-white" : "text-ink"}`}
                    >
                      {layer.label}
                    </span>
                  </li>
                  {index < ecosystem.layers.length - 1 && (
                    <ArrowDown
                      aria-hidden="true"
                      className="mx-auto h-5 w-5 shrink-0 text-line"
                    />
                  )}
                </Fragment>
              ))}
            </ol>
          </div>
        </section>
      )}

      {process && (
        <section className="border-t border-line bg-muted">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <SectionIntro
              eyebrow={process.eyebrow}
              title={process.title}
              subtitle={process.subtitle}
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {process.steps.map((step) => (
                <div
                  key={step.number}
                  className="group rounded-2xl border border-line bg-surface p-7 transition duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-tint text-accent transition-colors duration-200 group-hover:bg-accent group-hover:text-white">
                      <step.icon className="h-6 w-6" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="select-none text-3xl font-bold leading-none text-ink/10 transition-colors duration-200 group-hover:text-accent/25"
                    >
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-subtle">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {focusAreas && <IconListSection section={focusAreas} />}

      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionIntro
          eyebrow={whyWeSearch.eyebrow}
          title={whyWeSearch.title}
          subtitle={whyWeSearch.subtitle}
        />
        <div className="mt-10">
          <CardGrid
            items={whyWeSearch.items}
            keyExtractor={(item) => item.title}
            columns={4}
            renderItem={(item) => (
              <div className="flex h-full flex-col rounded-2xl border border-line p-6">
                <item.icon className="h-6 w-6 text-accent" />
                <h3 className="mt-4 font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-subtle">{item.description}</p>
              </div>
            )}
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 pt-4">
        <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-14 text-center text-white sm:px-14 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-28 left-1/2 h-64 w-[30rem] -translate-x-1/2 rounded-full bg-accent/30 blur-3xl"
          />

          <div className="relative mx-auto max-w-2xl">
            <p className="mb-5 flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-wide text-accent">
              <span className="h-px w-8 bg-accent" />
              {finalCta.eyebrow}
              <span className="h-px w-8 bg-accent" />
            </p>
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">{finalCta.title}</h2>
            <p className="mt-4 text-white/70">{finalCta.description}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button href="/contact">{finalCta.primaryLabel}</Button>
              <Button href="/services" variant="outlineInverse">
                {finalCta.secondaryLabel}
              </Button>
            </div>
          </div>

          <div className="relative mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-white/10 pt-8">
            {finalCta.assurances.map((assurance) => (
              <span
                key={assurance.label}
                className="flex items-center gap-2 text-sm text-white/70"
              >
                <assurance.icon className="h-4 w-4 shrink-0 text-accent" />
                {assurance.label}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
