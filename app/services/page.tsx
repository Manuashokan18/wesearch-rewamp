import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { CardGrid } from "@/components/sections/CardGrid";
import { CTASection } from "@/components/sections/CTASection";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Permanent recruitment, contract staffing, RPO, MSP workforce solutions, GCC hiring, and payroll & workforce management.",
};

export default function ServicesPage() {
  return (
    <>
      <Hero
        eyebrow="Services"
        title="Solutions for Every Stage of Your Workforce Journey"
        subtitle="From a single critical hire to multi-location, multi-client workforce delivery, our services are built to scale with your organization."
      />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <CardGrid
          items={services}
          keyExtractor={(service) => service.slug}
          renderItem={(service) => (
            <div className="flex h-full flex-col rounded-2xl border border-line p-6">
              <h2 className="text-lg font-semibold text-ink">{service.title}</h2>
              <p className="mt-3 flex-1 text-sm text-subtle">{service.description}</p>
              <Link
                href={`/services/${service.slug}`}
                className="mt-4 text-sm font-medium text-accent hover:underline"
              >
                {service.cta} →
              </Link>
            </div>
          )}
        />
      </section>

      <CTASection
        title="Let's Build Your Workforce"
        description="Whether you are hiring for a critical role, scaling a team, building a GCC or looking for structured workforce support, let's discuss how WeSearch can help."
        primaryCta={{ label: "Request Talent", href: "/contact" }}
      />
    </>
  );
}
