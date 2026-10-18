import type { Metadata } from "next";
import {
  CategoryRoutePage,
  categoryMetadata,
  categoryStaticParams,
} from "@/components/flights/CategoryRoute";
export { dynamic } from "@/components/flights/category-route-config";

const DESTINATION = "las-vegas";

export const dynamicParams = false;

export function generateStaticParams() {
  return categoryStaticParams(DESTINATION);
}

export async function generateMetadata({
  params,
}: PageProps<"/las-vegas/[category]">): Promise<Metadata> {
  return categoryMetadata(DESTINATION, (await params).category);
}

export default async function LasVegasCategoryPage({
  params,
}: PageProps<"/las-vegas/[category]">) {
  return <CategoryRoutePage destination={DESTINATION} slug={(await params).category} />;
}
