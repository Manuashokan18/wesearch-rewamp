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

type SectionIntro = { eyebrow: string; title: string; subtitle: string };

type IconListSection = SectionIntro & {
  items: { icon: LucideIcon; title: string; description: string }[];
};

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
    image: { src: string; alt: string };
  };
  solutions: SectionIntro & {
    items: { icon: LucideIcon; colorClass: string; title: string; description: string }[];
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
  /** Icon list rendered before the process section. */
  capabilities?: IconListSection;
  /** Stakeholder flow diagram, e.g. the MSP operating model. */
  ecosystem?: SectionIntro & {
    layers: { icon: LucideIcon; label: string; highlight?: boolean }[];
    pillars: string[];
    ctaLabel: string;
  };
  process?: SectionIntro & { steps: ProcessStep[] };
  /** Icon list rendered after the process section. */
  focusAreas?: IconListSection;
  whyWeSearch: IconListSection;
  finalCta: {
    eyebrow: string;
    title: string;
    description: string;
    primaryLabel: string;
    secondaryLabel: string;
    assurances: { icon: LucideIcon; label: string }[];
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
          src: "/contract-staffing-hero.png",
          alt: "WeSearch contract staffing professional at work",
        },
      },
      solutions: {
        eyebrow: "Our Solutions",
        title: "Workforce Solutions Built Around Your Hiring Needs",
        subtitle:
          "From short-term support to long-term workforce planning, we offer flexible solutions to help you find, engage and retain the right talent.",
        items: [
          {
            icon: Users,
            colorClass: "bg-blue-100 text-blue-600",
            title: "Contract Staffing",
            description:
              "Build workforce capacity quickly with skilled professionals engaged for project-based, seasonal or ongoing requirements.",
          },
          {
            icon: FileText,
            colorClass: "bg-emerald-100 text-emerald-600",
            title: "Contract-to-Hire",
            description:
              "Evaluate talent on the job before making a long-term hiring decision, with a flexible path from contract engagement to permanent employment.",
          },
          {
            icon: Rocket,
            colorClass: "bg-violet-100 text-violet-600",
            title: "Rapid Workforce Deployment",
            description:
              "Accelerate hiring and onboarding for urgent and high-volume workforce requirements.",
          },
          {
            icon: Sparkles,
            colorClass: "bg-orange-100 text-orange-600",
            title: "Workforce Flexibility",
            description:
              "Scale your workforce based on business demand, project requirements and changing priorities.",
          },
        ],
      },
      comparison: {
        eyebrow: "Hire Smarter",
        title: "Choose the Right Workforce Model",
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
        eyebrow: "Our Process",
        title: "From Requirement to Workforce",
        subtitle:
          "A streamlined process designed to deliver the right talent with speed, visibility and control.",
        steps: [
          {
            number: "01",
            icon: ClipboardList,
            title: "Requirement",
            description: "Understand the role, skills and workforce demand.",
          },
          {
            number: "02",
            icon: Search,
            title: "Talent Sourcing",
            description: "Identify relevant contract talent for the requirement.",
          },
          {
            number: "03",
            icon: ShieldCheck,
            title: "Screening",
            description: "Assess candidates against skills, experience and fit.",
          },
          {
            number: "04",
            icon: CheckCircle2,
            title: "Selection",
            description: "Coordinate interviews and finalize the right candidate.",
          },
          {
            number: "05",
            icon: UserPlus,
            title: "Onboarding",
            description: "Manage joining formalities and a seamless start.",
          },
          {
            number: "06",
            icon: Settings,
            title: "Workforce Management",
            description: "Ongoing support through extensions and offboarding.",
          },
        ],
      },
      whyWeSearch: {
        eyebrow: "Why WeSearch",
        title: "Why Choose WeSearch?",
        subtitle:
          "More than staffing — we deliver workforce solutions that create real business impact.",
        items: [
          {
            icon: Zap,
            title: "Faster Fulfilment",
            description: "Quick response to changing workforce requirements.",
          },
          {
            icon: Users,
            title: "Quality Talent",
            description: "Access to skilled and screened professionals.",
          },
          {
            icon: Layers,
            title: "Flexible Engagement",
            description: "Workforce solutions designed around your business needs.",
          },
          {
            icon: HeartHandshake,
            title: "End-to-End Support",
            description:
              "Support from requirement through onboarding and workforce management.",
          },
        ],
      },
      finalCta: {
        eyebrow: "Let's Build Together",
        title: "Ready to Build a More Flexible Workforce?",
        description:
          "Let's discuss your Contract Staffing or Contract-to-Hire requirements.",
        primaryLabel: "Talk to Our Staffing Team →",
        secondaryLabel: "Explore All Services",
        assurances: [
          { icon: Repeat, label: "Contract & Contract-to-Hire models" },
          { icon: ShieldCheck, label: "Screened, project-ready talent" },
          { icon: HeartHandshake, label: "Onboarding to offboarding support" },
        ],
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
          src: "/hero-people.png",
          alt: "WeSearch MSP workforce team at work",
        },
      },
      solutions: {
        eyebrow: "What We Deliver",
        title: "A More Structured Approach to Contingent Workforce Management",
        subtitle:
          "We bring structure and transparency to your contingent workforce, helping you improve speed, quality, compliance and cost control.",
        items: [
          {
            icon: Users,
            colorClass: "bg-blue-100 text-blue-600",
            title: "Workforce Management",
            description:
              "Structured requirement management, fulfilment tracking and SLA governance.",
          },
          {
            icon: Layers,
            colorClass: "bg-emerald-100 text-emerald-600",
            title: "Supplier Management",
            description:
              "Centralised supplier governance, performance tracking and scorecards.",
          },
          {
            icon: ShieldCheck,
            colorClass: "bg-violet-100 text-violet-600",
            title: "Compliance & Control",
            description:
              "Standardised processes for onboarding, documentation, compliance and audit readiness.",
          },
          {
            icon: BarChart3,
            colorClass: "bg-orange-100 text-orange-600",
            title: "Performance & Insights",
            description:
              "Visibility into fulfilment, ageing, supplier performance and workforce KPIs.",
          },
        ],
      },
      ecosystem: {
        eyebrow: "MSP Ecosystem",
        title: "One Governed Workforce Ecosystem",
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
        eyebrow: "Why WeSearch",
        title: "Why WeSearch for MSP Workforce Solutions?",
        subtitle:
          "Structure, transparency and accountability across your contingent workforce programme.",
        items: [
          {
            icon: ClipboardCheck,
            title: "Structured Governance",
            description: "Standardised processes, SLAs and accountability.",
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
          },
        ],
      },
      finalCta: {
        eyebrow: "Let's Talk MSP",
        title: "Ready to Bring Greater Control to Your Contingent Workforce?",
        description:
          "Let's discuss how WeSearch can help you build a more structured, transparent and scalable MSP model.",
        primaryLabel: "Talk to Our MSP Team →",
        secondaryLabel: "Explore All Services",
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
          src: "/hero-people.png",
          alt: "WeSearch RPO recruitment team at work",
        },
      },
      solutions: {
        eyebrow: "Our Solutions",
        title: "Recruitment Support Built Around Your Business",
        subtitle:
          "From full-lifecycle recruitment to targeted project hiring, our RPO models flex to how much support your team needs.",
        items: [
          {
            icon: Repeat,
            colorClass: "bg-blue-100 text-blue-600",
            title: "End-to-End RPO",
            description:
              "Manage the recruitment lifecycle from requirement intake to onboarding, with WeSearch supporting your recruitment operations as an extension of your team.",
          },
          {
            icon: Rocket,
            colorClass: "bg-emerald-100 text-emerald-600",
            title: "Project & Volume Hiring",
            description:
              "Rapidly scale recruitment capacity for high-volume, project-based or time-sensitive hiring requirements.",
          },
          {
            icon: ClipboardCheck,
            colorClass: "bg-violet-100 text-violet-600",
            title: "Recruitment Delivery & Management",
            description:
              "Strengthen recruitment delivery through structured processes, recruiter management, hiring metrics and performance governance.",
          },
          {
            icon: Search,
            colorClass: "bg-orange-100 text-orange-600",
            title: "Talent & Market Intelligence",
            description:
              "Gain insights into talent availability, hiring trends, sourcing effectiveness and market conditions to support better hiring decisions.",
          },
        ],
      },
      capabilities: {
        eyebrow: "What RPO Can Deliver",
        title: "From Recruitment Demand to Talent Delivery",
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
        eyebrow: "How It Works",
        title: "A Recruitment Engine Built Around Your Business",
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
        eyebrow: "Why WeSearch",
        title: "More Than Recruitment. A Workforce Delivery Partner.",
        subtitle:
          "Recruitment capacity, process discipline and hiring visibility built around your business.",
        items: [
          {
            icon: TrendingUp,
            title: "Scalable Delivery",
            description: "Scale recruitment capacity around your business demand.",
          },
          {
            icon: ClipboardCheck,
            title: "Process Discipline",
            description: "Structured workflows, SLAs and recruitment governance.",
          },
          {
            icon: Users,
            title: "Talent Expertise",
            description:
              "Access recruitment expertise across skills, functions and markets.",
          },
          {
            icon: BarChart3,
            title: "Data-Driven Hiring",
            description: "Clear visibility into recruitment performance and outcomes.",
          },
        ],
      },
      finalCta: {
        eyebrow: "Let's Rethink Recruitment",
        title: "Ready to Rethink Your Recruitment Model?",
        description:
          "Let's discuss how an RPO model can help you build a more scalable and efficient recruitment engine.",
        primaryLabel: "Talk to Our RPO Team →",
        secondaryLabel: "Explore All Services",
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
          src: "/hero-people.png",
          alt: "WeSearch payroll and workforce management team at work",
        },
      },
      solutions: {
        eyebrow: "Our Solutions",
        title: "Payroll & Workforce Support Built Around Your Business",
        subtitle:
          "From payroll processing to workforce administration, our solutions are structured to keep your operations accurate, compliant and running on time.",
        items: [
          {
            icon: Calculator,
            colorClass: "bg-blue-100 text-blue-600",
            title: "Payroll Processing",
            description:
              "Accurate and timely payroll processing designed to support your workforce and business requirements.",
          },
          {
            icon: ShieldCheck,
            colorClass: "bg-emerald-100 text-emerald-600",
            title: "Statutory & Compliance Support",
            description:
              "Support payroll operations with structured processes for statutory requirements and compliance.",
          },
          {
            icon: UserCog,
            colorClass: "bg-violet-100 text-violet-600",
            title: "Workforce Administration",
            description:
              "Manage workforce information, documentation and employee lifecycle activities through a structured operating model.",
          },
          {
            icon: BarChart3,
            colorClass: "bg-orange-100 text-orange-600",
            title: "Workforce Reporting & Insights",
            description:
              "Gain visibility into workforce data, payroll information and key operational metrics.",
          },
        ],
      },
      capabilities: {
        eyebrow: "What We Manage",
        title: "From Payroll Processing to Workforce Administration",
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
        eyebrow: "Our Process",
        title: "A Structured Approach to Payroll & Workforce Management",
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
        eyebrow: "Why WeSearch",
        title: "More Than Payroll. A Workforce Operations Partner.",
        subtitle:
          "Structured processes, compliance focus and operational visibility across your workforce.",
        items: [
          {
            icon: CheckCircle2,
            title: "Accuracy & Timeliness",
            description:
              "Structured processes designed to support accurate and timely payroll.",
          },
          {
            icon: ShieldCheck,
            title: "Compliance Focus",
            description:
              "Processes aligned with applicable payroll and statutory requirements.",
          },
          {
            icon: Gauge,
            title: "Operational Control",
            description: "Greater visibility and control over workforce administration.",
          },
          {
            icon: TrendingUp,
            title: "Scalable Support",
            description: "Solutions that can adapt as your workforce grows.",
          },
        ],
      },
      finalCta: {
        eyebrow: "Let's Talk Payroll",
        title: "Ready to Simplify Your Payroll & Workforce Operations?",
        description:
          "Let's discuss how WeSearch can support your payroll and workforce management requirements.",
        primaryLabel: "Talk to Our Payroll Team →",
        secondaryLabel: "Explore All Services",
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
          src: "/hero-people.png",
          alt: "WeSearch GCC hiring team at work",
        },
      },
      solutions: {
        eyebrow: "Our Solutions",
        title: "GCC Talent Solutions Built Around Your Growth",
        subtitle:
          "From initial team build-out to sustained growth, our GCC solutions are structured around where your centre is today.",
        items: [
          {
            icon: Building2,
            colorClass: "bg-blue-100 text-blue-600",
            title: "GCC Setup & Talent Strategy",
            description:
              "Support your initial GCC talent requirements with structured hiring and workforce planning aligned to your business objectives.",
          },
          {
            icon: Briefcase,
            colorClass: "bg-emerald-100 text-emerald-600",
            title: "Leadership & Specialist Hiring",
            description:
              "Identify and attract leadership and specialised talent critical to establishing and growing your GCC.",
          },
          {
            icon: Rocket,
            colorClass: "bg-violet-100 text-violet-600",
            title: "GCC Scale-Up Hiring",
            description:
              "Rapidly build teams across functions and skill sets as your GCC expands.",
          },
          {
            icon: Repeat,
            colorClass: "bg-orange-100 text-orange-600",
            title: "Ongoing Talent Acquisition",
            description:
              "Create a sustainable talent pipeline to support continuous GCC growth and evolving business requirements.",
          },
        ],
      },
      capabilities: {
        eyebrow: "What We Support",
        title: "From GCC Vision to Talent Delivery",
        subtitle:
          "Support across the talent lifecycle as your Global Capability Centre takes shape and grows.",
        items: [
          {
            icon: ClipboardList,
            title: "Workforce Planning",
            description: "Understand talent requirements aligned to GCC growth plans.",
          },
          {
            icon: Search,
            title: "Talent Mapping",
            description: "Identify relevant talent pools, skills and market availability.",
          },
          {
            icon: Briefcase,
            title: "Leadership Hiring",
            description:
              "Build the leadership layer required to establish and scale your GCC.",
          },
          {
            icon: Target,
            title: "Specialist Hiring",
            description: "Access niche and specialised talent across critical functions.",
          },
          {
            icon: Users,
            title: "Volume Hiring",
            description: "Scale recruitment for growing teams and multiple functions.",
          },
          {
            icon: TrendingUp,
            title: "Talent Pipeline",
            description: "Build sustainable talent pipelines for future GCC requirements.",
          },
        ],
      },
      process: {
        eyebrow: "Our Process",
        title: "A Structured Approach to Building Your GCC",
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
        eyebrow: "Why WeSearch",
        title: "Your GCC Talent Partner",
        subtitle:
          "Talent expertise, market access and scalable hiring for organisations building Global Capability Centres.",
        items: [
          {
            icon: Building2,
            title: "GCC Talent Expertise",
            description: "Understand the talent requirements of growing GCCs.",
          },
          {
            icon: Target,
            title: "Strategic Talent Access",
            description: "Reach leadership, specialist and high-demand talent pools.",
          },
          {
            icon: TrendingUp,
            title: "Scalable Hiring",
            description:
              "Support hiring from initial teams through large-scale expansion.",
          },
          {
            icon: HeartHandshake,
            title: "Long-Term Partnership",
            description:
              "Build talent capability that supports your GCC beyond the initial hiring phase.",
          },
        ],
      },
      finalCta: {
        eyebrow: "Let's Build Your GCC",
        title: "Ready to Build or Scale Your GCC?",
        description:
          "Let's discuss how WeSearch can support your GCC talent and hiring requirements.",
        primaryLabel: "Talk to Our GCC Team →",
        secondaryLabel: "Explore All Services",
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
          src: "/hero-people.png",
          alt: "WeSearch permanent hiring team at work",
        },
      },
      solutions: {
        eyebrow: "Our Solutions",
        title: "Hiring Solutions Built Around Your Business",
        subtitle:
          "From critical leadership appointments to multi-role hiring programs, our solutions adapt to the roles you need to fill.",
        items: [
          {
            icon: Briefcase,
            colorClass: "bg-blue-100 text-blue-600",
            title: "Executive & Leadership Hiring",
            description:
              "Identify and attract experienced professionals for critical leadership and senior management positions.",
          },
          {
            icon: Target,
            colorClass: "bg-emerald-100 text-emerald-600",
            title: "Specialist & Professional Hiring",
            description:
              "Access qualified talent across specialised functions, skills and business domains.",
          },
          {
            icon: Users,
            colorClass: "bg-violet-100 text-violet-600",
            title: "Volume Permanent Hiring",
            description:
              "Scale hiring for multiple positions while maintaining consistency in screening, quality and candidate experience.",
          },
          {
            icon: Search,
            colorClass: "bg-orange-100 text-orange-600",
            title: "Market & Talent Search",
            description:
              "Leverage targeted sourcing and market intelligence to identify the right talent, including hard-to-find and niche profiles.",
          },
        ],
      },
      process: {
        eyebrow: "Our Recruitment Approach",
        title: "From Requirement to Right Hire",
        subtitle:
          "A structured five-step approach that runs from understanding the role through to the candidate joining.",
        steps: [
          {
            number: "01",
            icon: ClipboardList,
            title: "Understand",
            description:
              "Deep-dive into the role, business context and hiring expectations.",
          },
          {
            number: "02",
            icon: Search,
            title: "Source",
            description:
              "Identify relevant talent through targeted sourcing and market reach.",
          },
          {
            number: "03",
            icon: ShieldCheck,
            title: "Assess",
            description: "Screen candidates against skills, experience and role fit.",
          },
          {
            number: "04",
            icon: CheckCircle2,
            title: "Select",
            description: "Coordinate interviews, feedback and offer discussions.",
          },
          {
            number: "05",
            icon: UserPlus,
            title: "Hire",
            description: "Support the candidate through offer acceptance and joining.",
          },
        ],
      },
      focusAreas: {
        eyebrow: "Our Focus",
        title: "What We Focus On",
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
        eyebrow: "Why WeSearch",
        title: "More Than Hiring. Building the Right Team.",
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
        secondaryLabel: "Explore All Services",
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
