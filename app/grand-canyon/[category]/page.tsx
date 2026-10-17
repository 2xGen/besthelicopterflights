import type { Metadata } from "next";
import {
  CategoryRoutePage,
  categoryMetadata,
  categoryStaticParams,
} from "@/components/flights/CategoryRoute";

const DESTINATION = "grand-canyon";

export const dynamicParams = false;

export function generateStaticParams() {
  return categoryStaticParams(DESTINATION);
}

export async function generateMetadata({
  params,
}: PageProps<"/grand-canyon/[category]">): Promise<Metadata> {
  return categoryMetadata(DESTINATION, (await params).category);
}

export default async function GrandCanyonCategoryPage({
  params,
}: PageProps<"/grand-canyon/[category]">) {
  return <CategoryRoutePage destination={DESTINATION} slug={(await params).category} />;
}
