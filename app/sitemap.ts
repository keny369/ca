import type { MetadataRoute } from "next";
import { siteUrl } from "./site-config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { path: "", priority: 1 },
    { path: "/privacy/", priority: 0.3 },
    { path: "/terms/", priority: 0.3 },
  ].map(({ path, priority }) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date("2026-08-13T00:00:00+10:00"),
      changeFrequency: "weekly",
      priority,
    }));
}
