import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { getAllPosts } from "@/lib/posts";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Blog — Software Insights for Zambian Businesses",
  description:
    "Practical guides on custom software, app development, and technology decisions for businesses in Lusaka and across Zambia, from the Codarti studio.",
  path: "/blog",
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="relative min-h-screen bg-[var(--bone)] text-[var(--ink)]">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <Nav />

      <header className="container-x pt-40 pb-16 md:pt-48">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]}
        />
        <div className="eyebrow mt-8 mb-6">Writing</div>
        <h1 className="font-serif text-[clamp(44px,7.5vw,130px)] leading-[0.95] tracking-[-0.025em] max-w-[15ch]">
          Notes on building software.
        </h1>
        <p className="mt-10 text-[var(--ink-soft)] text-lg max-w-2xl leading-relaxed">
          Practical writing on custom software, app development, and the
          technology decisions that matter for businesses in Lusaka and across
          Zambia.
        </p>
      </header>

      <div className="container-x section-y pt-8">
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block rule-t py-12 grid grid-cols-12 gap-x-8 gap-y-4"
              >
                <div className="col-span-12 md:col-span-3 eyebrow tnum">
                  {formatDate(post.date)} · {post.readMinutes} min read
                </div>
                <div className="col-span-12 md:col-span-9">
                  <h2 className="font-serif text-[clamp(28px,3.5vw,52px)] leading-[1.02] text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-4 text-[var(--ink-soft)] leading-relaxed max-w-2xl">
                    {post.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--ink)]">
                    Read article →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Footer />
    </main>
  );
}
