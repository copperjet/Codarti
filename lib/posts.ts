// Blog content lives here as typed data — consistent with lib/content.ts.
// Each post renders to semantic HTML (proper h2/h3) on its own indexable route.

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd
  readMinutes: number;
  tags: string[];
  body: PostBlock[];
};

const posts: Post[] = [
  {
    slug: "choosing-a-software-development-company-in-lusaka",
    title: "How to Choose a Software Development Company in Lusaka",
    description:
      "A practical guide for Zambian businesses on selecting a software development partner in Lusaka — what to ask, what to avoid, and how to judge real engineering quality.",
    date: "2026-05-12",
    readMinutes: 6,
    tags: ["Guides", "Hiring"],
    body: [
      {
        type: "p",
        text: "Commissioning custom software is one of the larger bets a Zambian business will make, and the partner you pick matters more than the technology they use. Lusaka now has a real pool of software development companies, freelancers, and studios — which is good news, but it also makes the decision harder. This guide walks through how to evaluate a software development company in Lusaka so you commit with confidence rather than hope.",
      },
      { type: "h2", text: "Start with outcomes, not features" },
      {
        type: "p",
        text: "Before you talk to anyone, write down the business outcome you need: shorter queues, fewer manual reports, faster onboarding, lower payment friction. A strong development partner will push the conversation back to outcomes and constraints. Be wary of any team that jumps straight to a feature list or a price before they understand the problem — software priced before it is understood is software priced wrong.",
      },
      { type: "h2", text: "Ask to see shipped work" },
      {
        type: "p",
        text: "Anyone can show slides. Ask for products that are live and in use, ideally ones you can open yourself. For each, ask three questions: what was the measurable result, what broke after launch, and who maintains it now. Honest answers to the second and third questions tell you far more than a polished case study.",
      },
      { type: "h3", text: "Questions worth asking" },
      {
        type: "ul",
        items: [
          "Who owns the code and the accounts — you, or the studio?",
          "What happens to the project if the lead engineer leaves?",
          "How do you handle changes in scope once we have started?",
          "What does handover and documentation look like at the end?",
        ],
      },
      { type: "h2", text: "Judge communication, not just code" },
      {
        type: "p",
        text: "Most failed software projects fail on communication, not on engineering. In your first few conversations, notice whether the team listens, summarises what they heard, and says no when something is a bad idea. A partner who agrees with everything is selling, not advising.",
      },
      {
        type: "quote",
        text: "The best development partners make the project smaller and sharper, not bigger and vaguer.",
      },
      { type: "h2", text: "Be careful with price-only decisions" },
      {
        type: "p",
        text: "The cheapest quote in Lusaka is rarely the cheapest project. Software has a long tail of cost — hosting, fixes, changes, and the price of downtime. A slightly higher quote from a team that documents its work and writes tests will usually cost less over two years than a low quote that needs rebuilding. Ask each candidate to explain what is and is not included, in writing.",
      },
      { type: "h2", text: "What good looks like" },
      {
        type: "p",
        text: "A dependable software development company in Lusaka will scope tightly, ship working software in short cycles, hand over clean documentation, and tell you the truth when something is harder than expected. If a studio does those four things, the specific stack they use matters far less than you might think.",
      },
      {
        type: "p",
        text: "Codarti works this way by design — fixed-scope sprints, weekly working builds, and documentation that outlasts the engagement. If you are weighing a software project, a 30-minute scoping call will tell you quickly whether we are the right fit.",
      },
    ],
  },
  {
    slug: "custom-software-vs-off-the-shelf-for-zambian-smes",
    title: "Custom Software vs Off-the-Shelf: What's Right for Zambian SMEs",
    description:
      "Should a Zambian small or medium business buy ready-made software or build custom? A clear framework for deciding — with the trade-offs that actually matter.",
    date: "2026-04-28",
    readMinutes: 7,
    tags: ["Guides", "Strategy"],
    body: [
      {
        type: "p",
        text: "Every growing business in Zambia hits the same fork in the road: the spreadsheet stops scaling, and you have to decide whether to buy off-the-shelf software or build something custom. Both are reasonable choices. The wrong one is expensive. Here is a framework for deciding.",
      },
      { type: "h2", text: "When off-the-shelf wins" },
      {
        type: "p",
        text: "If your process is genuinely standard — basic accounting, payroll, email — buy it. Off-the-shelf software is cheaper upfront, available immediately, and maintained by someone else. The trap is assuming your process is standard when it is not. Most Zambian SMEs have at least one workflow shaped by local payment methods, regulation, or customer behaviour that generic tools handle badly.",
      },
      { type: "h3", text: "Good signs you should buy" },
      {
        type: "ul",
        items: [
          "The process is identical to thousands of other businesses.",
          "You can adapt your workflow to the tool without pain.",
          "The cost of the subscription is small relative to the value.",
          "You do not need the data to connect to your other systems.",
        ],
      },
      { type: "h2", text: "When custom software wins" },
      {
        type: "p",
        text: "Custom software earns its cost when the process is a competitive advantage, when several systems need to talk to each other, or when off-the-shelf tools force you into workarounds that quietly cost staff hours every day. If your team is exporting data from one tool to paste it into another, you are already paying for custom software — just in wages instead of code.",
      },
      {
        type: "quote",
        text: "The real cost of off-the-shelf software is rarely the subscription. It is the hour a day your team spends working around it.",
      },
      { type: "h3", text: "Good signs you should build" },
      {
        type: "ul",
        items: [
          "Your workflow is part of why customers choose you.",
          "Staff spend significant time moving data between tools by hand.",
          "Local payment, language, or compliance needs are unsupported.",
          "You need to own the data and the roadmap long term.",
        ],
      },
      { type: "h2", text: "The middle path" },
      {
        type: "p",
        text: "It is rarely all-or-nothing. Many of the strongest setups buy the commodity parts — accounting, email, storage — and build custom software only for the one or two workflows that are genuinely yours, connecting them with integrations. This keeps cost down while still removing the daily friction.",
      },
      { type: "h2", text: "A simple decision rule" },
      {
        type: "p",
        text: "Add up the staff hours lost each week to a process and multiply by a year. If that number is large and the process is core to your business, custom software will usually pay for itself. If the number is small or the process is generic, buy and move on.",
      },
      {
        type: "p",
        text: "If you are unsure which side of the line you fall on, that is exactly the kind of question a short advisory call can settle. Codarti helps Zambian businesses make this decision honestly — including telling you when not to build.",
      },
    ],
  },
];

export function getAllPosts(): Post[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export const postSlugs = posts.map((p) => p.slug);
