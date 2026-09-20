import Link from "next/link";
import { oahuCategoryNav } from "@/data/oahu-categories";
import { OAHU_OPERATORS_PATH } from "@/data/oahu-operators";

type Props = {
  currentPath: string;
};

export function OahuCategoryNav({ currentPath }: Props) {
  return (
    <nav
      aria-label="Oahu categories"
      className="sticky top-[4.25rem] z-40 w-full max-w-full border-b border-navy/8 bg-mist-soft/95 backdrop-blur-md"
    >
      <div className="mx-auto flex w-full max-w-6xl min-w-0 gap-1.5 overflow-x-auto overscroll-x-contain px-4 py-2.5 [scrollbar-width:none] md:gap-2 md:px-8 md:py-3 [&::-webkit-scrollbar]:hidden">
        <Link
          href="/oahu"
          className={`shrink-0 rounded-sm px-2.5 py-1.5 text-sm transition-colors md:px-3 ${
            currentPath === "/oahu"
              ? "bg-navy text-white"
              : "text-stone hover:bg-white hover:text-navy"
          }`}
        >
          All Oahu
        </Link>
        {oahuCategoryNav.map((item) => (
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
          href={OAHU_OPERATORS_PATH}
          className={`shrink-0 rounded-sm px-2.5 py-1.5 text-sm transition-colors md:px-3 ${
            currentPath === OAHU_OPERATORS_PATH
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
