import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

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
  title: "Cocoa Atelier | Handcrafted Chocolate Gifts in Melbourne",
  description:
    "Strawberry bouquets and sculptural chocolate gifts, handcrafted fresh to order in Melbourne.",
  metadataBase: new URL("https://cocoaatelier.com.au"),
  openGraph: {
    title: "Cocoa Atelier | A gift, composed to be remembered",
    description:
      "Strawberry bouquets and sculptural chocolate gifts, handcrafted fresh to order in Melbourne.",
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
    description: "Strawberry bouquets and sculptural chocolate gifts, handcrafted fresh to order in Melbourne.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU">
      <body className={`${display.variable} ${sans.variable}`}>{children}</body>
    </html>
  );
}
