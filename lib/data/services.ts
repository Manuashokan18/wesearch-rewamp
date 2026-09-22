import {
  Users,
  UserPlus,
  Target,
  Wallet,
  Building2,
  Briefcase,
  Zap,
  ClipboardList,
  Search,
  ShieldCheck,
  CheckCircle2,
  Settings,
  HeartHandshake,
  Repeat,
  BarChart3,
  TrendingUp,
  FileText,
  Rocket,
  Sparkles,
  Layers,
  Calculator,
  Database,
  UserCog,
  ClipboardCheck,
  Gauge,
  type LucideIcon,
} from "lucide-react";
import type { ProcessStep } from "@/components/sections/ProcessSteps";

type SectionIntro = {
  eyebrow: string;
  title: string;
  subtitle: string;
  /** Trailing words of the title set in the accent colour. */
  highlight?: string;
};

type IconListSection = SectionIntro & {
  items: {
    icon: LucideIcon;
    title: string;
    description: string;
    /** Photograph, for the styles that use one (see `CapabilitiesStyle` and `WhyStyle`). */
    image?: string;
  }[];
};

/** Unsplash stock photography, sized at source so the optimiser starts small. */
const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

/**
 * How a page presents each of its sections. Every page is built from the same
 * redesigned parts; the styles let a page pick the one that suits its content.
 *
 * Solutions (four items, each with a photograph):
 * - `stack`: a pinned heading beside photo cards that stack as you scroll.
 * - `accordion`: a row of photo panels, one open at a time.
 * - `bento`: an asymmetric grid of photo tiles.
 * - `tabs`: a tab list beside one large photograph that follows the selection.
 */
export type SolutionsStyle = "stack" | "accordion" | "bento" | "tabs";

/**
 * Capabilities (six items):
 * - `tiles`: a bento of icon tiles in mixed widths and grounds — no photography.
 * - `list`: an editorial index of hairline-ruled rows — no photography.
 * - `tabs`: a tab list beside one large photograph (each item needs `image`).
 */
export type CapabilitiesStyle = "tiles" | "list" | "tabs";

/**
 * Process steps:
 * - `photos`: a card per step with its own photograph (each step needs `image`).
 * - `pillars`: five bars, each taller than the last, with the copy above them.
 * - `roadmap`: a line of numbered pins with the step cards alternating above and below.
 * - `timeline`: a vertical timeline beside a pinned heading.
 */
export type ProcessStyle = "photos" | "pillars" | "roadmap" | "timeline";

/**
 * Why WeSearch, always on a navy band with the company figures:
 * - `photo`: tilting photo cards (each item needs `image`).
 * - `showcase`: a numbered list beside a photograph that follows it (each item needs `image`).
 * - `accordion`: a row of photo panels, one open at a time (each item needs `image`).
 * - `bento`: a checkerboard of two photo tiles and two glass tiles (the first
 *   and last items need `image`).
 * - `glow`: wide cards with a glowing icon and a ring of light — no photography.
 */
export type WhyStyle = "photo" | "showcase" | "accordion" | "bento" | "glow";

export type ServiceDetailPage = {
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    subtitle: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    features: { icon: LucideIcon; label: string }[];
    badgeItems: { icon: LucideIcon; label: string }[];
    annotation: string;
    /** The full-bleed hero photograph. */
    image: { src: string; alt: string };
  };
  solutions: SectionIntro & {
    style: SolutionsStyle;
    /** Handwritten note on each card of the `stack` style. */
    annotation?: string;
    items: {
      icon: LucideIcon;
      colorClass: string;
      title: string;
      description: string;
      /** Short label above the card title. */
      tag?: string;
      /** Card photograph. */
      image?: string;
      /** Where the card's Learn More goes, usually an anchor further down the page. */
      href?: string;
    }[];
  };
  comparison?: SectionIntro & {
    columns: {
      icon: LucideIcon;
      colorClass: string;
      cardClass: string;
      title: string;
      flow: string;
      bullets: string[];
    }[];
  };
  /** Six capabilities rendered before the process section. */
  capabilities?: IconListSection & { style: CapabilitiesStyle };
  /** Stakeholder flow diagram, e.g. the MSP operating model. */
  ecosystem?: SectionIntro & {
    layers: { icon: LucideIcon; label: string; highlight?: boolean }[];
    pillars: string[];
    ctaLabel: string;
  };
  process?: SectionIntro & {
    style: ProcessStyle;
    /** `image` is the step's photograph, for the `photos` style. */
    steps: (ProcessStep & { image?: string })[];
  };
  /** Icon grid rendered after the process section. */
  focusAreas?: IconListSection;
  whyWeSearch: IconListSection & { style: WhyStyle };
  finalCta: {
    eyebrow: string;
    title: string;
    description: string;
    primaryLabel: string;
    secondaryLabel: string;
    /** Where the secondary button goes. Defaults to the services index. */
    secondaryHref?: string;
    assurances: { icon: LucideIcon; label: string }[];
    /** Optional illustration shown beside the closing call to action. */
    image?: { src: string; alt: string; width: number; height: number };
  };
};

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  cta: string;
  details: string[];
  icon: LucideIcon;
  colorClass: string;
  detailPage?: ServiceDetailPage;
};

export const services: Service[] = [
  {
    slug: "contract-staffing",
    title: "Contract Staffing & Contract-to-Hire",
    shortTitle: "Contract Staffing & C2H",
    description:
      "Build workforce flexibility with contract and C2H solutions designed to help organizations respond quickly to changing business requirements.",
    cta: "Explore Contract Staffing",
    details: [
      "Rapid deployment of contract talent for project and seasonal demand.",
      "Contract-to-hire pathways for evaluating fit before permanent conversion.",
      "Managed onboarding, extensions and offboarding for contract workforce.",
    ],
    icon: Users,
    colorClass: "bg-blue-100 text-blue-600",
    detailPage: {
      hero: {
        eyebrow: "Our Service",
        title: "Flexible Talent. Faster Hiring. Built for Your Workforce Needs.",
        highlight: "Workforce Needs.",
        subtitle:
          "Access skilled talent when you need it — with flexible Contract Staffing and Contract-to-Hire solutions designed to support changing workforce demands.",
        primaryCtaLabel: "Talk to Our Staffing Team →",
        secondaryCtaLabel: "Explore Our Solutions",
        features: [
          { icon: Repeat, label: "Adapt to Change" },
          { icon: Users, label: "Access Top Talent" },
          { icon: BarChart3, label: "Focus on Growth" },
        ],
        badgeItems: [
          { icon: Users, label: "Build Agile Teams" },
          { icon: TrendingUp, label: "Scale with Confidence" },
          { icon: BarChart3, label: "Drive Business Growth" },
        ],
        annotation: "Right\nTalent\nReal\nImpact",
        image: {
          src: "/contract-staffing-hero.jpg",
          alt: "A large team of professionals working at desks in an open-plan office",
        },
      },
      solutions: {
        style: "stack",
        annotation: "Flexible\nby Design",
        eyebrow: "Our Solutions",
        title: "Workforce Solutions Built Around Your Hiring Needs",
        highlight: "Your Hiring Needs",
        subtitle:
          "From short-term support to long-term workforce planning, we offer flexible solutions to help you find, engage and retain the right talent.",
        // Learn More: the two models open their panel in the comparison; the
        // other two go to the process and the model chooser that explain them.
        items: [
          {
            icon: Users,
            colorClass: "bg-blue-100 text-blue-600",
            title: "Contract Staffing",
            description:
              "Build workforce capacity quickly with skilled professionals engaged for project-based, seasonal or ongoing requirements.",
            tag: "Flexible Capacity",
            href: "#contract-staffing",
            image: unsplash("1521737604893-d14cc237f11d"),
          },
          {
            icon: FileText,
            colorClass: "bg-emerald-100 text-emerald-600",
            title: "Contract-to-Hire",
            description:
              "Evaluate talent on the job before making a long-term hiring decision, with a flexible path from contract engagement to permanent employment.",
            tag: "Try Before You Hire",
            href: "#contract-to-hire",
            image: unsplash("1521791055366-0d553872125f"),
          },
          {
            icon: Rocket,
            colorClass: "bg-violet-100 text-violet-600",
            title: "Rapid Workforce Deployment",
            description:
              "Accelerate hiring and onboarding for urgent and high-volume workforce requirements.",
            tag: "Urgent & High-Volume",
            href: "#process",
            image: unsplash("1573164713988-8665fc963095"),
          },
          {
            icon: Sparkles,
            colorClass: "bg-orange-100 text-orange-600",
            title: "Workforce Flexibility",
            description:
              "Scale your workforce based on business demand, project requirements and changing priorities.",
            tag: "Scale on Demand",
            href: "#models",
            image: unsplash("1519389950473-47ba0277781c"),
          },
        ],
      },
      comparison: {
        eyebrow: "Hire Smarter",
        title: "Choose the Right Workforce Model",
        highlight: "Workforce Model",
        subtitle: "Two flexible models. One goal — the right talent for your business.",
        columns: [
          {
            icon: Users,
            colorClass: "bg-blue-100 text-blue-600",
            cardClass: "bg-tint",
            title: "Contract Staffing",
            flow: "Need → Deploy → Manage",
            bullets: [
              "Flexible workforce for defined or ongoing requirements.",
              "Ideal for projects, seasonal demand and workforce scaling.",
              "Quick access to skilled professionals.",
            ],
          },
          {
            icon: FileText,
            colorClass: "bg-emerald-100 text-emerald-600",
            cardClass: "bg-emerald-50",
            title: "Contract-to-Hire",
            flow: "Need → Contract → Evaluate → Hire",
            bullets: [
              "Flexible pathway to permanent employment.",
              "Ideal when organisations want to assess talent before permanent hiring.",
              "Reduce hiring risk and improve talent fit.",
            ],
          },
        ],
      },
      process: {
        style: "photos",
        eyebrow: "Our Process",
        title: "From Requirement to Workforce",
        highlight: "Workforce",
        subtitle:
          "A streamlined process designed to deliver the right talent with speed, visibility and control.",
        steps: [
          {
            number: "01",
            icon: ClipboardList,
            title: "Requirement",
            description: "Understand the role, skills and workforce demand.",
            image: unsplash("1517048676732-d65bc937f952"),
          },
          {
            number: "02",
            icon: Search,
            title: "Talent Sourcing",
            description: "Identify relevant contract talent for the requirement.",
            image: unsplash("1551434678-e076c223a692"),
          },
          {
            number: "03",
            icon: ShieldCheck,
            title: "Screening",
            description: "Assess candidates against skills, experience and fit.",
            image: unsplash("1664575602554-2087b04935a5"),
          },
          {
            number: "04",
            icon: CheckCircle2,
            title: "Selection",
            description: "Coordinate interviews and finalize the right candidate.",
            image: unsplash("1543269865-cbf427effbad"),
          },
          {
            number: "05",
            icon: UserPlus,
            title: "Onboarding",
            description: "Manage joining formalities and a seamless start.",
            image: unsplash("1590650153855-d9e808231d41"),
          },
          {
            number: "06",
            icon: Settings,
            title: "Workforce Management",
            description: "Ongoing support through extensions and offboarding.",
            image: unsplash("1556761175-5973dc0f32e7"),
          },
        ],
      },
      whyWeSearch: {
        style: "photo",
        eyebrow: "Why WeSearch",
        title: "Why Choose WeSearch?",
        highlight: "WeSearch?",
        subtitle:
          "More than staffing — we deliver workforce solutions that create real business impact.",
        items: [
          {
            icon: Zap,
            title: "Faster Fulfilment",
            description: "Quick response to changing workforce requirements.",
            image: unsplash("1556761175-b413da4baf72"),
          },
          {
            icon: Users,
            title: "Quality Talent",
            description: "Access to skilled and screened professionals.",
            image: unsplash("1573496359142-b8d87734a5a2"),
          },
          {
            icon: Layers,
            title: "Flexible Engagement",
            description: "Workforce solutions designed around your business needs.",
            image: unsplash("1557804506-669a67965ba0"),
          },
          {
            icon: HeartHandshake,
            title: "End-to-End Support",
            description:
              "Support from requirement through onboarding and workforce management.",
            image: unsplash("1600880292203-757bb62b4baf"),
          },
        ],
      },
      finalCta: {
        eyebrow: "Let's Build Together",
        title: "Ready to Build a More Flexible Workforce?",
        description:
          "Let's discuss your Contract Staffing or Contract-to-Hire requirements.",
        primaryLabel: "Talk to Our Staffing Team →",
        // The content doc's secondary button: straight to the main Contact Us page.
        secondaryLabel: "Contact Us →",
        secondaryHref: "/contact",
        assurances: [
          { icon: Repeat, label: "Contract & Contract-to-Hire models" },
          { icon: ShieldCheck, label: "Screened, project-ready talent" },
          { icon: HeartHandshake, label: "Onboarding to offboarding support" },
        ],
        // The page's own /contract-staffing-cta.png carries a baked-in
        // checkerboard from a bad background cut, so the home page's
        // illustration stands in until a clean export is supplied.
        image: {
          src: "/build-your-workforce.png",
          alt: "Talent connected across a growing workforce network",
          width: 1774,
          height: 887,
        },
      },
    },
  },
  {
    slug: "msp",
    title: "MSP – Managed Service Provider",
    shortTitle: "MSP Solutions",
    description:
      "Structured, SLA-oriented recruitment and staffing support designed to work within enterprise and MSP environments.",
    cta: "Explore MSP Solutions",
    details: [
      "Vendor management system and MSP-aligned engagement models.",
      "SLA-driven delivery across multiple locations and business units.",
      "Consolidated reporting for workforce visibility at scale.",
    ],
    icon: UserPlus,
    colorClass: "bg-emerald-100 text-emerald-600",
    detailPage: {
      hero: {
        eyebrow: "Our Service",
        title: "Simplify. Govern. Optimize Your Contingent Workforce.",
        highlight: "Contingent Workforce.",
        subtitle:
          "Manage your contingent workforce with greater visibility, control and accountability — from requirement management and supplier governance to compliance, performance and reporting.",
        primaryCtaLabel: "Talk to Our MSP Team →",
        secondaryCtaLabel: "Explore Our MSP Capabilities",
        features: [
          { icon: Gauge, label: "Greater Visibility" },
          { icon: ShieldCheck, label: "Governance & Control" },
          { icon: BarChart3, label: "Performance Insights" },
        ],
        badgeItems: [
          { icon: ClipboardCheck, label: "SLA Governance" },
          { icon: Layers, label: "Supplier Scorecards" },
          { icon: BarChart3, label: "Workforce KPIs" },
        ],
        annotation: "One\nGoverned\nEcosystem",
        image: {
          src: "/msp-hero.jpg",
          alt: "A large team gathered around a long boardroom table with laptops",
        },
      },
      solutions: {
        style: "tabs",
        eyebrow: "What We Deliver",
        title: "A More Structured Approach to Contingent Workforce Management",
        highlight: "Contingent Workforce Management",
        subtitle:
          "We bring structure and transparency to your contingent workforce, helping you improve speed, quality, compliance and cost control.",
        // Learn More: the detail lives in the ecosystem and the reasons to choose us.
        items: [
          {
            icon: Users,
            colorClass: "bg-blue-100 text-blue-600",
            title: "Workforce Management",
            description:
              "Structured requirement management, fulfilment tracking and SLA governance.",
            tag: "Requirements & SLAs",
            href: "#ecosystem",
            image: unsplash("1758691737124-05c5bffe46f0"),
          },
          {
            icon: Layers,
            colorClass: "bg-emerald-100 text-emerald-600",
            title: "Supplier Management",
            description:
              "Centralised supplier governance, performance tracking and scorecards.",
            tag: "Supplier Governance",
            href: "#ecosystem",
            image: unsplash("1681505526188-b05e68c77582"),
          },
          {
            icon: ShieldCheck,
            colorClass: "bg-violet-100 text-violet-600",
            title: "Compliance & Control",
            description:
              "Standardised processes for onboarding, documentation, compliance and audit readiness.",
            tag: "Audit Readiness",
            href: "#ecosystem",
            image: unsplash("1699665235382-a6666f77a60e"),
          },
          {
            icon: BarChart3,
            colorClass: "bg-orange-100 text-orange-600",
            title: "Performance & Insights",
            description:
              "Visibility into fulfilment, ageing, supplier performance and workforce KPIs.",
            tag: "Workforce KPIs",
            href: "#why-wesearch",
            image: unsplash("1787647562168-f268c163018e"),
          },
        ],
      },
      ecosystem: {
        eyebrow: "MSP Ecosystem",
        title: "One Governed Workforce Ecosystem",
        highlight: "Workforce Ecosystem",
        subtitle:
          "Connect your workforce stakeholders through a structured MSP framework with clear ownership, governance and performance visibility.",
        layers: [
          { icon: Building2, label: "Hiring Managers / Business" },
          { icon: ShieldCheck, label: "WeSearch MSP", highlight: true },
          { icon: Layers, label: "Staffing Suppliers" },
          { icon: Users, label: "Talent / Workforce" },
        ],
        pillars: [
          "Governance",
          "SLA Management",
          "Compliance",
          "Performance",
          "Reporting",
        ],
        ctaLabel: "Talk to Our MSP Team →",
      },
      whyWeSearch: {
        style: "bento",
        eyebrow: "Why WeSearch",
        title: "Why WeSearch for MSP Workforce Solutions?",
        highlight: "MSP Workforce Solutions?",
        subtitle:
          "Structure, transparency and accountability across your contingent workforce programme.",
        items: [
          {
            icon: ClipboardCheck,
            title: "Structured Governance",
            description: "Standardised processes, SLAs and accountability.",
            image: unsplash("1739298061707-cefee19941b7"),
          },
          {
            icon: Layers,
            title: "Supplier Performance",
            description: "Transparent measurement and supplier scorecards.",
          },
          {
            icon: Gauge,
            title: "Workforce Visibility",
            description: "Clear visibility into requirements, fulfilment and ageing.",
          },
          {
            icon: BarChart3,
            title: "Data-Driven Insights",
            description: "Actionable workforce and supplier performance reporting.",
            image: unsplash("1551288049-bebda4e38f71"),
          },
        ],
      },
      finalCta: {
        eyebrow: "Let's Talk MSP",
        title: "Ready to Bring Greater Control to Your Contingent Workforce?",
        description:
          "Let's discuss how WeSearch can help you build a more structured, transparent and scalable MSP model.",
        primaryLabel: "Talk to Our MSP Team →",
        // The content doc's own secondary button, same as Contract Staffing's.
        secondaryLabel: "Contact Us →",
        secondaryHref: "/contact",
        assurances: [
          { icon: ClipboardCheck, label: "Standardised SLAs & governance" },
          { icon: Layers, label: "Supplier performance scorecards" },
          { icon: BarChart3, label: "Workforce & supplier reporting" },
        ],
      },
    },
  },
  {
    slug: "rpo",
    title: "RPO – Recruitment Process Outsourcing",
    shortTitle: "RPO",
    description:
      "Extend your recruitment capability with flexible, structured hiring support aligned to your workforce requirements and hiring volumes.",
    cta: "Explore RPO",
    details: [
      "Dedicated recruitment teams embedded against your hiring plan.",
      "Scalable support for volume and specialist hiring programs.",
      "Reporting and governance aligned to agreed SLAs.",
    ],
    icon: Target,
    colorClass: "bg-violet-100 text-violet-600",
    detailPage: {
      hero: {
        eyebrow: "Our Service",
        title: "Your Recruitment. Our Expertise. One Seamless Hiring Engine.",
        highlight: "One Seamless Hiring Engine.",
        subtitle:
          "Scale your recruitment capabilities with an RPO model designed to bring talent expertise, process efficiency and delivery consistency to your hiring function.",
        primaryCtaLabel: "Talk to Our RPO Team →",
        secondaryCtaLabel: "Explore Our RPO Solutions",
        features: [
          { icon: TrendingUp, label: "Scalable Delivery" },
          { icon: ClipboardCheck, label: "Process Discipline" },
          { icon: BarChart3, label: "Data-Driven Hiring" },
        ],
        badgeItems: [
          { icon: Users, label: "Dedicated Recruitment Teams" },
          { icon: Gauge, label: "Hiring Metrics & TAT" },
          { icon: Repeat, label: "Continuous Optimisation" },
        ],
        annotation: "One\nHiring\nEngine",
        image: {
          src: "/rpo-hero.jpg",
          alt: "A recruiter in a white blazer interviewing a candidate across an office desk",
        },
      },
      solutions: {
        style: "accordion",
        eyebrow: "Our Solutions",
        title: "Recruitment Support Built Around Your Business",
        highlight: "Your Business",
        subtitle:
          "From full-lifecycle recruitment to targeted project hiring, our RPO models flex to how much support your team needs.",
        // Learn More: the lifecycle is walked through in How It Works, the rest in What RPO Can Deliver.
        items: [
          {
            icon: Repeat,
            colorClass: "bg-blue-100 text-blue-600",
            title: "End-to-End RPO",
            description:
              "Manage the recruitment lifecycle from requirement intake to onboarding, with WeSearch supporting your recruitment operations as an extension of your team.",
            tag: "Full Lifecycle",
            href: "#process",
            image: unsplash("1758518731694-41ea7fa6a2d9"),
          },
          {
            icon: Rocket,
            colorClass: "bg-emerald-100 text-emerald-600",
            title: "Project & Volume Hiring",
            description:
              "Rapidly scale recruitment capacity for high-volume, project-based or time-sensitive hiring requirements.",
            tag: "Scale on Demand",
            href: "#capabilities",
            image: unsplash("1702468049239-49fd1cf99d20"),
          },
          {
            icon: ClipboardCheck,
            colorClass: "bg-violet-100 text-violet-600",
            title: "Recruitment Delivery & Management",
            description:
              "Strengthen recruitment delivery through structured processes, recruiter management, hiring metrics and performance governance.",
            tag: "Process & Governance",
            href: "#capabilities",
            image: unsplash("1622675363311-3e1904dc1885"),
          },
          {
            icon: Search,
            colorClass: "bg-orange-100 text-orange-600",
            title: "Talent & Market Intelligence",
            description:
              "Gain insights into talent availability, hiring trends, sourcing effectiveness and market conditions to support better hiring decisions.",
            tag: "Market Insight",
            href: "#why-wesearch",
            image: unsplash("1460925895917-afdab827c52f"),
          },
        ],
      },
      capabilities: {
        style: "tiles",
        eyebrow: "What RPO Can Deliver",
        title: "From Recruitment Demand to Talent Delivery",
        highlight: "Talent Delivery",
        subtitle: "Structured support across every stage of the hiring funnel.",
        items: [
          {
            icon: ClipboardList,
            title: "Requirement Management",
            description: "Structured intake, prioritisation and hiring coordination.",
          },
          {
            icon: Search,
            title: "Sourcing & Screening",
            description: "Targeted talent sourcing and candidate screening.",
          },
          {
            icon: Users,
            title: "Interview Management",
            description:
              "Interview coordination, feedback tracking and candidate movement.",
          },
          {
            icon: UserPlus,
            title: "Offer & Onboarding",
            description: "Offer coordination and seamless joining processes.",
          },
          {
            icon: BarChart3,
            title: "Recruitment Analytics",
            description: "Visibility into hiring activity, TAT, funnel and performance.",
          },
          {
            icon: Repeat,
            title: "Continuous Optimisation",
            description: "Identify bottlenecks and improve recruitment outcomes.",
          },
        ],
      },
      process: {
        style: "pillars",
        eyebrow: "How It Works",
        title: "A Recruitment Engine Built Around Your Business",
        highlight: "Your Business",
        subtitle:
          "A five-step model that moves from understanding your hiring needs through to continuously improving them.",
        steps: [
          {
            number: "01",
            icon: Search,
            title: "Understand",
            description: "Hiring needs, volumes and existing processes.",
          },
          {
            number: "02",
            icon: Settings,
            title: "Design",
            description: "RPO model, workflows, SLAs and KPIs.",
          },
          {
            number: "03",
            icon: Rocket,
            title: "Deploy",
            description: "Recruitment team, processes and technology.",
          },
          {
            number: "04",
            icon: Users,
            title: "Deliver",
            description: "Source, screen, interview and onboard.",
          },
          {
            number: "05",
            icon: TrendingUp,
            title: "Optimise",
            description: "Measure, analyse and continuously improve.",
          },
        ],
      },
      whyWeSearch: {
        style: "photo",
        eyebrow: "Why WeSearch",
        title: "More Than Recruitment. A Workforce Delivery Partner.",
        highlight: "A Workforce Delivery Partner.",
        subtitle:
          "Recruitment capacity, process discipline and hiring visibility built around your business.",
        items: [
          {
            icon: TrendingUp,
            title: "Scalable Delivery",
            description: "Scale recruitment capacity around your business demand.",
            image: unsplash("1748256622734-92241ae7b43f"),
          },
          {
            icon: ClipboardCheck,
            title: "Process Discipline",
            description: "Structured workflows, SLAs and recruitment governance.",
            image: unsplash("1681949287382-052ea3954a51"),
          },
          {
            icon: Users,
            title: "Talent Expertise",
            description:
              "Access recruitment expertise across skills, functions and markets.",
            image: unsplash("1573496267526-08a69e46a409"),
          },
          {
            icon: BarChart3,
            title: "Data-Driven Hiring",
            description: "Clear visibility into recruitment performance and outcomes.",
            image: unsplash("1526628953301-3e589a6a8b74"),
          },
        ],
      },
      finalCta: {
        eyebrow: "Let's Rethink Recruitment",
        title: "Ready to Rethink Your Recruitment Model?",
        description:
          "Let's discuss how an RPO model can help you build a more scalable and efficient recruitment engine.",
        primaryLabel: "Talk to Our RPO Team →",
        // The content doc's own secondary button, same as Contract Staffing's.
        secondaryLabel: "Contact Us →",
        secondaryHref: "/contact",
        assurances: [
          { icon: TrendingUp, label: "Recruitment capacity that scales" },
          { icon: ClipboardCheck, label: "Structured workflows & SLAs" },
          { icon: BarChart3, label: "Hiring performance visibility" },
        ],
      },
    },
  },
  {
    slug: "payroll-workforce-management",
    title: "Payroll & Workforce Management",
    shortTitle: "Payroll & Workforce Management",
    description:
      "Structured workforce lifecycle, payroll and compliance support for organizations managing contract and temporary workforces.",
    cta: "Explore Workforce Management",
    details: [
      "End-to-end payroll processing for contract and temporary workforce.",
      "Statutory compliance and documentation management.",
      "Lifecycle tracking from onboarding through exit.",
    ],
    icon: Wallet,
    colorClass: "bg-orange-100 text-orange-600",
    detailPage: {
      hero: {
        eyebrow: "Our Service",
        title: "Simplify Payroll. Strengthen Workforce Management.",
        highlight: "Workforce Management.",
        subtitle:
          "Manage your workforce with greater accuracy, compliance and operational control through streamlined payroll and workforce management solutions.",
        primaryCtaLabel: "Talk to Our Payroll Team →",
        secondaryCtaLabel: "Explore Our Solutions",
        features: [
          { icon: Calculator, label: "Accurate Payroll" },
          { icon: ShieldCheck, label: "Compliance Ready" },
          { icon: Gauge, label: "Operational Control" },
        ],
        badgeItems: [
          { icon: CheckCircle2, label: "Timely Payroll Runs" },
          { icon: ShieldCheck, label: "Statutory Compliance" },
          { icon: BarChart3, label: "Workforce Visibility" },
        ],
        annotation: "Payroll\nMade\nSimple",
        image: {
          src: "/payroll-hero.jpg",
          alt: "A businesswoman pointing out figures on a document to a colleague at an office desk",
        },
      },
      solutions: {
        style: "bento",
        eyebrow: "Our Solutions",
        title: "Payroll & Workforce Support Built Around Your Business",
        highlight: "Your Business",
        subtitle:
          "From payroll processing to workforce administration, our solutions are structured to keep your operations accurate, compliant and running on time.",
        // Learn More: each card lands on the part of the page that walks through it.
        items: [
          {
            icon: Calculator,
            colorClass: "bg-blue-100 text-blue-600",
            title: "Payroll Processing",
            description:
              "Accurate and timely payroll processing designed to support your workforce and business requirements.",
            tag: "Accurate & On Time",
            href: "#process",
            image: unsplash("1626266061368-46a8f578ddd6"),
          },
          {
            icon: ShieldCheck,
            colorClass: "bg-emerald-100 text-emerald-600",
            title: "Statutory & Compliance Support",
            description:
              "Support payroll operations with structured processes for statutory requirements and compliance.",
            tag: "Statutory Compliance",
            href: "#capabilities",
            image: unsplash("1635859890085-ec8cb5466806"),
          },
          {
            icon: UserCog,
            colorClass: "bg-violet-100 text-violet-600",
            title: "Workforce Administration",
            description:
              "Manage workforce information, documentation and employee lifecycle activities through a structured operating model.",
            tag: "Employee Lifecycle",
            href: "#capabilities",
            image: unsplash("1569235186275-626cb53b83ce"),
          },
          {
            icon: BarChart3,
            colorClass: "bg-orange-100 text-orange-600",
            title: "Workforce Reporting & Insights",
            description:
              "Gain visibility into workforce data, payroll information and key operational metrics.",
            tag: "Operational Metrics",
            href: "#process",
            image: unsplash("1783115259399-3a5a3e0e4592"),
          },
        ],
      },
      capabilities: {
        style: "list",
        eyebrow: "What We Manage",
        title: "From Payroll Processing to Workforce Administration",
        highlight: "Workforce Administration",
        subtitle:
          "Structured support across the payroll and workforce administration lifecycle.",
        items: [
          {
            icon: Calculator,
            title: "Payroll Processing",
            description: "Monthly payroll preparation and processing.",
          },
          {
            icon: Database,
            title: "Employee Data",
            description:
              "Structured management of employee and workforce information.",
          },
          {
            icon: ShieldCheck,
            title: "Statutory Compliance",
            description:
              "Support for applicable statutory and payroll compliance requirements.",
          },
          {
            icon: FileText,
            title: "Documentation",
            description: "Employee documentation and records management.",
          },
          {
            icon: Repeat,
            title: "Workforce Changes",
            description: "Support for joining, movement, changes and exits.",
          },
          {
            icon: BarChart3,
            title: "Reporting & Insights",
            description:
              "Payroll and workforce reports for operational visibility.",
          },
        ],
      },
      process: {
        style: "timeline",
        eyebrow: "Our Process",
        title: "A Structured Approach to Payroll & Workforce Management",
        highlight: "Workforce Management",
        subtitle:
          "A five-step operating model that keeps every payroll cycle structured, reviewed and reported.",
        steps: [
          {
            number: "01",
            icon: Search,
            title: "Understand",
            description:
              "Workforce structure, payroll requirements and business processes.",
          },
          {
            number: "02",
            icon: Settings,
            title: "Configure",
            description: "Set up payroll processes, data requirements and workflows.",
          },
          {
            number: "03",
            icon: Calculator,
            title: "Process",
            description: "Manage payroll and workforce administration activities.",
          },
          {
            number: "04",
            icon: ClipboardCheck,
            title: "Validate",
            description: "Review payroll inputs, outputs and compliance requirements.",
          },
          {
            number: "05",
            icon: BarChart3,
            title: "Report",
            description:
              "Provide relevant payroll and workforce reports and insights.",
          },
        ],
      },
      whyWeSearch: {
        style: "showcase",
        eyebrow: "Why WeSearch",
        title: "More Than Payroll. A Workforce Operations Partner.",
        highlight: "A Workforce Operations Partner.",
        subtitle:
          "Structured processes, compliance focus and operational visibility across your workforce.",
        items: [
          {
            icon: CheckCircle2,
            title: "Accuracy & Timeliness",
            description:
              "Structured processes designed to support accurate and timely payroll.",
            image: unsplash("1785140629208-a069992af83b"),
          },
          {
            icon: ShieldCheck,
            title: "Compliance Focus",
            description:
              "Processes aligned with applicable payroll and statutory requirements.",
            image: unsplash("1772588627373-729b0f47e5bb"),
          },
          {
            icon: Gauge,
            title: "Operational Control",
            description: "Greater visibility and control over workforce administration.",
            image: unsplash("1789388227187-62020089c359"),
          },
          {
            icon: TrendingUp,
            title: "Scalable Support",
            description: "Solutions that can adapt as your workforce grows.",
            image: unsplash("1770816307800-72ba937620fe"),
          },
        ],
      },
      finalCta: {
        eyebrow: "Let's Talk Payroll",
        title: "Ready to Simplify Your Payroll & Workforce Operations?",
        description:
          "Let's discuss how WeSearch can support your payroll and workforce management requirements.",
        primaryLabel: "Talk to Our Payroll Team →",
        // The content doc's own secondary button, same as Contract Staffing's.
        secondaryLabel: "Contact Us →",
        secondaryHref: "/contact",
        assurances: [
          { icon: Calculator, label: "Accurate, timely payroll cycles" },
          { icon: ShieldCheck, label: "Statutory compliance support" },
          { icon: UserCog, label: "End-to-end workforce administration" },
        ],
      },
    },
  },
  {
    slug: "gcc-hiring",
    title: "GCC Hiring",
    shortTitle: "GCC Hiring",
    description:
      "Support for organizations building and scaling technology, operations and support teams in India.",
    cta: "Explore GCC Hiring",
    details: [
      "Support for greenfield GCC set-up and early team build-out.",
      "Scaling technology, operations and support functions in India.",
      "Market insight on talent availability, compensation and location.",
    ],
    icon: Building2,
    colorClass: "bg-pink-100 text-pink-600",
    detailPage: {
      hero: {
        eyebrow: "Our Service",
        title: "Build Your GCC. Build Your Future Workforce.",
        highlight: "Future Workforce.",
        subtitle:
          "Build and scale your Global Capability Centre with the right talent, hiring strategy and workforce expertise — from initial setup to sustained growth.",
        primaryCtaLabel: "Talk to Our GCC Team →",
        secondaryCtaLabel: "Explore Our GCC Solutions",
        features: [
          { icon: Building2, label: "Setup to Scale" },
          { icon: Target, label: "Specialist Talent" },
          { icon: TrendingUp, label: "Sustained Growth" },
        ],
        badgeItems: [
          { icon: Briefcase, label: "Leadership Hiring" },
          { icon: Target, label: "Specialist & Niche Skills" },
          { icon: TrendingUp, label: "Scalable Team Build-Out" },
        ],
        annotation: "Build\nYour\nGCC",
        image: {
          src: "/gcc-hero.jpg",
          alt: "A bright open-plan office floor with teams working at their desks",
        },
      },
      solutions: {
        style: "stack",
        annotation: "Built to\nScale",
        eyebrow: "Our Solutions",
        title: "GCC Talent Solutions Built Around Your Growth",
        highlight: "Your Growth",
        subtitle:
          "From initial team build-out to sustained growth, our GCC solutions are structured around where your centre is today.",
        // Learn More: the stages of a GCC map onto the process and the support below.
        items: [
          {
            icon: Building2,
            colorClass: "bg-blue-100 text-blue-600",
            title: "GCC Setup & Talent Strategy",
            description:
              "Support your initial GCC talent requirements with structured hiring and workforce planning aligned to your business objectives.",
            tag: "Setup & Strategy",
            href: "#process",
            image: unsplash("1556761175-4b46a572b786"),
          },
          {
            icon: Briefcase,
            colorClass: "bg-emerald-100 text-emerald-600",
            title: "Leadership & Specialist Hiring",
            description:
              "Identify and attract leadership and specialised talent critical to establishing and growing your GCC.",
            tag: "Leadership & Specialists",
            href: "#capabilities",
            image: unsplash("1714974528737-3e6c7e4d11af"),
          },
          {
            icon: Rocket,
            colorClass: "bg-violet-100 text-violet-600",
            title: "GCC Scale-Up Hiring",
            description:
              "Rapidly build teams across functions and skill sets as your GCC expands.",
            tag: "Scale-Up",
            href: "#capabilities",
            image: unsplash("1698680746129-89aea8bb512d"),
          },
          {
            icon: Repeat,
            colorClass: "bg-orange-100 text-orange-600",
            title: "Ongoing Talent Acquisition",
            description:
              "Create a sustainable talent pipeline to support continuous GCC growth and evolving business requirements.",
            tag: "Sustained Growth",
            href: "#process",
            image: unsplash("1443527394413-4b820fd08dde"),
          },
        ],
      },
      capabilities: {
        style: "tabs",
        eyebrow: "What We Support",
        title: "From GCC Vision to Talent Delivery",
        highlight: "Talent Delivery",
        subtitle:
          "Support across the talent lifecycle as your Global Capability Centre takes shape and grows.",
        items: [
          {
            icon: ClipboardList,
            title: "Workforce Planning",
            description: "Understand talent requirements aligned to GCC growth plans.",
            image: unsplash("1573167507387-6b4b98cb7c13"),
          },
          {
            icon: Search,
            title: "Talent Mapping",
            description: "Identify relevant talent pools, skills and market availability.",
            image: unsplash("1596176530529-78163a4f7af2"),
          },
          {
            icon: Briefcase,
            title: "Leadership Hiring",
            description:
              "Build the leadership layer required to establish and scale your GCC.",
            image: unsplash("1758518730264-9235a1e5416b"),
          },
          {
            icon: Target,
            title: "Specialist Hiring",
            description: "Access niche and specialised talent across critical functions.",
            image: unsplash("1766066014773-0074bf4911de"),
          },
          {
            icon: Users,
            title: "Volume Hiring",
            description: "Scale recruitment for growing teams and multiple functions.",
            image: unsplash("1664651205193-bfb6bfdd3b09"),
          },
          {
            icon: TrendingUp,
            title: "Talent Pipeline",
            description: "Build sustainable talent pipelines for future GCC requirements.",
            image: unsplash("1573497491208-6b1acb260507"),
          },
        ],
      },
      process: {
        style: "roadmap",
        eyebrow: "Our Process",
        title: "A Structured Approach to Building Your GCC",
        highlight: "Building Your GCC",
        subtitle:
          "A five-step approach that moves from GCC objectives through to a talent pipeline built for growth.",
        steps: [
          {
            number: "01",
            icon: Search,
            title: "Understand",
            description:
              "GCC objectives, functions, locations and workforce requirements.",
          },
          {
            number: "02",
            icon: ClipboardList,
            title: "Plan",
            description:
              "Define talent strategy, hiring priorities and workforce requirements.",
          },
          {
            number: "03",
            icon: Target,
            title: "Identify",
            description:
              "Map talent pools and identify relevant leadership and specialist talent.",
          },
          {
            number: "04",
            icon: UserPlus,
            title: "Hire",
            description: "Source, assess and onboard the right talent.",
          },
          {
            number: "05",
            icon: TrendingUp,
            title: "Scale",
            description:
              "Build sustainable talent pipelines to support continued GCC growth.",
          },
        ],
      },
      whyWeSearch: {
        style: "accordion",
        eyebrow: "Why WeSearch",
        title: "Your GCC Talent Partner",
        highlight: "GCC Talent Partner",
        subtitle:
          "Talent expertise, market access and scalable hiring for organisations building Global Capability Centres.",
        items: [
          {
            icon: Building2,
            title: "GCC Talent Expertise",
            description: "Understand the talent requirements of growing GCCs.",
            image: unsplash("1684394133149-01dce5a60e45"),
          },
          {
            icon: Target,
            title: "Strategic Talent Access",
            description: "Reach leadership, specialist and high-demand talent pools.",
            image: unsplash("1758518731706-be5d5230e5a5"),
          },
          {
            icon: TrendingUp,
            title: "Scalable Hiring",
            description:
              "Support hiring from initial teams through large-scale expansion.",
            image: unsplash("1748256467077-c75ef01579aa"),
          },
          {
            icon: HeartHandshake,
            title: "Long-Term Partnership",
            description:
              "Build talent capability that supports your GCC beyond the initial hiring phase.",
            image: unsplash("1758519288905-38b7b00c1023"),
          },
        ],
      },
      finalCta: {
        eyebrow: "Let's Build Your GCC",
        title: "Ready to Build or Scale Your GCC?",
        description:
          "Let's discuss how WeSearch can support your GCC talent and hiring requirements.",
        primaryLabel: "Talk to Our GCC Team →",
        // The content doc's own secondary button, same as Contract Staffing's.
        secondaryLabel: "Contact Us →",
        secondaryHref: "/contact",
        assurances: [
          { icon: Building2, label: "Setup to scale-up hiring" },
          { icon: Target, label: "Leadership & specialist talent" },
          { icon: TrendingUp, label: "Sustainable talent pipelines" },
        ],
      },
    },
  },
  {
    slug: "permanent-hiring",
    title: "Permanent Hiring",
    shortTitle: "Permanent Hiring",
    description:
      "Identify and hire the right talent across technology and business functions through focused, market-aligned recruitment.",
    cta: "Explore Permanent Hiring",
    details: [
      "Role scoping and market mapping aligned to your hiring priorities.",
      "Structured sourcing, screening and shortlisting for technology and business functions.",
      "Coordinated interview and offer management through to closure.",
    ],
    icon: Briefcase,
    colorClass: "bg-teal-100 text-teal-600",
    detailPage: {
      hero: {
        eyebrow: "Our Service",
        title: "The Right Talent. The Right Fit. For the Long Term.",
        highlight: "For the Long Term.",
        subtitle:
          "Find and hire the professionals who can make a lasting impact on your business. Our Permanent Hiring Solutions combine market reach, talent expertise and a structured recruitment process to help you hire with confidence.",
        primaryCtaLabel: "Talk to Our Hiring Team →",
        secondaryCtaLabel: "Explore Our Solutions",
        features: [
          { icon: Target, label: "Quality of Hire" },
          { icon: Zap, label: "Speed to Hire" },
          { icon: Search, label: "Market Reach" },
        ],
        badgeItems: [
          { icon: Briefcase, label: "Leadership & Specialist Roles" },
          { icon: CheckCircle2, label: "Structured Screening" },
          { icon: HeartHandshake, label: "Candidate Experience" },
        ],
        annotation: "Right\nFit\nLong\nTerm",
        image: {
          src: "/permanent-hiring-hero.jpg",
          alt: "Two professionals shaking hands across an office table",
        },
      },
      solutions: {
        style: "accordion",
        eyebrow: "Our Solutions",
        title: "Hiring Solutions Built Around Your Business",
        highlight: "Your Business",
        subtitle:
          "From critical leadership appointments to multi-role hiring programs, our solutions adapt to the roles you need to fill.",
        // Learn More: the priorities and the approach below explain how each is delivered.
        items: [
          {
            icon: Briefcase,
            colorClass: "bg-blue-100 text-blue-600",
            title: "Executive & Leadership Hiring",
            description:
              "Identify and attract experienced professionals for critical leadership and senior management positions.",
            tag: "Leadership Hiring",
            href: "#focus",
            image: unsplash("1714974528692-31aff2c54a62"),
          },
          {
            icon: Target,
            colorClass: "bg-emerald-100 text-emerald-600",
            title: "Specialist & Professional Hiring",
            description:
              "Access qualified talent across specialised functions, skills and business domains.",
            tag: "Specialist Talent",
            href: "#focus",
            image: unsplash("1758691737003-2edd1be8b891"),
          },
          {
            icon: Users,
            colorClass: "bg-violet-100 text-violet-600",
            title: "Volume Permanent Hiring",
            description:
              "Scale hiring for multiple positions while maintaining consistency in screening, quality and candidate experience.",
            tag: "Hiring at Scale",
            href: "#process",
            image: unsplash("1716703742352-0bbdb45f505b"),
          },
          {
            icon: Search,
            colorClass: "bg-orange-100 text-orange-600",
            title: "Market & Talent Search",
            description:
              "Leverage targeted sourcing and market intelligence to identify the right talent, including hard-to-find and niche profiles.",
            tag: "Targeted Sourcing",
            href: "#process",
            image: unsplash("1698047681432-006d2449c631"),
          },
        ],
      },
      process: {
        style: "photos",
        eyebrow: "Our Recruitment Approach",
        title: "From Requirement to Right Hire",
        highlight: "Right Hire",
        subtitle:
          "A structured five-step approach that runs from understanding the role through to the candidate joining.",
        steps: [
          {
            number: "01",
            icon: ClipboardList,
            title: "Understand",
            description:
              "Deep-dive into the role, business context and hiring expectations.",
            image: unsplash("1573496130407-57329f01f769"),
          },
          {
            number: "02",
            icon: Search,
            title: "Source",
            description:
              "Identify relevant talent through targeted sourcing and market reach.",
            image: unsplash("1542744173-05336fcc7ad4"),
          },
          {
            number: "03",
            icon: ShieldCheck,
            title: "Assess",
            description: "Screen candidates against skills, experience and role fit.",
            image: unsplash("1626105985445-6430a31f6f96"),
          },
          {
            number: "04",
            icon: CheckCircle2,
            title: "Select",
            description: "Coordinate interviews, feedback and offer discussions.",
            image: unsplash("1758518732175-5d608ba3abdf"),
          },
          {
            number: "05",
            icon: UserPlus,
            title: "Hire",
            description: "Support the candidate through offer acceptance and joining.",
            image: unsplash("1565688335719-d0297c355556"),
          },
        ],
      },
      focusAreas: {
        eyebrow: "Our Focus",
        title: "What We Focus On",
        highlight: "Focus On",
        subtitle:
          "The priorities that shape how we approach every permanent hiring requirement.",
        items: [
          {
            icon: Target,
            title: "Quality of Hire",
            description: "Focus on capability, experience and long-term role fit.",
          },
          {
            icon: Zap,
            title: "Speed to Hire",
            description: "Structured processes to reduce recruitment turnaround time.",
          },
          {
            icon: Search,
            title: "Talent Access",
            description:
              "Reach across relevant talent pools, including specialised and niche skills.",
          },
          {
            icon: HeartHandshake,
            title: "Candidate Experience",
            description:
              "A professional and transparent journey from first interaction to joining.",
          },
        ],
      },
      whyWeSearch: {
        style: "glow",
        eyebrow: "Why WeSearch",
        title: "More Than Hiring. Building the Right Team.",
        highlight: "Building the Right Team.",
        subtitle:
          "Recruitment expertise, structured delivery and market reach behind every permanent hire.",
        items: [
          {
            icon: Users,
            title: "Talent Expertise",
            description: "Recruitment expertise across functions, skills and markets.",
          },
          {
            icon: ClipboardCheck,
            title: "Structured Process",
            description: "Consistent screening, assessment and hiring workflows.",
          },
          {
            icon: Search,
            title: "Market Reach",
            description: "Access to active and passive talent pools.",
          },
          {
            icon: TrendingUp,
            title: "Outcome Focused",
            description: "Focused on quality, speed and successful hiring outcomes.",
          },
        ],
      },
      finalCta: {
        eyebrow: "Let's Find Your Next Hire",
        title: "Looking for the Right Talent to Drive Your Business Forward?",
        description: "Let's discuss your permanent hiring requirements.",
        primaryLabel: "Talk to Our Hiring Team →",
        // The content doc's own secondary button, same as Contract Staffing's.
        secondaryLabel: "Contact Us →",
        secondaryHref: "/contact",
        assurances: [
          { icon: Briefcase, label: "Leadership to specialist roles" },
          { icon: ClipboardCheck, label: "Structured screening & assessment" },
          { icon: HeartHandshake, label: "Transparent candidate experience" },
        ],
      },
    },
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
