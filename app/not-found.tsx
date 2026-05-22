import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-[var(--bone)] text-[var(--ink)]">
      <Nav />
      <section className="section-y pt-48">
        <div className="container-x">
          <div className="eyebrow mb-8">Error 404</div>
          <h1 className="font-serif text-[clamp(56px,11vw,160px)] leading-[0.9] tracking-[-0.025em] text-[var(--ink)]">
            Lost the
            <br />
            thread.
          </h1>
          <p className="mt-8 text-[var(--ink-soft)] text-lg max-w-md">
            That page does not exist — or it has moved. Let&apos;s get you back to
            something solid.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--accent)] text-[var(--bone)] text-sm font-medium transition-colors hover:bg-[var(--ink)]"
            >
              Back home
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[var(--rule)] text-[var(--ink)] text-sm transition-colors hover:border-[var(--ink)]"
            >
              See our work
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
