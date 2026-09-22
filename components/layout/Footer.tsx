import type { ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { primaryNav } from "@/lib/nav";
import { services } from "@/lib/data/services";
import { publicEmail } from "@/lib/config/site";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { LinkedInIcon } from "@/components/ui/SocialIcons";

type FooterLink = {
  label: string;
  /** Omit for plain text, such as a location. */
  href?: string;
  icon?: ComponentType<{ className?: string }>;
};

type FooterColumn = { label: string; links: FooterLink[] };

const columns: FooterColumn[] = [
  {
    label: "Quick Links",
    links: primaryNav.map((item) => ({ label: item.label, href: item.href })),
  },
  {
    label: "Our Services",
    links: services.map((service) => ({
      label: service.shortTitle,
      href: `/services/${service.slug}`,
    })),
  },
  {
    label: "Get In Touch",
    links: [
      { label: publicEmail, href: `mailto:${publicEmail}`, icon: Mail },
      { label: "India & UAE", icon: MapPin },
    ],
  },
  {
    label: "Social",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/company/wesearchinc/", icon: LinkedInIcon },
    ],
  },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];

const isExternal = (href: string) => /^https?:\/\//.test(href);

function FooterItem({ link }: { link: FooterLink }) {
  const content = (
    <>
      {link.icon && <link.icon className="size-4 shrink-0 text-accent-soft" aria-hidden="true" />}
      <span className="min-w-0 break-words">{link.label}</span>
    </>
  );

  if (!link.href) {
    return <span className="inline-flex items-center gap-2">{content}</span>;
  }

  return (
    <Link
      href={link.href}
      {...(isExternal(link.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-white"
    >
      {content}
    </Link>
  );
}

/**
 * Site footer, after efferd's "Footer Section" on 21st.dev: a panel with a
 * rounded top edge, a soft glow and a blurred highlight line along the top,
 * the brand on the left and the link columns sharpening into view in turn.
 * Recoloured onto the WeSearch navy with the accent as the glow. Only the
 * entrance needs the browser, so the columns stay server-rendered inside
 * `AnimatedContainer`.
 */
export function Footer() {
  return (
    <footer className="relative w-full rounded-t-[2.5rem] border-t border-white/15 bg-navy bg-[radial-gradient(40%_160px_at_50%_0%,color-mix(in_oklch,var(--color-accent)_28%,transparent),transparent)] text-white md:rounded-t-[4rem]">
      <div
        className="absolute left-1/2 top-0 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-soft/80 blur"
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 lg:gap-8 lg:py-20 xl:grid-cols-3">
        <AnimatedContainer className="space-y-4">
          <Link href="/" className="inline-flex items-center gap-2">
            <Image src="/icon-mark.png" alt="" width={800} height={800} className="size-8" />
            <span className="text-lg font-semibold">WeSearch</span>
          </Link>
          <p className="text-sm text-white/60">Right Talent. Real Impact.</p>
          <p className="mt-6 text-sm text-white/50 xl:mt-10">
            &copy; {new Date().getFullYear()} WeSearch. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/50">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors duration-300 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </AnimatedContainer>

        <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4 md:gap-y-8 xl:col-span-2 xl:mt-0">
          {columns.map((column, index) => (
            <AnimatedContainer key={column.label} delay={0.1 + index * 0.1}>
              <h3 className="text-xs font-medium uppercase tracking-wider text-white">
                {column.label}
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-white/60">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterItem link={link} />
                  </li>
                ))}
              </ul>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
