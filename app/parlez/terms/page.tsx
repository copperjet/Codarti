import type { Metadata } from "next";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { pageMetadata, breadcrumbSchema, BUSINESS } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Parlez - Terms of Use",
  description: "The terms governing your use of the Parlez French conversation app.",
  path: "/parlez/terms",
});

const sections = [
  {
    h: "Acceptance of terms",
    p: [
      `By downloading and using Parlez ("the app"), you agree to these terms of use. The app is operated by ${BUSINESS.legalName} ("Codarti", "we", "us"). If you do not agree, please uninstall the app.`,
    ],
  },
  {
    h: "Description of service",
    p: [
      "Parlez provides AI-powered French conversation practice. You speak with a virtual tutor named Marie. Sessions are processed in real time using speech recognition, a large-language-model AI, and text-to-speech synthesis.",
      "Parlez is a language-practice tool. It does not award qualifications or certifications.",
    ],
  },
  {
    h: "Subscriptions and payments",
    p: [
      "Parlez is offered as a free download with a subscription (monthly or annual) or lifetime purchase required for full access. Free-trial periods, where available, begin on the date of purchase.",
      "Subscriptions are billed through Google Play. Your subscription renews automatically at the end of each billing period unless you cancel before the renewal date.",
      "To cancel, go to Google Play > Subscriptions. Cancellation stops future renewals; you retain access until the end of the current paid period. We do not issue refunds for unused portions of a subscription period except where required by law.",
      "Prices are set in your local currency by Google Play. We may change prices on reasonable notice; changes apply to renewals after the notice date.",
    ],
  },
  {
    h: "Free trial",
    p: [
      "If your purchase includes a free trial, the trial period and terms will be shown to you in the product listing before you confirm the purchase.",
      "Your subscription begins immediately after the free trial ends unless cancelled beforehand.",
    ],
  },
  {
    h: "Lifetime access",
    p: [
      "A lifetime purchase grants you access to the current version of Parlez and future updates for as long as Parlez is available. It is a one-time payment with no recurring charge. We reserve the right to discontinue the app with reasonable notice.",
    ],
  },
  {
    h: "Acceptable use",
    p: [
      "You may use Parlez for personal, non-commercial language practice. You agree not to reverse-engineer the app, circumvent subscription checks, use the app to generate harmful or illegal content, or resell access.",
    ],
  },
  {
    h: "Intellectual property",
    p: [
      "All content in the app, including the AI tutor voice, interface design, and lesson content, is owned by Codarti or its licensors. You receive a limited, non-exclusive licence to use the app on your own device for personal use only.",
    ],
  },
  {
    h: "Limitation of liability",
    p: [
      "The app is provided on an as-is basis. To the fullest extent permitted by law, Codarti is not liable for any loss arising from your use of, or inability to use, the app, including interruptions due to maintenance, third-party service outages, or device incompatibility.",
    ],
  },
  {
    h: "Governing law",
    p: [
      `These terms are governed by the laws of ${BUSINESS.countryName}. Disputes are subject to the jurisdiction of the courts of ${BUSINESS.locality}.`,
    ],
  },
  {
    h: "Changes to these terms",
    p: [
      "We may update these terms from time to time. Continued use of the app after changes are posted constitutes acceptance of the revised terms. The date below reflects the most recent revision.",
    ],
  },
  {
    h: "Contact",
    p: [`Questions about these terms can be sent to ${BUSINESS.email}.`],
  },
];

export default function ParlezTermsPage() {
  return (
    <main className="relative min-h-screen bg-[var(--bone)] text-[var(--ink)]">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Parlez", path: "/parlez/terms" },
          { name: "Terms", path: "/parlez/terms" },
        ])}
      />
      <Nav />

      <article className="container-x pt-40 pb-24 md:pt-48">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Parlez", path: "/parlez/terms" },
            { name: "Terms", path: "/parlez/terms" },
          ]}
        />
        <h1 className="mt-8 font-serif text-[clamp(40px,6vw,96px)] leading-[0.98] tracking-[-0.02em]">
          Terms of Use
        </h1>
        <p className="mt-2 eyebrow text-[var(--ink-soft)]">Parlez</p>
        <p className="mt-4 eyebrow">Last updated: 6 June 2026</p>

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