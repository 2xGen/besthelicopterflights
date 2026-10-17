// Usage: node --env-file=.env.local scripts/viator-search-counts.mjs
// Compares helicopter tag coverage per destination on /products/search.
const base = process.env.VIATOR_API_BASE_URL || "https://api.viator.com/partner";
const key = process.env.VIATOR_API_KEY?.trim();
if (!key) {
  console.error("VIATOR_API_KEY is not set in .env.local");
  process.exit(1);
}

const destinations = {
  Kauai: "670",
  Oahu: "672",
  "Oahu (Honolulu)": "59070",
  Maui: "671",
  "Big Island": "669",
  "Las Vegas": "684",
  "Grand Canyon NP": "815",
  "New York City": "687",
  Dubai: "828",
  "Cape Town": "318",
  "Victoria Falls": "5309",
};
const tagSets = { "12026": [12026], "12974": [12974], "both": [12026, 12974] };

async function search(destination, tags) {
  const response = await fetch(`${base}/products/search`, {
    method: "POST",
    headers: {
      "exp-api-key": key,
      Accept: "application/json;version=2.0",
      "Accept-Language": "en-US",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filtering: { destination, tags },
      sorting: { sort: "TRAVELER_RATING", order: "DESCENDING" },
      pagination: { start: 1, count: 3 },
      currency: "USD",
    }),
  });
  if (!response.ok) return { error: `HTTP ${response.status} ${(await response.text()).slice(0, 120)}` };
  const data = await response.json();
  return { total: data.totalCount ?? 0, sample: (data.products ?? []).map((p) => p.title) };
}

for (const [label, id] of Object.entries(destinations)) {
  const counts = [];
  let sample = [];
  for (const [setLabel, tags] of Object.entries(tagSets)) {
    const r = await search(id, tags);
    counts.push(`${setLabel}: ${r.error ?? r.total}`);
    if (setLabel === "12026" && r.sample) sample = r.sample;
  }
  console.log(`${label.padEnd(18)} d${id.padEnd(6)} ${counts.join("   ")}`);
  for (const title of sample) console.log(`    · ${title}`);
}
