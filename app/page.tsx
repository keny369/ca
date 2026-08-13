"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { assetPath } from "./site-config";

type Product = {
  name: string;
  price: string;
  image: string;
  alt: string;
  category: "Bouquets" | "Gift boxes" | "Statement pieces";
  note: string;
  badge?: string;
};

const products: Product[] = [
  {
    name: "The Signature Bouquet",
    price: "from $220",
    image: "/images/signature-bouquet.png",
    alt: "Chocolate strawberry bouquet in cocoa and ivory tones",
    category: "Bouquets",
    note: "Chocolate-dipped strawberries composed in cocoa and ivory.",
    badge: "Atelier favourite",
  },
  {
    name: "Rose Elegance",
    price: "$400",
    image: "/images/rose-elegance.png",
    alt: "Pink rose and chocolate strawberry arrangement",
    category: "Statement pieces",
    note: "Fresh roses and hand-finished strawberries in a generous composition.",
  },
  {
    name: "Love in Bloom",
    price: "$180",
    image: "/images/love-in-bloom.png",
    alt: "Pink heart gift box with chocolate strawberries and roses",
    category: "Gift boxes",
    note: "A heart-shaped arrangement for affection in all its forms.",
    badge: "Made for gifting",
  },
  {
    name: "The Prestige Collection",
    price: "from $180",
    image: "/images/prestige-collection.png",
    alt: "Chocolate strawberries in a clear rose-gold presentation box",
    category: "Statement pieces",
    note: "A sculptural presentation piece, made for the grand reveal.",
  },
  {
    name: "Baby Bliss",
    price: "$110",
    image: "/images/baby-bliss.png",
    alt: "Pink pram-shaped gift box filled with chocolate strawberries",
    category: "Gift boxes",
    note: "A gentle welcome for a little one, styled in your chosen palette.",
  },
  {
    name: "Pure Elegance",
    price: "from $200",
    image: "/images/pure-elegance.png",
    alt: "White chocolate strawberry bouquet",
    category: "Bouquets",
    note: "An all-white composition with a quiet, ceremonial finish.",
  },
  {
    name: "The Blooming Atelier",
    price: "$160",
    image: "/images/blooming-atelier.jpeg",
    alt: "Pink and white chocolate tulips and roses in a round hat box",
    category: "Bouquets",
    note: "Chocolate roses and tulips arranged as a lasting first impression.",
  },
  {
    name: "Cocoa Tulip",
    price: "$330",
    image: "/images/cocoa-tulip.png",
    alt: "Pink and white tulip-inspired chocolate strawberry arrangement",
    category: "Statement pieces",
    note: "Our signature tulip-inspired form, finished entirely by hand.",
  },
];

const filters = ["All pieces", "Bouquets", "Gift boxes", "Statement pieces"] as const;

function Monogram() {
  return (
    <span className="monogram" aria-hidden="true">
      C<span>A</span>
    </span>
  );
}

export default function Home() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All pieces");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedPalette, setSelectedPalette] = useState("Cocoa & ivory");
  const [menuOpen, setMenuOpen] = useState(false);

  const visibleProducts =
    filter === "All pieces"
      ? products
      : products.filter((product) => product.category === filter);

  const productPalettePreviews: Record<string, Record<string, string>> = {
    "The Signature Bouquet": {
      "Cocoa & ivory": "/images/signature-bouquet.png",
      "Rose & blush": "/images/signature-bouquet-rose-blush.png",
      "Red romance": "/images/signature-bouquet-red-romance.png",
      "Custom palette": "/images/signature-bouquet.png",
    },
    "Rose Elegance": {
      "Cocoa & ivory": "/images/rose-elegance-cocoa-ivory.png",
      "Rose & blush": "/images/rose-elegance.png",
      "Red romance": "/images/rose-elegance-red-romance.png",
      "Custom palette": "/images/rose-elegance.png",
    },
    "Love in Bloom": {
      "Cocoa & ivory": "/images/love-in-bloom-cocoa-ivory.png",
      "Rose & blush": "/images/love-in-bloom.png",
      "Red romance": "/images/love-in-bloom-red-romance.png",
      "Custom palette": "/images/love-in-bloom.png",
    },
    "The Prestige Collection": {
      "Cocoa & ivory": "/images/prestige-collection.png",
      "Rose & blush": "/images/prestige-rose-blush.png",
      "Red romance": "/images/prestige-red-romance.png",
      "Custom palette": "/images/prestige-collection.png",
    },
    "Baby Bliss": {
      "Cocoa & ivory": "/images/baby-bliss-cocoa-ivory.png",
      "Rose & blush": "/images/baby-bliss.png",
      "Red romance": "/images/baby-bliss-red-romance.png",
      "Custom palette": "/images/baby-bliss.png",
    },
    "Pure Elegance": {
      "Cocoa & ivory": "/images/pure-elegance-cocoa-ivory.png",
      "Rose & blush": "/images/pure-elegance-rose-blush.png",
      "Red romance": "/images/pure-elegance-red-romance.png",
      "Custom palette": "/images/pure-elegance.png",
    },
    "The Blooming Atelier": {
      "Cocoa & ivory": "/images/blooming-atelier-cocoa-ivory.png",
      "Rose & blush": "/images/blooming-atelier-rose-blush.png",
      "Red romance": "/images/blooming-atelier-red-romance.png",
      "Custom palette": "/images/blooming-atelier-rose-blush.png",
    },
    "Cocoa Tulip": {
      "Cocoa & ivory": "/images/cocoa-tulip-cocoa-ivory.png",
      "Rose & blush": "/images/cocoa-tulip.png",
      "Red romance": "/images/cocoa-tulip-red-romance.png",
      "Custom palette": "/images/cocoa-tulip.png",
    },
  };

  const activePalettePreviews = selectedProduct
    ? productPalettePreviews[selectedProduct.name]
    : undefined;
  const modalImage = activePalettePreviews?.[selectedPalette] ?? selectedProduct?.image;

  function openProduct(product: Product) {
    setSelectedPalette("Cocoa & ivory");
    setSelectedProduct(product);
  }

  useEffect(() => {
    if (!selectedProduct) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProduct(null);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.body.classList.add("modal-open");
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.classList.remove("modal-open");
    };
  }, [selectedProduct]);

  function submitOrderRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedProduct) return;
    const data = new FormData(event.currentTarget);
    const subject = `Order enquiry: ${selectedProduct.name}`;
    const body = [
      `Hello Elena,`,
      ``,
      `I would like to enquire about ${selectedProduct.name} (${selectedProduct.price}).`,
      `Preferred palette: ${data.get("palette")}`,
      `Fulfilment: ${data.get("fulfilment")}`,
      `Preferred date: ${data.get("date") || "To be confirmed"}`,
      `Gift note / request: ${data.get("message") || "None"}`,
      ``,
      `Please confirm availability and the next step for secure payment.`,
    ].join("\n");
    window.location.href = `mailto:cocoaatelier@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <main>
      <div className="preview-ribbon">
        <span>Website concept</span>
        <p>Founding collection preview · Orders are not yet live</p>
        <span className="preview-ribbon-end">Melbourne</span>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Cocoa Atelier home">
          <Monogram />
          <span className="brand-name">Cocoa Atelier</span>
        </a>
        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
        <nav id="primary-navigation" className={menuOpen ? "nav nav-open" : "nav"}>
          <a href="#collection" onClick={() => setMenuOpen(false)}>Collection</a>
          <a href="#bespoke" onClick={() => setMenuOpen(false)}>Bespoke</a>
          <a href="#events" onClick={() => setMenuOpen(false)}>Events</a>
          <a href="#atelier" onClick={() => setMenuOpen(false)}>Our atelier</a>
        </nav>
        <a className="header-cta" href="#collection">Explore the collection</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow light">Handcrafted in Melbourne</p>
          <h1>A gift, composed<br />to be remembered.</h1>
          <p className="hero-intro">
            Strawberry bouquets and sculptural chocolate gifts, made fresh to order
            for the moments that deserve more than ordinary.
          </p>
          <div className="hero-actions">
            <a className="button button-ivory" href="#collection">Discover the collection</a>
            <a className="text-link light-link" href="#bespoke">Create something bespoke <span>↗</span></a>
          </div>
          <p className="hero-service">Local Melbourne delivery · Click &amp; Collect by appointment</p>
        </div>
        <div className="hero-image" role="img" aria-label="A collection of Cocoa Atelier chocolate strawberry bouquets">
          <div className="hero-image-note">
            <span>01</span>
            <p>Fresh strawberries<br />Finished by hand</p>
          </div>
        </div>
      </section>

      <div className="service-strip" aria-label="Service highlights">
        <p><span>Made to order</span> in our Melbourne atelier</p>
        <p><span>Complimentary</span> personalised gift note</p>
        <p><span>Local delivery</span> on orders from $160</p>
      </div>

      <section className="collection section" id="collection">
        <div className="section-heading">
          <div>
            <p className="eyebrow">The founding collection</p>
            <h2>Beautifully considered.<br />Deliciously unexpected.</h2>
          </div>
          <p className="section-intro">
            A concise edit of gifts for celebrations, affection and unforgettable arrivals.
            Every piece is composed fresh, then personalised for its recipient.
          </p>
        </div>

        <div className="filters" aria-label="Filter collection">
          {filters.map((item) => (
            <button
              type="button"
              key={item}
              className={filter === item ? "filter active" : "filter"}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {visibleProducts.map((product, index) => (
            <article className="product-card" key={product.name}>
              <button
                className="product-image-wrap"
                type="button"
                onClick={() => openProduct(product)}
                aria-label={`Personalise ${product.name}`}
              >
                {product.badge && <span className="product-badge">{product.badge}</span>}
                <Image
                  src={assetPath(product.image)}
                  alt={product.alt}
                  fill
                  sizes="(max-width: 560px) 86vw, (max-width: 820px) 43vw, (max-width: 1120px) 29vw, 22vw"
                  className={`product-image product-position-${index + 1}`}
                />
                <span className="quick-view">Personalise <span>↗</span></span>
              </button>
              <div className="product-info">
                <div>
                  <p className="product-category">{product.category}</p>
                  <h3>{product.name}</h3>
                </div>
                <p className="product-price">{product.price}</p>
              </div>
              <p className="product-note">{product.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bespoke section" id="bespoke">
        <div className="bespoke-image">
          <Image
            src={assetPath("/images/atelier-editorial.png")}
            alt="A white Cocoa Atelier presentation piece in a clear keepsake box"
            fill
            sizes="(max-width: 820px) 86vw, 46vw"
            className="bespoke-source-image"
          />
          <div className="bespoke-image-caption">
            <span>Signature presentation</span>
            <span>Melbourne · Made to order</span>
          </div>
        </div>
        <div className="bespoke-copy">
          <p className="eyebrow">The bespoke atelier</p>
          <h2>Choose the feeling.<br />We’ll compose the rest.</h2>
          <p>
            Begin with a palette, an occasion or a person. Elena will guide the flowers,
            chocolate finish, vessel and ribbon into one harmonious piece.
          </p>
          <div className="bespoke-choices">
            <div><span>01</span><p><strong>Your palette</strong>Ivory, cocoa, rose, red, blue, lavender or something entirely yours.</p></div>
            <div><span>02</span><p><strong>Your composition</strong>Bouquet, keepsake box, tower or a centrepiece designed for the room.</p></div>
            <div><span>03</span><p><strong>Your final touch</strong>A considered ribbon, gift message and presentation made for arrival.</p></div>
          </div>
          <a className="button button-dark" href="mailto:cocoaatelier@outlook.com?subject=Bespoke%20Cocoa%20Atelier%20enquiry">Begin a bespoke order</a>
        </div>
      </section>

      <section className="process section">
        <div className="process-title">
          <p className="eyebrow">How it works</p>
          <h2>Made slowly.<br />Ordered simply.</h2>
        </div>
        <div className="process-steps">
          <article><span>01</span><h3>Select your piece</h3><p>Choose a signature design or begin with a bespoke brief.</p></article>
          <article><span>02</span><h3>Make it personal</h3><p>Choose the palette and finish, then add a complimentary gift note.</p></article>
          <article><span>03</span><h3>Choose the moment</h3><p>Select Melbourne delivery or Click &amp; Collect by appointment.</p></article>
        </div>
        <div className="delivery-card">
          <p className="eyebrow">A note on delivery</p>
          <p>Local Melbourne delivery is available for orders of $160 or more. Delivery is calculated for your suburb. Orders below $160 are available for Click &amp; Collect.</p>
          <a href="#faq">Read delivery &amp; care <span>→</span></a>
        </div>
      </section>

      <section className="events" id="events">
        <div className="events-image" role="img" aria-label="Cocoa Atelier chocolate strawberry arrangements at an evening event" />
        <div className="events-copy">
          <p className="eyebrow light">Events &amp; corporate</p>
          <h2>Made for the room.<br />Remembered after it.</h2>
          <p>
            Sculptural dessert towers, wedding tables, client gifting and custom collections,
            composed around your event, palette and guest list.
          </p>
          <div className="events-list">
            <span>Weddings</span><span>Milestones</span><span>Corporate gifting</span><span>Grazing tables</span>
          </div>
          <a className="button button-ivory" href="mailto:cocoaatelier@outlook.com?subject=Cocoa%20Atelier%20event%20enquiry">Request an event proposal</a>
        </div>
      </section>

      <section className="atelier section" id="atelier">
        <div className="atelier-copy">
          <p className="eyebrow">Our atelier</p>
          <h2>Floral in form.<br />Chocolate at heart.</h2>
          <p className="large-copy">
            Cocoa Atelier began with Elena’s belief that an edible gift could hold the same
            emotion, beauty and anticipation as flowers.
          </p>
          <p>
            Each arrangement is made fresh in Melbourne using carefully selected strawberries,
            chocolate finishes and considered presentation. No production line—just patient
            hands, a trained eye and a piece composed for one particular moment.
          </p>
          <a className="text-link" href="mailto:cocoaatelier@outlook.com?subject=Hello%20Cocoa%20Atelier">Meet the atelier <span>↗</span></a>
        </div>
        <div className="atelier-still-life">
          <Image
            src={assetPath("/images/atelier-gift-box.png")}
            alt="Chocolate rose strawberries in a wooden gift box"
            fill
            sizes="(max-width: 820px) 86vw, 52vw"
            className="atelier-source-image"
          />
          <div className="atelier-mark"><Monogram /><span>Made in Melbourne</span></div>
        </div>
      </section>

      <section className="faq section" id="faq">
        <div className="faq-heading">
          <p className="eyebrow">The details</p>
          <h2>Before you order.</h2>
          <p>Need something not covered here? Elena would be delighted to help.</p>
          <a href="mailto:cocoaatelier@outlook.com">cocoaatelier@outlook.com</a>
        </div>
        <div className="faq-list">
          <details>
            <summary>How much notice do you need?<span>+</span></summary>
            <p>Every piece is made fresh to order. Lead times will be confirmed with availability; event, tower and large corporate orders should be discussed as early as possible.</p>
          </details>
          <details>
            <summary>Can I choose the colours?<span>+</span></summary>
            <p>Yes. Choose from the atelier palette or request a custom combination for the chocolate finish, flowers, gift box and ribbon, subject to availability.</p>
          </details>
          <details>
            <summary>Where do you deliver?<span>+</span></summary>
            <p>Cocoa Atelier offers local Melbourne delivery on orders of $160 or more. Delivery fees depend on the suburb. Click &amp; Collect is available by appointment.</p>
          </details>
          <details>
            <summary>What about allergens and storage?<span>+</span></summary>
            <p>Chocolate products commonly contain milk and soy and may be prepared where other allergens are present. Exact ingredient, allergen and care information will be provided before orders open.</p>
          </details>
          <details>
            <summary>Do you create corporate and event orders?<span>+</span></summary>
            <p>Yes. Enquire with your date, location, quantity, palette and budget for a tailored proposal covering gifting, grazing, towers or dessert styling.</p>
          </details>
        </div>
      </section>

      <section className="contact-panel">
        <p className="eyebrow light">A beautiful beginning</p>
        <h2>Tell us what you’re celebrating.</h2>
        <p>For bespoke orders, events and early collection enquiries, write to the atelier.</p>
        <a className="button button-ivory" href="mailto:cocoaatelier@outlook.com?subject=Cocoa%20Atelier%20enquiry">Contact the atelier</a>
      </section>

      <footer>
        <div className="footer-brand">
          <Monogram />
          <h2>Cocoa Atelier</h2>
          <p>Handcrafted chocolate moments.</p>
        </div>
        <div className="footer-links">
          <div><p>Discover</p><a href="#collection">The collection</a><a href="#bespoke">Bespoke</a><a href="#events">Events &amp; corporate</a></div>
          <div><p>Information</p><a href="#faq">Delivery &amp; care</a><a href="#faq">FAQ</a><a href="mailto:cocoaatelier@outlook.com">Contact</a></div>
          <div><p>Follow</p><a href="https://www.instagram.com/cocoaatelierart/">Instagram</a><a href="mailto:cocoaatelier@outlook.com">Email</a></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Cocoa Atelier</span><span>Melbourne, Australia</span><span>Website concept · Ordering not yet live</span></div>
      </footer>

      {selectedProduct && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setSelectedProduct(null);
        }}>
          <section className="order-modal" role="dialog" aria-modal="true" aria-labelledby="order-title">
            <button className="modal-close" type="button" onClick={() => setSelectedProduct(null)} aria-label="Close order preview">×</button>
            <div className="modal-image">
              <Image
                key={modalImage}
                src={assetPath(modalImage ?? selectedProduct.image)}
                alt={`${selectedProduct.alt}, ${selectedPalette.toLowerCase()} palette preview`}
                fill
                sizes="(max-width: 820px) 100vw, 420px"
              />
              {activePalettePreviews && (
                <span className="palette-caption" aria-live="polite">
                  {selectedPalette === "Custom palette" ? "Custom palette · consultation" : `${selectedPalette} preview`}
                </span>
              )}
            </div>
            <div className="modal-content">
              <p className="eyebrow">Order preview</p>
              <h2 id="order-title">{selectedProduct.name}</h2>
              <p className="modal-price">{selectedProduct.price}</p>
              <p>{selectedProduct.note}</p>
              <form onSubmit={submitOrderRequest}>
                <label>
                  Preferred palette
                  <select
                    name="palette"
                    value={selectedPalette}
                    onChange={(event) => setSelectedPalette(event.target.value)}
                  >
                    <option>Cocoa &amp; ivory</option>
                    <option>Rose &amp; blush</option>
                    <option>Red romance</option>
                    <option>Custom palette</option>
                  </select>
                  {activePalettePreviews && (
                    <span className="field-hint">The product preview updates for each signature palette.</span>
                  )}
                </label>
                <label>Fulfilment<select name="fulfilment" defaultValue="Click & Collect"><option>Click &amp; Collect</option><option>Melbourne delivery — orders from $160</option></select></label>
                <label>Preferred date<input name="date" type="date" /></label>
                <label>Gift note or request<textarea name="message" rows={3} placeholder="Tell us who it is for, or add a complimentary gift note." /></label>
                <p className="modal-fineprint">This concept site is not taking payments yet. Your email app will open with this request ready to send. Elena can then confirm availability and secure payment.</p>
                <button className="button button-dark full-button" type="submit">Email this order request</button>
              </form>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
