export const basePath = "/ca";

export const siteUrl = "https://keny369.github.io/ca";

export function assetPath(path: string) {
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}

export const siteName = "Cocoa Atelier";

export const siteDescription =
  "Handcrafted chocolate strawberry bouquets, luxury edible gifts, grazing boxes and styled grazing tables, made fresh to order in Melbourne.";

export const contactName = "Elena";

export const contactEmail = "cocoaatelier@outlook.com";

export const contactPhone = "0447 615 490";

export const contactPhoneHref = "tel:+61447615490";

export const instagramUrl = "https://www.instagram.com/cocoaatelierart/";

export const instagramHandle = "@cocoaatelierart";

export const tiktokUrl = "https://www.tiktok.com/@cocoa.atelier6";

export const tiktokHandle = "@cocoa.atelier6";

export const logoPath = "/images/logo.png";

export const popupNotice =
  "From September, find Cocoa Atelier at a weekend pop-up inside a French champagne bar in Melbourne's city centre, every Saturday and Sunday. Dates and details are announced on Instagram and TikTok first.";

export const grazingLeadTime =
  "Please allow at least three days for grazing boxes and two weeks for grazing tables and dessert stations.";

export const collectionLeadTime =
  "Please allow at least 48 hours for collection pieces and one week for towers, events and larger corporate orders.";

export const allergenNotice =
  "Chocolate products contain milk and soy and may contain traces of other allergens.";

export const location = {
  city: "Melbourne",
  region: "Victoria",
  regionCode: "VIC",
  country: "Australia",
  countryCode: "AU",
};
