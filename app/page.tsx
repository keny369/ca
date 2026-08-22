"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  allergenNotice,
  assetPath,
  collectionLeadTime,
  contactEmail,
  contactName,
  contactPhone,
  contactPhoneHref,
  grazingLeadTime,
  instagramHandle,
  instagramUrl,
  logoPath,
  popupNotice,
  siteUrl,
  tiktokHandle,
  tiktokUrl,
} from "./site-config";

type Product = {
  name: string;
  price: string;
  image: string;
  alt: string;
  category: "Bouquets" | "Keepsake gifts" | "Grand gestures" | "Grazing boxes" | "Grazing tables";
  kind: "chocolate" | "grazing";
  note: string;
  details: string;
  defaultPalette: string;
  badge?: string;
  /** Square Online Checkout link for fixed-price pieces. When set, a "Buy now" button appears in the enquiry modal. */
  paymentUrl?: string;
};

const products: Product[] = [
  {
    name: "The Signature Bouquet",
    price: "from $220",
    image: "/images/signature-bouquet-cropped.webp",
    alt: "Chocolate strawberry bouquet in cocoa and ivory tones",
    category: "Bouquets",
    note: "Chocolate-dipped strawberries arranged in cocoa and ivory.",
    details: "Hand-dipped strawberry bouquet · kraft wrap · satin bow",
    kind: "chocolate",
    defaultPalette: "Cocoa & ivory",
    badge: "Atelier favourite",
  },
  {
    name: "The Prestige Collection",
    price: "from $180",
    image: "/images/prestige-collection.webp",
    alt: "Chocolate strawberries in a clear rose-gold presentation box",
    category: "Keepsake gifts",
    note: "A sculptural presentation piece, made for the grand reveal.",
    details: "Hand-dipped strawberries · clear keepsake cylinder · ribbon finish",
    kind: "chocolate",
    defaultPalette: "Cocoa & ivory",
  },
  {
    name: "Pure Elegance",
    price: "from $200",
    image: "/images/pure-elegance.webp",
    alt: "White chocolate strawberry bouquet",
    category: "Bouquets",
    note: "An all-white arrangement with a quiet, ceremonial finish.",
    details: "White chocolate finish · hand-arranged bouquet · presentation wrap",
    kind: "chocolate",
    defaultPalette: "Pure ivory",
  },
  {
    name: "Love in Bloom",
    price: "$180",
    image: "/images/love-in-bloom.webp",
    alt: "Pink heart gift box with chocolate strawberries and roses",
    category: "Keepsake gifts",
    note: "A heart-shaped arrangement for affection in all its forms.",
    details: "Heart-shaped presentation box · roses · chocolate-dipped strawberries",
    kind: "chocolate",
    defaultPalette: "Rose & blush",
    badge: "Made for gifting",
  },
  {
    name: "Baby Bliss",
    price: "$110",
    image: "/images/baby-bliss.webp",
    alt: "Pink pram-shaped gift box filled with chocolate strawberries",
    category: "Keepsake gifts",
    note: "A gentle welcome for a little one, styled in your chosen palette.",
    details: "Pram keepsake box · chocolate-dipped strawberries · ribbon finish",
    kind: "chocolate",
    defaultPalette: "Rose & blush",
  },
  {
    name: "Blossom Garden",
    price: "$160",
    image: "/images/blooming-atelier-rose-blush.webp",
    alt: "Pink and white chocolate tulips and roses in a round hat box",
    category: "Bouquets",
    note: "Chocolate roses and tulips arranged as a lasting first impression.",
    details: "Chocolate-dipped strawberries · fresh roses · round presentation box",
    kind: "chocolate",
    defaultPalette: "Rose & blush",
  },
  {
    name: "Cocoa Tulip",
    price: "$330",
    image: "/images/cocoa-tulip.webp",
    alt: "Pink and white tulip-inspired chocolate strawberry arrangement",
    category: "Grand gestures",
    note: "Our signature tulip-inspired form, finished entirely by hand.",
    details: "Tulip-inspired chocolate strawberries · round hat box · gift ribbon",
    kind: "chocolate",
    defaultPalette: "Rose & blush",
  },
  {
    name: "Rose Elegance",
    price: "$400",
    image: "/images/rose-elegance.webp",
    alt: "Pink rose and chocolate strawberry arrangement",
    category: "Grand gestures",
    note: "Fresh roses and hand-finished strawberries in a generous arrangement.",
    details: "Fresh rose arrangement · chocolate-dipped strawberries · presentation box",
    kind: "chocolate",
    defaultPalette: "Rose & blush",
  },
];

const grazingProducts: Product[] = [
  {
    name: "Seasonal Fruit Grazing Box",
    price: "Quoted by size",
    image: "/images/grazing-fruit-box.webp",
    alt: "Open kraft grazing box filled with watermelon, dragon fruit, strawberries, grapes and rockmelon",
    category: "Grazing boxes",
    kind: "grazing",
    note: "Watermelon, dragon fruit, berries and melon, cut and styled fresh on the morning of your event.",
    details: "Seasonal fruit · kraft presentation box · window lid available",
    defaultPalette: "",
    badge: "New",
  },
  {
    name: "Charcuterie Grazing Box",
    price: "Quoted by size",
    image: "/images/grazing-charcuterie-box.webp",
    alt: "Kraft grazing box with cured meats, soft cheeses, crackers, olives and dip",
    category: "Grazing boxes",
    kind: "grazing",
    note: "Cured meats, soft cheeses, crackers, olives and dips, arranged so guests can simply reach in.",
    details: "Cheese and charcuterie · crackers, olives and dips · kraft presentation box",
    defaultPalette: "",
  },
  {
    name: "The Grazing Duo",
    price: "Quoted by size",
    image: "/images/grazing-duo.webp",
    alt: "A charcuterie grazing box and a seasonal fruit grazing box styled side by side",
    category: "Grazing boxes",
    kind: "grazing",
    note: "One fruit box and one charcuterie box, styled to be served together for effortless entertaining.",
    details: "Sweet and savoury pair · two kraft boxes · serves a table",
    defaultPalette: "",
    badge: "Entertaining",
  },
  {
    name: "Grazing Tables & Dessert Stations",
    price: "Quoted per event",
    image: "/images/grazing-table-wide.webp",
    alt: "A long grazing table styled by Cocoa Atelier in front of windows overlooking the Melbourne skyline",
    category: "Grazing tables",
    kind: "grazing",
    note: "Long-table grazing and dessert styling, built on site for weddings, milestones and corporate events.",
    details: "Styled on site · fruit, cheese and charcuterie · dessert stations and chocolate pieces on request",
    defaultPalette: "",
  },
];

const socialGallery = [
  { image: "/images/signature-bouquet-cropped.webp", alt: "Chocolate strawberry bouquet in cocoa and ivory" },
  { image: "/images/grazing-duo-lids.webp", alt: "Two lidded grazing boxes ready for collection" },
  { image: "/images/prestige-collection.webp", alt: "The Prestige Collection keepsake cylinder" },
  { image: "/images/grazing-fruit-box-lid.webp", alt: "Seasonal fruit grazing box with a window lid" },
  { image: "/images/love-in-bloom.webp", alt: "Love in Bloom heart-shaped gift box" },
  { image: "/images/grazing-table-skyline.webp", alt: "Grazing table styled above the Melbourne skyline" },
];

const filters = ["All pieces", "Bouquets", "Keepsake gifts", "Grand gestures"] as const;
const formAction = `https://formsubmit.co/${contactEmail}`;
const paletteOptions = [
  "Cocoa & ivory",
  "Pure ivory",
  "Rose & blush",
  "Red romance",
  "Blue — consultation",
  "Lavender — consultation",
  "Custom palette",
] as const;

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
      "Cocoa & ivory": "/images/signature-bouquet-cropped.webp",
      "Rose & blush": "/images/signature-bouquet-rose-blush-cropped.webp",
      "Red romance": "/images/signature-bouquet-red-romance-cropped.webp",
      "Custom palette": "/images/signature-bouquet-cropped.webp",
    },
    "Rose Elegance": {
      "Cocoa & ivory": "/images/rose-elegance-cocoa-ivory.webp",
      "Rose & blush": "/images/rose-elegance.webp",
      "Red romance": "/images/rose-elegance-red-romance.webp",
      "Custom palette": "/images/rose-elegance.webp",
    },
    "Love in Bloom": {
      "Cocoa & ivory": "/images/love-in-bloom-cocoa-ivory.webp",
      "Rose & blush": "/images/love-in-bloom.webp",
      "Red romance": "/images/love-in-bloom-red-romance.webp",
      "Custom palette": "/images/love-in-bloom.webp",
    },
    "The Prestige Collection": {
      "Cocoa & ivory": "/images/prestige-collection.webp",
      "Rose & blush": "/images/prestige-rose-blush.webp",
      "Red romance": "/images/prestige-red-romance.webp",
      "Custom palette": "/images/prestige-collection.webp",
    },
    "Baby Bliss": {
      "Cocoa & ivory": "/images/baby-bliss-cocoa-ivory.webp",
      "Rose & blush": "/images/baby-bliss.webp",
      "Red romance": "/images/baby-bliss-red-romance.webp",
      "Custom palette": "/images/baby-bliss.webp",
    },
    "Pure Elegance": {
      "Pure ivory": "/images/pure-elegance.webp",
      "Cocoa & ivory": "/images/pure-elegance-cocoa-ivory.webp",
      "Rose & blush": "/images/pure-elegance-rose-blush.webp",
      "Red romance": "/images/pure-elegance-red-romance.webp",
      "Custom palette": "/images/pure-elegance.webp",
    },
    "Blossom Garden": {
      "Cocoa & ivory": "/images/blooming-atelier-cocoa-ivory.webp",
      "Rose & blush": "/images/blooming-atelier-rose-blush.webp",
      "Red romance": "/images/blooming-atelier-red-romance.webp",
      "Custom palette": "/images/blooming-atelier-rose-blush.webp",
    },
    "Cocoa Tulip": {
      "Cocoa & ivory": "/images/cocoa-tulip-cocoa-ivory.webp",
      "Rose & blush": "/images/cocoa-tulip.webp",
      "Red romance": "/images/cocoa-tulip-red-romance.webp",
      "Custom palette": "/images/cocoa-tulip.webp",
    },
  };

  const activePalettePreviews = selectedProduct
    ? productPalettePreviews[selectedProduct.name]
    : undefined;
  const modalImage = activePalettePreviews?.[selectedPalette] ?? selectedProduct?.image;

  function openProduct(product: Product) {
    setSelectedPalette(product.defaultPalette);
    setSelectedProduct(product);
  }

  useEffect(() => {
    const dateInputs = document.querySelectorAll<HTMLInputElement>('input[type="date"][data-min-lead-days]');
    dateInputs.forEach((input) => {
      const earliest = new Date();
      earliest.setDate(earliest.getDate() + Number(input.dataset.minLeadDays ?? 0));
      input.min = earliest.toISOString().slice(0, 10);
    });
  }, [selectedProduct]);

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

  return (
    <main>
      <div className="preview-ribbon">
        <span>Website concept</span>
        <p>Founding collection preview · Orders are not yet live</p>
        <span className="preview-ribbon-end">Melbourne</span>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Cocoa Atelier home">
          <Image src={assetPath("/images/logo-320.png")} alt="" width={54} height={54} className="brand-logo" priority />
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
          <a href="#grazing" onClick={() => setMenuOpen(false)}>Grazing</a>
          <a href="#bespoke" onClick={() => setMenuOpen(false)}>Bespoke</a>
          <a href="#events" onClick={() => setMenuOpen(false)}>Events</a>
          <a href="#atelier" onClick={() => setMenuOpen(false)}>Our atelier</a>
          <a href="#follow" onClick={() => setMenuOpen(false)}>Follow</a>
        </nav>
        <a className="header-cta" href="#collection">Explore the collection</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow light">Handcrafted in Melbourne</p>
          <h1>A gift, composed<br />to be remembered.</h1>
          <p className="hero-intro">
            Chocolate-dipped strawberry bouquets, sculptural edible gifts and styled grazing
            boxes, made fresh to order in Melbourne for moments that deserve more than ordinary.
          </p>
          <div className="hero-actions">
            <a className="button button-ivory" href="#collection">Explore the collection</a>
            <a className="text-link light-link" href="#bespoke">Create something bespoke <span>↗</span></a>
          </div>
          <p className="hero-service">Local Melbourne delivery · Click &amp; Collect by appointment · <a href={contactPhoneHref}>{contactPhone}</a></p>
        </div>
        <div className="hero-image">
          <Image
            src={assetPath("/images/hero-atelier-bouquets.webp")}
            alt="A collection of Cocoa Atelier chocolate strawberry bouquets"
            fill
            priority
            sizes="(max-width: 820px) 100vw, 55vw"
          />
          <div className="hero-image-note">
            <p>Fresh strawberries<br />Finished by hand</p>
          </div>
        </div>
      </section>

      <div className="service-strip" aria-label="Service highlights">
        <p><span>Made to order</span> in our Melbourne atelier</p>
        <p><span>Complimentary</span> personalised gift note</p>
        <p><span>Melbourne delivery</span> quoted by suburb</p>
      </div>

      <section className="collection section" id="collection">
        <div className="section-heading">
          <div>
            <p className="eyebrow">The founding collection</p>
            <h2>Beautifully considered.<br />Deliciously unexpected.</h2>
          </div>
          <p className="section-intro">
            A concise edit of gifts for celebrations, affection and unforgettable arrivals.
            Every piece is assembled fresh, then personalised for its recipient.
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
                aria-label={`Enquire about ${product.name}`}
              >
                {product.badge && <span className="product-badge">{product.badge}</span>}
                <Image
                  src={assetPath(product.image)}
                  alt={product.alt}
                  fill
                  sizes="(max-width: 560px) 86vw, (max-width: 820px) 43vw, (max-width: 1120px) 29vw, 22vw"
                  className={`product-image product-position-${index + 1}`}
                />
                <span className="quick-view">Enquire <span>↗</span></span>
              </button>
              <div className="product-info">
                <div>
                  <p className="product-category">{product.category}</p>
                  <h3>{product.name}</h3>
                </div>
                <p className="product-price">{product.price}</p>
              </div>
              <p className="product-note">{product.note}</p>
              <p className="product-details">{product.details}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grazing section" id="grazing">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Grazing boxes &amp; tables</p>
            <h2>Fresh, generous and ready to share.</h2>
          </div>
          <p className="section-intro">
            Seasonal fruit and charcuterie grazing boxes for gatherings at home or the office,
            and styled grazing tables built on site for the occasions that call for a centrepiece.
            Every box is cut, arranged and finished by hand on the day.
          </p>
        </div>
        <div className="grazing-grid">
          {grazingProducts.map((product) => (
            <article className="grazing-card" key={product.name}>
              <button
                className="grazing-image-wrap"
                type="button"
                onClick={() => openProduct(product)}
                aria-label={`Enquire about ${product.name}`}
              >
                {product.badge && <span className="product-badge">{product.badge}</span>}
                <Image
                  src={assetPath(product.image)}
                  alt={product.alt}
                  fill
                  sizes="(max-width: 820px) 92vw, 44vw"
                  className="product-image"
                />
                <span className="quick-view">Enquire <span>↗</span></span>
              </button>
              <div className="product-info">
                <div>
                  <p className="product-category">{product.category}</p>
                  <h3>{product.name}</h3>
                </div>
                <p className="product-price">{product.price}</p>
              </div>
              <p className="product-note">{product.note}</p>
              <p className="product-details">{product.details}</p>
            </article>
          ))}
        </div>
        <p className="grazing-note">{grazingLeadTime} Dietary requirements are welcome — tell {contactName} when you enquire.</p>
      </section>

      <section className="bespoke section" id="bespoke">
        <div className="bespoke-image">
          <Image
            src={assetPath("/images/atelier-editorial.webp")}
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
          <h2>Start with a feeling. Elena shapes every detail.</h2>
          <p>
            Begin with a palette, an occasion or a person. Elena will guide the flowers,
            chocolate finish, vessel and ribbon into one harmonious piece.
          </p>
          <div className="bespoke-choices">
            <div><span>01</span><p><strong>Your palette</strong>Ivory, cocoa, rose, red, blue, lavender or something entirely yours.</p></div>
            <div><span>02</span><p><strong>Your composition</strong>Bouquet, keepsake box, tower or a centrepiece designed for the room.</p></div>
            <div><span>03</span><p><strong>Your final touch</strong>A considered ribbon, gift message and presentation made for arrival.</p></div>
          </div>
          <a className="button button-dark" href="#contact">Begin an enquiry</a>
        </div>
      </section>

      <section className="process section">
        <div className="process-title">
          <p className="eyebrow">How it works</p>
          <h2>A considered process, from brief to delivery.</h2>
        </div>
        <div className="process-steps">
          <article><span>01</span><h3>Select your piece</h3><p>Choose a signature design or begin with a bespoke brief.</p></article>
          <article><span>02</span><h3>Make it personal</h3><p>Choose the palette and finish, then add a complimentary gift note.</p></article>
          <article><span>03</span><h3>Choose the moment</h3><p>Select Melbourne delivery or Click &amp; Collect by appointment.</p></article>
        </div>
        <div className="delivery-card">
          <p className="eyebrow">A note on delivery</p>
          <p>Melbourne delivery is available across the collection, with the fee quoted for your suburb. Click &amp; Collect is available by appointment.</p>
          <a href="#faq">Read delivery &amp; care <span>→</span></a>
        </div>
      </section>

      <section className="events" id="events">
        <div className="events-image">
          <Image
            src={assetPath("/images/grazing-table-skyline.webp")}
            alt="A Cocoa Atelier grazing table with fresh roses, styled in front of windows overlooking the Melbourne skyline"
            fill
            sizes="(max-width: 820px) 100vw, 50vw"
          />
        </div>
        <div className="events-copy">
          <p className="eyebrow light">Events &amp; corporate</p>
          <h2>Made for the room.<br />Remembered after it.</h2>
          <p>
            Grazing tables, dessert stations, sculptural chocolate towers and client gifting,
            styled on site around your venue, palette and guest list — from city boardrooms
            to skyline apartments.
          </p>
          <div className="events-list">
            <span>Weddings</span><span>Milestones</span><span>Corporate gifting</span><span>Grazing tables</span><span>Dessert stations</span><span>Pop-ups &amp; activations</span>
          </div>
          <a className="button button-ivory" href="#contact">Request an event proposal</a>
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
            hands, a trained eye and a piece finished for one particular moment.
          </p>
          <a className="text-link" href={instagramUrl} target="_blank" rel="noopener noreferrer">Meet the atelier on Instagram <span>↗</span></a>
        </div>
        <div className="atelier-still-life">
          <Image
            src={assetPath("/images/atelier-gift-box.webp")}
            alt="Chocolate rose strawberries in a wooden gift box"
            fill
            sizes="(max-width: 820px) 86vw, 52vw"
            className="atelier-source-image"
          />
          <div className="atelier-mark"><Image src={assetPath("/images/logo-320.png")} alt="Cocoa Atelier" width={150} height={150} /></div>
        </div>
      </section>

      <section className="social section" id="follow">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Follow the atelier</p>
            <h2>See what left the atelier this week.</h2>
          </div>
          <p className="section-intro">
            New pieces, grazing tables and pop-up dates are shared first on Instagram and TikTok.
            Follow along, send us a message, or tag us when your gift arrives.
          </p>
        </div>
        <div className="social-gallery">
          {socialGallery.map((item) => (
            <a className="social-tile" href={instagramUrl} target="_blank" rel="noopener noreferrer" key={item.image} aria-label={`${item.alt} — see more on Instagram`}>
              <Image src={assetPath(item.image)} alt={item.alt} fill sizes="(max-width: 560px) 46vw, (max-width: 820px) 30vw, 15vw" />
            </a>
          ))}
        </div>
        <div className="social-row">
          <a className="social-handle" href={instagramUrl} target="_blank" rel="noopener noreferrer">
            <span>Instagram</span>
            <strong>{instagramHandle}</strong>
          </a>
          <a className="social-handle" href={tiktokUrl} target="_blank" rel="noopener noreferrer">
            <span>TikTok</span>
            <strong>{tiktokHandle}</strong>
          </a>
          <div className="popup-note">
            <p className="eyebrow">Coming soon</p>
            <p>{popupNotice}</p>
          </div>
        </div>
      </section>

      <section className="faq section" id="faq">
        <div className="faq-heading">
          <p className="eyebrow">The details</p>
          <h2>Before you order.</h2>
          <p>Need something not covered here? {contactName} would be delighted to help.</p>
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          <a className="faq-phone" href={contactPhoneHref}>{contactPhone}</a>
        </div>
        <div className="faq-list">
          <details>
            <summary>How much notice do you need?<span>+</span></summary>
            <p>{collectionLeadTime} Earlier notice gives us the best chance of securing your preferred date and palette.</p>
          </details>
          <details>
            <summary>Can I choose the colours?<span>+</span></summary>
            <p>Yes. Choose from the atelier palette or request a custom combination for the chocolate finish, flowers, gift box and ribbon, subject to availability.</p>
          </details>
          <details>
            <summary>Where do you deliver?<span>+</span></summary>
            <p>Cocoa Atelier offers Melbourne delivery across the collection. The delivery fee is quoted for your suburb, and Click &amp; Collect is available by appointment.</p>
          </details>
          <details>
            <summary>What about allergens and storage?<span>+</span></summary>
            <p>{allergenNotice} Refrigerate your gift on arrival and enjoy it promptly; Elena will provide product-specific care details with your order.</p>
          </details>
          <details>
            <summary>Do you make grazing boxes and grazing tables?<span>+</span></summary>
            <p>Yes. Seasonal fruit and charcuterie grazing boxes are made fresh on the day for delivery or collection, and grazing tables and dessert stations are styled on site for weddings, milestones and corporate events. {grazingLeadTime}</p>
          </details>
          <details>
            <summary>Do you create corporate and event orders?<span>+</span></summary>
            <p>Yes. Enquire with your date, location, quantity, palette and budget for a tailored proposal covering gifting, grazing, towers or dessert styling.</p>
          </details>
        </div>
      </section>

      <section className="contact-panel" id="contact">
        <p className="eyebrow light">A beautiful beginning</p>
        <h2>Tell us what you’re celebrating.</h2>
        <p>Send {contactName} the essentials and she’ll reply with availability, delivery and the next step.</p>
        <p className="contact-direct">Prefer to talk? Call or text {contactName} on <a href={contactPhoneHref}>{contactPhone}</a>.</p>
        <form className="contact-form" action={formAction} method="POST">
          <input type="hidden" name="_subject" value="New Cocoa Atelier website enquiry" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_next" value={`${siteUrl}/thanks/`} />
          <input type="hidden" name="_url" value={`${siteUrl}/#contact`} />
          <input className="form-honeypot" type="text" name="_honey" tabIndex={-1} autoComplete="off" />
          <label>Your name<input name="name" autoComplete="name" required /></label>
          <label>Email<input name="email" type="email" autoComplete="email" required /></label>
          <label>Phone<input name="phone" type="tel" autoComplete="tel" /></label>
          <label>What can we make for you?<select name="enquiry_type" defaultValue="Collection piece"><option>Collection piece</option><option>Grazing box</option><option>Grazing table or dessert station</option><option>Bespoke gift</option><option>Event or wedding</option><option>Corporate gifting</option></select></label>
          <label className="wide-field">Tell us about the date, suburb, quantity and occasion<textarea name="message" rows={4} required /></label>
          <label className="form-consent wide-field"><input name="privacy_consent" type="checkbox" value="Agreed" required />I agree to the <a href={assetPath("/privacy/")}>Privacy Policy</a>.</label>
          <button className="button button-ivory full-button" type="submit">Send enquiry</button>
        </form>
        <p className="contact-fallback"><a href={`mailto:${contactEmail}`}>{contactEmail}</a> · <a href={contactPhoneHref}>{contactPhone}</a> · <a href={instagramUrl} target="_blank" rel="noopener noreferrer">Instagram</a> · <a href={tiktokUrl} target="_blank" rel="noopener noreferrer">TikTok</a></p>
      </section>

      <footer>
        <div className="footer-brand">
          <Image src={assetPath(logoPath)} alt="Cocoa Atelier" width={120} height={120} className="footer-logo" />
          <h2>Cocoa Atelier</h2>
          <p>Handcrafted chocolate moments &amp; grazing.</p>
        </div>
        <div className="footer-links">
          <div><p>Discover</p><a href="#collection">The collection</a><a href="#grazing">Grazing boxes &amp; tables</a><a href="#bespoke">Bespoke</a><a href="#events">Events &amp; corporate</a></div>
          <div><p>Information</p><a href="#faq">Delivery &amp; care</a><a href="#faq">FAQ</a><a href={assetPath("/privacy/")}>Privacy</a><a href={assetPath("/terms/")}>Terms</a></div>
          <div><p>Contact</p><a href={`mailto:${contactEmail}`}>{contactEmail}</a><a href={contactPhoneHref}>{contactPhone}</a><a href={instagramUrl} target="_blank" rel="noopener noreferrer">Instagram {instagramHandle}</a><a href={tiktokUrl} target="_blank" rel="noopener noreferrer">TikTok {tiktokHandle}</a></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Cocoa Atelier</span><span>Melbourne, Australia</span><span>Made fresh to order</span></div>
      </footer>

      {selectedProduct && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setSelectedProduct(null);
        }}>
          <section className="order-modal" role="dialog" aria-modal="true" aria-labelledby="order-title">
            <button className="modal-close" type="button" onClick={() => setSelectedProduct(null)} aria-label="Close product enquiry">×</button>
            <div className={selectedProduct.kind === "grazing" ? "modal-image modal-image-cover" : "modal-image"}>
              <Image
                key={modalImage}
                src={assetPath(modalImage ?? selectedProduct.image)}
                alt={`${selectedProduct.alt}, ${selectedPalette.toLowerCase()} palette preview`}
                fill
                sizes="(max-width: 820px) 100vw, 420px"
              />
              {activePalettePreviews && (
                <span className="palette-caption" aria-live="polite">
                  {selectedPalette.includes("consultation") || selectedPalette === "Custom palette" ? `${selectedPalette} · preview by consultation` : `${selectedPalette} preview`}
                </span>
              )}
            </div>
            <div className="modal-content">
              <p className="eyebrow">Product enquiry</p>
              <h2 id="order-title">{selectedProduct.name}</h2>
              <p className="modal-price">{selectedProduct.price}</p>
              <p>{selectedProduct.note}</p>
              <p className="modal-details">{selectedProduct.details}</p>
              {selectedProduct.paymentUrl && (
                <div className="modal-buy">
                  <a className="button button-dark" href={selectedProduct.paymentUrl} target="_blank" rel="noopener noreferrer">Buy now · secure Square checkout</a>
                  <span className="field-hint">Or send an enquiry below and {contactName} will confirm the details first.</span>
                </div>
              )}
              <form action={formAction} method="POST">
                <input type="hidden" name="_subject" value={`Product enquiry: ${selectedProduct.name}`} />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_next" value={`${siteUrl}/thanks/`} />
                <input type="hidden" name="_url" value={`${siteUrl}/#${selectedProduct.kind === "grazing" ? "grazing" : "collection"}`} />
                <input type="hidden" name="product" value={selectedProduct.name} />
                <input className="form-honeypot" type="text" name="_honey" tabIndex={-1} autoComplete="off" />
                <label>Your name<input name="name" autoComplete="name" required /></label>
                <label>Email<input name="email" type="email" autoComplete="email" required /></label>
                <label>Phone<input name="phone" type="tel" autoComplete="tel" required /></label>
                <label>Recipient phone <span className="field-hint">For delivery coordination</span><input name="recipient_phone" type="tel" /></label>
                {selectedProduct.kind === "chocolate" ? (
                  <>
                    <label>
                      Preferred palette
                      <select
                        name="palette"
                        value={selectedPalette}
                        onChange={(event) => setSelectedPalette(event.target.value)}
                      >
                        {paletteOptions.map((palette) => <option key={palette}>{palette}</option>)}
                      </select>
                      {activePalettePreviews && (
                        <span className="field-hint">The product preview updates for each signature palette.</span>
                      )}
                    </label>
                    <label>Size<select name="size" defaultValue={selectedProduct.price.startsWith("from") ? `Signature size — ${selectedProduct.price}` : `As pictured — ${selectedProduct.price}`}><option>{selectedProduct.price.startsWith("from") ? `Signature size — ${selectedProduct.price}` : `As pictured — ${selectedProduct.price}`}</option><option>Larger or custom size — quote</option></select></label>
                    <label>Quantity<input name="quantity" type="number" min="1" defaultValue="1" required /></label>
                    <label>Fulfilment<select name="fulfilment" defaultValue="Click & Collect"><option>Click &amp; Collect</option><option>Melbourne delivery — fee quoted by suburb</option></select></label>
                    <label>Preferred date<input name="date" type="date" data-min-lead-days="2" required /></label>
                    <label className="wide-field">Gift note or request<textarea name="message" rows={3} placeholder="Tell us who it is for, or add a complimentary gift note." /></label>
                  </>
                ) : (
                  <>
                    <label>Number of guests<input name="guests" type="number" min="1" placeholder="e.g. 12" required /></label>
                    <label>Occasion<input name="occasion" placeholder="Birthday, office lunch, engagement…" /></label>
                    <label>Dietary requirements<input name="dietary" placeholder="Vegetarian, gluten free, halal, nut free…" /></label>
                    <label>Fulfilment<select name="fulfilment" defaultValue="Melbourne delivery — fee quoted by suburb"><option>Melbourne delivery — fee quoted by suburb</option><option>Click &amp; Collect</option><option>Styled on site at my venue</option></select></label>
                    <label>Preferred date<input name="date" type="date" data-min-lead-days={selectedProduct.category === "Grazing tables" ? "14" : "3"} required /></label>
                    <label>Venue or delivery suburb<input name="suburb" placeholder="Suburb or venue name" /></label>
                    <label className="wide-field">Anything else?<textarea name="message" rows={3} placeholder="Favourite fruits, a colour theme, a budget in mind — anything that helps Elena quote accurately." /></label>
                  </>
                )}
                <label className="form-consent wide-field"><input name="privacy_consent" type="checkbox" value="Agreed" required />I agree to the <a href={assetPath("/privacy/")}>Privacy Policy</a>.</label>
                <p className="modal-fineprint">{contactName} will confirm availability, the final delivery fee and secure payment. Prefer to talk? <a href={contactPhoneHref}>{contactPhone}</a> · <a href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
                <button className="button button-dark full-button" type="submit">Send enquiry</button>
              </form>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
