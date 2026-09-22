import type { Metadata } from "next";
import { CTASection } from "@/components/sections/CTASection";
import { Eyebrow } from "@/components/sections/SectionIntro";
import { openPositions } from "@/lib/data/jobs";
import { OpenPositions } from "../OpenPositions";

export const metadata: Metadata = {
  title: "Open Positions",
  description:
    "Browse current open positions at WeSearch and apply directly to the role that fits you.",
};

export default function OpenPositionsPage() {
  return (
    <div className="bg-muted">
      {/*
        Title, subtitle and count sit in a plain header row instead of a
        colored band — hierarchy comes from type size and a hairline divider,
        not a background color, so the job list stays the visual anchor. The
        page itself sits on a light tint so the white job cards lift off it.
      */}
      <section id="open-positions" className="mx-auto max-w-6xl px-6 py-10 sm:py-12">
        <div className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between sm:pb-8">
          <div>
            <Eyebrow>Careers · Open Positions</Eyebrow>
            <h1 className="mt-1 text-section-lg text-ink">Open Positions</h1>
            <p className="mt-2 max-w-xl text-subtle">
              Browse the roles we are hiring for right now and apply directly against one.
            </p>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-tint px-4 py-2 text-sm font-medium text-accent">
            {openPositions.length} open {openPositions.length === 1 ? "role" : "roles"}
          </span>
        </div>

        <div className="mt-8">
          <OpenPositions jobs={openPositions} />
        </div>
      </section>

      <CTASection
        eyebrow="Hiring With Us"
        title="Don't See the Right Role?"
        description="Submit a general application and our recruitment team will reach out when an opportunity matching your background comes up."
        primaryCta={{ label: "Join Us", href: "/careers/join-us" }}
        secondaryCta={{ label: "Talk to Our Team", href: "/contact" }}
      />
    </div>
  );
}
