import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_ORIGIN,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_ORIGIN}/queries/intake`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
