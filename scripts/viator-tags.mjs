// Usage: node --env-file=.env.local scripts/viator-tags.mjs [search term]
const base = process.env.VIATOR_API_BASE_URL || "https://api.viator.com/partner";
const key = process.env.VIATOR_API_KEY?.trim();
const term = (process.argv[2] || "helicopter").toLowerCase();

if (!key) {
  console.error("VIATOR_API_KEY is not set in .env.local");
  process.exit(1);
}

const response = await fetch(`${base}/products/tags`, {
  headers: {
    "exp-api-key": key,
    Accept: "application/json;version=2.0",
    "Accept-Language": "en-US",
  },
});

if (!response.ok) {
  console.error(`HTTP ${response.status}`, await response.text());
  process.exit(1);
}

const { tags = [] } = await response.json();
const byId = new Map(tags.map((t) => [t.tagId, t]));
const name = (t) => t?.allNamesByLocale?.en ?? t?.allNamesByLocale?.["en_US"] ?? "(no English name)";

console.log(`${base}/products/tags → ${tags.length} tags total\n`);

const matches = tags.filter((t) => name(t).toLowerCase().includes(term));
for (const t of matches) {
  const parents = (t.parentTagIds ?? []).map((id) => `${id} ${name(byId.get(id))}`);
  console.log(`${t.tagId}  ${name(t)}`);
  console.log(`        parents: ${parents.length ? parents.join(" | ") : "none (top-level)"}`);
  const children = tags.filter((c) => c.parentTagIds?.includes(t.tagId));
  if (children.length) {
    console.log(`        children: ${children.map((c) => `${c.tagId} ${name(c)}`).join(" | ")}`);
  }
}
if (!matches.length) console.log(`No tags matching "${term}".`);
