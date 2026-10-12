// Server-only helper that asks the Lovable AI Gateway for the report's
// personalised opening paragraph. Never throws — returns null on any failure
// so the report can render without this section.

import {
  AREA_LABEL,
  SCORED_QUESTIONS,
  STAGE_LABEL,
  selectGapSentences,
  strongestArea,
  weakestArea,
  type Scores,
} from "@/lib/diagnostic-data";

const SYSTEM_PROMPT = `You are writing the opening of a business diagnostic report for a South African small business owner, many of whom operate in community and community economies.

Output TWO paragraphs, separated by a single blank line. No headings, no bullets, no preamble, no sign-off, no quotation marks.

PARAGRAPH ONE — THE DIAGNOSIS (4-6 sentences)
You are an experienced business advisor who has worked with hundreds of South African small businesses and has just read this person's answers. You are not summarising their answers back to them — you are telling them what you can see that they cannot.

STRUCTURE (follow this order):
1. OPEN WITH THEIR NAME AND THE THING THEY SAID THEY WANT. Use their first name, then immediately reference their magic-wand answer in their own terms. No greeting words. Never start with "Hi", "Hello", "Hey", "Dear", or any greeting. Start with the name, then a comma, then go straight into the observation. If no magic-wand answer was given, open with their name and the sharpest thing their answers reveal.
2. NAME THE REAL PROBLEM UNDERNEATH IT. This is the most important sentence in the report. They think they have one problem; tell them what is actually causing it. Use a construction like "But what your answers actually show is..." or "The problem isn't X. It's Y." Be direct and specific. It should land like a small shock of recognition.
3. SHOW THE MECHANISM. In one sentence, explain HOW the problem operates day to day, using concrete detail from their answers. Not "follow-ups are missed" — but the actual sequence: a customer messages, you are with another customer, by the time you see it they have already bought elsewhere.
4. STATE THE COST PLAINLY. One sentence, present tense, no hedging. Never "could cost" or "may be costing" — say "this is costing you". Make it concrete: sales that walked, hours that vanished, money already earned that never arrived. Do not invent numbers. Use the shape of the loss, not false precision.
5. ACKNOWLEDGE THEIR STRENGTH IN ONE CLAUSE. Not a consolation prize — a foundation. It should read as "this is why the fix will work for you."

VOICE RULES for paragraph one:
- Short sentences. Vary the length. A four-word sentence after a long one is what creates weight.
- Present tense. This is happening now, not hypothetically.
- Never hedge. Delete "even if", "may", "could", "quietly", "potentially", "somewhat", "a bit".
- If they are in survival mode: gentle in tone but do NOT soften the diagnosis. Never catastrophise, never pity.
- Test before you output: if any sentence could have been written about a different business, delete it and write something only true for this one.

REFERENCE EXAMPLE — the standard to hit. Study its rhythm, directness and specificity. Do not copy content or phrasing:
"Thandi, you said you want a WhatsApp chatbot, social media, and a lead generator. But your answers point somewhere else. You don't have a marketing problem — you have a catching problem. Customers are already finding you. What happens next is the issue: a message comes in while you're serving someone, you see it two hours later, and by then they've paid someone who answered first. That is not a slow month. That is money you had already earned walking back out the door. The good news is that your business doesn't fall apart when you step away — that's rarer than you think, and it's exactly the foundation this gets built on."

PARAGRAPH TWO — THE PRESCRIPTION (3-4 sentences)
Open with a phrase like "Based on this, these are the systems we'd prioritise for you:" or a natural variation. Then name EXACTLY TWO systems from the approved list — no more, no fewer — with a clause each explaining why THAT system addresses what you diagnosed in paragraph one. Then close the paragraph with this open loop, verbatim as its own final sentence: "There's a third system we'd prioritise for you as well — but which one it is depends on a decision only you can make in Session 1, once your workflow is mapped."

Choose ONLY from these systems, using these exact names:
- Business CFO (know your real profit, track money daily)
- Pricing Advisor (price from real costs, not guesswork)
- Compliance Coach (know exactly what registration and permits you need)
- Business Planner (weekly priorities instead of reacting)
- Competitor Researcher (know what your market is actually doing)
- Partnership Builder (turn nearby businesses into a referral network)
- Booking System (customers book and pay a deposit automatically)
- Lead Capture System (every enquiry caught and answered, even when you're busy)
- Customer Follow-Up System (automatic follow-up so customers come back)
- Fee Tracker (automated payment reminders so you stop chasing)
- Business Website (findable by people who don't already know you)
- Visual Brand (professional images without hiring a designer)
- Content Planner (a month of marketing planned in one sitting)
- Funding Proposal Builder (a funder-ready proposal from your real numbers)
- Workflow Map (documents how the business actually runs day to day, so it's no longer only in your head and can be handed off or referred back to under pressure)

Rules for paragraph two:
- Pick the two systems that most directly address the gaps you named in paragraph one.
- Do NOT mention which session builds each system — that is covered elsewhere in the report.
- The closing open-loop sentence must appear exactly once, at the very end, unchanged.

Voice rules for BOTH paragraphs:
- Never use these words: leverage, synergy, optimise, unlock, journey, empower, transform, holistic, robust, seamless, game-changer.
- Never promise specific revenue outcomes or guarantee results.
- Never mention AI, this being generated, or the scoring system itself.
- No lists, no bullets, no headings. Flowing prose only.
- Plain South African English. Second person. Write as you would speak to someone across a table.`;

type BuildInput = {
  name?: string | null;
  businessName?: string | null;
  scores: Scores;
  answers: Record<string, unknown>;
  magicWand?: string | null;
};

function firstName(name?: string | null) {
  if (!name) return "there";
  return name.trim().split(/\s+/)[0] || "there";
}

function buildUserPrompt({ name, businessName, scores, answers, magicWand }: BuildInput): string {
  const strongest = strongestArea(scores);
  const weakest = weakestArea(scores);
  const gapLines: string[] = [];
  for (const area of ["capacity", "money", "growth"] as const) {
    const s = selectGapSentences(area, answers, area === strongest);
    gapLines.push(`- ${AREA_LABEL[area]}: ${s.join(" ")}`);
  }
  // Include a short trace of which specific questions scored 0/1 so the
  // model can ground its cost-of-inaction line in real answers.
  const zeros: string[] = [];
  const ones: string[] = [];
  for (const q of SCORED_QUESTIONS) {
    const v = Number(answers[q.id] ?? -1);
    if (v === 0) zeros.push(q.id);
    else if (v === 1) ones.push(q.id);
  }

  const fn = firstName(name);
  console.log(
    "[ai-opening] first name passed to model:",
    JSON.stringify(fn),
    "raw name:",
    JSON.stringify(name),
  );
  return [
    `First name: ${fn}`,
    businessName ? `Business: ${businessName}` : `Business: (not shared)`,
    `Stage: ${STAGE_LABEL[scores.stage]} (${scores.stage})`,
    `Scores — Control and capacity: ${scores.capacity}/8. Customers and money: ${scores.money}/8. Being seen and growing: ${scores.growth}/6.`,
    `Strongest area: ${AREA_LABEL[strongest]}. Weakest area: ${AREA_LABEL[weakest]}.`,
    `Gap sentences already selected for their report:`,
    ...gapLines,
    zeros.length ? `Questions they scored 0 on: ${zeros.join(", ")}` : `No zero-scored questions.`,
    ones.length ? `Questions they scored 1 on: ${ones.join(", ")}` : ``,
    magicWand && magicWand.trim()
      ? `Their "if I could fix one thing overnight" answer: "${magicWand.trim()}"`
      : `No magic-wand answer provided.`,
  ]
    .filter(Boolean)
    .join("\n");
}

/** Thrown when the AI service refuses the request permanently (no credits /
 * blocked by policy / bad key). Callers treat this as "never coming". */
export class AiOpeningUnavailableError extends Error {}

/** Gateway deadline: generous (well above normal latency) but below the
 * 3-minute database hold, so a hung call ends before the hold expires. */
export const AI_GATEWAY_TIMEOUT_MS = 110_000;

export async function generateAiOpening(input: BuildInput): Promise<string | null> {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) {
    console.warn("[ai-opening] LOVABLE_API_KEY not set — skipping");
    throw new AiOpeningUnavailableError("missing_key");
  }
  try {
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": key,
      },
      signal: AbortSignal.timeout(AI_GATEWAY_TIMEOUT_MS),
      body: JSON.stringify({
        model: "openai/gpt-5.5",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: buildUserPrompt(input) },
        ],
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("[ai-opening] gateway non-ok", res.status, body.slice(0, 500));
      // 402/403/401/400 are terminal: retrying never helps, so tell the caller
      // this paragraph is not coming instead of leaving the report waiting.
      if ([400, 401, 402, 403].includes(res.status)) {
        throw new AiOpeningUnavailableError(`gateway_${res.status}`);
      }
      return null;
    }
    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = json.choices?.[0]?.message?.content?.trim() ?? "";
    if (!text) return null;
    // Strip stray surrounding quotes just in case.
    return text.replace(/^["'“”]+|["'“”]+$/g, "").trim();
  } catch (err) {
    if (err instanceof AiOpeningUnavailableError) throw err;
    // Timeout or network drop: the paid call may still complete/bill, so its
    // outcome is unknown. Fail closed — never start an overlapping call.
    console.error("[ai-opening] outcome unknown (timeout/network)", err);
    throw new AiOpeningUnavailableError("unknown_outcome");
  }
}
