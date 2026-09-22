"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Building2,
  ChevronDown,
  Clock,
  MapPin,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatedContainer } from "@/components/ui/animated-container";
import type { JobPosting } from "@/lib/data/jobs";
import { jobFilterOptions } from "@/lib/data/jobs";
import { ProfileForm } from "./ProfileForm";

const ALL = "All";
/** A role is badged "New" for this many days after its `postedOn` date. */
const NEW_WINDOW_DAYS = 14;

/**
 * Card thumbnails. The Unsplash/Canva connectors are attached but not yet
 * authorized in this workspace, so live image search isn't available — these
 * reuse photo ids already vetted and live elsewhere on this same site (the
 * home page's pillars/process imagery) rather than guessing new ones blind.
 */
const cardPhotoIds = [
  "1552664730-d307ca884978",
  "1573497620053-ea5300f94f21",
  "1600880292203-757bb62b4baf",
];
const cardPhoto = (index: number) =>
  `https://images.unsplash.com/photo-${cardPhotoIds[index % cardPhotoIds.length]}?auto=format&fit=crop&w=300&q=80`;

/** Rotating badge palette so departments read as distinct at a glance. */
const departmentPalette = [
  { bg: "bg-tint", text: "text-accent" },
  { bg: "bg-violet-50", text: "text-violet-700" },
  { bg: "bg-emerald-50", text: "text-emerald-700" },
  { bg: "bg-amber-50", text: "text-amber-700" },
];
function departmentColor(department: string) {
  let hash = 0;
  for (let i = 0; i < department.length; i += 1) {
    hash = (hash * 31 + department.charCodeAt(i)) >>> 0;
  }
  return departmentPalette[hash % departmentPalette.length];
}

function formatPostedOn(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function isRecentlyPosted(iso: string) {
  const postedMs = new Date(`${iso}T00:00:00Z`).getTime();
  const ageDays = (Date.now() - postedMs) / (1000 * 60 * 60 * 24);
  return ageDays >= 0 && ageDays <= NEW_WINDOW_DAYS;
}

function Meta({ job }: { job: JobPosting }) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-subtle">
      <span className="flex items-center gap-2">
        <MapPin className="h-4 w-4 shrink-0 text-accent" />
        {job.location} · {job.workMode}
      </span>
      <span className="flex items-center gap-2">
        <Briefcase className="h-4 w-4 shrink-0 text-accent" />
        {job.employmentType}
      </span>
      <span className="flex items-center gap-2">
        <Clock className="h-4 w-4 shrink-0 text-accent" />
        {job.experience}
      </span>
    </div>
  );
}

function BulletList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-ink">{title}</h4>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-subtle">
            <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FilterSelect({
  id,
  label,
  icon: Icon,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  icon: LucideIcon;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  const isActive = value !== ALL;
  return (
    <div
      className={`relative flex min-w-0 items-center gap-2 rounded-full border py-2.5 pl-4 pr-9 transition-colors ${
        isActive
          ? "border-accent/40 bg-tint"
          : "border-line bg-surface hover:border-accent/30"
      }`}
    >
      <Icon
        aria-hidden="true"
        className={`h-4 w-4 shrink-0 ${isActive ? "text-accent" : "text-subtle"}`}
      />
      <label
        htmlFor={id}
        className={`shrink-0 text-sm font-medium ${isActive ? "text-accent" : "text-ink"}`}
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full min-w-0 cursor-pointer appearance-none truncate bg-transparent text-sm text-subtle outline-none"
      >
        <option value={ALL}>All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className={`pointer-events-none absolute right-3.5 h-3.5 w-3.5 shrink-0 ${
          isActive ? "text-accent" : "text-subtle"
        }`}
      />
    </div>
  );
}

/** A removable pill for one active filter, below the main toolbar row. */
function FilterChip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <button
      type="button"
      onClick={onClear}
      className="inline-flex items-center gap-1.5 rounded-full bg-tint px-3 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent/15"
    >
      {label}
      <X className="h-3 w-3" aria-hidden="true" />
    </button>
  );
}

export function OpenPositions({ jobs }: { jobs: JobPosting[] }) {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState(ALL);
  const [location, setLocation] = useState(ALL);
  const [employmentType, setEmploymentType] = useState(ALL);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [applyingTo, setApplyingTo] = useState<JobPosting | null>(null);

  const filters = useMemo(() => jobFilterOptions(jobs), [jobs]);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return jobs.filter((job) => {
      if (department !== ALL && job.department !== department) return false;
      if (location !== ALL && job.location !== location) return false;
      if (employmentType !== ALL && job.employmentType !== employmentType) return false;
      if (!needle) return true;
      return (
        job.title.toLowerCase().includes(needle) ||
        job.department.toLowerCase().includes(needle) ||
        job.summary.toLowerCase().includes(needle)
      );
    });
  }, [jobs, query, department, location, employmentType]);

  const filtersActive =
    query !== "" || department !== ALL || location !== ALL || employmentType !== ALL;

  function resetFilters() {
    setQuery("");
    setDepartment(ALL);
    setLocation(ALL);
    setEmploymentType(ALL);
  }

  if (jobs.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-surface p-10 text-center">
        <p className="font-medium text-ink">No open positions right now</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-subtle">
          We are not advertising any roles at the moment.{" "}
          <Link href="/careers/join-us" className="font-medium text-accent hover:underline">
            Submit your profile
          </Link>{" "}
          and we will get in touch when something relevant opens up.
        </p>
      </div>
    );
  }

  return (
    <AnimatedContainer>
      <div className="rounded-2xl border border-line bg-surface p-5 shadow-[0_1px_2px_rgba(11,22,56,0.04)] sm:p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative min-w-0 flex-1">
            <label htmlFor="job-search" className="sr-only">
              Search roles
            </label>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle"
            />
            <input
              id="job-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by job title, department or keyword"
              className="w-full rounded-full border border-line bg-surface py-3 pl-11 pr-4 text-sm text-ink outline-none transition-colors focus:border-accent"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <FilterSelect
              id="job-department"
              label="Department"
              icon={Building2}
              value={department}
              options={filters.departments}
              onChange={setDepartment}
            />
            <FilterSelect
              id="job-location"
              label="Location"
              icon={MapPin}
              value={location}
              options={filters.locations}
              onChange={setLocation}
            />
            <FilterSelect
              id="job-type"
              label="Type"
              icon={Briefcase}
              value={employmentType}
              options={filters.employmentTypes}
              onChange={setEmploymentType}
            />
            <span className="hidden h-6 w-px bg-line lg:block" aria-hidden="true" />
            <p aria-live="polite" className="whitespace-nowrap text-sm text-subtle">
              {visible.length} {visible.length === 1 ? "role" : "roles"}
            </p>
          </div>
        </div>

        {filtersActive && (
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-4">
            {department !== ALL && (
              <FilterChip label={department} onClear={() => setDepartment(ALL)} />
            )}
            {location !== ALL && (
              <FilterChip label={location} onClear={() => setLocation(ALL)} />
            )}
            {employmentType !== ALL && (
              <FilterChip label={employmentType} onClear={() => setEmploymentType(ALL)} />
            )}
            {query !== "" && (
              <FilterChip label={`"${query}"`} onClear={() => setQuery("")} />
            )}
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs font-medium text-accent hover:underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {visible.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-line p-10 text-center">
          <p className="font-medium text-ink">No roles match those filters</p>
          <p className="mt-2 text-sm text-subtle">
            Try widening your search, or{" "}
            <Link href="/careers/join-us" className="font-medium text-accent hover:underline">
              submit your profile
            </Link>{" "}
            instead.
          </p>
        </div>
      ) : (
        <ul className="mt-6 space-y-4">
          {visible.map((job, index) => {
            const isOpen = expanded === job.slug;
            const isApplying = applyingTo?.slug === job.slug;
            const color = departmentColor(job.department);

            return (
              <li
                key={job.slug}
                className="group rounded-2xl border border-line bg-surface p-5 shadow-[0_1px_2px_rgba(11,22,56,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-[0_20px_40px_-24px_rgba(11,22,56,0.25)] sm:p-6"
              >
                <div className="flex flex-col gap-5 sm:flex-row">
                  <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl sm:h-auto sm:w-28">
                    <Image
                      src={cardPhoto(index)}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 7rem, 100vw"
                      priority={index === 0}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${color.bg} ${color.text}`}
                          >
                            {job.department}
                          </span>
                          {isRecentlyPosted(job.postedOn) && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                              <Sparkles className="h-3 w-3" aria-hidden="true" />
                              New
                            </span>
                          )}
                        </div>
                        <h3 className="mt-2 text-card text-ink">{job.title}</h3>
                        <Meta job={job} />
                      </div>
                      <div className="shrink-0 text-right text-xs text-subtle">
                        <p>Posted {formatPostedOn(job.postedOn)}</p>
                        <p className="mt-0.5">Ref: {job.id}</p>
                      </div>
                    </div>

                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-subtle">
                      {job.summary}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setExpanded(isOpen ? null : job.slug)}
                        className="inline-flex items-center gap-1 text-sm font-medium text-ink transition-colors hover:text-accent"
                      >
                        {isOpen ? "Hide details" : "View details"}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                          aria-hidden="true"
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setApplyingTo(isApplying ? null : job);
                          if (!isApplying) setExpanded(job.slug);
                        }}
                        className="inline-flex items-center justify-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
                      >
                        {isApplying ? "Close application" : "Apply for this role"}
                        {!isApplying && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
                      </button>
                    </div>
                  </div>
                </div>

                {isOpen && (
                  <div className="mt-6 grid gap-8 border-t border-line pt-6 sm:grid-cols-2">
                    <BulletList title="What you'll do" items={job.responsibilities} />
                    <div className="space-y-8">
                      <BulletList title="What we're looking for" items={job.requirements} />
                      {job.preferred && job.preferred.length > 0 && (
                        <BulletList title="Nice to have" items={job.preferred} />
                      )}
                    </div>
                  </div>
                )}

                {isApplying && (
                  <div className="mt-6 border-t border-line pt-6">
                    <h4 className="text-sm font-semibold text-ink">
                      Apply for {job.title}
                    </h4>
                    <p className="mt-1 text-xs text-subtle">
                      Fields marked <span className="text-red-500">*</span> are required.
                    </p>
                    <div className="mt-5">
                      <ProfileForm position={{ id: job.id, title: job.title }} />
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </AnimatedContainer>
  );
}

export default OpenPositions;
