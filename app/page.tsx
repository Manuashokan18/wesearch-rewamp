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
} from "lucide-react";
import { HomeHero } from "@/components/sections/HomeHero";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { ScaleJourney } from "@/components/sections/ScaleJourney";
import { CardGrid } from "@/components/sections/CardGrid";
import { InteractiveTravelCard } from "@/components/ui/3d-card";
import { ImageCards } from "@/components/ui/cards";
import { CredentialTicker } from "@/components/sections/CredentialTicker";
import { CTASection } from "@/components/sections/CTASection";
import { Eyebrow } from "@/components/sections/SectionIntro";
import { Button } from "@/components/ui/Button";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { clientLogos, credentials } from "@/lib/data/company";

const heroFeatures = [
  { icon: SlidersHorizontal, label: "Flexible Hiring" },
  { icon: Cpu, label: "Technology Enabled" },
  { icon: Target, label: "Industry Focused" },
];

/**
 * The photographs that take turns behind the headline — people and business
 * in motion. Saved at full width in /public; the hero's keyframes are timed
 * for exactly five.
 */
const heroBackdrop = [
  "/home-hero-1.jpg",
  "/home-hero-2.jpg",
  "/home-hero-3.jpg",
  "/home-hero-4.jpg",
  "/home-hero-5.jpg",
];

const heroBadge = {
  label: "50,000+ placements across six industries",
  href: "/services/contract-staffing",
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
  { label: "Explore Our Services", href: "/services/contract-staffing" },
  { label: "View Open Roles", href: "/careers/open-positions" },
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

export default function Home() {
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
        backdrop={heroBackdrop}
      />

      <section className="mx-auto max-w-6xl overflow-hidden px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <AnimatedContainer direction="left">
            <Eyebrow>Introduction</Eyebrow>
            <h2 className="text-section-lg text-ink">
              Workforce Solutions Built Around Your Business
            </h2>
          </AnimatedContainer>
          <AnimatedContainer
            delay={0.2}
            direction="right"
            className="max-w-[58ch] space-y-4 text-lg leading-relaxed text-subtle"
          >
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
          </AnimatedContainer>
        </div>
      </section>

      {/* A light blue ground, so this section reads as its own band between the white sections above and the navy one below. */}
      <section className="bg-tint">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <AnimatedContainer>
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
          </AnimatedContainer>
          <div className="mt-6">
            <CardGrid
              items={pillars}
              keyExtractor={(pillar) => pillar.title}
              animated
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
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy text-white">
        <div
          className="pointer-events-none absolute -left-40 -top-40 size-[34rem] rounded-full bg-accent/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-40 -right-40 size-[34rem] rounded-full bg-accent-soft/15 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:22px_22px] opacity-15"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl px-6 pt-14 text-center lg:pt-16">
          {/* Wide enough for the headline to sit on one line from laptop width up. */}
          <AnimatedContainer className="mx-auto max-w-4xl">
            <Eyebrow center bracketed>
              Why Choose WeSearch
            </Eyebrow>
            <h2 className="text-balance text-section-lg">
              More Than Recruitment. We Build Lasting Teams.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/70">
              Our focus is on understanding your unique needs, leveraging
              technology and delivering talent that creates real business
              impact.
            </p>
            <div className="mt-6">
              <Button href="/about" variant="outlineInverse">
                Learn More →
              </Button>
            </div>
          </AnimatedContainer>
        </div>

        {/* The credentials keep moving, edge to edge, so the figures are the section. */}
        <CredentialTicker
          credentials={credentials}
          className="relative mt-10 pb-14 lg:mt-12 lg:pb-16"
        />
      </section>

      <section className="border-t border-line bg-muted">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <AnimatedContainer className="mx-auto max-w-2xl text-center">
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
          </AnimatedContainer>

          <ImageCards items={processSteps} ordered animated className="mt-12 lg:grid-cols-4" />

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

      <section className="border-t border-line bg-muted">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <AnimatedContainer className="mx-auto max-w-2xl text-center">
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
          </AnimatedContainer>

          <ImageCards items={commitments} animated className="mt-12" />
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
