import Link from "next/link";
import { mauiCategoryNav } from "@/data/maui-categories";
import { MAUI_OPERATORS_PATH } from "@/data/maui-operators";

type Props = {
  currentPath: string;
};

export function MauiCategoryNav({ currentPath }: Props) {
  return (
    <nav
      aria-label="Maui categories"
      className="sticky top-[4.25rem] z-40 w-full max-w-full border-b border-navy/10 bg-white/95 backdrop-blur-md"
    >
      <div className="mx-auto flex w-full max-w-6xl min-w-0 gap-1.5 overflow-x-auto overscroll-x-contain px-4 py-2.5 [scrollbar-width:none] md:gap-2 md:px-8 md:py-3 [&::-webkit-scrollbar]:hidden">
        <Link
          href="/maui"
          className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors md:px-3.5 ${
            currentPath === "/maui"
              ? "bg-navy-deep text-white"
              : "text-navy hover:bg-mist-soft"
          }`}
        >
          All Maui
        </Link>
        {mauiCategoryNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors md:px-3.5 ${
              currentPath === item.href
                ? "bg-navy-deep text-white"
                : "text-navy hover:bg-mist-soft"
            }`}
          >
            {item.label}
          </Link>
        ))}
        <Link
          href={MAUI_OPERATORS_PATH}
          className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors md:px-3.5 ${
            currentPath === MAUI_OPERATORS_PATH
              ? "bg-navy-deep text-white"
              : "text-navy hover:bg-mist-soft"
          }`}
        >
          Operators
        </Link>
      </div>
    </nav>
  );
}
