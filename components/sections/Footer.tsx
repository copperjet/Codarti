"use client";

const cols = [
  {
    head: "Studio",
    links: [
      { label: "Work", href: "#work" },
      { label: "Capabilities", href: "#capabilities" },
      { label: "Process", href: "#process" },
      { label: "Studio", href: "#studio" },
    ],
  },
  {
    head: "Contact",
    links: [
      { label: "support@codarti.com", href: "mailto:support@codarti.com" },
      { label: "+260 970 627 630", href: "tel:+260970627630" },
      { label: "Lusaka, Zambia", href: "#" },
    ],
  },
  {
    head: "Elsewhere",
    links: [
      { label: "LinkedIn", href: "#" },
      { label: "X / Twitter", href: "#" },
      { label: "GitHub", href: "#" },
      { label: "Dribbble", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="rule-t bg-[var(--bone)] pt-20 pb-10">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-x-8 gap-y-16">
          <div className="col-span-12 md:col-span-6">
            <div className="eyebrow mb-6">Built with intent · Lusaka</div>
            <p className="font-serif text-[clamp(28px,3.5vw,48px)] leading-[1.1] text-[var(--ink)] max-w-md">
              Have a project worth building? <br />
              <span className="text-[var(--ink-soft)]">We&apos;d like to hear about it.</span>
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 mt-8 text-[var(--ink)] underline underline-offset-[6px] decoration-[var(--rule)] hover:decoration-[var(--accent)] transition-colors"
            >
              Start a project →
            </a>
          </div>

          {cols.map((c) => (
            <div key={c.head} className="col-span-6 md:col-span-2">
              <div className="eyebrow mb-6">{c.head}</div>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
                    >
                      {l.label}
                    </a>
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
          <div>© {new Date().getFullYear()} Codarti Software Studio. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[var(--ink)] transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-[var(--ink)] transition-colors">
              Terms
            </a>
            <span>v 2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
