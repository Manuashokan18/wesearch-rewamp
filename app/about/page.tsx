import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { CardGrid } from "@/components/sections/CardGrid";
import { CTASection } from "@/components/sections/CTASection";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { VideoCard } from "@/components/sections/VideoCard";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "WeSearch helps organizations build, nurture and retain an efficient, effective and sustainable workforce.",
};

const values = ["Quality", "Customer Focus", "Innovation", "Teamwork", "Reliability"];

const timeline = [
  { year: "2008", milestone: "Company launched with establishment of the India office." },
  { year: "2010", milestone: "Began IT managed services and outsourcing vertical." },
  { year: "2012", milestone: "Opened Middle East regional headquarters in Dubai." },
  { year: "2018", milestone: "Achieved ISO certification." },
  { year: "2022", milestone: "Established a Center of Excellence with an Innovation Team in India." },
];

const deliverySteps = [
  { title: "Requirement Intake", description: "Understanding role, team and business requirements in detail." },
  { title: "Talent Identification", description: "Structured sourcing and market mapping against the requirement." },
  { title: "Submission & Interview", description: "Coordinated submissions, screening and interview scheduling." },
  { title: "Selection", description: "Supporting evaluation, feedback and offer decisions." },
  { title: "Onboarding", description: "Managing documentation, offer rollout and joining formalities." },
  { title: "Workforce Management", description: "Ongoing lifecycle, compliance and performance tracking." },
];

export default function AboutPage() {
  return (
    <>
      <Hero
        eyebrow="About WeSearch"
        title="We Help You Identify, Nurture and Retain the Right People"
        subtitle="Our vision is to enable enterprises to build an efficient, effective and sustainable workforce — combining strategic workforce design with technology tools that integrate human psychology principles."
      />

      {/*
       * The handshake video moved here from the home page's Why Choose section
       * (client review, 2026-09-21). Kept so it can be checked and reused.
       */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionIntro eyebrow="Our Mission" title="Building Workforces That Last" />
            <p className="mt-6 text-subtle">
              WeSearch&apos;s mission is to help organizations develop efficient,
              effective, and sustainable workforces through our strategies and
              products. We address modern workforce challenges — particularly
              around digitalization and generational change — by developing
              flexible workforce strategies aligned with organizational goals,
              with continuous evaluation and intervention mechanisms to build the
              right human capital.
            </p>
          </div>

          <VideoCard src="/handshake.mp4" caption="Partner with us for smarter hiring solutions." />
        </div>
      </section>

      <section className="border-t border-line bg-muted">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionIntro eyebrow="Our Values" title="What We Stand For" />
          <div className="mt-10 flex flex-wrap gap-3">
            {values.map((value) => (
              <span
                key={value}
                className="inline-flex items-center rounded-full border border-line bg-surface px-4 py-2 text-sm text-ink"
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionIntro eyebrow="Our Journey" title="Milestones Along the Way" />
        <div className="mt-10 space-y-6">
          {timeline.map((entry) => (
            <div key={entry.year} className="flex gap-6 border-l-2 border-line pl-6">
              <span className="w-16 shrink-0 font-semibold text-accent">{entry.year}</span>
              <p className="text-subtle">{entry.milestone}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-muted">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionIntro
            eyebrow="How We Deliver"
            title="A Structured Approach to Workforce Delivery"
            subtitle="Our delivery model brings together dedicated teams, defined processes, technology-enabled reporting and regular governance to create consistency across client requirements."
          />
          <div className="mt-10">
            <CardGrid
              items={deliverySteps}
              keyExtractor={(step) => step.title}
              columns={3}
              renderItem={(step) => (
                <div className="rounded-2xl border border-line bg-surface p-6">
                  <h3 className="text-card text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm text-subtle">{step.description}</p>
                </div>
              )}
            />
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Work With Us"
        title="Let's Build Your Workforce"
        description="Whether you are hiring for a critical role, scaling a team, building a GCC or looking for structured workforce support, let's discuss how WeSearch can help."
        primaryCta={{ label: "Request Talent", href: "/contact" }}
        secondaryCta={{ label: "Talk to Our Team", href: "/contact" }}
        showDecoration
        image={{
          src: "/build-your-workforce.png",
          alt: "Build winning teams with WeSearch",
          width: 1774,
          height: 887,
        }}
      />
    </>
  );
}
