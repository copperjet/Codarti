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
  // 3 screenshot paths back→front z-order, used by ScreenshotStack
  screenshots?: string[];
};

export const projects: Project[] = [
  {
    index: "01",
    slug: "firstinqueue",
    name: "FirstInQueue",
    url: "firstinqueue.com",
    description:
      "Queue and appointment management used by clinics, banks, and government services.",
    outcome: "Avg. wait time cut by 62%.",
    tags: ["Engineering", "Operations"],
    year: "2024",
    swatch: "#4A463D",
    image: "/work/firstinqueue/FiQ-1.jpeg",
    screenshots: [
      "/work/firstinqueue/FiQ-2.jpeg",
      "/work/firstinqueue/FiQ-4.jpeg",
      "/work/firstinqueue/FiQ-6.jpeg",
      "/work/firstinqueue/FiQ-1.jpeg",
    ],
  },
  {
    index: "02",
    slug: "escholr",
    name: "eScholr",
    url: "escholr.com",
    description:
      "Multi-tenant school management system — admin, teachers, students, parents, finance, library.",
    outcome: "14 roles. One platform. Mobile-first.",
    tags: ["Product", "Engineering", "Design", "Strategy"],
    year: "2026",
    swatch: "#16140F",
    image: "/work/escholr/Eschor-1.jpeg",
    screenshots: [
      "/work/escholr/Eschor-3.jpeg",
      "/work/escholr/Eschor-5.jpeg",
      "/work/escholr/Eschor-7.jpeg",
      "/work/escholr/Eschor-1.jpeg",
    ],
  },
  {
    index: "03",
    slug: "igaprep",
    name: "iGaPrep",
    url: "igaprep.com",
    description:
      "Adaptive exam preparation platform serving students across Sub-Saharan Africa.",
    outcome: "10× faster mock cycles, 70k+ active learners.",
    tags: ["Product", "Engineering", "Design"],
    year: "2024",
    swatch: "#1F2A3A",
    image: "/work/igaprep/igaprep-1.jpeg",
    screenshots: [
      "/work/igaprep/igaprep-2.jpeg",
      "/work/igaprep/igaprep-4.jpeg",
      "/work/igaprep/igaprep-6.jpeg",
      "/work/igaprep/igaprep-1.jpeg",
    ],
  },
  {
    index: "04",
    slug: "predictioncube",
    name: "PredictionCube",
    url: "predictioncube.com",
    description:
      "Predictive analytics engine for risk-pricing and forecasting workloads.",
    outcome: "Models retrained 20× faster than baseline.",
    tags: ["Engineering", "Data"],
    year: "2025",
    swatch: "#B8543A",
    image: "/work/predictioncube/predictioncube-1.jpeg",
    screenshots: [
      "/work/predictioncube/predictioncube-2.jpeg",
      "/work/predictioncube/predictioncube-3.jpeg",
      "/work/predictioncube/predictioncube-4.jpeg",
      "/work/predictioncube/predictioncube-1.jpeg",
    ],
  },
  {
    index: "05",
    slug: "pezabondi",
    name: "Peza Bondi",
    url: "pezabondi.app",
    description: "Rental Property Management System.",
    outcome: "Streamlined property ops end-to-end.",
    tags: ["Product", "Engineering", "Design"],
    year: "2025",
    swatch: "#2C4A3E",
    image: "/work/pezabondi/pezabondi-1.jpeg",
    screenshots: [
      "/work/pezabondi/pezabondi-2.jpeg",
      "/work/pezabondi/pezabondi-3.jpeg",
      "/work/pezabondi/pezabondi-4.jpeg",
      "/work/pezabondi/pezabondi-1.jpeg",
    ],
  },
  {
    index: "06",
    slug: "mondepay",
    name: "Monde Pay",
    url: "mondepay.com",
    description: "Mobile payment solution for Android and iOS.",
    outcome: "Cross-platform payments shipped on a single codebase.",
    tags: ["Product", "Engineering", "Mobile"],
    year: "2025",
    swatch: "#1B3D2F",
    image: "/work/mondepay/mondepay-1.jpeg",
    screenshots: ["/work/mondepay/mondepay-1.jpeg"],
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
      "Codarti rebuilt our queue engine end-to-end. Wait times dropped, complaints stopped. The system runs itself.",
    author: "Mundia Songiso",
    role: "COO, FirstInQueue",
    authorSlug: "firstinqueue-mundia",
    hashtag: "#Shipped",
    location: "Lusaka",
    image: "/work/Clients/mundia.jpg",
  },
  {
    quote:
      "We shipped Peza Bondi in months, not years. Every release lands clean. They build like they own the product.",
    author: "David Mwikisa",
    role: "CEO, Peza Bondi",
    authorSlug: "pezabondi-ceo",
    hashtag: "#Considered",
    location: "Lusaka",
    image: "/work/Clients/David.jpg",
  },
  {
    quote:
      "The forecasting models retrain in hours now. Risk reports that used to take a week run before lunch.",
    author: "Sydney Peunja",
    role: "CFO, PredictionCube",
    authorSlug: "predictioncube-cfo",
    hashtag: "#Sharp",
    location: "Cape Town, ZA",
    image: "/work/Clients/sydney.jpg",
  },
  {
    quote:
      "iGaPrep scaled past seventy thousand learners without a hiccup. The architecture they handed us still holds.",
    author: "Nathan Mwambazi",
    role: "CTO, iGaPrep",
    authorSlug: "igaprep-cto",
    hashtag: "#Built",
    location: "Lusaka",
    image: "/work/Clients/nathan.jpg",
  },
];

export const clientNames = [
  "iGaPrep",
  "FirstInQueue",
  "PredictionCube",
  "eScholr",
  "Monde Pay",
  "Peza Bondi",
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
