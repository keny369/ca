import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { StructuredData } from "./structured-data";
import {
  assetPath,
  contactEmail,
  contactPhone,
  instagramUrl,
  siteDescription,
  siteName,
  siteUrl,
  tiktokUrl,
} from "./site-config";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Cocoa Atelier | Chocolate Strawberry Bouquets & Grazing Melbourne",
    template: "%s | Cocoa Atelier Melbourne",
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "Food & Drink",
  referrer: "origin-when-cross-origin",
  keywords: [
    "chocolate strawberry bouquets Melbourne",
    "luxury chocolate gifts Melbourne",
    "edible bouquets Melbourne",
    "chocolate covered strawberries Melbourne",
    "grazing boxes Melbourne",
    "grazing tables Melbourne",
    "grazing platters Melbourne",
    "charcuterie box Melbourne",
    "fruit platter delivery Melbourne",
    "bespoke gifts Melbourne",
    "corporate gifting Melbourne",
    "wedding dessert styling Melbourne",
    "Melbourne chocolate delivery",
    "Cocoa Atelier",
  ],
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-AU": siteUrl,
    },
  },
  manifest: `${siteUrl}/manifest.webmanifest`,
  icons: {
    icon: [
      { url: assetPath("/favicon.ico"), sizes: "48x48" },
      { url: assetPath("/icons/icon-32.png"), sizes: "32x32", type: "image/png" },
      { url: assetPath("/icons/icon-192.png"), sizes: "192x192", type: "image/png" },
      { url: assetPath("/icons/icon-512.png"), sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: assetPath("/icons/icon-180.png"), sizes: "180x180", type: "image/png" }],
    shortcut: [assetPath("/favicon.ico")],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Cocoa Atelier | A gift, composed to be remembered",
    description: siteDescription,
    url: siteUrl,
    siteName,
    type: "website",
    locale: "en_AU",
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1792,
        height: 936,
        alt: "Cocoa Atelier chocolate strawberry bouquets with the words A gift, composed to be remembered",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cocoa Atelier | A gift, composed to be remembered",
    description: siteDescription,
    images: [`${siteUrl}/og.png`],
  },
  other: {
    "geo.region": "AU-VIC",
    "geo.placename": "Melbourne",
    "DCTERMS.coverage": "Melbourne, Victoria, Australia",
    "business:contact_data:locality": "Melbourne",
    "business:contact_data:region": "Victoria",
    "business:contact_data:country_name": "Australia",
    "business:contact_data:email": contactEmail,
    "business:contact_data:phone_number": contactPhone,
    "profile:first_name": "Elena",
    "og:see_also": [instagramUrl, tiktokUrl],
  },
};

export const viewport: Viewport = {
  themeColor: "#291914",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU">
      <body className={`${display.variable} ${sans.variable}`}>
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
