"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { overlayHeroPaths, primaryNav } from "@/lib/nav";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "@/components/layout/MobileNav";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  /**
   * The dropdown that was just used. The menus open on CSS hover, so after a
   * click they would otherwise stay open under the pointer for as long as it
   * rests there; this holds one shut until the pointer comes back to it.
   */
  const [dismissedMenu, setDismissedMenu] = useState<string | null>(null);

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

  /**
   * At the top of a page with a dark hero (the homepage grid, a service's
   * photograph) the bar is transparent so the hero shows through, with light
   * type over it. Scrolling returns it to the solid bar every other page uses.
   */
  const isOverHero = overlayHeroPaths.includes(pathname) && !isScrolled;

  const barClass = isOverHero
    ? "border-transparent bg-transparent"
    : isScrolled
      ? "border-line bg-surface/95 backdrop-blur"
      : "border-transparent bg-surface";

  const linkClass = (href: string) => {
    if (isActive(href)) return isOverHero ? "text-accent-soft" : "text-accent";
    return isOverHero ? "text-white/75 hover:text-white" : "text-ink/80 hover:text-ink";
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b transition-colors duration-300 ${barClass}`}
      >
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-6 px-6 lg:grid lg:grid-cols-[auto_1fr_auto]">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/icon-mark.png"
              alt=""
              width={800}
              height={800}
              priority
              className="h-8 w-8"
            />
            <span
              className={`text-lg font-semibold tracking-tight transition-colors ${
                isOverHero ? "text-white" : "text-ink"
              }`}
            >
              WeSearch
            </span>
          </Link>

          <nav className="hidden items-center justify-center gap-8 lg:flex">
            {primaryNav.map((item) => {
              // A dropdown counts as active from any of its children too, not
              // just its own href — otherwise landing on a non-default child
              // (e.g. Careers > Join Us) leaves the parent label unhighlighted.
              const groupActive =
                item.children?.some((child) => isActive(child.href)) ?? isActive(item.href);

              return item.children ? (
                <div
                  key={item.href}
                  className="group relative"
                  onMouseLeave={() => setDismissedMenu(null)}
                >
                  <Link
                    href={item.href}
                    onMouseEnter={() => setDismissedMenu(null)}
                    onClick={() => setDismissedMenu(item.href)}
                    className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                      groupActive
                        ? isOverHero
                          ? "text-accent-soft"
                          : "text-accent"
                        : isOverHero
                          ? "text-white/75 hover:text-white"
                          : "text-ink/80 hover:text-ink"
                    }`}
                  >
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </Link>
                  {groupActive && (
                    <span
                      className={`absolute -bottom-6 left-0 h-0.5 w-full ${
                        isOverHero ? "bg-accent-soft" : "bg-accent"
                      }`}
                    />
                  )}
                  <div
                    className={`invisible absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3 opacity-0 transition-opacity ${
                      dismissedMenu === item.href ? "" : "group-hover:visible group-hover:opacity-100"
                    }`}
                  >
                    <div className="rounded-2xl border border-line bg-surface p-3 shadow-lg">
                      {item.children.map((child) => {
                        const isCurrent = isActive(child.href);
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setDismissedMenu(item.href)}
                            aria-current={isCurrent ? "page" : undefined}
                            className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                              isCurrent
                                ? "bg-tint font-medium text-accent"
                                : "text-ink/80 hover:bg-muted hover:text-ink"
                            }`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div key={item.href} className="relative">
                  <Link
                    href={item.href}
                    className={`text-sm font-medium transition-colors ${linkClass(item.href)}`}
                  >
                    {item.label}
                  </Link>
                  {isActive(item.href) && (
                    <span
                      className={`absolute -bottom-6 left-0 h-0.5 w-full ${
                        isOverHero ? "bg-accent-soft" : "bg-accent"
                      }`}
                    />
                  )}
                </div>
              );
            })}
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
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
                isOverHero ? "border-white/30 text-white" : "border-line text-ink"
              } lg:hidden`}
              aria-label="Open menu"
            >
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
                <path d="M0 1h18M0 7h18M0 13h18" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/*
       * Rendered as a sibling of <header>, not a child: the bar gets
       * `backdrop-blur` once scrolled, and a `backdrop-filter` on an ancestor
       * becomes the CSS containing block for a `position: fixed` descendant —
       * so nested here, this panel's `inset-0` would resolve against the
       * header's own 80px-tall box instead of the viewport.
       */}
      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
    </>
  );
}

export default Header;
