import type { Metadata } from "next";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { pageMetadata, breadcrumbSchema, BUSINESS } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Parlez - Privacy Policy",
  description:
    "How Parlez collects, uses, and protects your personal information, including voice data and subscription details.",
  path: "/parlez/privacy",
});

const sections = [
  {
    h: "About Parlez",
    p: [
      "Parlez is a French conversation app built by Codarti. It lets you practise spoken French with an AI tutor named Marie. This policy describes the information the app collects, how it is used, and how you can control it.",
    ],
  },
  {
    h: "Information we collect",
    p: [
      "Voice and audio: when you speak during a session, your voice is recorded and sent to a speech-recognition service to be transcribed. Audio is transmitted securely and is not stored by Parlez beyond the time needed to produce a transcript.",
      "Usage data: we record how many minutes of conversation you use each day. This is used only to apply your subscription limits and is not shared.",
      "Account data: we store an anonymous identifier and your subscription status. We do not require a name or email address.",
      "Subscription data: if you purchase a subscription or lifetime access, the transaction is handled by Google Play. We receive a subscription status update from RevenueCat and store only your subscription tier and expiry date.",
      "Device data: standard request metadata such as app version and device type is logged by our backend for stability and security purposes.",
    ],
  },
  {
    h: "Microphone access",
    p: [
      "Parlez requests microphone permission solely to capture your voice during active conversation sessions. We do not record audio in the background or outside of active sessions. You can revoke microphone permission at any time in your device settings.",
    ],
  },
  {
    h: "How we use your information",
    p: [
      "To run conversation sessions: your voice is transcribed by OpenAI (Whisper), your message is processed by Anthropic Claude, and the reply is spoken back using ElevenLabs text-to-speech. Each provider receives only the minimum data needed for their function.",
      "To enforce subscription limits: daily usage minutes are compared against your plan limits on our servers.",
      "To manage subscriptions: RevenueCat processes purchase receipts from Google Play and informs us of your entitlement status. We do not store raw receipt data.",
    ],
  },
  {
    h: "Third-party service providers",
    p: [
      "OpenAI (Whisper) - speech-to-text transcription of your voice input.",
      "Anthropic - AI model processing of conversation turns.",
      "ElevenLabs - text-to-speech synthesis of the tutor replies.",
      "RevenueCat - subscription receipt validation and entitlement management.",
      "Supabase - secure backend database and authentication infrastructure.",
      "Google Play - payment processing for subscriptions and in-app purchases.",
      "Each provider operates under its own privacy policy and data-processing agreement.",
    ],
  },
  {
    h: "Data retention and deletion",
    p: [
      "Usage logs are retained for 90 days then automatically deleted.",
      "Subscription records are retained for the life of your subscription plus 30 days, then deleted.",
      "You can delete your account at any time from within the app (Settings > Delete account). This permanently removes all data associated with your account. Deletion is irreversible.",
    ],
  },
  {
    h: "Children",
    p: [
      "Parlez is not directed at children under 13. We do not knowingly collect personal information from children under 13. Contact us if you believe a child has submitted personal information and we will delete it promptly.",
    ],
  },
  {
    h: "Your rights",
    p: [
      `You may request access to, correction of, or deletion of the personal information we hold. Email us at ${BUSINESS.email}. You may also delete your account and all associated data directly from the app.`,
    ],
  },
  {
    h: "Changes to this policy",
    p: [
      "We may update this policy from time to time. The date below reflects the most recent revision.",
    ],
  },
  {
    h: "Contact",
    p: [`Email ${BUSINESS.email} with any questions about this policy.`],
  },
];

export default function ParlezPrivacyPage() {
  return (
    <main className="relative min-h-screen bg-[var(--bone)] text-[var(--ink)]">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Parlez", path: "/parlez/privacy" },
          { name: "Privacy", path: "/parlez/privacy" },
        ])}
      />
      <Nav />

      <article className="container-x pt-40 pb-24 md:pt-48">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Parlez", path: "/parlez/privacy" },
            { name: "Privacy", path: "/parlez/privacy" },
          ]}
        />
        <h1 className="mt-8 font-serif text-[clamp(40px,6vw,96px)] leading-[0.98] tracking-[-0.02em]">
          Privacy Policy
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