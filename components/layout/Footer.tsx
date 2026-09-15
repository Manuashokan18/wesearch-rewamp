import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { primaryNav } from "@/lib/nav";
import { services } from "@/lib/data/services";
import { LinkedInIcon, XIcon, YouTubeIcon } from "@/components/ui/SocialIcons";

const quickLinks = primaryNav.map((item) => ({ label: item.label, href: item.href }));

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/wesearchinc/", icon: LinkedInIcon },
  { label: "X", href: "#", icon: XIcon },
  { label: "YouTube", href: "#", icon: YouTubeIcon },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-navy text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.2fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Image src="/icon-mark.png" alt="" width={800} height={800} className="h-7 w-7" />
              <span className="text-lg font-semibold text-white">WeSearch</span>
            </Link>
            <p className="mt-3 text-sm text-white/50">Right Talent. Real Impact.</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/50">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/80 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/50">
              Our Services
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-white/80 hover:text-white"
                  >
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/50">
              Get In Touch
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2 text-white/80">
                <Mail className="h-4 w-4 text-accent" />
                info@wesearchinc.com
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <MapPin className="h-4 w-4 text-accent" />
                India &amp; UAE
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 hover:border-accent hover:text-accent"
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {new Date().getFullYear()} WeSearch. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
