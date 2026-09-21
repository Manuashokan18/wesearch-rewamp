import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { CTASection } from "@/components/sections/CTASection";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { openPositions } from "@/lib/data/jobs";
import { careersEmail } from "@/lib/config/site";
import { OpenPositions } from "./OpenPositions";
import { ProfileForm } from "./ProfileForm";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Explore current open positions at WeSearch and submit your profile. Our recruitment team will reach out about relevant opportunities.",
};

export default function CareersPage() {
  return (
    <>
      <Hero
        eyebrow="Careers"
        title="Kickstart Your Career With Us"
        subtitle="We help organizations identify, nurture and retain the right people — explore our current openings, or submit your profile and our team will reach out when a relevant opportunity comes up."
      />

      <section id="open-positions" className="mx-auto max-w-6xl px-6 py-20">
        <SectionIntro
          eyebrow="Open Roles"
          title="Current Open Positions"
          subtitle="Browse the roles we are hiring for right now. Apply directly against a role, or send us a general profile below."
        />
        <div className="mt-10">
          <OpenPositions jobs={openPositions} />
        </div>
      </section>

      <section id="submit-profile" className="border-t border-line bg-muted">
        <div className="mx-auto max-w-2xl px-6 py-20">
          <SectionIntro
            eyebrow="General Application"
            title="Submit Your Profile"
            subtitle="Not seeing the right role? Share your details and our recruitment team will get in touch about opportunities matching your background."
          />

          <p className="mt-6 text-xs text-subtle">
            Fields marked <span className="text-red-500">*</span> are required.
          </p>

          <div className="mt-4">
            <ProfileForm />
          </div>

          <p className="mt-8 text-xs text-subtle">
            Prefer email? Send your resume to{" "}
            <a href={`mailto:${careersEmail}`} className="text-accent hover:underline">
              {careersEmail}
            </a>
            .
          </p>
        </div>
      </section>

      <CTASection
        eyebrow="Hiring With Us"
        title="Grow Your Career With WeSearch"
        description="We work with organizations across staffing, RPO, MSP and GCC hiring — which means varied work, real ownership and room to build a long-term career."
        primaryCta={{ label: "View Open Positions", href: "#open-positions" }}
        secondaryCta={{ label: "Talk to Our Team", href: "/contact" }}
        showDecoration
        image={{
          src: "/build-your-workforce.png",
          alt: "Build your career with WeSearch",
          width: 1774,
          height: 887,
        }}
      />
    </>
  );
}
