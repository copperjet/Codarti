import type { Metadata } from "next";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { pageMetadata, breadcrumbSchema, BUSINESS } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description:
    "The terms governing use of the Codarti website at codarti.com.",
  path: "/terms",
});

const sections = [
  {
    h: "Acceptance of terms",
    p: [
      `By accessing codarti.com (the "site"), operated by ${BUSINESS.legalName} ("Codarti"), you agree to these terms of use. If you do not agree, please do not use the site.`,
    ],
  },
  {
    h: "Use of the site",
    p: [
      "You may view and use this site for lawful, informational purposes. You agree not to misuse the site, attempt to disrupt its operation, or access it in any way that breaches applicable law.",
    ],
  },
  {
    h: "Intellectual property",
    p: [
      "All content on this site — including text, design, graphics, and the Codarti name and logo — is owned by Codarti or its licensors and is protected by applicable intellectual property law. You may not reproduce or reuse it without our written permission.",
    ],
  },
  {
    h: "No professional advice",
    p: [
      "Content on this site, including blog articles, is provided for general information only. It does not constitute professional, legal, or technical advice, and should not be relied upon as such. Engagements with Codarti are governed by a separate written agreement.",
    ],
  },
  {
    h: "Enquiries and submissions",
    p: [
      "Information you submit through the enquiry form is handled in line with our Privacy Policy. Submitting an enquiry does not create a contract or any obligation on either party; any engagement begins only once a separate agreement is signed.",
    ],
  },
  {
    h: "External links",
    p: [
      "The site may link to third-party websites, including the products we have built. We are not responsible for the content or practices of external sites.",
    ],
  },
  {
    h: "Limitation of liability",
    p: [
      "The site is provided on an “as is” basis. To the fullest extent permitted by law, Codarti is not liable for any loss arising from your use of, or inability to use, the site.",
    ],
  },
  {
    h: "Governing law",
    p: [
      `These terms are governed by the laws of ${BUSINESS.countryName}. We may update these terms from time to time; the date below reflects the most recent revision.`,
    ],
  },
  {
    h: "Contact",
    p: [`Questions about these terms can be sent to ${BUSINESS.email}.`],
  },
];

export default function TermsPage() {
  return (
    <main className="relative min-h-screen bg-[var(--bone)] text-[var(--ink)]">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Terms", path: "/terms" },
        ])}
      />
      <Nav />

      <article className="container-x pt-40 pb-24 md:pt-48">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Terms", path: "/terms" },
          ]}
        />
        <h1 className="mt-8 font-serif text-[clamp(40px,6vw,96px)] leading-[0.98] tracking-[-0.02em]">
          Terms of Use
        </h1>
        <p className="mt-6 eyebrow">Last updated: 22 May 2026</p>

        <div className="mt-12 max-w-2xl rule-t pt-12">
          {sections.map((s) => (
            <section key={s.h} className="mb-10">
              <h2 className="font-serif text-[clamp(24px,3vw,36px)] leading-[1.1] mb-4">
                {s.h}
              </h2>
              {s.p.map((para, i) => (
                <p
                  key={i}
                  className="text-[var(--ink-soft)] text-lg leading-[1.7] mb-4"
                >
                  {para}
                </p>
              ))}
            </section>
          ))}
        </div>
      </article>

      <Footer />
    </main>
  );
}
