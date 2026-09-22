"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { primaryNav } from "@/lib/nav";
import { Button } from "@/components/ui/Button";

type MobileNavProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-ink text-white lg:hidden">
      <div className="flex h-20 items-center justify-between px-6">
        <span className="flex items-center gap-2">
          <Image src="/icon-mark.png" alt="" width={800} height={800} className="h-7 w-7" />
          <span className="text-lg font-semibold">WeSearch</span>
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
      <nav className="flex flex-col gap-2 px-6 py-6">
        {primaryNav.map((item) =>
          item.children ? (
            <div key={item.href} className="border-b border-white/10 py-3">
              <div className="flex items-center justify-between">
                <Link href={item.href} onClick={onClose} className="text-xl font-medium">
                  {item.label}
                </Link>
                <button
                  type="button"
                  onClick={() =>
                    setOpenSection(openSection === item.href ? null : item.href)
                  }
                  aria-label={`Toggle ${item.label} submenu`}
                  aria-expanded={openSection === item.href}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30"
                >
                  <ChevronDown
                    className={`size-4 transition-transform duration-300 motion-reduce:transition-none ${
                      openSection === item.href ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </div>
              {openSection === item.href && (
                <div className="mt-3 flex flex-col gap-2 pl-4">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={onClose}
                      className="text-sm text-white/70 hover:text-white"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="border-b border-white/10 py-3 text-xl font-medium"
            >
              {item.label}
            </Link>
          )
        )}
        <Button href="/contact" onClick={onClose} className="mt-6 w-fit">
          Request Talent
        </Button>
      </nav>
    </div>
  );
}

export default MobileNav;
