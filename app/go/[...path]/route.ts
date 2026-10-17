import type { NextRequest } from "next/server";
import { getSearchableDestination } from "@/data/destinations";
import { flights } from "@/data/flights";
import { VIATOR_PRODUCT_CODE_PATTERN, viatorAffiliateUrl } from "@/lib/viator";
import { fetchViatorProductUrl } from "@/lib/viator-api";

const ROBOTS = "noindex, nofollow";

function isViatorUrl(value: string): boolean {
  try {
    const { protocol, hostname } = new URL(value);
    return protocol === "https:" && (hostname === "viator.com" || hostname.endsWith(".viator.com"));
  } catch {
    return false;
  }
}

function notFound() {
  return new Response("Not found.", {
    status: 404,
    headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": ROBOTS },
  });
}

// 302 (not 301) so browsers and crawlers never cache the affiliate destination.
function redirectTo(url: string) {
  return new Response(null, {
    status: 302,
    headers: {
      Location: viatorAffiliateUrl(url),
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": ROBOTS,
    },
  });
}

async function resolveProductUrl(productCode: string): Promise<string | null> {
  const code = productCode.toLowerCase();
  const curated = flights.find((f) => f.productCode?.toLowerCase() === code);
  if (curated) return curated.bookingUrl;
  return fetchViatorProductUrl(productCode);
}

async function handle(_req: NextRequest, ctx: RouteContext<"/go/[...path]">) {
  const { path } = await ctx.params;
  if (path.length > 2) return notFound();

  const [destinationSlug, productCode] = path;
  const destination = getSearchableDestination(destinationSlug);
  if (!destination) return notFound();

  if (productCode) {
    if (!VIATOR_PRODUCT_CODE_PATTERN.test(productCode)) return notFound();
    const productUrl = await resolveProductUrl(productCode);
    if (productUrl && isViatorUrl(productUrl)) return redirectTo(productUrl);
  }

  // Unknown or retired products fall back to the destination's helicopter listings on Viator.
  return redirectTo(destination.viatorBrowseUrl);
}

export const GET = handle;
export const HEAD = handle;
