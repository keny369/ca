# Square online integration — options, fees and recommendation

Context from the launch meeting: Square will run the physical point of sale (Chadstone stand, weekend pop-up). The website is a static export on GitHub Pages with no server, so anything that needs a backend is out for now. The question is how online payments should work, and whether Stripe is worth running alongside Square.

## The three ways Square can take online payments from this site

### 1. Square Online Checkout links (recommended first step)

Hosted checkout pages that Square generates per item or per custom amount. No monthly fee, no code, no server.

- Square Dashboard → **Payments → Online Checkout** → *Create a link* → *Sell an item* → pick an item from the Item Library → copy the link.
- Each link opens a Square-hosted page with card, Apple Pay, Google Pay and Afterpay, then emails a receipt to the customer and an order notification to Elena.
- Items live in the same **Item Library** the Square tablet uses, so the collection, pricing and sales reporting are one catalogue across the stand, pop-up and website.
- Checkout links can ask for a **note** (palette, preferred date, gift message) and a **pickup or delivery address**.
- *Accept a payment* links take a custom amount — ideal for bespoke, grazing and event quotes: Elena agrees the price by email, sends the link, done.

**How it plugs into the site:** every product in `app/page.tsx` has an optional `paymentUrl` field. Paste the Square link in and a "Buy now · secure Square checkout" button appears in that product's enquiry modal, with the enquiry form kept underneath for anyone who wants to ask first. Nothing else changes.

### 2. Square Online store

A Square-hosted shop (e.g. `cocoaatelier.square.site`, or `shop.cocoaatelier.com.au` on a paid plan) that the website links to with "Shop" buttons.

- Adds a real cart, **pickup time slots and local-delivery zones/fees** — the strongest fit for a made-to-order business that needs date control.
- Free plan carries Square branding and a square.site address; a custom domain needs a paid plan.
- Two places to keep design consistent; the main site stays the brand front door, the store handles transactions.

Worth moving to once weekly online orders justify managing a second property.

### 3. Square Web Payments SDK / Checkout API

Embedded checkout inside the website. Needs a small server (a Cloudflare Worker would do) to create payments securely. Not for the static site today; revisit only if the brand wants a fully on-domain checkout later.

## Square vs Stripe — online fees (Australia)

| | Square (online checkout links / Square Online) | Stripe (domestic cards) |
|---|---|---|
| Rate | 2.2% per transaction, no fixed fee | 1.7% + A$0.30 per transaction |
| $50 grazing box | $1.10 | $1.15 |
| $110 Baby Bliss | $2.42 | $2.17 |
| $220 Signature Bouquet | $4.84 | $4.04 |
| $400 Rose Elegance | $8.80 | $7.10 |
| Break-even | Square cheaper **below A$60**; Stripe cheaper above | |
| In-person (tablet) | 1.6% — single provider for stand and pop-up | Needs Stripe Terminal hardware; extra system |
| Catalogue & reporting | One Item Library across POS and web | Separate products, separate reconciliation |
| Afterpay / Apple Pay / Google Pay | Included | Included |

Rates quoted from each provider's published Australian pricing as at writing — confirm on square.com/au/pricing and stripe.com/au/pricing before deciding, and note international and Amex cards cost more on both.

**Recommendation:** start with Square Checkout links. On a $220 order the difference is about eighty cents, and the operational simplicity of one catalogue, one settlement and one reporting view for a two-person business outweighs it. Keep Stripe in reserve: if online volume grows to the point where ~0.5% on larger orders matters, Stripe Payment Links can replace the `paymentUrl` values one product at a time with no rebuild of the site.

## Setup checklist for Elena and Mario

1. In Square Dashboard, create the **Item Library**: one item per collection piece, with price, photo and variations (e.g. *Signature* / *Grand*). Add grazing boxes once sizes and prices are fixed.
2. **Payments → Online Checkout → Create a link** for each fixed-price item. Turn on "collect a note from the customer" and pickup/delivery details. Copy each link.
3. Create one **Accept a payment** link for quoted orders and keep it handy for bespoke, grazing and event invoices.
4. Send the links to Lee — they go into `paymentUrl` per product and the Buy now buttons appear on the next deploy.
5. Turn on **Afterpay** and **digital wallets** in Square settings if not already on.
6. Run one real test order at a low price, then refund it, to confirm receipts and notifications arrive at cocoaatelier@outlook.com.
7. Settle terms and refund/cancellation wording before the first link goes public (the site's Terms page should match what Square receipts say).

## What is already wired on the site

- Enquiry forms on every product and in the contact panel post to cocoaatelier@outlook.com via FormSubmit (Elena must click the one-time activation email on the first submission).
- `paymentUrl` support in the product modal, ready for Square links.
- Phone 0447 615 490 and Elena's name on all enquiry points, plus `tel:` links for mobile.
