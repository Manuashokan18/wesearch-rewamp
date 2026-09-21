import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { CTASection } from "@/components/sections/CTASection";
import { getProductBySlug, products } from "@/lib/data/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata(
  props: PageProps<"/products/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return { title: product.title, description: product.description };
}

export default async function ProductDetailPage(
  props: PageProps<"/products/[slug]">
) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  return (
    <>
      <Hero
        eyebrow={product.title}
        title={product.tagline}
        subtitle={product.intro}
        primaryCta={{ label: "Talk to Our Team", href: "/contact" }}
      />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="text-subsection text-ink">Key Features</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-subtle">
          {product.keyFeatures.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>

        <h2 className="mt-10 text-subsection text-ink">Benefits</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-subtle">
          {product.benefits.map((benefit) => (
            <li key={benefit}>{benefit}</li>
          ))}
        </ul>

        <Link
          href="/products"
          className="mt-10 inline-flex items-center text-sm font-medium text-accent hover:underline"
        >
          ← Back to all products
        </Link>
      </section>

      <CTASection
        title={`Ready to Explore ${product.title}?`}
        description="Talk to our team about how this fits your organization."
        primaryCta={{ label: "Talk to Our Team", href: "/contact" }}
      />
    </>
  );
}
