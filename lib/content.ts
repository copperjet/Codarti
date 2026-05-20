export type Project = {
  index: string;
  slug: string;
  name: string;
  url: string;
  description: string;
  outcome: string;
  tags: string[];
  year: string;
  // placeholder color while imagery pending
  swatch: string;
  // optional media — auto-falls-back to swatch when omitted
  image?: string;
  video?: string;
  poster?: string;
};

export const projects: Project[] = [
  {
    index: "01",
    slug: "igaprep",
    name: "iGaPrep",
    url: "igaprep.com",
    description:
      "Adaptive exam preparation platform serving students across Sub-Saharan Africa.",
    outcome: "10× faster mock cycles, 70k+ active learners.",
    tags: ["Product", "Engineering", "Design"],
    year: "2024",
    swatch: "#1F2A3A",
    image: "/work/igaprep/cover.webp",
  },
  {
    index: "02",
    slug: "firstinqueue",
    name: "FirstInQueue",
    url: "firstinqueue.com",
    description:
      "Queue and appointment management used by clinics, banks, and government services.",
    outcome: "Avg. wait time cut by 62%.",
    tags: ["Engineering", "Operations"],
    year: "2024",
    swatch: "#4A463D",
    image: "/work/firstinqueue/cover.webp",
  },
  {
    index: "03",
    slug: "predictioncube",
    name: "PredictionCube",
    url: "predictioncube.com",
    description:
      "Predictive analytics engine for risk-pricing and forecasting workloads.",
    outcome: "Models retrained 20× faster than baseline.",
    tags: ["Engineering", "Data"],
    year: "2025",
    swatch: "#B8543A",
    image: "/work/predictioncube/cover.webp",
  },
  {
    index: "04",
    slug: "escholr",
    name: "eScholr",
    url: "escholr.com",
    description:
      "Multi-tenant school management system — admin, teachers, students, parents, finance, library.",
    outcome: "14 roles. One platform. Mobile-first.",
    tags: ["Product", "Engineering", "Design", "Strategy"],
    year: "2026",
    swatch: "#16140F",
    image: "/work/escholr/cover.webp",
  },
];

export const capabilities = [
  {
    n: "01",
    title: "Engineering",
    glyph: "</>",
    body: "Full-stack product engineering — TypeScript, React Native, Next.js, Postgres, edge runtimes. We ship architecture that survives scale.",
  },
  {
    n: "02",
    title: "Design",
    glyph: "◐",
    body: "Interface and brand systems built around clarity. We design what the product needs, not what looks busy in a portfolio.",
  },
  {
    n: "03",
    title: "Strategy",
    glyph: "✦",
    body: "Product strategy, technical advisory, and roadmap shaping for teams who need a sharper second pair of eyes.",
  },
  {
    n: "04",
    title: "Advisory",
    glyph: "⌘",
    body: "Fractional engagements with founders and CTOs — architecture review, hiring loops, vendor selection, system unblockers.",
  },
];

export const process = [
  {
    n: "01",
    title: "Discover",
    body: "We listen, audit, and map the real problem. No assumptions.",
  },
  {
    n: "02",
    title: "Define",
    body: "Constraints, scope, and shape locked. One page, signed.",
  },
  {
    n: "03",
    title: "Build",
    body: "Tight loops. Working software in your hands every week.",
  },
  {
    n: "04",
    title: "Deliver",
    body: "Ship, measure, refine. Handover with documentation that lasts.",
  },
];

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  authorSlug: string;
  hashtag: string;
  location?: string;
  image?: string;
  video?: string;
  poster?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Codarti shipped what two prior teams couldn't. The bar they hold is the bar we now hold ourselves to.",
    author: "Founder",
    role: "iGaPrep",
    authorSlug: "igaprep-founder",
    hashtag: "#Shipped",
    location: "Lusaka, ZM",
    image: "/testimonials/igaprep-founder.webp",
  },
  {
    quote:
      "Quiet, fast, exact. Their work feels like it was always there.",
    author: "Operations Lead",
    role: "FirstInQueue",
    authorSlug: "firstinqueue-ops",
    hashtag: "#Quiet",
    location: "Nairobi, KE",
    image: "/testimonials/firstinqueue-ops.webp",
  },
  {
    quote:
      "They treated our codebase like their own. That's rare.",
    author: "CTO",
    role: "PredictionCube",
    authorSlug: "predictioncube-cto",
    hashtag: "#Considered",
    location: "Cape Town, ZA",
    image: "/testimonials/predictioncube-cto.webp",
  },
];

export const clientNames = [
  "iGaPrep",
  "FirstInQueue",
  "PredictionCube",
  "eScholr",
  "Ministry of Education ZM",
  "Cassava Health",
  "Atlas Capital",
  "Mbira Finance",
];

export const faqs = [
  {
    q: "How do you price engagements?",
    a: "Fixed-scope sprints for defined work, monthly retainers for ongoing partnerships, advisory hours for short interventions. Quoted after a 30-minute scoping call — no templates.",
  },
  {
    q: "What stacks do you work in?",
    a: "TypeScript end-to-end. React, React Native, Next.js, Node, Postgres, Supabase, Cloudflare and Vercel edge runtimes. We adopt the right tool — not the loudest one.",
  },
  {
    q: "Do you take equity?",
    a: "Selectively, alongside cash, when the product, team, and stage are aligned with how we work.",
  },
  {
    q: "Where are you based?",
    a: "Lusaka, Zambia. We work async with teams across UTC-5 to UTC+8.",
  },
  {
    q: "How small or large a project will you take?",
    a: "Smallest: a one-week architecture audit. Largest: an 18-month product build with a dedicated squad.",
  },
  {
    q: "What does the first call look like?",
    a: "30 minutes. You talk, we listen. By the end you'll have a written summary of what we heard and whether we're the right fit.",
  },
];

export const stats = [
  { value: "07", label: "Years operating" },
  { value: "24", label: "Products shipped" },
  { value: "11", label: "Countries served" },
  { value: "100%", label: "Repeat-client rate" },
];

export const budgets = [
  "Under $10k",
  "$10k – $25k",
  "$25k – $75k",
  "$75k – $200k",
  "$200k+",
  "Not sure yet",
];
