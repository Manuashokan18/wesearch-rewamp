import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { CTASection } from "@/components/sections/CTASection";
import { Eyebrow } from "@/components/sections/SectionIntro";
import { Button } from "@/components/ui/Button";
import { careersEmail } from "@/lib/config/site";
import { ProfileForm } from "../ProfileForm";

export const metadata: Metadata = {
  title: "Join Us",
  description:
    "Submit your profile to WeSearch and our recruitment team will reach out about relevant opportunities.",
};

const assurances = [
  "A real recruiter reviews every profile — never a black hole",
  "We reach out directly when a role matches your background",
];

export default function JoinUsPage() {
  return (
    <>
      {/*
        Intro and form share one row instead of stacking under a hero, so the
        form is on screen immediately rather than pushed below the fold.
      */}
      <section className="border-b border-line bg-muted">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-8 sm:py-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-12">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>Careers · Join Us</Eyebrow>
            <h1 className="mt-1 text-section-lg text-ink">Kickstart Your Career With Us</h1>
            <p className="mt-3 max-w-sm text-subtle">
              Share your profile and our recruitment team will reach out when a relevant
              opportunity comes up.
            </p>
            <ul className="mt-6 hidden flex-col gap-3 lg:flex">
              {assurances.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-subtle">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <Button
              href="/careers/open-positions"
              variant="outline"
              size="sm"
              className="mt-6 bg-surface"
            >
              View Open Positions
            </Button>
          </div>

          <div
            id="submit-profile"
            className="rounded-2xl border border-line bg-surface p-6 shadow-[0_1px_2px_rgba(11,22,56,0.05),0_20px_40px_-20px_rgba(11,22,56,0.15)] sm:p-8"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h2 className="text-subsection text-ink">Submit Your Profile</h2>
              <p className="text-xs text-subtle">
                Fields marked <span className="text-red-500">*</span> are required
              </p>
            </div>

            <div className="mt-6">
              <ProfileForm />
            </div>

            <p className="mt-6 text-xs text-subtle">
              Prefer email? Send your resume to{" "}
              <a href={`mailto:${careersEmail}`} className="text-accent hover:underline">
                {careersEmail}
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Hiring With Us"
        title="Prefer Browsing Open Roles?"
        description="We work with organizations across staffing, RPO, MSP and GCC hiring — which means varied work, real ownership and room to build a long-term career."
        primaryCta={{ label: "View Open Positions", href: "/careers/open-positions" }}
        secondaryCta={{ label: "Talk to Our Team", href: "/contact" }}
      />
    </>
  );
}
