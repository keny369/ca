import type { Metadata } from "next";
import { assetPath, contactEmail } from "../site-config";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your Cocoa Atelier enquiry has been sent.",
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  return (
    <main className="thanks-page">
      <p className="eyebrow light">Enquiry received</p>
      <h1>Thank you.</h1>
      <p>Elena will review your request and reply with availability, delivery and the next step.</p>
      <a className="button button-ivory" href={assetPath("/")}>Return to Cocoa Atelier</a>
      <p className="thanks-fallback">If you need to add anything, email <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.</p>
    </main>
  );
}
