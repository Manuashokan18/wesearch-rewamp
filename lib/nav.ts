import { services } from "@/lib/data/services";
import { products } from "@/lib/data/products";

/**
 * Pages whose hero runs up behind the header: the home page, About, every
 * service page and every product page with a designed hero, which open on a
 * full-bleed image. The header starts transparent over them, so the bar shows
 * the hero itself, and turns solid once the page scrolls.
 */
export const overlayHeroPaths = [
  "/",
  "/about",
  ...services
    .filter((service) => service.detailPage)
    .map((service) => `/services/${service.slug}`),
  ...products
    .filter((product) => product.detailPage)
    .map((product) => `/products/${product.slug}`),
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
    // No standalone services listing page — the label itself opens on the
    // first service; the dropdown (and Footer's "Our Services" column) is
    // how every other service is actually reached.
    href: `/services/${services[0].slug}`,
    children: services.map((service) => ({
      label: service.title,
      href: `/services/${service.slug}`,
    })),
  },
  // No standalone products listing page, and PINT is the only product, so
  // this is a plain link straight to it rather than a one-item dropdown.
  { label: "Products", href: `/products/${products[0].slug}` },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  {
    label: "Careers",
    // No standalone careers landing page — same convention as Services: the
    // label opens on Open Positions, the dropdown is how Join Us is reached.
    href: "/careers/open-positions",
    children: [
      { label: "Join Us", href: "/careers/join-us" },
      { label: "Open Positions", href: "/careers/open-positions" },
    ],
  },
];

export const companyLinks: NavChild[] = [
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "/careers/open-positions" },
  { label: "Contact", href: "/contact" },
];
