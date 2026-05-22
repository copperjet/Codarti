import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { getAllPosts, getPost, type PostBlock } from "@/lib/posts";
import { pageMetadata, breadcrumbSchema, articleSchema } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
  });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="font-serif text-[clamp(26px,3vw,40px)] leading-[1.1] mt-14 mb-5 text-[var(--ink)]">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="font-serif text-[clamp(20px,2.2vw,28px)] leading-[1.2] mt-10 mb-4 text-[var(--ink)]">
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p className="text-[var(--ink-soft)] text-lg leading-[1.7] mb-6">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul className="mb-6 space-y-3">
          {block.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-[var(--ink-soft)] text-lg leading-[1.6]"
            >
              <span
                className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0"
                aria-hidden
              />
              {item}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="my-10 border-l-2 border-[var(--accent)] pl-6 font-serif text-[clamp(22px,2.4vw,32px)] leading-[1.3] text-[var(--ink)]">
          {block.text}
        </blockquote>
      );
  }
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="relative min-h-screen bg-[var(--bone)] text-[var(--ink)]">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${slug}` },
          ]),
          articleSchema(post),
        ]}
      />
      <Nav />

      <article className="container-x pt-40 pb-24 md:pt-48">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${slug}` },
          ]}
        />

        <header className="mt-8 max-w-3xl">
          <div className="eyebrow tnum mb-6">
            {formatDate(post.date)} · {post.readMinutes} min read ·{" "}
            {post.tags.join(", ")}
          </div>
          <h1 className="font-serif text-[clamp(36px,5.5vw,88px)] leading-[1] tracking-[-0.02em]">
            {post.title}
          </h1>
          <p className="mt-8 text-[var(--ink-soft)] text-xl leading-relaxed">
            {post.description}
          </p>
        </header>

        <div className="mt-12 max-w-2xl rule-t pt-12">
          {post.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        <div className="mt-16 max-w-2xl rule-t pt-10 flex flex-wrap items-center gap-6">
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--accent)] text-[var(--bone)] text-sm font-medium transition-colors hover:bg-[var(--ink)]"
          >
            Start a project →
          </Link>
          <Link
            href="/blog"
            className="text-sm text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
          >
            ← All articles
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  );
}
