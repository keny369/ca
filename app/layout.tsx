import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { StructuredData } from "./structured-data";
import {
  instagramUrl,
  siteDescription,
  siteName,
  siteUrl,
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
    default: "Cocoa Atelier | Chocolate Strawberry Bouquets Melbourne",
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
    "bespoke gifts Melbourne",
    "corporate gifting Melbourne",
    "wedding dessert styling Melbourne",
    "Melbourne chocolate delivery",
    "Cocoa Atelier",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "en-AU": "/",
    },
  },
  manifest: "/manifest.webmanifest",
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
    url: "/",
    siteName,
    type: "website",
    locale: "en_AU",
    images: [
      {
        url: "/og.png",
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
    images: ["/og.png"],
  },
  other: {
    "geo.region": "AU-VIC",
    "geo.placename": "Melbourne",
    "DCTERMS.coverage": "Melbourne, Victoria, Australia",
    "business:contact_data:locality": "Melbourne",
    "business:contact_data:region": "Victoria",
    "business:contact_data:country_name": "Australia",
    "business:contact_data:email": "cocoaatelier@outlook.com",
    "profile:first_name": "Elena",
    "og:see_also": instagramUrl,
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
