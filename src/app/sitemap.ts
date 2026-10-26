import type { MetadataRoute } from "next";
import { HOME_CANONICAL_URL, SITE_ORIGIN } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: HOME_CANONICAL_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_ORIGIN}/queries/intake/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_ORIGIN}/services/visit-visas/`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
