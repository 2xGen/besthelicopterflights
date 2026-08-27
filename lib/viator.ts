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

export function viatorAffiliateUrl(productUrl: string): string {
  const url = new URL(productUrl);
  url.searchParams.set("pid", VIATOR_PID);
  url.searchParams.set("mcid", VIATOR_MCID);
  url.searchParams.set("medium", VIATOR_MEDIUM);
  url.searchParams.set("campaign", VIATOR_CAMPAIGN);
  return url.toString();
}
