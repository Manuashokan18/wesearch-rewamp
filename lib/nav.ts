import { services } from "@/lib/data/services";
import { products } from "@/lib/data/products";

/**
 * TEMPORARY. The previous version of the home page, kept beside the current one
 * so the two can be compared. Once one is chosen, delete `app/home-previous`,
 * this constant, and its uses below and in `components/layout/Header.tsx`.
 */
export const previousHomePath = "/home-previous";

/**
 * Pages whose hero runs up behind the header: the home page and every service
 * page, which open on a full-bleed image. The header starts transparent over
 * them, so the bar shows the hero itself, and turns solid once the page scrolls.
 */
export const overlayHeroPaths = [
  "/",
  previousHomePath,
  ...services
    .filter((service) => service.detailPage)
    .map((service) => `/services/${service.slug}`),
];

export type NavChild = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: services.map((service) => ({
      label: service.title,
      href: `/services/${service.slug}`,
    })),
  },
  {
    label: "Products",
    href: "/products",
    children: products.map((product) => ({
      label: product.title,
      href: `/products/${product.slug}`,
    })),
  },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" },
];

export const companyLinks: NavChild[] = [
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];
