import type { MetadataRoute } from "next";

import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.siteUrl,
      lastModified: new Date("2026-10-19"),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];
}
