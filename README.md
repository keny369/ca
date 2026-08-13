# Cocoa Atelier

[See the live Cocoa Atelier concept](https://keny369.github.io/ca/)

This project has a personal reason behind it. Mario is my brother-in-law and Elena is his wife. Elena has wanted to build Cocoa Atelier for some time: a Melbourne atelier creating chocolate strawberry bouquets, sculptural edible gifts and beautiful pieces for celebrations, events and corporate gifting.

I offered to build the first website as a gift to them. This repository is where I’m shaping that idea with Mario and Elena, testing the positioning and refining the collection until it is ready to become a real business.

The direction is intentionally European, sophisticated and luxurious, but still warm and accessible. The website should feel considered rather than corporate, with Elena’s products and presentation doing most of the talking.

— Lee Powell

## What is here

- A responsive Cocoa Atelier concept website.
- Eight founding-collection pieces with interactive colour-palette previews.
- Enquiry-led ordering for collection, bespoke, event and corporate requests.
- Melbourne delivery and Click & Collect messaging.
- Search, answer-engine and geographic metadata grounded in the business facts we currently know.
- Market research, positioning and launch recommendations in `research/market-and-site-strategy.md`.

The original emails, extracted attachments and internal contact sheets remain local and are deliberately excluded from this public repository.

## Current status

This is a public concept site, not a live online store. It does not yet take payments. Product selections open a prepared email so Elena can confirm availability, delivery and secure payment personally.

Before commercial launch, the final business name, domain, delivery zones, lead times, ingredients, allergens, refund terms, privacy wording and payment process need to be confirmed by Mario and Elena.

## Discoverability foundations

The site includes:

- a self-referencing canonical URL and Australian English locale;
- Melbourne, Victoria and Australia geographic signals;
- crawl and index directives, `robots.txt` and an XML sitemap;
- Open Graph and X social-card metadata;
- a web manifest;
- Schema.org JSON-LD for the business, website, collection, products and visible FAQs;
- descriptive headings, product copy, image alt text and answer-focused FAQ content.

No address, telephone number, opening hours, ratings, reviews or verification codes have been invented. Those can be added when the business confirms them. Metadata helps engines understand the site; it cannot guarantee rankings, citations or rich-result treatment.

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
