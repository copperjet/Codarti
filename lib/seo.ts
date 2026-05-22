import type { Metadata } from "next";
import type { Project } from "@/lib/content";

// ── Site identity ───────────────────────────────────────────────────────────
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://codarti.com";

export const BUSINESS = {
  name: "Codarti",
  legalName: "Codarti Software Studio",
  tagline: "Software, made with intent.",
  email: "support@codarti.com",
  phone: "+260 970 627 630",
  street: "Plot 190/10, Chawama",
  locality: "Lusaka",
  region: "Lusaka Province",
  postalCode: "10101",
  country: "ZM",
  countryName: "Zambia",
  // Approximate coordinates for Chawama, Lusaka — refine with an exact pin.
  geo: { lat: -15.4498, lng: 28.305 },
  foundingYear: "2019",
  priceRange: "$$$",
  openHours: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "17:00" },
} as const;

/**
 * Public social / profile URLs — power `sameAs` in structured data and the
 * footer "Elsewhere" column. Leave empty until real URLs are confirmed:
 * an empty list cleanly omits `sameAs` and hides the footer column rather
 * than shipping broken `#` links (which hurt trust signals).
 *
 * Fill like:  { label: "LinkedIn", href: "https://www.linkedin.com/company/codarti" }
 */
export const SOCIALS: { label: string; href: string }[] = [];

export const DEFAULT_KEYWORDS = [
  "software development company Lusaka",
  "software development Zambia",
  "custom software development Zambia",
  "app development Lusaka",
  "mobile app developers Zambia",
  "web development Lusaka",
  "software company in Zambia",
  "product engineering Africa",
];

export const DEFAULT_DESCRIPTION =
  "Codarti is a software development company in Lusaka, Zambia — building custom web and mobile apps. Engineering, design, and product strategy for teams who care about the details.";

// Primary navigation, shared by Nav and Footer.
export const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

// ── Per-page metadata helper ────────────────────────────────────────────────
export function pageMetadata({
  title,
  description,
  path,
  ogImage,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  keywords?: string[];
}): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const images = [{ url: ogImage ?? "/opengraph-image", width: 1200, height: 630, alt: "Codarti" }];
  return {
    title,
    description,
    keywords: keywords ?? DEFAULT_KEYWORDS,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url,
      siteName: "Codarti",
      title,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage ?? "/opengraph-image"],
    },
  };
}

// ── Structured data (JSON-LD) builders ──────────────────────────────────────
const addr = {
  "@type": "PostalAddress",
  streetAddress: BUSINESS.street,
  addressLocality: BUSINESS.locality,
  addressRegion: BUSINESS.region,
  postalCode: BUSINESS.postalCode,
  addressCountry: BUSINESS.country,
};

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#organization`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/icon`,
    image: `${SITE_URL}/opengraph-image`,
    email: BUSINESS.email,
    telephone: BUSINESS.phone,
    priceRange: BUSINESS.priceRange,
    foundingDate: BUSINESS.foundingYear,
    description: DEFAULT_DESCRIPTION,
    slogan: BUSINESS.tagline,
    address: addr,
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.lat,
      longitude: BUSINESS.geo.lng,
    },
    areaServed: { "@type": "Country", name: BUSINESS.countryName },
    knowsAbout: [
      "Software development",
      "Web development",
      "Mobile app development",
      "Product design",
      "Technical strategy",
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: BUSINESS.openHours.days,
        opens: BUSINESS.openHours.opens,
        closes: BUSINESS.openHours.closes,
      },
    ],
    ...(SOCIALS.length ? { sameAs: SOCIALS.map((s) => s.href) } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: BUSINESS.name,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "en",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function servicesSchema(capabilities: { title: string; body: string }[]) {
  return capabilities.map((c) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: c.title,
    description: c.body,
    serviceType: c.title,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: BUSINESS.countryName },
  }));
}

export function caseStudySchema(p: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.name,
    headline: `${p.name} — case study`,
    description: p.description,
    url: `${SITE_URL}/work/${p.slug}`,
    dateCreated: p.year,
    keywords: p.tags.join(", "),
    creator: { "@id": `${SITE_URL}/#organization` },
    ...(p.image ? { image: `${SITE_URL}${p.image}` } : {}),
  };
}

export function reviewsSchema(
  testimonials: { quote: string; author: string; role: string }[]
) {
  return testimonials.map((t) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    reviewBody: t.quote,
    author: { "@type": "Person", name: t.author, jobTitle: t.role },
    itemReviewed: { "@id": `${SITE_URL}/#organization` },
    reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
  }));
}

export function articleSchema(post: {
  slug: string;
  title: string;
  description: string;
  date: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "en",
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };
}
