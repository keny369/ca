import type { MetadataRoute } from "next";
import { siteDescription, siteName } from "./site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteName} — Handcrafted Chocolate Gifts Melbourne`,
    short_name: siteName,
    description: siteDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#fbf8f2",
    theme_color: "#291914",
    lang: "en-AU",
    categories: ["food", "shopping", "lifestyle"],
    icons: [
      {
        src: "/images/logo-reference.jpeg",
        sizes: "any",
        type: "image/jpeg",
      },
    ],
  };
}
