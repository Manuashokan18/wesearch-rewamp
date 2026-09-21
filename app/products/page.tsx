import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { CardGrid } from "@/components/sections/CardGrid";
import { CTASection } from "@/components/sections/CTASection";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { products } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "LabelEase, Asset Tracker and PINT — workforce and operations technology from WeSearch.",
};

export default function ProductsPage() {
  return (
    <>
      <Hero
        eyebrow="Products"
        title="Technology That Supports Your Workforce"
        subtitle="Alongside our recruitment and staffing services, we build products that support workforce operations, tracking and engagement."
      />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionIntro
          eyebrow="Our Products"
          title="Built for Workforce Operations"
          subtitle="Practical tools that sit alongside our services to help teams track, label and stay connected."
        />
        <div className="mt-10" />
        <CardGrid
          items={products}
          keyExtractor={(product) => product.slug}
          renderItem={(product) => (
            <div className="flex h-full flex-col rounded-2xl border border-line p-6">
              <h2 className="text-card text-ink">{product.title}</h2>
              <p className="mt-2 text-sm font-medium text-accent">{product.tagline}</p>
              <p className="mt-3 flex-1 text-sm text-subtle">{product.description}</p>
              <Link
                href={`/products/${product.slug}`}
                className="mt-4 text-sm font-medium text-accent hover:underline"
              >
                Explore {product.title} →
              </Link>
            </div>
          )}
        />
      </section>

      <CTASection
        title="Want to See These in Action?"
        description="Talk to our team about LabelEase, Asset Tracker or PINT."
        primaryCta={{ label: "Talk to Our Team", href: "/contact" }}
      />
    </>
  );
}
