import type { MetadataRoute } from "next";
import { pageSlugs } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.miltongroup.in";
  return [
    {
      url: baseUrl,
      lastModified: new Date()
    },
    ...pageSlugs.map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: new Date()
    }))
  ];
}
