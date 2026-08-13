import type { MetadataRoute } from "next";
import { siteUrl } from "./site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date("2026-08-13T00:00:00+10:00"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
