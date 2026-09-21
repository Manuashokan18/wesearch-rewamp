import { Award, Building2, Cpu, Globe, Handshake, Layers, type LucideIcon } from "lucide-react";

/**
 * Company-wide proof points, shared by the home page and the service pages so
 * the figures and logos stay in step wherever they appear.
 */

/**
 * Client and partner logos, carried over from the Streben site. Dimensions are
 * the intrinsic pixel sizes so next/image keeps each aspect ratio.
 */
export const clientLogos = [
  { src: "/logos/solace-logo.png", alt: "Solace", width: 239, height: 60 },
  { src: "/logos/mendix-logo.png", alt: "Mendix", width: 194, height: 100 },
  { src: "/logos/zebra-logo.png", alt: "Zebra", width: 364, height: 80 },
  { src: "/logos/pwc-logo.png", alt: "PwC", width: 860, height: 860 },
  { src: "/logos/IBM-logo.png", alt: "IBM", width: 1100, height: 583 },
];

export type Credential = { value: string; label: string; icon: LucideIcon };

/**
 * The headline credentials, exactly as the client set them out in their
 * latest review (docs/content/homepage-clientsuggestion.md, point 5), in the
 * order given. They replace the earlier 500+ / 10+ / 50,000+ figures. The home
 * page runs all six as a ticker.
 */
export const credentials: Credential[] = [
  { value: "250+", label: "Clients", icon: Building2 },
  { value: "10+", label: "Countries", icon: Globe },
  { value: "15+", label: "Years of Legacy", icon: Award },
  { value: "1,500+", label: "Tech Experts", icon: Cpu },
  { value: "250+", label: "Trusted Clients", icon: Handshake },
  { value: "20+", label: "Business Models", icon: Layers },
];

/**
 * The first three credentials, for the compact figures on each service page's
 * Why WeSearch band, which has room for three.
 */
export const companyStats = credentials.slice(0, 3);
