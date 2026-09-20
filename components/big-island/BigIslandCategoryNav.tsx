import Link from "next/link";
import { bigIslandCategoryNav } from "@/data/big-island-categories";
import { BIG_ISLAND_OPERATORS_PATH } from "@/data/big-island-operators";

type Props = {
  currentPath: string;
};

export function BigIslandCategoryNav({ currentPath }: Props) {
  return (
    <nav
      aria-label="Big Island categories"
      className="sticky top-[4.25rem] z-40 w-full max-w-full border-b border-navy/8 bg-mist-soft/95 backdrop-blur-md"
    >
      <div className="mx-auto flex w-full max-w-6xl min-w-0 gap-1.5 overflow-x-auto overscroll-x-contain px-4 py-2.5 [scrollbar-width:none] md:gap-2 md:px-8 md:py-3 [&::-webkit-scrollbar]:hidden">
        <Link
          href="/big-island"
          className={`shrink-0 rounded-sm px-2.5 py-1.5 text-sm transition-colors md:px-3 ${
            currentPath === "/big-island"
              ? "bg-navy text-white"
              : "text-stone hover:bg-white hover:text-navy"
          }`}
        >
          All Big Island
        </Link>
        {bigIslandCategoryNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`shrink-0 rounded-sm px-2.5 py-1.5 text-sm transition-colors md:px-3 ${
              currentPath === item.href
                ? "bg-navy text-white"
                : "text-stone hover:bg-white hover:text-navy"
            }`}
          >
            {item.label}
          </Link>
        ))}
        <Link
          href={BIG_ISLAND_OPERATORS_PATH}
          className={`shrink-0 rounded-sm px-2.5 py-1.5 text-sm transition-colors md:px-3 ${
            currentPath === BIG_ISLAND_OPERATORS_PATH
              ? "bg-navy text-white"
              : "text-stone hover:bg-white hover:text-navy"
          }`}
        >
          Operators
        </Link>
      </div>
    </nav>
  );
}
