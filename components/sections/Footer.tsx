import Link from "next/link";
import { NAV_LINKS, SOCIALS, BUSINESS } from "@/lib/seo";

type FooterLink = { label: string; href: string; external?: boolean };
type FooterCol = { head: string; links: FooterLink[] };

const baseCols: FooterCol[] = [
  { head: "Explore", links: NAV_LINKS },
  {
    head: "Contact",
    links: [
      { label: BUSINESS.email, href: `mailto:${BUSINESS.email}`, external: true },
      {
        label: BUSINESS.phone,
        href: `tel:${BUSINESS.phone.replace(/\s/g, "")}`,
        external: true,
      },
      { label: `${BUSINESS.locality}, ${BUSINESS.countryName}`, href: "/contact" },
    ],
  },
];

const cols: FooterCol[] = SOCIALS.length
  ? [
      ...baseCols,
      {
        head: "Elsewhere",
        links: SOCIALS.map((s) => ({ ...s, external: true })),
      },
    ]
  : baseCols;

function FooterAnchor({ link }: { link: FooterLink }) {
  const className =
    "text-sm text-[var(--ink)] hover:text-[var(--accent)] transition-colors";
  if (link.external) {
    return (
      <a href={link.href} className={className}>
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="rule-t bg-[var(--bone)] pt-20 pb-10">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-x-8 gap-y-16">
          <div className="col-span-12 md:col-span-6">
            <div className="eyebrow mb-6">Built with intent · Lusaka</div>
            <p className="font-serif text-[clamp(28px,3.5vw,48px)] leading-[1.1] text-[var(--ink)] max-w-md">
              Have a project worth building? <br />
              <span className="text-[var(--ink-soft)]">
                We&apos;d like to hear about it.
              </span>
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 mt-8 text-[var(--ink)] underline underline-offset-[6px] decoration-[var(--rule)] hover:decoration-[var(--accent)] transition-colors"
            >
              Start a project →
            </Link>
          </div>

          {cols.map((c) => (
            <div key={c.head} className="col-span-6 md:col-span-2">
              <div className="eyebrow mb-6">{c.head}</div>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <FooterAnchor link={l} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-20 -mx-[var(--gutter)] overflow-hidden select-none"
          aria-hidden
        >
          <div className="font-serif text-[clamp(120px,28vw,500px)] leading-[0.85] text-[var(--ink)] text-center tracking-[-0.04em]">
            Codarti<span className="text-[var(--accent)]">.</span>
          </div>
        </div>

        <div className="rule-t pt-8 mt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[var(--ink-soft)]">
          <div>
            © {new Date().getFullYear()} {BUSINESS.legalName}. All rights
            reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="hover:text-[var(--ink)] transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-[var(--ink)] transition-colors"
            >
              Terms
            </Link>
            <span>v 2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
