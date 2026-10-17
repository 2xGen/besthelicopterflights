import Link from "next/link";
import {
  categoriesFor,
  categoryPath,
  type DestinationCategory,
} from "@/data/destination-categories";
import type { DestinationSlug } from "@/data/destinations";

export function HubCategoryPills({ destination }: { destination: DestinationSlug }) {
  const links = categoriesFor(destination).filter(
    (c: DestinationCategory) => c.indexable !== false && c.slug !== "helicopter-tour-operators",
  );
  return (
    <ul className="mt-5 flex flex-wrap gap-2">
      {links.map((c) => (
        <li key={c.slug}>
          <Link
            href={categoryPath(c)}
            className="inline-block rounded-full border border-navy/15 bg-white px-3.5 py-1.5 text-sm font-medium text-teal hover:border-teal"
          >
            {c.navLabel}
          </Link>
        </li>
      ))}
      <li>
        <Link
          href={`/${destination}/helicopter-tour-operators`}
          className="inline-block rounded-full border border-navy/15 bg-white px-3.5 py-1.5 text-sm font-medium text-teal hover:border-teal"
        >
          Operators
        </Link>
      </li>
    </ul>
  );
}
