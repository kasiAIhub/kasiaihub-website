// Shared, client-safe diagnostic data: questions, scoring, gap sentences.
// No server imports here so both the questionnaire and the report can use it.

export type Stage = "growth_ready" | "stabilisation" | "crisis";
export type AreaKey = "capacity" | "money" | "growth";

export const STAGE_LABEL: Record<Stage, string> = {
  growth_ready: "Growth Ready",
  stabilisation: "Stabilising",
  crisis: "In Survival Mode",
};

export const STAGE_DESCRIPTION: Record<Stage, string> = {
  growth_ready:
    "Money is reliable. You can plan on it — now the work is turning that stability into scale.",
  stabilisation:
    "You're making it work, but it's fragile. The next step is making it consistent.",
  crisis:
    "More is going out than coming in. Nothing else matters until we stop that leak.",
};

export const STAGE_COLOR: Record<Stage, string> = {
  growth_ready: "#00C896",
  stabilisation: "#F59E0B",
  crisis: "#E24B4A",
};

export const AREA_LABEL: Record<AreaKey, string> = {
  capacity: "Control and capacity",
  money: "Customers and money",
  growth: "Being seen and growing",
};

export const AREA_MAX: Record<AreaKey, number> = {
  capacity: 8,
  money: 8,
  growth: 6,
};

// -- Questions --

export type Q1 = { id: "q1"; type: "stage"; label: string; section: 1; options: { label: string; stage: Stage }[] };
export type QScored = {
  id: string;
  type: "scored";
  label: string;
  section: 1 | 2 | 3 | 4;
  area: AreaKey;
  options: { label: string; points: 0 | 1 | 2 }[];
};

export const Q1_QUESTION: Q1 = {
  id: "q1",
  type: "stage",
  section: 1,
  label: "Right now, what does money in your business actually look like?",
  options: [
    { label: "I can count on it. Money comes in reliably every month and I can plan around it.", stage: "growth_ready" },
    { label: "It goes up and down. Some months are good, some months I'm scraping.", stage: "stabilisation" },
    { label: "I'm losing money. More is going out than coming in.", stage: "crisis" },
  ],
};

export const SCORED_QUESTIONS: QScored[] = [
  // Section 2 — Capacity
  {
    id: "q2",
    type: "scored",
    section: 2,
    area: "capacity",
    label: "If you got sick tomorrow and couldn't work for a week, what would happen to your business?",
    options: [
      { label: "It would keep running — other people know what to do", points: 2 },
      { label: "It would survive, but a lot would go wrong", points: 1 },
      { label: "It would stop completely — everything depends on me", points: 0 },
    ],
  },
  {
    id: "q3",
    type: "scored",
    section: 2,
    area: "capacity",
    label: "Where does the important information about your business actually live?",
    options: [
      { label: "Written down, organised, and I can find it fast", points: 2 },
      { label: "Some is written down, some is in my head", points: 1 },
      { label: "Mostly in my head, and in a notebook somewhere", points: 0 },
    ],
  },
  {
    id: "q4",
    type: "scored",
    section: 2,
    area: "capacity",
    label: "When a customer sends you a WhatsApp message, how quickly do you actually reply?",
    options: [
      { label: "Almost immediately — I have a system for it", points: 2 },
      { label: "When I get a chance — sometimes hours later", points: 1 },
      { label: "I often see it too late, or forget to reply at all", points: 0 },
    ],
  },
  {
    id: "q5",
    type: "scored",
    section: 2,
    area: "capacity",
    label:
      "How much of your week disappears into admin — bookings, chasing payments, answering the same questions over and over?",
    options: [
      { label: "Very little — it mostly handles itself", points: 2 },
      { label: "A few hours a week — annoying but manageable", points: 1 },
      { label: "Too much. It feels like a second job I never signed up for", points: 0 },
    ],
  },
  // Section 3 — Money
  {
    id: "q6",
    type: "scored",
    section: 3,
    area: "money",
    label: "Do you know what you actually make in profit on each thing you sell?",
    options: [
      { label: "Yes — I've worked out my real costs and margins", points: 2 },
      { label: "Roughly — but I'm not fully sure", points: 1 },
      { label: "No. I price based on what feels right or what others charge", points: 0 },
    ],
  },
  {
    id: "q7",
    type: "scored",
    section: 3,
    area: "money",
    label: "When a good customer stops coming back, do you find out why?",
    options: [
      { label: "Yes — I follow up and I usually know what happened", points: 2 },
      { label: "Sometimes I hear through someone else", points: 1 },
      { label: "No. They just disappear and I never find out", points: 0 },
    ],
  },
  {
    id: "q8",
    type: "scored",
    section: 3,
    area: "money",
    label: "How do you handle customers who owe you money?",
    options: [
      { label: "I have a system — reminders go out and I track who owes what", points: 2 },
      { label: "I chase them myself when I remember", points: 1 },
      { label: "I mostly just hope they pay. Sometimes I never get it", points: 0 },
    ],
  },
  {
    id: "q9",
    type: "scored",
    section: 3,
    area: "money",
    label: "Is your business money separate from your personal and family money?",
    options: [
      { label: "Yes — separate account, clear boundary", points: 2 },
      { label: "Sort of — but they mix more than they should", points: 1 },
      { label: "No. It's all one pot, and family needs come first", points: 0 },
    ],
  },
  // Section 4 — Growth
  {
    id: "q10",
    type: "scored",
    section: 4,
    area: "growth",
    label: "If someone who doesn't know you wanted to find your business online right now, could they?",
    options: [
      { label: "Yes — they'd find me and I'd look professional", points: 2 },
      { label: "They'd find something, but it wouldn't impress them", points: 1 },
      { label: "No. They'd find nothing, or they'd find my competitor instead", points: 0 },
    ],
  },
  {
    id: "q11",
    type: "scored",
    section: 4,
    area: "growth",
    label: "Does your business look as good as it actually is — photos, posters, the way you show up?",
    options: [
      { label: "Yes — it looks professional and consistent", points: 2 },
      { label: "It's okay, but it could be a lot better", points: 1 },
      { label: "No. The work is good but it doesn't look it", points: 0 },
    ],
  },
  {
    id: "q12",
    type: "scored",
    section: 4,
    area: "growth",
    label: "Right now, are you building the business — or just keeping it alive?",
    options: [
      { label: "Building — I'm actively chasing growth, funding, or partnerships", points: 2 },
      { label: "A bit of both, depending on the month", points: 1 },
      { label: "Just keeping it alive. There's no time for anything else", points: 0 },
    ],
  },
];

export const SECTION_INTROS: Record<1 | 2 | 3 | 4, { title: string; sub: string }> = {
  1: { title: "Where your business actually is", sub: "Let's start with the honest one." },
  2: { title: "Control and capacity", sub: "How the business runs when you're not looking." },
  3: { title: "Customers and money", sub: "Where the money quietly leaks out." },
  4: { title: "Being seen and growing", sub: "Whether the world outside your street knows you exist." },
};

// -- Gap / Strength sentences --

export const GAP_SENTENCES: Record<string, string> = {
  q2: "Your business stops when you stop. That's not a business yet — that's a job you created for yourself.",
  q3: "Your business runs from memory. That works until the day it doesn't.",
  q4: "You're losing sales on WhatsApp — not because customers didn't want to buy, but because they didn't hear back in time.",
  q5: "Admin is eating your week. That's time you could be using to actually grow.",
  q6: "You're pricing on feel, not on numbers. Some of what you sell may be making you nothing at all.",
  q7: "Customers are disappearing and you never find out why. Every one of them was avoidable.",
  q8: "Money owed to you is money you've already earned. Right now, some of it is never coming back.",
  q9: "Your business money and your family money are the same money. That's not a discipline problem — it's a structure problem, and structure can be fixed.",
  q10: "Someone searched for what you sell this week. They found your competitor instead.",
  q11: "Your work is better than your business looks. That gap is costing you customers and letting you charge less than you're worth.",
  q12: "You're surviving, not building. That's not a failure — it's a signal that the systems underneath you aren't holding enough weight yet.",
};

export const STRONG_SENTENCE: Record<AreaKey, string> = {
  capacity: "Your business can run without you standing over it. That's rarer than you think.",
  money: "You know your numbers and you protect your money. That's the foundation everything else is built on.",
  growth: "This is your strongest area. People can find you and your business looks the part.",
};

// Deterministic cost-of-inaction lines shown on gap cards.
// Selected by picking the FIRST zero-scored question in the area.
export const COST_LINES: Record<string, string> = {
  q2: "If you're out for a week, that's a week of income that doesn't happen.",
  q3: "Everything in your head is everything you can't hand to someone else.",
  q4: "Every enquiry that waits hours is a sale someone else can take in minutes.",
  q5: "Even 5 hours a week on admin is over 20 hours a month — most of a working week, every month.",
  q6: "Without your real cost per item, some of what you sell may be earning you nothing.",
  q7: "A customer who leaves quietly costs more than one who complains — you never get the chance to fix it.",
  q8: "Money owed to you is money you've already worked for.",
  q9: "When business and family money share one pot, the business is always last in line.",
  q10: "The customers you never meet are the ones who couldn't find you.",
  q11: "Looking smaller than you are costs you both customers and the price you can charge.",
  q12: "Surviving is full-time work. It leaves nothing for building.",
};

// One deterministic quick-win action tied to each scored question.
// Selected by picking the LOWEST-scoring question overall (ties broken by
// question order q2..q12). Never selects Q1 (stage question, unscored).
export const QUICK_WINS: Record<string, { title: string; body: string }> = {
  q2: {
    title: "Write your one-page handover note",
    body: "In one sitting, list the 5 things that would fall over if you disappeared for a week — supplier names, passwords, standing orders, who owes what. That single page is the beginning of a business that doesn't stop when you stop.",
  },
  q3: {
    title: "Get one thing out of your head and onto paper",
    body: "Pick the ONE piece of information that only lives in your head — your supplier list, your recipe costings, your customer contact list — and write it down somewhere you can find it again. Just one. You'll feel the difference immediately.",
  },
  q4: {
    title: "Set a WhatsApp auto-reply this week",
    body: "Turn on WhatsApp Business's away message today: 'Thanks for your message — I'll reply within X hours. For urgent orders, please call.' It buys you time, sets expectations, and stops the silent hours from costing you sales.",
  },
  q5: {
    title: "Track your admin time for 3 days",
    body: "For the next 3 days, jot down every hour spent on admin — bookings, chasing payments, answering the same questions. You can't fix what you haven't measured. By Friday you'll know exactly which task is stealing the most from you.",
  },
  q6: {
    title: "Cost out your top 3 sellers this week",
    body: "Take your three best-selling items. For each one, list every real cost — materials, packaging, transport, your time. Compare that to your selling price. You'll likely find at least one item you thought was making money isn't.",
  },
  q7: {
    title: "Message 5 customers who used to buy",
    body: "Pick 5 customers who used to come regularly and haven't in a while. Send each one the same short message: 'Haven't seen you in a bit — everything okay?' Some won't reply. The ones who do will tell you exactly what to fix.",
  },
  q8: {
    title: "List everyone who currently owes you money",
    body: "In one sitting, write down every person or business who owes you money right now, how much, and how overdue. Some of it you'll recover this week just from having the list in front of you.",
  },
  q9: {
    title: "Open a separate business account this week",
    body: "Walk into your bank or open one online — Tyme, Discovery, Capitec Business, whichever is easiest. From next week, every rand the business earns goes there first. It's a structure fix, not a discipline problem.",
  },
  q10: {
    title: "Claim your Google Business Profile",
    body: "Go to google.com/business and claim your listing. Add your area, hours, WhatsApp number and 3 photos of your actual work. It's free, takes 20 minutes, and it's the difference between someone finding you and finding your competitor.",
  },
  q11: {
    title: "Take 5 real photos of your work",
    body: "This week, take 5 clear phone photos of your actual work — good lighting, clean background, no clutter behind them. That's the start of a portfolio you can use everywhere: WhatsApp status, Google listing, quotes to new customers.",
  },
  q12: {
    title: "Block one hour on Friday to plan next week",
    body: "This Friday, sit somewhere quiet for one hour and write down the 3 things that would move the business forward next week — not the 30 things that need doing. Just 3. That single hour is the difference between building and surviving.",
  },
};

export function selectQuickWin(
  answers: Record<string, unknown>,
): { id: string; title: string; body: string } | null {
  // Find the lowest scoring scored question. Ties: earliest in list.
  let bestId: string | null = null;
  let bestScore = 3;
  for (const q of SCORED_QUESTIONS) {
    const v = Number(answers[q.id] ?? 2);
    const s = Number.isFinite(v) ? Math.max(0, Math.min(2, v)) : 2;
    if (s < bestScore) {
      bestScore = s;
      bestId = q.id;
    }
  }
  if (!bestId) return null;
  const qw = QUICK_WINS[bestId];
  if (!qw) return null;
  return { id: bestId, ...qw };
}

export function selectCostLine(
  area: AreaKey,
  answers: Record<string, unknown>,
): string | null {
  const qs = SCORED_QUESTIONS.filter((q) => q.area === area);
  const firstZero = qs.find((q) => Number(answers[q.id]) === 0);
  if (firstZero) return COST_LINES[firstZero.id] ?? null;
  const firstOne = qs.find((q) => Number(answers[q.id]) === 1);
  if (firstOne) return COST_LINES[firstOne.id] ?? null;
  return null;
}

export const OPPORTUNITY_TEXT: Record<AreaKey, string> = {
  capacity:
    "Build simple systems that keep work moving, customers responded to, and sales from slipping away.",
  money:
    "Understand your numbers and price with confidence so every sale moves your business forward.",
  growth:
    "Get found by customers beyond your street, and look as professional as the work you actually do.",
};

export const STRENGTH_TEXT: Record<AreaKey, string> = {
  capacity: "You've built something that holds. We'll help you scale it without breaking what's working.",
  money: "You know your numbers. We'll help you use them to grow, not just survive.",
  growth: "Keep showing up. We'll help you turn visibility into steady, predictable growth.",
};

// -- Scoring helpers --

export type Answers = Record<string, number> & { q1?: Stage | number };

export type Scores = {
  stage: Stage;
  capacity: number;
  money: number;
  growth: number;
};

export function computeScores(answers: Record<string, unknown>): Scores {
  const stage = (answers.q1 as Stage) ?? "stabilisation";
  let capacity = 0;
  let money = 0;
  let growth = 0;
  for (const q of SCORED_QUESTIONS) {
    const v = Number(answers[q.id] ?? 0);
    const pts = Number.isFinite(v) ? Math.max(0, Math.min(2, v)) : 0;
    if (q.area === "capacity") capacity += pts;
    else if (q.area === "money") money += pts;
    else growth += pts;
  }
  return { stage, capacity, money, growth };
}

export function areaPct(area: AreaKey, scores: Scores): number {
  const score = area === "capacity" ? scores.capacity : area === "money" ? scores.money : scores.growth;
  return Math.round((score / AREA_MAX[area]) * 100);
}

export function barColor(pct: number): string {
  if (pct <= 33) return "#E24B4A";
  if (pct <= 66) return "#F59E0B";
  return "#00C896";
}

export function strongestArea(scores: Scores): AreaKey {
  const areas: AreaKey[] = ["capacity", "money", "growth"];
  let best: AreaKey = "capacity";
  let bestPct = -1;
  for (const a of areas) {
    const p = areaPct(a, scores);
    if (p > bestPct) {
      bestPct = p;
      best = a;
    }
  }
  return best;
}

export function weakestArea(scores: Scores): AreaKey {
  const areas: AreaKey[] = ["capacity", "money", "growth"];
  let worst: AreaKey = "capacity";
  let worstPct = 101;
  for (const a of areas) {
    const p = areaPct(a, scores);
    if (p < worstPct) {
      worstPct = p;
      worst = a;
    }
  }
  return worst;
}

export function selectGapSentences(
  area: AreaKey,
  answers: Record<string, unknown>,
  isStrongest: boolean,
): string[] {
  if (isStrongest) return [STRONG_SENTENCE[area]];
  const qs = SCORED_QUESTIONS.filter((q) => q.area === area);
  const zeros = qs.filter((q) => Number(answers[q.id]) === 0).map((q) => GAP_SENTENCES[q.id]);
  if (zeros.length > 0) return zeros.slice(0, 2);
  const ones = qs.filter((q) => Number(answers[q.id]) === 1).map((q) => GAP_SENTENCES[q.id]);
  if (ones.length > 0) return ones.slice(0, 2);
  return [STRONG_SENTENCE[area]];
}

export function scoreBandLabel(pct: number, kind: "visibility" | "growth"): string {
  if (kind === "visibility") {
    if (pct <= 33) return "Low";
    if (pct <= 66) return "Building";
    return "High";
  }
  if (pct <= 33) return "Fragile";
  if (pct <= 66) return "Building";
  return "Great";
}

// -- Personalised session journey (used by the printable report) --

export type JourneyParagraphs = {
  s1: string;
  s2: string;
  s3: string;
  growthIsBiggestOpportunity: boolean;
  weakest: AreaKey;
};

export function personalisedJourney(
  scores: Scores,
  answers: Record<string, unknown>,
): JourneyParagraphs {
  const weakest = weakestArea(scores);
  const strongest = strongestArea(scores);
  const capacityPct = areaPct("capacity", scores);
  const moneyPct = areaPct("money", scores);
  const growthPct = areaPct("growth", scores);

  const capacityWeak = capacityPct <= 50;
  const moneyWeak = moneyPct <= 50;
  const growthWeak = growthPct <= 50;
  const growthStrong = strongest === "growth" && growthPct >= 67;

  const num = (k: string) => Number(answers[k] ?? -1);
  const pricingZero = num("q6") === 0;
  const separationZero = num("q9") === 0;
  const workflowZero = num("q3") === 0 || num("q5") === 0;
  const q2Zero = num("q2") === 0;
  const q4Zero = num("q4") === 0;
  const q11Zero = num("q11") === 0;
  const q10Zero = num("q10") === 0;

  // --- Session 1 ---
  const s1: string[] = [];
  s1.push(
    `Because your business is ${STAGE_LABEL[scores.stage].toLowerCase()} right now, Session 1 starts with the foundation you actually need — not a generic curriculum.`,
  );
  if (pricingZero || moneyWeak) {
    s1.push(
      pricingZero
        ? "Your Pricing Advisor gets built around your real costs, so we stop the leak first — every sale you make will actually move the business forward."
        : "We rebuild your numbers so every sale you make actually moves the business forward, not sideways.",
    );
  }
  if (workflowZero || capacityWeak) {
    s1.push(
      "Then your workflow map, so nothing else in the business runs on memory or guesswork.",
    );
  }
  if (separationZero) {
    s1.push(
      "We also separate your business money from your family money — a structure fix, not a discipline problem.",
    );
  }
  if (s1.length === 1) {
    s1.push(
      "You've got a solid base. Session 1 tightens strategy, pricing and workflow so Session 2 has a clean foundation to build on.",
    );
  }

  // --- Session 2 ---
  const s2: string[] = [];
  if (q2Zero) {
    s2.push(
      "Your business currently stops when you stop. Session 2 turns your Session 1 workflow into a real, working system — live, the same day — so the business can keep running when you can't.",
    );
  } else if (q4Zero) {
    s2.push(
      "You're losing WhatsApp sales because customers don't get answered in time. Session 2 builds your booking and lead-capture system so nothing gets missed again.",
    );
  } else if (capacityWeak) {
    s2.push(
      "Session 2 turns the Session 1 workflow into a real, working system — automated where it needs to be, hands-on where it doesn't.",
    );
  } else {
    s2.push(
      "Your operations are already holding. Session 2 sharpens what's working into a system that can carry more weight as you grow — instead of fixing something broken.",
    );
  }

  // --- Session 3 ---
  const s3: string[] = [];
  if (growthWeak) {
    s3.push(
      "This is your biggest opportunity. Session 3 builds your visual brand, a 30-day content calendar, and makes you findable to customers who don't already know you.",
    );
    if (q10Zero) {
      s3.push(
        "Right now someone searching for what you sell finds your competitor. That gets fixed here.",
      );
    } else if (q11Zero) {
      s3.push(
        "Your work is better than your business looks. Session 3 closes that gap so you can charge what you're actually worth.",
      );
    }
  } else if (growthStrong) {
    s3.push(
      "Your brand and visibility are already working. Session 3 sharpens and scales what's effective — content calendar, consistent visuals, and turning attention into steady, predictable growth — rather than fixing something broken.",
    );
  } else {
    s3.push(
      "Session 3 turns visibility into predictable growth — visual brand, a 30-day content calendar, and a system for being found by customers beyond your street.",
    );
  }

  return {
    s1: s1.join(" "),
    s2: s2.join(" "),
    s3: s3.join(" "),
    growthIsBiggestOpportunity: weakest === "growth",
    weakest,
  };
}

/** All question ids a complete Business Check must answer. */
export const REQUIRED_ANSWER_IDS: string[] = ["q1", ...SCORED_QUESTIONS.map((q) => q.id)];

/**
 * Single source of truth for what gets saved: scores and stage are always
 * computed from exactly these answers (the same set the visitor saw scored).
 */
export function buildSubmission(answers: Record<string, unknown>) {
  const missing = REQUIRED_ANSWER_IDS.filter(
    (id) => answers[id] === undefined || answers[id] === null || answers[id] === "",
  );
  const s = computeScores(answers);
  return {
    missing,
    stage: s.stage,
    capacity_score: s.capacity,
    customer_money_score: s.money,
    growth_score: s.growth,
    scores: s,
  };
}
