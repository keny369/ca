import {
  allergenNotice,
  collectionLeadTime,
  contactEmail,
  contactName,
  contactPhone,
  grazingLeadTime,
  instagramUrl,
  location,
  logoPath,
  siteDescription,
  siteName,
  siteUrl,
  tiktokUrl,
} from "./site-config";

const products = [
  {
    name: "The Signature Bouquet",
    description: "Chocolate-dipped strawberries arranged in cocoa and ivory.",
    category: "Chocolate strawberry bouquets",
    image: "/images/signature-bouquet-cropped.webp",
    lowPrice: "220",
  },
  {
    name: "Rose Elegance",
    description: "Fresh roses and hand-finished strawberries in a generous arrangement.",
    category: "Chocolate strawberry grand gestures",
    image: "/images/rose-elegance.webp",
    price: "400",
  },
  {
    name: "Love in Bloom",
    description: "A heart-shaped chocolate strawberry arrangement for affection in all its forms.",
    category: "Chocolate strawberry keepsake gifts",
    image: "/images/love-in-bloom.webp",
    price: "180",
  },
  {
    name: "The Prestige Collection",
    description: "A sculptural chocolate strawberry presentation piece, made for the grand reveal.",
    category: "Chocolate strawberry keepsake gifts",
    image: "/images/prestige-collection.webp",
    lowPrice: "180",
  },
  {
    name: "Baby Bliss",
    description: "A gentle new-baby gift styled in a chosen colour palette.",
    category: "Chocolate strawberry keepsake gifts",
    image: "/images/baby-bliss.webp",
    price: "110",
  },
  {
    name: "Pure Elegance",
    description: "An all-white chocolate strawberry arrangement with a quiet, ceremonial finish.",
    category: "Chocolate strawberry bouquets",
    image: "/images/pure-elegance.webp",
    lowPrice: "200",
  },
  {
    name: "Blossom Garden",
    description: "Chocolate roses and tulips arranged as a lasting first impression.",
    category: "Chocolate bouquets",
    image: "/images/blooming-atelier-rose-blush.webp",
    price: "160",
  },
  {
    name: "Cocoa Tulip",
    description: "A signature tulip-inspired chocolate strawberry form, finished entirely by hand.",
    category: "Chocolate strawberry grand gestures",
    image: "/images/cocoa-tulip.webp",
    price: "330",
  },
] as const;

const grazingProducts = [
  {
    name: "Seasonal Fruit Grazing Box",
    description: "Watermelon, dragon fruit, berries and melon, cut and styled fresh on the day in a kraft presentation box.",
    category: "Grazing boxes",
    image: "/images/grazing-fruit-box.webp",
  },
  {
    name: "Charcuterie Grazing Box",
    description: "Cured meats, soft cheeses, crackers, olives and dips arranged in a kraft presentation box for easy sharing.",
    category: "Grazing boxes",
    image: "/images/grazing-charcuterie-box.webp",
  },
  {
    name: "The Grazing Duo",
    description: "A seasonal fruit grazing box and a charcuterie grazing box styled to be served together.",
    category: "Grazing boxes",
    image: "/images/grazing-duo.webp",
  },
  {
    name: "Grazing Tables & Dessert Stations",
    description: "Long-table grazing and dessert styling built on site in Melbourne for weddings, milestones and corporate events.",
    category: "Grazing tables and event catering",
    image: "/images/grazing-table-wide.webp",
  },
] as const;

const faqs = [
  {
    question: "How much notice does Cocoa Atelier need?",
    answer:
      `${collectionLeadTime} Earlier notice gives the best chance of securing a preferred date and palette.`,
  },
  {
    question: "Can I choose the colours of my Cocoa Atelier gift?",
    answer:
      "Yes. Choose from the atelier palette or request a custom combination for the chocolate finish, flowers, gift box and ribbon, subject to availability.",
  },
  {
    question: "Where does Cocoa Atelier deliver?",
    answer:
      "Cocoa Atelier offers Melbourne delivery across the collection. The delivery fee is quoted for the destination suburb, and Click and Collect is available by appointment.",
  },
  {
    question: "What should I know about allergens and storage?",
    answer:
      `${allergenNotice} Gifts should be refrigerated on arrival and enjoyed promptly; product-specific care details are supplied with the order.`,
  },
  {
    question: "Does Cocoa Atelier make grazing boxes and grazing tables?",
    answer:
      `Yes. Seasonal fruit and charcuterie grazing boxes are made fresh on the day for Melbourne delivery or collection, and grazing tables and dessert stations are styled on site for weddings, milestones and corporate events. ${grazingLeadTime}`,
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

const grazingNodes = grazingProducts.map((product, index) => {
  const slug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return {
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Product",
      "@id": `${siteUrl}/#${slug}`,
      name: product.name,
      description: product.description,
      category: product.category,
      image: absoluteUrl(product.image),
      brand: { "@id": `${siteUrl}/#business` },
      offers: {
        "@type": "Offer",
        priceCurrency: "AUD",
        availability: "https://schema.org/PreOrder",
        url: `${siteUrl}/#grazing`,
        seller: { "@id": `${siteUrl}/#business` },
      },
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
      telephone: contactPhone,
      logo: absoluteUrl(logoPath),
      image: absoluteUrl("/og.png"),
      sameAs: [instagramUrl, tiktokUrl],
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
        name: contactName,
        email: contactEmail,
        telephone: contactPhone,
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
        "Grazing boxes",
        "Grazing tables",
        "Event catering styling",
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
      "@type": "ItemList",
      "@id": `${siteUrl}/#grazing`,
      name: "Cocoa Atelier grazing boxes and tables",
      numberOfItems: grazingNodes.length,
      itemListElement: grazingNodes,
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
