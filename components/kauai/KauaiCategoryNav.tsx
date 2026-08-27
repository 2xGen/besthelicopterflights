import Link from "next/link";
import { categoryNav } from "@/data/kauai-categories";

type Props = {
  currentPath: string;
};

export function KauaiCategoryNav({ currentPath }: Props) {
  return (
    <nav
      aria-label="Kauai categories"
      className="border-b border-navy/8 bg-mist-soft"
    >
      <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-5 py-3 md:px-8">
        <Link
          href="/kauai"
          className={`shrink-0 rounded-sm px-3 py-1.5 text-sm transition-colors ${
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
            className={`shrink-0 rounded-sm px-3 py-1.5 text-sm transition-colors ${
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
