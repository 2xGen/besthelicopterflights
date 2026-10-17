import { destinations, type DestinationSlug } from "@/data/destinations";

/**
 * Builds a Viator product URL with affiliate tracking params.
 * Always appends pid, mcid, medium, and campaign for commission attribution.
 */
const VIATOR_PID = process.env.NEXT_PUBLIC_VIATOR_PID || "P00276441";
const VIATOR_MCID = process.env.NEXT_PUBLIC_VIATOR_MCID || "42383";
const VIATOR_MEDIUM = "link";
const VIATOR_CAMPAIGN = "helicoptertours";

/** Use on every outbound Viator <a> for affiliate disclosure + SEO. */
export const VIATOR_LINK_REL = "sponsored nofollow noopener noreferrer";

export const VIATOR_PRODUCT_CODE_PATTERN = /^[A-Za-z0-9]{3,24}$/;

export function viatorAffiliateUrl(productUrl: string): string {
  const url = new URL(productUrl);
  url.searchParams.set("pid", VIATOR_PID);
  url.searchParams.set("mcid", VIATOR_MCID);
  url.searchParams.set("medium", VIATOR_MEDIUM);
  url.searchParams.set("campaign", VIATOR_CAMPAIGN);
  return url.toString();
}

function destinationForViatorId(viatorId: string): DestinationSlug | undefined {
  return destinations.find((d) => d.viatorDestinationIds.includes(viatorId))?.slug;
}

/**
 * Internal /go/ link for an outbound Viator URL; app/go resolves it to the affiliate URL.
 * Product pages become /go/{destination}/{productCode}, destination browse pages /go/{destination}.
 * Pass `destination` for live API products, whose URL may use a Viator destination we don't map.
 */
export function viatorGoPath(viatorUrl: string, destination?: DestinationSlug): string {
  const { pathname } = new URL(viatorUrl);
  const product = pathname.match(/^\/tours\/.+\/d(\d+)-([A-Za-z0-9]+)$/);
  if (product) {
    const dest = destination ?? destinationForViatorId(product[1]);
    if (dest && VIATOR_PRODUCT_CODE_PATTERN.test(product[2])) {
      return `/go/${dest}/${product[2]}`;
    }
  } else {
    const browseId = pathname.match(/\/d(\d+)(?:-[^/]*)?$/)?.[1];
    const dest = destination ?? (browseId ? destinationForViatorId(browseId) : undefined);
    if (dest) return `/go/${dest}`;
  }
  return viatorAffiliateUrl(viatorUrl);
}
