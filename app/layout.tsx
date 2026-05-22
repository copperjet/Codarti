import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Geist } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import JsonLd from "@/components/seo/JsonLd";
import {
  SITE_URL,
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  organizationSchema,
  websiteSchema,
} from "@/lib/seo";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Codarti — Software Development Company in Lusaka, Zambia",
    template: "%s · Codarti",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  applicationName: "Codarti",
  authors: [{ name: "Codarti Software Studio", url: SITE_URL }],
  creator: "Codarti",
  publisher: "Codarti",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Codarti",
    title: "Codarti — Software Development Company in Lusaka, Zambia",
    description: DEFAULT_DESCRIPTION,
    locale: "en_ZM",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Codarti" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Codarti — Software Development Company in Lusaka, Zambia",
    description: DEFAULT_DESCRIPTION,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  // Icons resolved automatically from app/icon.tsx and app/apple-icon.tsx.
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF5" },
    { media: "(prefers-color-scheme: dark)", color: "#0F0E14" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrument.variable} ${geist.variable}`}>
      <body>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
