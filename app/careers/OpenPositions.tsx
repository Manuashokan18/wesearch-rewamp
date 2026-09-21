"use client";

import { useMemo, useState } from "react";
import { Briefcase, Clock, MapPin, Search, X } from "lucide-react";
import type { JobPosting } from "@/lib/data/jobs";
import { jobFilterOptions } from "@/lib/data/jobs";
import { ProfileForm } from "./ProfileForm";

const ALL = "All";

function formatPostedOn(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function Meta({ job }: { job: JobPosting }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-subtle">
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
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-xs font-medium uppercase tracking-wide text-subtle">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-accent"
      >
        <option value={ALL}>All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
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
      <div className="rounded-2xl border border-dashed border-line bg-muted p-10 text-center">
        <p className="font-medium text-ink">No open positions right now</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-subtle">
          We are not advertising any roles at the moment. Submit your profile below and
          we will get in touch when something relevant opens up.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="rounded-2xl border border-line bg-muted p-5">
        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <label
              htmlFor="job-search"
              className="text-xs font-medium uppercase tracking-wide text-subtle"
            >
              Search
            </label>
            <div className="relative mt-2">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle"
              />
              <input
                id="job-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search roles"
                className="w-full rounded-xl border border-line bg-surface py-2.5 pl-11 pr-4 text-sm text-ink outline-none transition-colors focus:border-accent"
              />
            </div>
          </div>
          <FilterSelect
            id="job-department"
            label="Department"
            value={department}
            options={filters.departments}
            onChange={setDepartment}
          />
          <FilterSelect
            id="job-location"
            label="Location"
            value={location}
            options={filters.locations}
            onChange={setLocation}
          />
          <FilterSelect
            id="job-type"
            label="Type"
            value={employmentType}
            options={filters.employmentTypes}
            onChange={setEmploymentType}
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p aria-live="polite" className="text-sm text-subtle">
            Showing {visible.length} of {jobs.length}{" "}
            {jobs.length === 1 ? "role" : "roles"}
          </p>
          {filtersActive && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
            >
              <X className="h-4 w-4" />
              Clear filters
            </button>
          )}
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-line p-10 text-center">
          <p className="font-medium text-ink">No roles match those filters</p>
          <p className="mt-2 text-sm text-subtle">
            Try widening your search, or submit your profile below.
          </p>
        </div>
      ) : (
        <ul className="mt-6 space-y-4">
          {visible.map((job) => {
            const isOpen = expanded === job.slug;
            const isApplying = applyingTo?.slug === job.slug;

            return (
              <li
                key={job.slug}
                className="rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent/40"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-semibold text-ink">{job.title}</h3>
                      <span className="rounded-full bg-tint px-3 py-1 text-xs font-medium text-accent">
                        {job.department}
                      </span>
                    </div>
                    <Meta job={job} />
                  </div>
                  <span className="shrink-0 text-xs text-subtle">
                    Posted {formatPostedOn(job.postedOn)}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-subtle">{job.summary}</p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setExpanded(isOpen ? null : job.slug)}
                    className="inline-flex items-center justify-center rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-muted"
                  >
                    {isOpen ? "Hide details" : "View details"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setApplyingTo(isApplying ? null : job);
                      if (!isApplying) setExpanded(job.slug);
                    }}
                    className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
                  >
                    {isApplying ? "Close application" : "Apply for this role"}
                  </button>
                  <span className="self-center text-xs text-subtle">Ref: {job.id}</span>
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
    </div>
  );
}

export default OpenPositions;
