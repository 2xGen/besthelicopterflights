import Link from "next/link";
import { categoryNav } from "@/data/kauai-categories";

type Props = {
  currentPath: string;
};

export function KauaiCategoryNav({ currentPath }: Props) {
  return (
    <nav
      aria-label="Kauai categories"
      className="sticky top-[4.25rem] z-40 w-full max-w-full border-b border-navy/10 bg-white/95 backdrop-blur-md"
    >
      <div className="mx-auto flex w-full max-w-6xl min-w-0 gap-1.5 overflow-x-auto overscroll-x-contain px-4 py-2.5 [scrollbar-width:none] md:gap-2 md:px-8 md:py-3 [&::-webkit-scrollbar]:hidden">
        <Link
          href="/kauai"
          className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors md:px-3.5 ${
            currentPath === "/kauai"
              ? "bg-navy-deep text-white"
              : "text-navy hover:bg-mist-soft"
          }`}
        >
          All Kauai
        </Link>
        {categoryNav.map((item) => (
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
      </div>
    </nav>
  );
}
