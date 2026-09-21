import type { Metadata } from "next";
import {
  BadgeCheck,
  BarChart3,
  ClipboardList,
  FileCheck,
  Gem,
  Globe,
  HeartHandshake,
  Lightbulb,
  MessagesSquare,
  Rocket,
  Server,
  ShieldCheck,
  UserCheck,
  UserSearch,
  Users,
} from "lucide-react";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { CTASection } from "@/components/sections/CTASection";
import { credentials } from "@/lib/data/company";
import { DeliverySection } from "./DeliverySection";
import { JourneySection } from "./JourneySection";
import { MissionSection } from "./MissionSection";
import { StatsBand } from "./StatsBand";
import { ValuesShowcase } from "./ValuesShowcase";
import { unsplash } from "./parts";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "WeSearch helps organizations build, nurture and retain an efficient, effective and sustainable workforce.",
};

/**
 * The values, each with the icon and the photograph that stand for it in the
 * hero and in the Values section. The photographs are Unsplash stock, hot-linked
 * and sized at source; the hero's own is saved in /public (see docs/README.md).
 */
const values = [
  {
    name: "Quality",
    Icon: Gem,
    photo: "1581090690925-3898802525e2",
    position: "object-[50%_45%]",
  },
  {
    name: "Customer Focus",
    Icon: HeartHandshake,
    photo: "1603202662706-62ead3176b8f",
    position: "object-[70%_40%]",
  },
  {
    name: "Innovation",
    Icon: Lightbulb,
    photo: "1676276376052-dc9c9c0b6917",
    position: "object-[50%_40%]",
  },
  {
    name: "Teamwork",
    Icon: Users,
    photo: "1579389083395-4507e98b5e67",
    position: "object-[45%_30%]",
  },
  // The last value takes the tall frame in the middle of the mosaic (see ValuesShowcase).
  {
    name: "Reliability",
    Icon: ShieldCheck,
    photo: "1759310610325-2c7cb621e5e3",
    position: "object-[50%_60%]",
  },
];

const timeline = [
  { year: "2008", milestone: "Company launched with establishment of the India office.", icon: Rocket },
  { year: "2010", milestone: "Began IT managed services and outsourcing vertical.", icon: Server },
  { year: "2012", milestone: "Opened Middle East regional headquarters in Dubai.", icon: Globe },
  { year: "2018", milestone: "Achieved ISO certification.", icon: BadgeCheck },
  {
    year: "2022",
    milestone: "Established a Center of Excellence with an Innovation Team in India.",
    icon: Lightbulb,
  },
];

const deliverySteps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Requirement Intake",
    description: "Understanding role, team and business requirements in detail.",
  },
  {
    number: "02",
    icon: UserSearch,
    title: "Talent Identification",
    description: "Structured sourcing and market mapping against the requirement.",
  },
  {
    number: "03",
    icon: MessagesSquare,
    title: "Submission & Interview",
    description: "Coordinated submissions, screening and interview scheduling.",
  },
  {
    number: "04",
    icon: UserCheck,
    title: "Selection",
    description: "Supporting evaluation, feedback and offer decisions.",
  },
  {
    number: "05",
    icon: FileCheck,
    title: "Onboarding",
    description: "Managing documentation, offer rollout and joining formalities.",
  },
  {
    number: "06",
    icon: BarChart3,
    title: "Workforce Management",
    description: "Ongoing lifecycle, compliance and performance tracking.",
  },
];

/** The hero's short labels under the buttons: the company's values, as set out below. */
const heroValues = values.map((value) => ({ icon: value.Icon, label: value.name }));

/** The hero's glass bar: three facts taken straight from the milestones further down. */
const heroFacts = [
  { icon: Rocket, label: "Since 2008" },
  { icon: Globe, label: "India & Dubai" },
  { icon: BadgeCheck, label: "ISO Certified" },
];

export default function AboutPage() {
  return (
    <>
      <PhotoHero
        eyebrow="About WeSearch"
        title="We Help You Identify, Nurture and Retain the Right People"
        highlight="Right People"
        subtitle="Our vision is to enable enterprises to build an efficient, effective and sustainable workforce — combining strategic workforce design with technology tools that integrate human psychology principles."
        primaryCta={{ label: "Request Talent", href: "/contact" }}
        secondaryCta={{ label: "Explore Our Journey", href: "#journey" }}
        features={heroValues}
        badgeItems={heroFacts}
        image={{
          src: "/about-hero.jpg",
          alt: "A diverse team gathered around a boardroom table with their laptops",
        }}
      />

      {/*
       * The handshake video moved here from the home page's Why Choose section
       * (client review, 2026-09-21). Kept so it can be checked and reused.
       */}
      <MissionSection
        eyebrow="Our Mission"
        title="Building Workforces That Last"
        lead="WeSearch's mission is to help organizations develop efficient, effective, and sustainable workforces through our strategies and products."
        rest="We address modern workforce challenges — particularly around digitalization and generational change — by developing flexible workforce strategies aligned with organizational goals, with continuous evaluation and intervention mechanisms to build the right human capital."
        video={{ src: "/handshake.mp4", caption: "Partner with us for smarter hiring solutions." }}
      />

      <StatsBand eyebrow="Why Choose WeSearch" credentials={credentials} />

      <JourneySection
        eyebrow="Our Journey"
        title="Milestones Along the Way"
        milestones={timeline}
        image={{
          src: unsplash("1616587656977-ac36a5a430bc", 1000),
          alt: "Two colleagues leaning over a shared table, working through a plan together",
          position: "object-[45%_center]",
        }}
      />

      <ValuesShowcase
        eyebrow="Our Values"
        title="What We Stand For"
        values={values.map((value) => ({
          name: value.name,
          icon: <value.Icon className="size-5" />,
          image: unsplash(value.photo, 700),
          position: value.position,
        }))}
      />

      <DeliverySection
        eyebrow="How We Deliver"
        title="A Structured Approach to Workforce Delivery"
        subtitle="Our delivery model brings together dedicated teams, defined processes, technology-enabled reporting and regular governance to create consistency across client requirements."
        steps={deliverySteps}
      />

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
