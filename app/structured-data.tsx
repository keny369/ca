import {
  contactEmail,
  instagramUrl,
  location,
  siteDescription,
  siteName,
  siteUrl,
} from "./site-config";

const products = [
  {
    name: "The Signature Bouquet",
    description: "Chocolate-dipped strawberries composed in cocoa and ivory.",
    category: "Chocolate strawberry bouquets",
    image: "/images/signature-bouquet.png",
    lowPrice: "220",
  },
  {
    name: "Rose Elegance",
    description: "Fresh roses and hand-finished strawberries in a generous composition.",
    category: "Chocolate strawberry statement pieces",
    image: "/images/rose-elegance.png",
    price: "400",
  },
  {
    name: "Love in Bloom",
    description: "A heart-shaped chocolate strawberry arrangement for affection in all its forms.",
    category: "Chocolate gift boxes",
    image: "/images/love-in-bloom.png",
    price: "180",
  },
  {
    name: "The Prestige Collection",
    description: "A sculptural chocolate strawberry presentation piece, made for the grand reveal.",
    category: "Chocolate strawberry statement pieces",
    image: "/images/prestige-collection.png",
    lowPrice: "180",
  },
  {
    name: "Baby Bliss",
    description: "A gentle new-baby gift styled in a chosen colour palette.",
    category: "Chocolate gift boxes",
    image: "/images/baby-bliss.png",
    price: "110",
  },
  {
    name: "Pure Elegance",
    description: "An all-white chocolate strawberry composition with a quiet, ceremonial finish.",
    category: "Chocolate strawberry bouquets",
    image: "/images/pure-elegance.png",
    lowPrice: "200",
  },
  {
    name: "The Blooming Atelier",
    description: "Chocolate roses and tulips arranged as a lasting first impression.",
    category: "Chocolate bouquets",
    image: "/images/blooming-atelier.jpeg",
    price: "160",
  },
  {
    name: "Cocoa Tulip",
    description: "A signature tulip-inspired chocolate strawberry form, finished entirely by hand.",
    category: "Chocolate strawberry statement pieces",
    image: "/images/cocoa-tulip.png",
    price: "330",
  },
] as const;

const faqs = [
  {
    question: "How much notice does Cocoa Atelier need?",
    answer:
      "Every piece is made fresh to order. Lead times are confirmed with availability, and event, tower and large corporate orders should be discussed as early as possible.",
  },
  {
    question: "Can I choose the colours of my Cocoa Atelier gift?",
    answer:
      "Yes. Choose from the atelier palette or request a custom combination for the chocolate finish, flowers, gift box and ribbon, subject to availability.",
  },
  {
    question: "Where does Cocoa Atelier deliver?",
    answer:
      "Cocoa Atelier offers local Melbourne delivery on orders of $160 or more. Delivery fees depend on the suburb. Click and Collect is available by appointment.",
  },
  {
    question: "What should I know about allergens and storage?",
    answer:
      "Chocolate products commonly contain milk and soy and may be prepared where other allergens are present. Exact ingredient, allergen and care information will be provided before orders open.",
  },
  {
    question: "Does Cocoa Atelier create corporate and event orders?",
    answer:
      "Yes. Enquire with your date, location, quantity, palette and budget for a tailored proposal covering gifting, grazing, towers or dessert styling.",
  },
] as const;

function absoluteUrl(path: string) {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

const productNodes = products.map((product, index) => {
  const slug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const offer = "price" in product
    ? {
        "@type": "Offer",
        price: product.price,
        priceCurrency: "AUD",
        url: `${siteUrl}/#collection`,
        seller: { "@id": `${siteUrl}/#business` },
      }
    : {
        "@type": "AggregateOffer",
        lowPrice: product.lowPrice,
        priceCurrency: "AUD",
        offerCount: 1,
        url: `${siteUrl}/#collection`,
        seller: { "@id": `${siteUrl}/#business` },
      };

  return {
    position: index + 1,
    node: {
      "@type": "Product",
      "@id": `${siteUrl}/#${slug}`,
      name: product.name,
      description: product.description,
      category: product.category,
      image: absoluteUrl(product.image),
      brand: { "@id": `${siteUrl}/#business` },
      offers: offer,
    },
  };
});

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": `${siteUrl}/#business`,
      name: siteName,
      url: siteUrl,
      description: siteDescription,
      email: contactEmail,
      logo: absoluteUrl("/images/logo-reference.jpeg"),
      image: absoluteUrl("/og.png"),
      sameAs: [instagramUrl],
      address: {
        "@type": "PostalAddress",
        addressLocality: location.city,
        addressRegion: location.regionCode,
        addressCountry: location.countryCode,
      },
      areaServed: {
        "@type": "City",
        name: location.city,
        containedInPlace: {
          "@type": "State",
          name: location.region,
          containedInPlace: {
            "@type": "Country",
            name: location.country,
          },
        },
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer enquiries",
        email: contactEmail,
        areaServed: location.countryCode,
        availableLanguage: ["English"],
      },
      founder: {
        "@type": "Person",
        name: "Elena",
      },
      knowsAbout: [
        "Chocolate strawberry bouquets",
        "Luxury edible gifts",
        "Bespoke chocolate gifts",
        "Wedding dessert styling",
        "Corporate gifting",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      inLanguage: "en-AU",
      publisher: { "@id": `${siteUrl}/#business` },
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: "Cocoa Atelier | Chocolate Strawberry Bouquets Melbourne",
      description: siteDescription,
      inLanguage: "en-AU",
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#business` },
      mainEntity: { "@id": `${siteUrl}/#collection` },
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/#collection`,
      name: "Cocoa Atelier founding collection",
      numberOfItems: productNodes.length,
      itemListElement: productNodes.map((product) => ({
        "@type": "ListItem",
        position: product.position,
        item: product.node,
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
}
