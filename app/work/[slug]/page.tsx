import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { projects, caseStudies } from "@/lib/content";
import { pageMetadata, breadcrumbSchema, caseStudySchema } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.name} — Case Study`,
    description: `${project.description} A software project built by Codarti — ${project.outcome}`,
    path: `/work/${slug}`,
  });
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  const study = caseStudies[slug];
  if (!project || !study) notFound();

  const gallery = Array.from(new Set(project.screenshots ?? []));
  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <main className="relative min-h-screen bg-[var(--bone)] text-[var(--ink)]">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: project.name, path: `/work/${slug}` },
          ]),
          caseStudySchema(project),
        ]}
      />
      <Nav />

      <header className="container-x pt-40 pb-12 md:pt-48">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: project.name, path: `/work/${slug}` },
          ]}
        />
        <div className="eyebrow mt-8 mb-6">{study.sector}</div>
        <h1 className="font-serif text-[clamp(48px,9vw,160px)] leading-[0.9] tracking-[-0.025em]">
          {project.name}
        </h1>
        <p className="mt-8 text-[var(--ink-soft)] text-lg max-w-2xl leading-relaxed">
          {study.overview}
        </p>

        <dl className="mt-12 rule-t pt-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Year", value: project.year },
            { label: "Duration", value: study.duration },
            { label: "Role", value: study.role },
            { label: "Sector", value: study.sector },
          ].map((d) => (
            <div key={d.label}>
              <dt className="eyebrow mb-2">{d.label}</dt>
              <dd className="text-sm text-[var(--ink)]">{d.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      {project.image && (
        <div className="container-x">
          <div
            className="relative aspect-[16/9] overflow-hidden rounded-md"
            style={{ background: project.swatch }}
          >
            <Image
              src={project.image}
              alt={project.imageAlt ?? project.name}
              fill
              priority
              sizes="(max-width: 1400px) 100vw, 1400px"
              className="object-cover"
            />
          </div>
        </div>
      )}

      <section className="container-x section-y">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {study.metrics.map((m) => (
            <div key={m.label}>
              <div className="font-serif text-[clamp(36px,5vw,72px)] leading-none text-[var(--ink)] tnum mb-3">
                {m.value}
              </div>
              <div className="text-xs text-[var(--ink-soft)] uppercase tracking-widest">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-12 gap-x-8 gap-y-12">
          {[
            { h: "The challenge", body: study.challenge },
            { h: "Our approach", body: study.approach },
            { h: "The result", body: study.result },
          ].map((block) => (
            <div
              key={block.h}
              className="col-span-12 md:col-span-10 md:col-start-3 rule-t pt-8"
            >
              <h2 className="font-serif text-[clamp(28px,3.5vw,48px)] leading-[1] mb-5">
                {block.h}
              </h2>
              <p className="text-[var(--ink-soft)] text-lg leading-relaxed max-w-2xl">
                {block.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 md:ml-[16.66%]">
          <a
            href={`https://${project.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[var(--ink)] hover:text-[var(--accent)] transition-colors underline underline-offset-[6px] decoration-[var(--rule)]"
          >
            Visit {project.url} ↗
          </a>
        </div>
      </section>

      {gallery.length > 0 && (
        <section className="container-x pb-24">
          <h2 className="sr-only">{project.name} screenshots</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {gallery.map((src, i) => (
              <div
                key={src}
                className="relative aspect-[4/3] overflow-hidden rounded-md"
                style={{ background: project.swatch }}
              >
                <Image
                  src={src}
                  alt={`${project.name} — screen ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="container-x section-y">
        <div className="rule-t pt-16 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-serif text-[clamp(32px,5vw,72px)] leading-[1] max-w-[16ch]">
              Have a project like this?
            </h2>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--accent)] text-[var(--bone)] text-sm font-medium transition-colors hover:bg-[var(--ink)]"
            >
              Start a project →
            </Link>
          </div>
          <Link
            href={`/work/${next.slug}`}
            className="group text-right"
          >
            <span className="eyebrow block mb-2">Next project</span>
            <span className="font-serif text-[clamp(24px,3vw,40px)] text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
              {next.name} →
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
