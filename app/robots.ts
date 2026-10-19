import type { MetadataRoute } from "next";

import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/privacy", "/consent"],
    },
    sitemap: `${site.siteUrl}/sitemap.xml`,
  };
}
