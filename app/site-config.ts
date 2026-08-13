export const basePath = "/ca";

export const siteUrl = "https://keny369.github.io/ca";

export function assetPath(path: string) {
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}

export const siteName = "Cocoa Atelier";

export const siteDescription =
  "Handcrafted chocolate strawberry bouquets, luxury edible gifts and bespoke event pieces, made fresh to order in Melbourne.";

export const contactEmail = "cocoaatelier@outlook.com";

export const instagramUrl = "https://www.instagram.com/cocoaatelierart/";

export const location = {
  city: "Melbourne",
  region: "Victoria",
  regionCode: "VIC",
  country: "Australia",
  countryCode: "AU",
};
