import type { MetadataRoute } from "next";
import { pageSlugs, realtyArticles } from "@/lib/data";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date()
    },
    ...pageSlugs.map((slug) => ({
      url: `${siteUrl}/${slug}`,
      lastModified: new Date()
    })),
    ...realtyArticles.map((article) => ({
      url: `${siteUrl}/realty-blog/${article.slug}`,
      lastModified: new Date()
    })),
    {
      url: `${siteUrl}/chiranjiv-vaghani`,
      lastModified: new Date()
    }
  ];
}
