import type { Metadata } from "next";
import {
  CategoryRoutePage,
  categoryMetadata,
  categoryStaticParams,
} from "@/components/flights/CategoryRoute";
export { dynamic } from "@/components/flights/category-route-config";

const DESTINATION = "dubai";

export const dynamicParams = false;

export function generateStaticParams() {
  return categoryStaticParams(DESTINATION);
}

export async function generateMetadata({
  params,
}: PageProps<"/dubai/[category]">): Promise<Metadata> {
  return categoryMetadata(DESTINATION, (await params).category);
}

export default async function DubaiCategoryPage({ params }: PageProps<"/dubai/[category]">) {
  return <CategoryRoutePage destination={DESTINATION} slug={(await params).category} />;
}
