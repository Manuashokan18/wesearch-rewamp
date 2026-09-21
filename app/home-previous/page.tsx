import type { Metadata } from "next";
import {
  SlidersHorizontal,
  Cpu,
  Target,
  Search,
  User,
  Users,
  CheckCircle2,
  Rocket,
  ClipboardList,
  Zap,
  TrendingUp,
  BarChart3,
  ShieldCheck,
  Handshake,
  Building2,
  UserCheck,
  ArrowRight,
} from "lucide-react";
import { HomeHero } from "@/components/sections/HomeHero";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { ScaleJourney } from "@/components/sections/ScaleJourney";
import { CardGrid } from "@/components/sections/CardGrid";
import { CardsParallax } from "@/components/ui/scroll-cards";
import { InteractiveTravelCard } from "@/components/ui/3d-card";
import { ImageCards } from "@/components/ui/cards";
import { CTASection } from "@/components/sections/CTASection";
import { Eyebrow } from "@/components/sections/SectionIntro";
import { VideoCard } from "@/components/sections/VideoCard";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/data/services";
import { clientLogos } from "@/lib/data/company";

/**
 * TEMPORARY — the home page as it stood before the client's review of
 * 2026-09-21, kept at /home-previous beside the current one at / so the two can
 * be compared. It is a frozen copy: the drifting-grid hero, the Our Services
 * stack, the Why Choose section with its video and three figures, Industries,
 * Insights, and the light Commitment section.
 *
 * To remove it once one version is chosen: delete this folder, then remove
 * `previousHomePath` from lib/nav.ts and its use in components/layout/Header.tsx.
 * `HyperGrid` (the grid backdrop) and the no-`backdrop` branch of `HomeHero`
 * are then unused too.
 */
export const metadata: Metadata = {
  title: "Home (previous version)",
  // A comparison copy: keep it out of search results so it doesn't compete with the real home page.
  robots: { index: false, follow: false },
};

const heroFeatures = [
  { icon: SlidersHorizontal, label: "Flexible Hiring" },
  { icon: Cpu, label: "Technology Enabled" },
  { icon: Target, label: "Industry Focused" },
];

/** The services, shaped for the pinned card stack. */
const serviceCards = services.map((service) => ({
  label: service.title,
  title: service.shortTitle,
  description: service.description,
  cta: service.cta,
  href: `/services/${service.slug}`,
  image: `/services/${service.slug}.jpg`,
  icon: service.icon,
}));

/** The figures this version carried, kept as they were. The current home page and the service pages use the client's newer set (lib/data/company.ts). */
const serviceStats = [
  { value: "500+", label: "Clients Served" },
  { value: "50,000+", label: "Professionals Placed" },
  { value: String(services.length), label: "Delivery Models" },
];

const legacyStats = [
  { value: "500+", label: "Happy Clients" },
  { value: "10+", label: "Years of Experience" },
  { value: "50,000+", label: "Candidates Placed" },
];

const heroBadge = {
  label: "50,000+ placements across six industries",
  href: "/services",
  icon: TrendingUp,
};

/**
 * The two doors. Companies hiring take the solid button, candidates the soft
 * one, so neither audience is funnelled into the other's journey.
 */
const heroPrimaryCta = {
  label: "Request Talent",
  href: "/contact",
  icon: Building2,
};

/** Explore Our Services is the content doc's secondary button; View Open Roles keeps the candidate door. */
const heroSecondaryCtas = [
  { label: "Explore Our Services", href: "/services" },
  { label: "View Open Roles", href: "/careers" },
];

/** Unsplash stock photography, sized at source so the optimiser starts small. */
const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

const pillars = [
  {
    title: "Structured Processes",
    description: "Clearly defined recruitment and workforce processes.",
    icon: ClipboardList,
    image: unsplash("1552664730-d307ca884978"),
  },
  {
    title: "Responsive Delivery",
    description: "Focused on speed without compromising quality.",
    icon: Zap,
    image: unsplash("1522071820081-009f0129c71c"),
  },
  {
    title: "Scalable Capability",
    description: "Designed to support changing workforce volumes.",
    icon: TrendingUp,
    image: unsplash("1504384308090-c894fdcc538d"),
  },
  {
    title: "Technology & Visibility",
    description: "Data-driven tracking, reporting and management.",
    icon: BarChart3,
    image: unsplash("1551288049-bebda4e38f71"),
  },
  {
    title: "Governance & Accountability",
    description: "Defined ownership, SLAs and review mechanisms.",
    icon: ShieldCheck,
    image: unsplash("1454165804606-c3d57bc86b40"),
  },
  {
    title: "Long-Term Partnerships",
    description: "Building sustainable relationships with clients and talent.",
    icon: Handshake,
    image: unsplash("1521791136064-7986c2920216"),
  },
];

/** Every engagement, first brief to onboarding, in the order it happens. */
const processSteps = [
  {
    tag: "Step 01",
    icon: Search,
    title: "Understand Your Needs",
    description: "We learn about your business, goals and hiring requirements.",
    image: unsplash("1517245386807-bb43f82c33c4"),
  },
  {
    tag: "Step 02",
    icon: Users,
    title: "Source & Screen",
    description: "We find the best candidates and shortlist the right fit.",
    image: unsplash("1586281380349-632531db7ed4"),
  },
  {
    tag: "Step 03",
    icon: CheckCircle2,
    title: "Interviews & Selection",
    description: "You meet, evaluate and choose the best talent.",
    image: unsplash("1551836022-d5d88e9218df"),
  },
  {
    tag: "Step 04",
    icon: Rocket,
    title: "Onboarding & Support",
    description: "We ensure a smooth transition and long-term success.",
    image: unsplash("1600880292203-757bb62b4baf"),
  },
];

/** One delivery model at every size of engagement. */
const scaleSteps = [
  { icon: User, value: "10", label: "Single requirements" },
  { icon: Users, value: "100", label: "Growing teams" },
  { icon: Building2, value: "1,000+", label: "Large-scale workforce programs" },
];

const scaleFeatures = {
  left: {
    image: unsplash("1573497620053-ea5300f94f21"),
    icon: Users,
    lead: "We find",
    label: "the right people",
  },
  right: {
    image: unsplash("1512453979798-5ea266f8880c"),
    icon: BarChart3,
    lead: "Scalable",
    label: "talent solutions",
  },
};

/** What each side of the table gets from us: who it is for, then the promise. */
const commitments = [
  {
    tag: "For Clients",
    title: "This means dependable workforce support.",
    icon: Building2,
    image: unsplash("1542744173-8e7e53415bb0"),
  },
  {
    tag: "For Candidates",
    title: "It means access to meaningful opportunities.",
    icon: UserCheck,
    image: unsplash("1598257006458-087169a1f08d"),
  },
  {
    tag: "For Our Partners",
    title: "It means transparent and accountable engagement.",
    icon: Handshake,
    image: unsplash("1600880292089-90a7e086ee0c"),
  },
];

export default function PreviousHome() {
  return (
    <>
      <HomeHero
        badge={heroBadge}
        eyebrow="Your Talent Partner"
        title="Building the Workforce That Moves Your Business Forward"
        highlight="Forward"
        subtitle="WeSearch helps organizations build, scale and manage their workforce through structured recruitment, staffing and workforce solutions. From permanent hiring and contract staffing to Contract-to-Hire, RPO, GCC hiring and MSP-aligned workforce solutions, we combine talent expertise with a disciplined, scalable delivery approach."
        primaryCta={heroPrimaryCta}
        secondaryCtas={heroSecondaryCtas}
        features={heroFeatures}
        logos={clientLogos}
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <Eyebrow>Introduction</Eyebrow>
            <h2 className="text-section-lg text-ink">
              Workforce Solutions Built Around Your Business
            </h2>
          </div>
          <div className="max-w-[58ch] space-y-4 text-lg leading-relaxed text-subtle">
            <p>
              Every organization has different workforce requirements — from
              building specialist teams to managing high-volume hiring and scaling
              operations across locations.
            </p>
            <p>
              At WeSearch, we bring together recruitment expertise, workforce
              delivery and technology-enabled processes to help organizations
              respond to changing talent demands.
            </p>
            <p>
              Our approach is built around quality, responsiveness, structured
              delivery and long-term partnerships, with capabilities designed to
              evolve as our clients&apos; workforce needs grow.
            </p>
          </div>
        </div>
      </section>

      {/*
       * `overflow-clip`, not `overflow-hidden`: hidden makes the section a
       * scroll container, which stops the heading and the cards from pinning.
       */}
      <section className="relative overflow-clip border-t border-line bg-gradient-to-b from-muted to-tint/50">
        {/* Ground: a soft glow behind the card and one sweeping rule at the foot. */}
        <div
          className="pointer-events-none absolute -right-48 -top-48 h-[560px] w-[560px] rounded-full bg-tint blur-3xl"
          aria-hidden="true"
        />
        <svg
          viewBox="0 0 700 260"
          fill="none"
          className="pointer-events-none absolute -left-10 bottom-0 hidden h-[260px] w-[700px] text-accent/15 lg:block"
          aria-hidden="true"
        >
          <path
            d="M0 150C150 20 330 50 450 170S640 280 700 250"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>

        <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-16 lg:py-24">
          {/*
           * The heading pins beside the stack rather than scrolling away above
           * it, so you always know which set you are moving through.
           */}
          <div className="lg:sticky lg:top-28">
            <Eyebrow>Our Services</Eyebrow>
            <h2 className="text-hero text-ink">
              Solutions for Every Stage of Your{" "}
              <span className="text-accent">Workforce Journey</span>
            </h2>
            <p className="mt-6 max-w-[34ch] text-lg leading-relaxed text-subtle">
              Six ways to build a team, each with its own delivery model.
            </p>
            <div className="mt-9">
              <Button href="/services">
                See all services
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>

            <dl className="mt-12 flex divide-x divide-line">
              {serviceStats.map((stat) => (
                <div key={stat.label} className="flex flex-col px-4 first:pl-0 last:pr-0 sm:px-6">
                  <dt className="mt-1 text-sm text-subtle sm:whitespace-nowrap">{stat.label}</dt>
                  <dd className="order-first text-2xl font-bold text-accent sm:text-3xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-16 hidden items-center gap-4 text-sm tracking-wide text-subtle lg:flex">
              <span className="h-px w-10 bg-accent" aria-hidden="true" />
              Right Talent. Real Impact.
            </p>
          </div>

          <div className="relative">
            <div
              className="pointer-events-none absolute -left-8 -top-8 h-36 w-28 bg-[radial-gradient(var(--color-accent)_1.2px,transparent_1.6px)] [background-size:14px_14px] opacity-35"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-8 -right-8 h-32 w-24 bg-[radial-gradient(var(--color-accent)_1.2px,transparent_1.6px)] [background-size:14px_14px] opacity-35"
              aria-hidden="true"
            />

            <CardsParallax items={serviceCards} annotation={"People\nPower\nProgress"} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <Eyebrow>Why WeSearch</Eyebrow>
        <h2 className="max-w-xl text-section-lg text-ink">
          Built Around Delivery. Driven by Outcomes.
        </h2>
        <p className="mt-4 max-w-2xl text-subtle">
          We believe workforce solutions are more than simply finding
          candidates. They require process discipline, responsiveness,
          visibility and accountability across the entire hiring and
          workforce lifecycle.
        </p>
        <p className="mt-10 text-eyebrow text-ink">Our delivery approach focuses on:</p>
        <div className="mt-6">
          <CardGrid
            items={pillars}
            keyExtractor={(pillar) => pillar.title}
            renderItem={(pillar) => (
              <div className="perspective-[1000px]">
                <InteractiveTravelCard
                  title={pillar.title}
                  subtitle={pillar.description}
                  imageUrl={pillar.image}
                  icon={<pillar.icon className="h-5 w-5" />}
                  className="w-full"
                />
              </div>
            )}
          />
        </div>
      </section>

      <section className="bg-navy text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-14 lg:grid-cols-2">
          <div>
            <Eyebrow>Why Choose WeSearch</Eyebrow>
            <h2 className="text-section-lg">
              More Than Recruitment. We Build Lasting Teams.
            </h2>
            <p className="mt-4 max-w-md text-white/70">
              Our focus is on understanding your unique needs, leveraging
              technology and delivering talent that creates real business
              impact.
            </p>
            <div className="mt-8">
              <Button href="/about" variant="outlineInverse">
                Learn More →
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6">
              {legacyStats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-bold text-accent sm:text-4xl">{stat.value}</p>
                  <p className="mt-1 text-sm text-white/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <VideoCard src="/handshake.mp4" caption="Partner with us for smarter hiring solutions." />
        </div>
      </section>

      <section className="border-t border-line bg-muted">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow center bracketed>
              How We Deliver
            </Eyebrow>
            <h2 className="text-section-lg text-ink">
              A Structured Approach to Workforce Delivery
            </h2>
            <p className="mx-auto mt-4 text-subtle">
              Our delivery model brings together dedicated teams, defined
              processes, technology-enabled reporting and regular governance to
              create consistency across client requirements.
            </p>
            <p className="mx-auto mt-3 text-subtle">
              From requirement intake and talent identification through
              submission, interview, selection, onboarding and workforce
              management, we focus on creating a transparent and accountable
              delivery experience.
            </p>
          </div>

          <ImageCards items={processSteps} ordered className="mt-12 lg:grid-cols-4" />

          <div className="mt-12 text-center">
            <Button href="/about" variant="outline">
              Explore How We Deliver →
            </Button>
          </div>
        </div>
      </section>

      <IndustriesSection />

      <ScaleJourney
        eyebrow="Supporting Organizations as They Scale"
        title="From Hiring Needs to"
        highlight="Workforce Growth"
        description="Organizations may engage us for a single critical requirement, a growing contract workforce, a new team, or a broader hiring program. Our objective is to build capabilities that can grow with those requirements — from focused recruitment support to multi-client, multi-location workforce delivery."
        steps={scaleSteps}
        left={scaleFeatures.left}
        right={scaleFeatures.right}
        annotation={"People\nPower\nProgress"}
        note="Our delivery model is designed to evolve with workforce scale."
        tagline="Right Talent. Real Impact."
      />

      <section className="mx-auto max-w-4xl px-6 py-14 text-center">
        <Eyebrow center bracketed>
          Insights
        </Eyebrow>
        <h2 className="text-section-lg text-ink">
          Understanding the Workforce Behind Business Growth
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-subtle">
          The talent market is changing rapidly. Hiring models, GCC expansion,
          technology skills, contract workforce requirements and employee
          expectations continue to evolve.
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-subtle">
          Through our insights and market perspectives, we aim to share
          practical observations that help organizations make better workforce
          decisions.
        </p>
      </section>

      <section className="border-t border-line bg-muted">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow center bracketed>
              Our Commitment
            </Eyebrow>
            <h2 className="text-section-lg text-ink">
              Quality Talent. Structured Delivery. Lasting Partnerships.
            </h2>
            <p className="mx-auto mt-4 text-subtle">
              We are committed to creating better outcomes for organizations and
              professionals by combining market understanding with disciplined
              execution.
            </p>
          </div>

          <ImageCards items={commitments} className="mt-12" />
        </div>
      </section>

      <CTASection
        eyebrow="Ready to Get Started"
        title="Let's Build Your Workforce"
        description="Whether you are hiring for a critical role, scaling a team, building a GCC or looking for structured workforce support, let's discuss how WeSearch can help."
        primaryCta={{ label: "Request Talent", href: "/contact" }}
        secondaryCta={{ label: "Talk to Our Team", href: "/contact" }}
        image={{ src: "/build-your-workforce.png", alt: "Build winning teams with WeSearch", width: 1774, height: 887 }}
        showDecoration
      />
    </>
  );
}
