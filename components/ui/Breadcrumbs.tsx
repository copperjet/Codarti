import Link from "next/link";

// Visible breadcrumb trail. Pair with breadcrumbSchema() for the JSON-LD graph.
export default function Breadcrumbs({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-[var(--ink-soft)]">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={it.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-[var(--ink)]">
                  {it.name}
                </span>
              ) : (
                <>
                  <Link
                    href={it.path}
                    className="hover:text-[var(--ink)] transition-colors"
                  >
                    {it.name}
                  </Link>
                  <span aria-hidden>/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
