import type { MetadataRoute } from "next";
import { assetPath, siteDescription, siteName } from "./site-config";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteName} — Handcrafted Chocolate Gifts Melbourne`,
    short_name: siteName,
    description: siteDescription,
    start_url: `${assetPath("/")}`,
    display: "standalone",
    background_color: "#fbf8f2",
    theme_color: "#291914",
    lang: "en-AU",
    categories: ["food", "shopping", "lifestyle"],
    icons: [
      { src: assetPath("/icons/icon-192.png"), sizes: "192x192", type: "image/png", purpose: "any" },
      { src: assetPath("/icons/icon-512.png"), sizes: "512x512", type: "image/png", purpose: "any" },
      { src: assetPath("/icons/icon-512.png"), sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
