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
  // descriptive alt text for the project's lead imagery
  imageAlt?: string;
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
    imageAlt: "FirstInQueue queue and appointment management app interface",
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
    imageAlt: "eScholr multi-tenant school management system dashboard",
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
    imageAlt: "iGaPrep adaptive exam preparation platform screen",
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
    imageAlt: "PredictionCube predictive analytics and forecasting dashboard",
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
    imageAlt: "Peza Bondi rental property management system app",
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
    imageAlt: "Monde Pay mobile payment app for Android and iOS",
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

// ── Case studies ────────────────────────────────────────────────────────────
export type CaseStudy = {
  sector: string;
  duration: string;
  role: string;
  overview: string;
  challenge: string;
  approach: string;
  result: string;
  metrics: { value: string; label: string }[];
};

export const caseStudies: Record<string, CaseStudy> = {
  firstinqueue: {
    sector: "Public services & healthcare",
    duration: "4 months",
    role: "Engineering, Operations",
    overview:
      "FirstInQueue is a queue and appointment management platform used by clinics, banks, and government service points across Zambia. Codarti rebuilt the queue engine end-to-end.",
    challenge:
      "Walk-in services were managing queues on paper and whiteboards. Wait times were unpredictable, front-desk staff were overwhelmed, and customers had no idea where they stood.",
    approach:
      "We built a real-time queue engine with digital ticketing, SMS notifications, and a staff console — designed to stay reliable on low-bandwidth connections and modest hardware.",
    result:
      "Average wait times fell sharply, walk-away rates dropped, and front-desk teams regained control of their day. The system now runs unattended.",
    metrics: [
      { value: "62%", label: "Lower average wait time" },
      { value: "Real-time", label: "Queue visibility" },
      { value: "Zero", label: "Paper queues remaining" },
    ],
  },
  escholr: {
    sector: "Education",
    duration: "18-month build",
    role: "Product, Engineering, Design, Strategy",
    overview:
      "eScholr is a multi-tenant school management system covering admin, teachers, students, parents, finance, and library — one platform for every role in a school.",
    challenge:
      "Schools were stitching together spreadsheets, paper registers, and disconnected apps. Parents had no window into their child's progress, and administrators had no single source of truth.",
    approach:
      "We designed a mobile-first platform with 14 distinct roles and strict per-school data isolation, built so a teacher in a low-connectivity classroom and an administrator at a desk get the same reliable experience.",
    result:
      "Schools now run admissions, attendance, grading, finance, and parent communication from one system, on architecture that supports many schools on shared infrastructure without compromising data isolation.",
    metrics: [
      { value: "14", label: "Distinct user roles" },
      { value: "One", label: "Unified platform" },
      { value: "Mobile-first", label: "Built for any device" },
    ],
  },
  igaprep: {
    sector: "Education / EdTech",
    duration: "6 months",
    role: "Product, Engineering, Design",
    overview:
      "iGaPrep is an adaptive exam preparation platform serving students across Sub-Saharan Africa with mock exams, practice, and progress tracking.",
    challenge:
      "Producing and grading mock exam cycles was slow and manual, limiting how often students could practise under real exam conditions.",
    approach:
      "We built an adaptive engine that generates and grades mock cycles automatically, with analytics that show each learner exactly where to focus next.",
    result:
      "Mock cycles that took weeks now run in hours, and the platform scaled past seventy thousand active learners on architecture that still holds today.",
    metrics: [
      { value: "10×", label: "Faster mock cycles" },
      { value: "70k+", label: "Active learners" },
      { value: "Adaptive", label: "Per-student practice" },
    ],
  },
  predictioncube: {
    sector: "Finance & data",
    duration: "5 months",
    role: "Engineering, Data",
    overview:
      "PredictionCube is a predictive analytics engine for risk-pricing and forecasting workloads, built for teams that need models retrained quickly and often.",
    challenge:
      "Forecasting and risk models took a week to retrain, so reports were always working from stale data.",
    approach:
      "We re-engineered the data pipeline and training workflow so models retrain on demand, with reproducible runs and clear versioning.",
    result:
      "Models now retrain twenty times faster than the previous baseline. Risk reports that once took a week run before lunch.",
    metrics: [
      { value: "20×", label: "Faster model retraining" },
      { value: "Same-day", label: "Risk reporting" },
      { value: "Reproducible", label: "Versioned runs" },
    ],
  },
  pezabondi: {
    sector: "Property & real estate",
    duration: "5 months",
    role: "Product, Engineering, Design",
    overview:
      "Peza Bondi is a rental property management system that streamlines property operations end-to-end — for landlords, agents, and tenants.",
    challenge:
      "Property operations were spread across phone calls, notebooks, and messaging apps, making rent tracking and maintenance hard to manage at scale.",
    approach:
      "We shipped a focused platform covering listings, tenancies, rent collection, and maintenance requests — released in tight cycles so the team saw working software every week.",
    result:
      "Peza Bondi launched in months, not years, with every release landing clean. Property operations now run from a single system.",
    metrics: [
      { value: "Months", label: "From start to launch" },
      { value: "End-to-end", label: "Property operations" },
      { value: "Clean", label: "Every release" },
    ],
  },
  mondepay: {
    sector: "Fintech",
    duration: "4 months",
    role: "Product, Engineering, Mobile",
    overview:
      "Monde Pay is a mobile payment solution for Android and iOS, built on a single shared codebase for fast, consistent delivery.",
    challenge:
      "Shipping a trustworthy payment experience on both Android and iOS without doubling the engineering effort.",
    approach:
      "We built Monde Pay cross-platform on one codebase, with native-feeling flows and a security-first approach to every transaction path.",
    result:
      "Cross-platform payments shipped on a single codebase, keeping the app consistent and maintainable as it grows.",
    metrics: [
      { value: "2", label: "Platforms, one codebase" },
      { value: "Native", label: "Feel on Android & iOS" },
      { value: "Security-first", label: "Every transaction path" },
    ],
  },
};
