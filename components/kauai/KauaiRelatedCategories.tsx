import Link from "next/link";
import { kauaiGuideLinks } from "@/data/kauai-categories";

type Props = {
  excludeHref?: string;
};

export function KauaiRelatedCategories({ excludeHref }: Props) {
  const related = kauaiGuideLinks.filter((guide) => guide.href !== excludeHref);

  return (
    <section className="border-t border-navy/8 bg-mist px-5 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-2xl text-navy md:text-3xl">
          More Kauai helicopter guides
        </h2>
        <p className="mt-3 max-w-2xl text-base text-stone">
          Keep comparing by intent — tours, operators, prices and specialty
          guides answer different search questions.
        </p>
        <ul className="mt-6 flex gap-2 overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:none] sm:mt-8 sm:grid sm:grid-cols-2 sm:gap-3 sm:overflow-visible lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
          <li className="min-w-[14.5rem] shrink-0 sm:min-w-0">
            <Link
              href="/kauai"
              className="block h-full rounded-sm border border-navy/10 bg-white px-4 py-3 transition-colors hover:border-teal sm:px-5 sm:py-4"
            >
              <span className="font-medium text-navy">
                Best Helicopter Tours on Kauai
              </span>
              <span className="mt-1 block text-sm text-stone">
                Full island comparison &amp; rankings
              </span>
            </Link>
          </li>
          {related.map((guide) => (
            <li key={guide.href} className="min-w-[14.5rem] shrink-0 sm:min-w-0">
              <Link
                href={guide.href}
                className="block h-full rounded-sm border border-navy/10 bg-white px-4 py-3 transition-colors hover:border-teal sm:px-5 sm:py-4"
              >
                <span className="font-medium text-navy">{guide.title}</span>
                <span className="mt-1 block text-sm text-stone">
                  {guide.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
