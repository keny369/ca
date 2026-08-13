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
      {
        src: assetPath("/images/logo-reference.webp"),
        sizes: "any",
        type: "image/webp",
      },
    ],
  };
}
