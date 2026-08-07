import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RealtyDirectorProfile } from "@/components/DirectorProfile";
import { SiteChrome } from "@/components/SiteChrome";
import { realtyDirectors } from "@/lib/data";

type PageProps = {
  params: Promise<{
    director: string;
  }>;
};

function getDirector(slug: string) {
  return realtyDirectors.find((director) => director.slug === slug);
}

export function generateStaticParams() {
  return realtyDirectors.map((director) => ({ director: director.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { director: slug } = await params;
  const director = getDirector(slug);

  if (!director) {
    return {};
  }

  return {
    title: `${director.name} | Milton Realty`,
    description: director.summary,
    alternates: {
      canonical: `/realty-directors/${director.slug}`
    },
    openGraph: {
      title: `${director.name} | Milton Realty`,
      description: director.summary,
      images: [
        {
          url: director.image,
          alt: director.imageAlt
        }
      ]
    }
  };
}

export default async function RealtyDirectorPage({ params }: PageProps) {
  const { director: slug } = await params;
  const director = getDirector(slug);

  if (!director) {
    notFound();
  }

  return (
    <SiteChrome division="realty">
      <RealtyDirectorProfile director={director} />
    </SiteChrome>
  );
}
