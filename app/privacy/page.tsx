import type { Metadata } from "next";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { pageMetadata, breadcrumbSchema, BUSINESS } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Codarti collects, uses, and protects personal information submitted through the codarti.com website.",
  path: "/privacy",
});

const sections = [
  {
    h: "Who we are",
    p: [
      `${BUSINESS.legalName} ("Codarti", "we", "us") operates the website at codarti.com. This policy explains how we handle personal information collected through the site. Our studio is based in ${BUSINESS.street}, ${BUSINESS.locality}, ${BUSINESS.countryName}.`,
    ],
  },
  {
    h: "Information we collect",
    p: [
      "We collect the information you choose to provide through our enquiry form: your name, email address, company name (optional), budget range, and a description of your project.",
      "We do not use advertising trackers. Basic, aggregated analytics may be collected to understand how the site is used; this data does not identify you personally.",
    ],
  },
  {
    h: "How we use your information",
    p: [
      "We use the details you submit only to respond to your enquiry, scope potential work, and communicate with you about a possible engagement. We do not sell your information, and we do not share it with third parties except the service providers that help us operate the site.",
    ],
  },
  {
    h: "Service providers",
    p: [
      "Enquiry-form messages are delivered to us using a third-party email service. That provider processes the message contents solely to deliver them to our inbox. Our website hosting provider processes standard request data, such as IP addresses, to serve the site securely.",
    ],
  },
  {
    h: "Data retention",
    p: [
      "We keep enquiry correspondence for as long as needed to evaluate and pursue a working relationship, and as required for our legitimate business records. You may ask us to delete your information at any time.",
    ],
  },
  {
    h: "Your rights",
    p: [
      `You may request access to, correction of, or deletion of the personal information we hold about you. To make a request, email us at ${BUSINESS.email} and we will respond promptly.`,
    ],
  },
  {
    h: "Changes to this policy",
    p: [
      "We may update this policy from time to time. The date below reflects the most recent revision. Material changes will be reflected on this page.",
    ],
  },
  {
    h: "Contact",
    p: [
      `Questions about this policy can be sent to ${BUSINESS.email} or ${BUSINESS.phone}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen bg-[var(--bone)] text-[var(--ink)]">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy", path: "/privacy" },
        ])}
      />
      <Nav />

      <article className="container-x pt-40 pb-24 md:pt-48">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Privacy", path: "/privacy" },
          ]}
        />
        <h1 className="mt-8 font-serif text-[clamp(40px,6vw,96px)] leading-[0.98] tracking-[-0.02em]">
          Privacy Policy
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
