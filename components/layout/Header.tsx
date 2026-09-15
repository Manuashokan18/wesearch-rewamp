"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { primaryNav } from "@/lib/nav";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "@/components/layout/MobileNav";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileNavOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileNavOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors ${
        isScrolled
          ? "border-line bg-surface/95 backdrop-blur"
          : "border-transparent bg-surface"
      }`}
    >
      <div className="mx-auto grid h-20 max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-6 px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/icon-mark.png"
            alt=""
            width={800}
            height={800}
            priority
            className="h-8 w-8"
          />
          <span className="text-lg font-semibold tracking-tight text-ink">WeSearch</span>
        </Link>

        <nav className="hidden items-center justify-center gap-8 lg:flex">
          {primaryNav.map((item) =>
            item.children ? (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 text-sm font-medium ${
                    isActive(item.href) ? "text-accent" : "text-ink/80 hover:text-ink"
                  }`}
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5" />
                </Link>
                {isActive(item.href) && (
                  <span className="absolute -bottom-6 left-0 h-0.5 w-full bg-accent" />
                )}
                <div className="invisible absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100">
                  <div className="rounded-2xl border border-line bg-surface p-3 shadow-lg">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-lg px-3 py-2 text-sm text-ink/80 hover:bg-muted hover:text-ink"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div key={item.href} className="relative">
                <Link
                  href={item.href}
                  className={`text-sm font-medium ${
                    isActive(item.href) ? "text-accent" : "text-ink/80 hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
                {isActive(item.href) && (
                  <span className="absolute -bottom-6 left-0 h-0.5 w-full bg-accent" />
                )}
              </div>
            )
          )}
        </nav>

        <div className="flex items-center justify-end gap-4">
          <div className="hidden lg:block">
            <Button href="/contact" size="sm">
              Request Talent →
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileNavOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line lg:hidden"
            aria-label="Open menu"
          >
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
              <path d="M0 1h18M0 7h18M0 13h18" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </div>

      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
    </header>
  );
}

export default Header;
