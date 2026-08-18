import type { MetadataRoute } from "next";
import { pageSlugs, realtyArticles } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://milton-grp.vercel.app";
  return [
    {
      url: baseUrl,
      lastModified: new Date()
    },
    ...pageSlugs.map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: new Date()
    })),
    ...realtyArticles.map((article) => ({
      url: `${baseUrl}/realty-blog/${article.slug}`,
      lastModified: new Date()
    })),
    {
      url: `${baseUrl}/chiranjiv-vaghani`,
      lastModified: new Date()
    }
  ];
}
