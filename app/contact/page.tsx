import type { Metadata } from "next";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import Contact from "@/components/sections/Contact";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { pageMetadata, breadcrumbSchema, BUSINESS } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact Codarti — Start a Software Project in Lusaka",
  description:
    "Get in touch with Codarti, a software development company in Lusaka, Zambia. Tell us about your project and we'll reply within one business day.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-[var(--bone)] text-[var(--ink)]">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <Nav />

      <header className="container-x pt-40 pb-16 md:pt-48">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]}
        />
        <div className="eyebrow mt-8 mb-6">Get in touch</div>
        <h1 className="font-serif text-[clamp(44px,7.5vw,130px)] leading-[0.95] tracking-[-0.025em] max-w-[14ch]">
          Let&apos;s build something.
        </h1>
        <p className="mt-10 text-[var(--ink-soft)] text-lg max-w-2xl leading-relaxed">
          Whether you have a fully scoped project or just an idea, we&apos;d like
          to hear about it. Our studio is in {BUSINESS.locality}, Zambia, and we
          reply to every enquiry within one business day.
        </p>
      </header>

      <Contact />

      <Footer />
    </main>
  );
}
