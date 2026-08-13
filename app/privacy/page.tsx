import type { Metadata } from "next";
import { assetPath, contactEmail, siteName } from "../site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Cocoa Atelier handles personal information submitted through this website.",
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <a className="legal-back" href={assetPath("/")}>← Back to Cocoa Atelier</a>
      <p className="eyebrow">Cocoa Atelier</p>
      <h1>Privacy Policy</h1>
      <p className="legal-updated">Last updated 13 August 2026</p>

      <section>
        <h2>What we collect</h2>
        <p>When you send an enquiry, we may collect your name, email address, phone number, recipient phone number, delivery suburb, preferred date and the details you choose to include.</p>
      </section>
      <section>
        <h2>How we use it</h2>
        <p>We use this information to respond to your enquiry, confirm availability, prepare a quote, coordinate fulfilment and provide customer service. We do not sell personal information.</p>
      </section>
      <section>
        <h2>Form processing</h2>
        <p>Website forms are processed by FormSubmit and forwarded to the Cocoa Atelier email inbox. By submitting a form, you acknowledge that the information will pass through that service for delivery.</p>
      </section>
      <section>
        <h2>Storage and disclosure</h2>
        <p>Enquiry information may be retained in email records for as long as reasonably needed to respond, provide a quote or manage an order. It may be shared with delivery or service providers only where needed to fulfil an agreed order or comply with law.</p>
      </section>
      <section>
        <h2>Your choices</h2>
        <p>You may ask to access, correct or delete personal information held by Cocoa Atelier. Email <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.</p>
      </section>
      <p className="legal-note">This policy applies to the {siteName} website and may be updated as the business and its ordering systems develop.</p>
    </main>
  );
}
