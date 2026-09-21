import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { getProductBySlug, productSummary, products } from "@/lib/data/products";
import { ProductShowcase } from "./ProductShowcase";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata(
  props: PageProps<"/products/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return { title: product.title, description: productSummary(product) };
}

/**
 * A product's page, in the order the client's own page sets it out: the product
 * name, its headline and opening paragraph over a photograph, then the key
 * features, the benefits and the closing call to action. All of the words come
 * from `lib/data/products.ts`; the page adds no copy of its own.
 */
export default async function ProductDetailPage(
  props: PageProps<"/products/[slug]">
) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const { detailPage } = product;

  return (
    <>
      <PhotoHero
        eyebrow={product.title}
        title={product.headline}
        highlight={detailPage.hero.highlight}
        subtitle={product.intro}
        image={detailPage.hero.image}
      />
      <ProductShowcase product={product} detailPage={detailPage} />
    </>
  );
}
