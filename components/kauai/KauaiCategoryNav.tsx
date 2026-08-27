import Link from "next/link";
import { categoryNav } from "@/data/kauai-categories";

type Props = {
  currentPath: string;
};

export function KauaiCategoryNav({ currentPath }: Props) {
  return (
    <nav
      aria-label="Kauai categories"
      className="sticky top-[4.25rem] z-40 border-b border-navy/8 bg-mist-soft/95 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl gap-1.5 overflow-x-auto overscroll-x-contain px-4 py-2.5 [scrollbar-width:none] md:gap-2 md:px-8 md:py-3 [&::-webkit-scrollbar]:hidden">
        <Link
          href="/kauai"
          className={`shrink-0 rounded-sm px-2.5 py-1.5 text-sm transition-colors md:px-3 ${
            currentPath === "/kauai"
              ? "bg-navy text-white"
              : "text-stone hover:bg-white hover:text-navy"
          }`}
        >
          All Kauai
        </Link>
        {categoryNav.map((item) => (
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
      </div>
    </nav>
  );
}
