import type { Metadata } from "next";
import { assetPath, contactEmail } from "../site-config";

export const metadata: Metadata = {
  title: "Website Terms",
  description: "Terms for using the Cocoa Atelier concept website and submitting an enquiry.",
};

export default function TermsPage() {
  return (
    <main className="legal-page">
      <a className="legal-back" href={assetPath("/")}>← Back to Cocoa Atelier</a>
      <p className="eyebrow">Cocoa Atelier</p>
      <h1>Website Terms</h1>
      <p className="legal-updated">Last updated 13 August 2026</p>

      <section>
        <h2>Concept website</h2>
        <p>This website presents the proposed Cocoa Atelier collection. Submitting a form is an enquiry, not acceptance of an order or a completed purchase.</p>
      </section>
      <section>
        <h2>Products, pricing and availability</h2>
        <p>Products are handmade and may vary slightly from photographs. Prices marked “from” depend on the selected size and finish. Availability, final price, delivery fee and timing are confirmed directly before payment.</p>
      </section>
      <section>
        <h2>Fresh and personalised goods</h2>
        <p>Ingredients, allergens, care requirements, cancellations, changes and any refund terms will be provided with the final quote and must be agreed before payment.</p>
      </section>
      <section>
        <h2>Website content</h2>
        <p>Photographs, branding and written content on this website are provided for Cocoa Atelier. They may not be copied or reused without permission.</p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>Questions about these terms can be sent to <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.</p>
      </section>
    </main>
  );
}
