import { resolveDetailedSightseeing } from "../lib/flight-details";
import {
  categoriesFor,
  categoryFlights,
  isCategoryIndexable,
  MIN_INDEXABLE_CATEGORY_FLIGHTS,
} from "../data/destination-categories";
import type { DestinationSlug } from "../data/destinations";

const destinations: DestinationSlug[] = [
  "victoria-falls",
  "new-york",
  "dubai",
  "cape-town",
  "grand-canyon",
  "las-vegas",
];

async function main() {
  for (const dest of destinations) {
    const flights = await resolveDetailedSightseeing(dest);
    for (const cat of categoriesFor(dest)) {
      const n = categoryFlights(cat, flights).length;
      const ok = isCategoryIndexable(cat, n);
      if (
        cat.slug.includes("private") ||
        cat.slug.includes("zimbabwe") ||
        cat.indexable === false
      ) {
        const min = cat.minFlightsToIndex ?? MIN_INDEXABLE_CATEGORY_FLIGHTS;
        console.log(
          `${dest}/${cat.slug}: flights=${n} min=${min} indexable=${ok} flag=${cat.indexable ?? "default"}`,
        );
      }
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
