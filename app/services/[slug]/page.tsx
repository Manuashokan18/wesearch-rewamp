import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { CTASection } from "@/components/sections/CTASection";
import { getServiceBySlug, services } from "@/lib/data/services";
import { ServiceShowcase } from "./ServiceShowcase";

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

  // A service without a designed page gets a plain summary from its short details.
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
          <h2 className="text-subsection text-ink">What This Includes</h2>
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

  const { hero } = detailPage;

  return (
    <>
      <PhotoHero
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
      />
      <ServiceShowcase page={detailPage} />
    </>
  );
}
