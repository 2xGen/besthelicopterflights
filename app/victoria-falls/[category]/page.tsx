import type { Metadata } from "next";
import {
  CategoryRoutePage,
  categoryMetadata,
  categoryStaticParams,
} from "@/components/flights/CategoryRoute";
export const dynamic = "force-dynamic";

const DESTINATION = "victoria-falls";

export const dynamicParams = false;

export function generateStaticParams() {
  return categoryStaticParams(DESTINATION);
}

export async function generateMetadata({
  params,
}: PageProps<"/victoria-falls/[category]">): Promise<Metadata> {
  return categoryMetadata(DESTINATION, (await params).category);
}

export default async function VictoriaFallsCategoryPage({
  params,
}: PageProps<"/victoria-falls/[category]">) {
  return <CategoryRoutePage destination={DESTINATION} slug={(await params).category} />;
}
