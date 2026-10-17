import Link from "next/link";
import {
  categoriesFor,
  categoryNavAllLabel,
  categoryNavRelated,
  categoryPath,
} from "@/data/destination-categories";
import type { DestinationSlug } from "@/data/destinations";

type Props = {
  destination: DestinationSlug;
  destinationName: string;
  currentPath: string;
};

export function DestinationCategoryNav({ destination, destinationName, currentPath }: Props) {
  const categories = categoriesFor(destination);
  if (categories.length === 0) return null;
  const related = categoryNavRelated[destination];
  const links = [
    { href: `/${destination}`, label: categoryNavAllLabel[destination] ?? "All flights" },
    ...categories.map((c) => ({ href: categoryPath(c), label: c.navLabel })),
  ];

  return (
    <nav
      aria-label={`${destinationName} categories`}
      className="sticky top-[4.25rem] z-40 w-full max-w-full border-b border-navy/10 bg-white/95 backdrop-blur-md"
    >
      <div className="mx-auto flex w-full max-w-6xl min-w-0 gap-1.5 overflow-x-auto overscroll-x-contain px-4 py-2.5 [scrollbar-width:none] md:gap-2 md:px-8 md:py-3 [&::-webkit-scrollbar]:hidden">
        {links.map((link) => {
          const active = currentPath === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors md:px-3.5 ${
                active ? "bg-navy-deep text-white" : "text-navy hover:bg-mist-soft"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
        {related ? (
          <Link
            href={related.href}
            className="shrink-0 rounded-full border border-navy/15 px-3 py-1.5 text-sm font-medium text-teal transition-colors hover:bg-mist-soft md:px-3.5"
          >
            {related.label}
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
