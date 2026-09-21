/**
 * Current Open Positions.
 *
 * `JobPosting` is the standardised template every role must follow before it is
 * published to the website. Add a new role by appending an entry below and
 * filling in every required field; the careers page picks it up automatically.
 *
 * The authoring guide lives in `docs/content/careers-open-positions.md`.
 */

export type EmploymentType =
  | "Full-time"
  | "Contract"
  | "Contract-to-Hire"
  | "Part-time"
  | "Internship";

export type WorkMode = "On-site" | "Hybrid" | "Remote";

export type JobPosting = {
  /** Stable, unique reference used in the application subject line. Never reuse. */
  id: string;
  /** URL-safe identifier, kebab-case. */
  slug: string;
  title: string;
  department: string;
  location: string;
  workMode: WorkMode;
  employmentType: EmploymentType;
  /** Human-readable experience band, e.g. "3-5 years". */
  experience: string;
  /** ISO date (YYYY-MM-DD) the role was published. Drives the sort order. */
  postedOn: string;
  /** Two or three sentences on the role. */
  summary: string;
  responsibilities: string[];
  requirements: string[];
  /** Optional nice-to-haves. Omit rather than leaving empty. */
  preferred?: string[];
  /** Set false to retire a role without deleting its record. */
  active: boolean;
};

export const jobPostings: JobPosting[] = [
  {
    id: "WS-2026-001",
    slug: "senior-technical-recruiter",
    title: "Senior Technical Recruiter",
    department: "Recruitment Delivery",
    location: "Chennai, India",
    workMode: "Hybrid",
    employmentType: "Full-time",
    experience: "4-7 years",
    postedOn: "2026-09-01",
    summary:
      "Own end-to-end hiring for enterprise technology mandates across our staffing and RPO accounts. You will partner directly with client hiring managers, run structured intake sessions and build pipelines for niche engineering roles.",
    responsibilities: [
      "Run requirement intake sessions with client hiring managers and translate them into sourcing strategies.",
      "Build and maintain talent pipelines for engineering, data and cloud roles.",
      "Screen, assess and shortlist candidates against defined role scorecards.",
      "Coordinate interviews, feedback cycles and offer discussions.",
      "Maintain accurate pipeline data and share weekly delivery reporting.",
    ],
    requirements: [
      "4+ years of technical recruitment experience in staffing, RPO or an in-house team.",
      "Proven track record hiring for software engineering or infrastructure roles.",
      "Hands-on experience with an applicant tracking system and modern sourcing tools.",
      "Strong written and verbal communication with client-facing confidence.",
    ],
    preferred: [
      "Exposure to GCC or captive-centre hiring.",
      "Experience working to contractual SLAs in a managed delivery model.",
    ],
    active: true,
  },
  {
    id: "WS-2026-002",
    slug: "account-manager-staffing",
    title: "Account Manager — Staffing",
    department: "Client Success",
    location: "Dubai, UAE",
    workMode: "On-site",
    employmentType: "Full-time",
    experience: "5-8 years",
    postedOn: "2026-08-18",
    summary:
      "Act as the commercial and delivery owner for a portfolio of staffing accounts in the Middle East. You will grow existing relationships, govern delivery performance and act as the escalation point for your clients.",
    responsibilities: [
      "Own revenue, margin and renewal targets for an assigned account portfolio.",
      "Run monthly and quarterly governance reviews with client stakeholders.",
      "Work with delivery leads to keep fulfilment against SLA on track.",
      "Identify expansion opportunities across additional business units.",
      "Resolve escalations on contractor performance, compliance and payroll.",
    ],
    requirements: [
      "5+ years in account management within staffing, workforce or professional services.",
      "Demonstrated ownership of commercial targets and client P&L.",
      "Working knowledge of contract staffing operations and compliance in the GCC region.",
      "Comfortable presenting to senior client stakeholders.",
    ],
    active: true,
  },
  {
    id: "WS-2026-003",
    slug: "payroll-compliance-specialist",
    title: "Payroll & Compliance Specialist",
    department: "Workforce Operations",
    location: "Chennai, India",
    workMode: "Hybrid",
    employmentType: "Full-time",
    experience: "3-6 years",
    postedOn: "2026-08-05",
    summary:
      "Run accurate, on-time payroll for our contract workforce and keep statutory compliance airtight across multiple jurisdictions. This role sits at the centre of our managed workforce delivery.",
    responsibilities: [
      "Process monthly payroll cycles for contract staff across India and the Middle East.",
      "Maintain statutory compliance records, filings and audit documentation.",
      "Handle contractor queries on pay, deductions and reimbursements.",
      "Reconcile timesheets, invoices and client billing inputs.",
      "Support internal and client-led compliance audits.",
    ],
    requirements: [
      "3+ years running payroll operations, ideally for a contract or contingent workforce.",
      "Strong working knowledge of Indian statutory requirements (PF, ESI, PT, TDS).",
      "High attention to detail with advanced spreadsheet skills.",
      "Ability to handle confidential data with discretion.",
    ],
    preferred: ["Experience with multi-country payroll.", "Exposure to VMS or MSP tooling."],
    active: true,
  },
];

/** Active roles, newest first. */
export const openPositions: JobPosting[] = jobPostings
  .filter((job) => job.active)
  .sort((a, b) => b.postedOn.localeCompare(a.postedOn));

export function getJobBySlug(slug: string): JobPosting | undefined {
  return jobPostings.find((job) => job.slug === slug);
}

/** Distinct values used to build the careers page filters. */
export function jobFilterOptions(jobs: JobPosting[] = openPositions) {
  const unique = (values: string[]) => Array.from(new Set(values)).sort();
  return {
    departments: unique(jobs.map((job) => job.department)),
    locations: unique(jobs.map((job) => job.location)),
    employmentTypes: unique(jobs.map((job) => job.employmentType)),
  };
}
