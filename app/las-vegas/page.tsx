import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WorldDestinationLanding } from "@/components/flights/WorldDestinationLanding";
import { destinationGuides } from "@/data/destination-guides";
import { createPageMetadata } from "@/lib/seo";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const guide = destinationGuides["las-vegas"];

export const metadata = createPageMetadata({
  title: guide.metaTitle,
  description: guide.metaDescription,
  path: "/las-vegas",
  keywords: guide.keywords,
});

export default async function LasVegasPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  return (
    <>
      <Header />
      <main className="flex-1 min-w-0 w-full max-w-full pt-[4.25rem]">
        <WorldDestinationLanding guide={guide} searchParams={sp} />
      </main>
      <Footer />
    </>
  );
}
