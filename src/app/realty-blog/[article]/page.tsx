import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RealtyBlogArticle } from "@/components/BlogSections";
import { SiteChrome } from "@/components/SiteChrome";
import { realtyArticles } from "@/lib/data";

type PageProps = {
  params: Promise<{
    article: string;
  }>;
};

function getArticle(slug: string) {
  return realtyArticles.find((article) => article.slug === slug);
}

export function generateStaticParams() {
  return realtyArticles.map((article) => ({ article: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { article: slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return {};
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/realty-blog/${article.slug}`
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      images: [
        {
          url: article.image,
          alt: article.imageAlt
        }
      ]
    }
  };
}

export default async function RealtyBlogArticlePage({ params }: PageProps) {
  const { article: slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <SiteChrome division="realty">
      <RealtyBlogArticle article={article} />
    </SiteChrome>
  );
}
