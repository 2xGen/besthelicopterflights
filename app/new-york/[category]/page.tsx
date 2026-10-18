import type { Metadata } from "next";
import {
  CategoryRoutePage,
  categoryMetadata,
  categoryStaticParams,
} from "@/components/flights/CategoryRoute";
export { dynamic } from "@/components/flights/category-route-config";

const DESTINATION = "new-york";

export const dynamicParams = false;

export function generateStaticParams() {
  return categoryStaticParams(DESTINATION);
}

export async function generateMetadata({
  params,
}: PageProps<"/new-york/[category]">): Promise<Metadata> {
  return categoryMetadata(DESTINATION, (await params).category);
}

export default async function NewYorkCategoryPage({
  params,
}: PageProps<"/new-york/[category]">) {
  return <CategoryRoutePage destination={DESTINATION} slug={(await params).category} />;
}
