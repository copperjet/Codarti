import type { Metadata } from "next";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { pageMetadata, breadcrumbSchema, BUSINESS } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Parlez - Delete Your Account",
  description: "How to delete your Parlez account and all associated data.",
  path: "/parlez/delete-account",
});

const sections = [
  {
    h: "Delete from within the app",
    p: [
      "The fastest way to delete your Parlez account is from inside the app:",
    ],
    list: [
      "Open Parlez on your device.",
      "Tap the Settings icon, then tap Account.",
      "Tap Delete account and confirm.",
    ],
  },
  {
    h: "Request deletion by email",
    p: [
      `If you have already uninstalled the app, or cannot access it, email us at ${BUSINESS.email} from the address associated with your account (if you used email sign-in) and ask us to delete your account. We will action the request and confirm within 30 days.`,
    ],
  },
  {
    h: "What gets deleted",
    p: [
      "When you delete your account, we permanently remove all data associated with it, including:",
    ],
    list: [
      "Your account record and any sign-in identity (email or Apple sign-in).",
      "Your subscription records held by Parlez.",
      "Your conversation usage history.",
      "Your learning profile and progress stored on our servers.",
    ],
  },
  {
    h: "What is kept",
    p: [
      "Learning progress stored only on your own device is removed when you uninstall the app. Anonymised, aggregated records that cannot identify you may be retained for analytics. Where we are legally required to retain certain transaction records (for example, for tax or refund-dispute purposes), we keep the minimum necessary for up to 30 days, after which it is deleted.",
    ],
  },
  {
    h: "Subscriptions",
    p: [
      "Deleting your Parlez account does not automatically cancel a Google Play subscription. To stop future billing, also cancel the subscription in Google Play (Play Store > Subscriptions). You retain access until the end of the current paid period.",
    ],
  },
  {
    h: "Contact",
    p: [`Questions about account deletion can be sent to ${BUSINESS.email}.`],
  },
];

export default function ParlezDeleteAccountPage() {
  return (
    <main className="relative min-h-screen bg-[var(--bone)] text-[var(--ink)]">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Parlez", path: "/parlez/delete-account" },
          { name: "Delete account", path: "/parlez/delete-account" },
        ])}
      />
      <Nav />

      <article className="container-x pt-40 pb-24 md:pt-48">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Parlez", path: "/parlez/delete-account" },
            { name: "Delete account", path: "/parlez/delete-account" },
          ]}
        />
        <h1 className="mt-8 font-serif text-[clamp(40px,6vw,96px)] leading-[0.98] tracking-[-0.02em]">
          Delete Your Account
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
              {s.list ? (
                <ul className="list-disc pl-6 text-[var(--ink-soft)] text-lg leading-[1.7] space-y-2">
                  {s.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </article>

      <Footer />
    </main>
  );
}