"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { previousHomePath } from "@/lib/nav";

/**
 * TEMPORARY. A footer link between the two home page versions: on any page it
 * leads to the previous landing page, and on the previous page itself (where a
 * link to that same page would go nowhere) it leads back to the current one.
 *
 * Delete this file with `app/home-previous`, `previousHomePath` in lib/nav.ts,
 * and its use in `Footer.tsx` once one version is chosen.
 */
export function HomeVersionLink({ className }: { className?: string }) {
  const onPrevious = usePathname() === previousHomePath;

  return (
    <Link href={onPrevious ? "/" : previousHomePath} className={className}>
      {onPrevious ? "Current Landing Page" : "Previous Landing Page"}
    </Link>
  );
}

export default HomeVersionLink;
