import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Geist } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

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

const siteUrl = "https://codarti.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Codarti — Software, made with intent.",
    template: "%s · Codarti",
  },
  description:
    "Codarti is a software craft studio building considered digital products. Engineering, design, and strategy for teams who care about the details.",
  keywords: [
    "software studio",
    "Lusaka",
    "Zambia",
    "engineering",
    "product design",
    "Next.js",
    "React Native",
    "TypeScript",
  ],
  applicationName: "Codarti",
  authors: [{ name: "Codarti Software Studio", url: siteUrl }],
  creator: "Codarti",
  publisher: "Codarti",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Codarti",
    title: "Codarti — Software, made with intent.",
    description:
      "A software craft studio in Lusaka. Engineering, design, and strategy for teams who care about the details.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Codarti" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Codarti — Software, made with intent.",
    description:
      "A software craft studio in Lusaka. Engineering, design, and strategy for teams who care about the details.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF5" },
    { media: "(prefers-color-scheme: dark)", color: "#0F0E14" },
  ],
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Codarti",
  url: siteUrl,
  logo: `${siteUrl}/favicon.svg`,
  email: "support@codarti.com",
  telephone: "+260 970 627 630",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Plot 190/10, Chawama",
    addressLocality: "Lusaka",
    addressCountry: "ZM",
  },
  founder: "Codarti Software Studio",
  description:
    "A software craft studio in Lusaka. Engineering, design, and strategy for teams who care about the details.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrument.variable} ${geist.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
