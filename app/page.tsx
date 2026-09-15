import Image from "next/image";
import Link from "next/link";
import {
  SlidersHorizontal,
  Cpu,
  Target,
  Search,
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
import { Hero } from "@/components/sections/Hero";
import { CardGrid } from "@/components/sections/CardGrid";
import { CTASection } from "@/components/sections/CTASection";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { VideoCard } from "@/components/sections/VideoCard";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/data/services";

const heroFeatures = [
  { icon: SlidersHorizontal, label: "Flexible Hiring" },
  { icon: Cpu, label: "Technology Enabled" },
  { icon: Target, label: "Industry Focused" },
];

const pillars = [
  {
    title: "Structured Processes",
    description: "Clearly defined recruitment and workforce processes.",
    icon: ClipboardList,
  },
  {
    title: "Responsive Delivery",
    description: "Focused on speed without compromising quality.",
    icon: Zap,
  },
  {
    title: "Scalable Capability",
    description: "Designed to support changing workforce volumes.",
    icon: TrendingUp,
  },
  {
    title: "Technology & Visibility",
    description: "Data-driven tracking, reporting and management.",
    icon: BarChart3,
  },
  {
    title: "Governance & Accountability",
    description: "Defined ownership, SLAs and review mechanisms.",
    icon: ShieldCheck,
  },
  {
    title: "Long-Term Partnerships",
    description: "Building sustainable relationships with clients and talent.",
    icon: Handshake,
  },
];

const stats = [
  { value: "500+", label: "Happy Clients" },
  { value: "10+", label: "Years of Experience" },
  { value: "50,000+", label: "Candidates Placed" },
];

const processSteps = [
  {
    number: "01",
    icon: Search,
    title: "Understand Your Needs",
    description: "We learn about your business, goals and hiring requirements.",
  },
  {
    number: "02",
    icon: Users,
    title: "Source & Screen",
    description: "We find the best candidates and shortlist the right fit.",
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Interviews & Selection",
    description: "You meet, evaluate and choose the best talent.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Onboarding & Support",
    description: "We ensure a smooth transition and long-term success.",
  },
];

const industriesServed = [
  "Technology & IT",
  "Banking & Financial Services",
  "Telecom",
  "Engineering & Manufacturing",
  "E-commerce & Consumer",
  "Logistics & Transportation",
];

const commitments = [
  {
    title: "For Clients",
    description: "This means dependable workforce support.",
    icon: Building2,
  },
  {
    title: "For Candidates",
    description: "It means access to meaningful opportunities.",
    icon: UserCheck,
  },
  {
    title: "For Our Partners",
    description: "It means transparent and accountable engagement.",
    icon: Handshake,
  },
];

export default function Home() {
  return (
    <>
      <Hero
        eyebrow="Your Talent Partner"
        title="Building the Workforce That Moves Your Business Forward"
        highlight="Forward"
        subtitle="WeSearch helps organizations build, scale and manage their workforce through structured recruitment, staffing and workforce solutions. From permanent hiring and contract staffing to Contract-to-Hire, RPO, GCC hiring and MSP-aligned workforce solutions, we combine talent expertise with a disciplined, scalable delivery approach."
        primaryCta={{ label: "Request Talent →", href: "/contact" }}
        secondaryCta={{ label: "Explore Our Services", href: "/services" }}
        features={heroFeatures}
        image={{ src: "/hero-people.png", alt: "WeSearch team collaborating" }}
        showDecoration
      />

      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <p className="mb-4 flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-wide text-accent">
          <span className="h-px w-8 bg-accent" />
          Introduction
          <span className="h-px w-8 bg-accent" />
        </p>
        <h2 className="text-3xl font-bold text-ink sm:text-4xl">
          Workforce Solutions Built Around Your Business
        </h2>
        <p className="mt-6 text-subtle">
          Every organization has different workforce requirements — from
          building specialist teams to managing high-volume hiring and
          scaling operations across locations.
        </p>
        <p className="mt-4 text-subtle">
          At WeSearch, we bring together recruitment expertise, workforce
          delivery and technology-enabled processes to help organizations
          respond to changing talent demands.
        </p>
        <p className="mt-4 text-subtle">
          Our approach is built around quality, responsiveness, structured
          delivery and long-term partnerships, with capabilities designed to
          evolve as our clients&apos; workforce needs grow.
        </p>
      </section>

      <section className="border-t border-line bg-muted">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-accent">
                <span className="h-px w-8 bg-accent" />
                Our Services
              </p>
              <h2 className="max-w-xl text-3xl font-bold text-ink sm:text-4xl">
                Solutions for Every Stage of Your Workforce Journey
              </h2>
            </div>
            <Image
              src="/services-collage.png"
              alt="WeSearch team helping clients find the right talent"
              width={960}
              height={836}
              className="hidden w-full max-w-xs lg:block xl:max-w-sm"
            />
          </div>

          <div className="mt-12">
            <CardGrid
              items={services}
              keyExtractor={(service) => service.slug}
              renderItem={(service) => (
                <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-sm">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${service.colorClass}`}
                  >
                    <service.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-semibold text-ink">{service.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-subtle">{service.description}</p>
                  <Link
                    href={`/services/${service.slug}`}
                    className="mt-4 text-sm font-medium text-accent hover:underline"
                  >
                    {service.cta} →
                  </Link>
                </div>
              )}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-accent">
          <span className="h-px w-8 bg-accent" />
          Why WeSearch
        </p>
        <h2 className="max-w-xl text-3xl font-bold text-ink sm:text-4xl">
          Built Around Delivery. Driven by Outcomes.
        </h2>
        <p className="mt-4 max-w-2xl text-subtle">
          We believe workforce solutions are more than simply finding
          candidates. They require process discipline, responsiveness,
          visibility and accountability across the entire hiring and
          workforce lifecycle.
        </p>
        <div className="mt-12">
          <CardGrid
            items={pillars}
            keyExtractor={(pillar) => pillar.title}
            renderItem={(pillar) => (
              <div className="rounded-2xl border border-line p-6">
                <pillar.icon className="h-6 w-6 text-accent" />
                <h3 className="mt-4 font-semibold text-ink">{pillar.title}</h3>
                <p className="mt-2 text-sm text-subtle">{pillar.description}</p>
              </div>
            )}
          />
        </div>
      </section>

      <section className="bg-navy text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
          <div>
            <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-accent">
              <span className="h-px w-8 bg-accent" />
              Why Choose WeSearch
            </p>
            <h2 className="text-3xl font-bold sm:text-4xl">
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
              {stats.map((stat) => (
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

      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-accent">
          <span className="h-px w-8 bg-accent" />
          How We Deliver
        </p>
        <h2 className="max-w-xl text-3xl font-bold text-ink sm:text-4xl">
          A Structured Approach to Workforce Delivery
        </h2>
        <p className="mt-4 max-w-2xl text-subtle">
          Our delivery model brings together dedicated teams, defined
          processes, technology-enabled reporting and regular governance to
          create consistency across client requirements. From requirement
          intake and talent identification through submission, interview,
          selection, onboarding and workforce management, we focus on
          creating a transparent and accountable delivery experience.
        </p>
        <div className="mt-8">
          <Button href="/about" variant="outline">
            Explore How We Deliver →
          </Button>
        </div>

        <div className="mt-12">
          <ProcessSteps steps={processSteps} />
        </div>
      </section>

      <section className="border-t border-line bg-muted">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-accent">
            <span className="h-px w-8 bg-accent" />
            Industries We Support
          </p>
          <h2 className="max-w-xl text-3xl font-bold text-ink sm:text-4xl">
            Talent Solutions Across Growing Industries
          </h2>
          <p className="mt-4 max-w-2xl text-subtle">
            Our recruitment and workforce solutions can support organizations
            across multiple industries and business environments.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {industriesServed.map((industry) => (
              <span
                key={industry}
                className="inline-flex items-center rounded-full border border-line bg-surface px-4 py-2 text-sm text-ink"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <p className="mb-4 flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-wide text-accent">
          <span className="h-px w-8 bg-accent" />
          Supporting Organizations as They Scale
          <span className="h-px w-8 bg-accent" />
        </p>
        <h2 className="text-3xl font-bold text-ink sm:text-4xl">
          From Hiring Needs to Workforce Growth
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-subtle">
          Organizations may engage us for a single critical requirement, a
          growing contract workforce, a new team, or a broader hiring
          program. Our objective is to build capabilities that can grow with
          those requirements — from focused recruitment support to
          multi-client, multi-location workforce delivery.
        </p>
        <p className="mt-10 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          10 <span className="text-accent">→</span> 100{" "}
          <span className="text-accent">→</span> 1,000+
        </p>
        <p className="mt-3 text-sm text-subtle">
          Our delivery model is designed to evolve with workforce scale.
        </p>
      </section>

      <section className="border-t border-line bg-muted">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-accent">
            <span className="h-px w-8 bg-accent" />
            Our Commitment
          </p>
          <h2 className="max-w-xl text-3xl font-bold text-ink sm:text-4xl">
            Quality Talent. Structured Delivery. Lasting Partnerships.
          </h2>
          <p className="mt-4 max-w-2xl text-subtle">
            We are committed to creating better outcomes for organizations
            and professionals by combining market understanding with
            disciplined execution.
          </p>
          <div className="mt-12">
            <CardGrid
              items={commitments}
              keyExtractor={(commitment) => commitment.title}
              columns={3}
              renderItem={(commitment) => (
                <div className="rounded-2xl border border-line bg-surface p-6">
                  <commitment.icon className="h-6 w-6 text-accent" />
                  <h3 className="mt-4 font-semibold text-ink">{commitment.title}</h3>
                  <p className="mt-2 text-sm text-subtle">{commitment.description}</p>
                </div>
              )}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <p className="mb-4 flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-wide text-accent">
          <span className="h-px w-8 bg-accent" />
          Insights
          <span className="h-px w-8 bg-accent" />
        </p>
        <h2 className="text-3xl font-bold text-ink sm:text-4xl">
          Understanding the Workforce Behind Business Growth
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-subtle">
          The talent market is changing rapidly. Hiring models, GCC
          expansion, technology skills, contract workforce requirements and
          employee expectations continue to evolve. Through our insights and
          market perspectives, we aim to share practical observations that
          help organizations make better workforce decisions.
        </p>
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
