# Cocoa Atelier

[See the live Cocoa Atelier concept](https://keny369.github.io/ca/)

This project has a personal reason behind it. Mario is my brother-in-law and Elena is his wife. Elena has wanted to build Cocoa Atelier for some time: a Melbourne atelier creating chocolate strawberry bouquets, sculptural edible gifts, grazing boxes and styled grazing tables for celebrations, events and corporate gifting.

I offered to build the first website as a gift to them. This repository is where I’m shaping that idea with Mario and Elena, testing the positioning and refining the collection until it is ready to become a real business.

The direction is intentionally European, sophisticated and luxurious, but still warm and accessible. The website should feel considered rather than corporate, with Elena’s products and presentation doing most of the talking.

— Lee Powell

## What is here

- A responsive Cocoa Atelier concept website carrying the official Cocoa Atelier logo.
- Eight founding-collection pieces with interactive colour-palette previews.
- A grazing range — seasonal fruit and charcuterie boxes, the Grazing Duo, and grazing tables and dessert stations — photographed from Elena's real jobs.
- Working enquiry forms for collection, grazing, bespoke, event and corporate requests, with email and Elena's mobile shown as fallbacks.
- A "Follow the atelier" section linking Instagram and TikTok, with the September city pop-up announced.
- A `paymentUrl` hook on every product so Square checkout links can be dropped in without touching the layout (see `research/square-online-integration.md`).
- Melbourne delivery across the collection and Click & Collect messaging.
- Privacy, website terms and enquiry-confirmation pages.
- Search, answer-engine and geographic metadata grounded in the business facts we currently know.
- Market research, positioning and launch recommendations in `research/market-and-site-strategy.md`.

The original emails, extracted attachments, raw grazing photos and videos, and internal contact sheets remain local and are deliberately excluded from this public repository.

## Current status

This is a public concept site, not a live online store. It does not yet take payments. Product and general enquiries are sent through a static-site form service so Elena can confirm availability, delivery and secure payment personally. The first test submission will send an activation email to the Cocoa Atelier inbox; Elena or Mario needs to approve it once before submissions are forwarded.

Before commercial launch, Mario and Elena still need to confirm the domain, Click & Collect suburb, ABN, grazing box sizes and prices, exact product sizes and counts, ingredients, allergen process, cancellation and refund terms. Square checkout links are the recommended next step for fixed products and confirmed quotes; the comparison with Stripe is in `research/square-online-integration.md`.

## Discoverability foundations

The site includes:

- a self-referencing canonical URL and Australian English locale;
- Melbourne, Victoria and Australia geographic signals;
- crawl and index directives, `robots.txt` and an XML sitemap;
- Open Graph and X social-card metadata;
- a web manifest;
- Schema.org JSON-LD for the business, website, collection, products and visible FAQs;
- descriptive headings, product copy, image alt text and answer-focused FAQ content.
- lightweight WebP product imagery and cropped flagship previews that remove third-party branding.

No street address, opening hours, ratings, reviews or verification codes have been invented. Those can be added when the business confirms them. The contact phone number, email, Instagram and TikTok accounts are the real ones. Metadata helps engines understand the site; it cannot guarantee rankings, citations or rich-result treatment.

## Local development

Requirements: Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run lint
npm test
```

The site is exported as static HTML, CSS and JavaScript and published automatically to GitHub Pages whenever the `main` branch changes. When a permanent Cocoa Atelier domain is ready, the canonical URL and GitHub Pages custom-domain setting can be updated together.

## Ownership

Cocoa Atelier’s name, branding, copy and supplied product imagery are reserved for Cocoa Atelier. They are published here to develop this business and are not offered for reuse.
