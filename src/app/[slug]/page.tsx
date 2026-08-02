import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DivisionPage } from "@/components/PageSections";
import { SiteChrome } from "@/components/SiteChrome";
import { pageInfo, pageSlugs, type PageSlug } from "@/lib/data";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function isPageSlug(value: string): value is PageSlug {
  return pageSlugs.includes(value as PageSlug);
}

export function generateStaticParams() {
  return pageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!isPageSlug(slug)) {
    return {};
  }

  const info = pageInfo[slug];
  return {
    title: info.title,
    description: info.description,
    alternates: {
      canonical: `/${slug}`
    },
    openGraph: {
      title: info.title,
      description: info.description,
      type: "website"
    }
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  if (!isPageSlug(slug)) {
    notFound();
  }

  const info = pageInfo[slug];

  return (
    <SiteChrome division={info.division}>
      <DivisionPage slug={slug} />
    </SiteChrome>
  );
}
