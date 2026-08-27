import Image from "next/image";
import Link from "next/link";
import { KAUAI_FEATURED_IMAGE } from "@/data/images";

const islands = [
  {
    name: "Kauai",
    href: "/kauai",
    status: "Live",
    blurb:
      "Na Pali coast, Waimea Canyon and waterfall valleys — our first ranked comparisons.",
    image: KAUAI_FEATURED_IMAGE,
    alt: "Aerial view of Kauai’s green cliffs, coastline and turquoise ocean",
    priority: true,
  },
  {
    name: "Oahu",
    href: null,
    status: "Coming soon",
    blurb:
      "Honolulu shoreline, Diamond Head and North Shore routes travelers often compare.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    alt: "Tropical shoreline with turquoise water on Oahu",
    priority: false,
  },
  {
    name: "Maui",
    href: null,
    status: "Coming soon",
    blurb:
      "West Maui mountains, Hana coastline and Haleakala views from the air.",
    image:
      "https://images.unsplash.com/photo-1542259009477-d625272157b7?auto=format&fit=crop&w=1200&q=80",
    alt: "Aerial coastal landscape resembling Maui scenery",
    priority: false,
  },
  {
    name: "Big Island",
    href: null,
    status: "Coming soon",
    blurb:
      "Volcanic terrain, waterfalls and expansive coastlines across Hawaiʻi Island.",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
    alt: "Dramatic island landscape with cliffs and ocean",
    priority: false,
  },
];

export function ExploreHawaii() {
  return (
    <section
      id="hawaii"
      className="border-b border-navy/8 bg-mist-soft px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal">
          Explore Hawaii
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight text-navy md:text-4xl">
          Starting with Hawaii — island by island
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-stone md:text-lg">
          Hawaii is our beachhead. Kauai rankings are live now; other islands
          will follow gradually.
        </p>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2">
          {islands.map((island) => {
            const inner = (
              <>
                <div className="relative aspect-[16/10]">
                  <Image
                    src={island.image}
                    alt={island.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    priority={island.priority}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy/50 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-2xl text-white">
                      {island.name}
                    </h3>
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-teal-bright">
                      {island.status}
                    </span>
                  </div>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/75">
                    {island.blurb}
                  </p>
                </div>
              </>
            );

            return (
              <li
                key={island.name}
                className="group relative overflow-hidden rounded-sm bg-navy"
              >
                {island.href ? (
                  <Link href={island.href} className="block">
                    {inner}
                  </Link>
                ) : (
                  <div className="block">{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
