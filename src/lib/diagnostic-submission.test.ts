import { describe, it, expect } from "vitest";
import { buildSubmission, REQUIRED_ANSWER_IDS, SCORED_QUESTIONS } from "./diagnostic-data";

function fullAnswers(lastValue: number) {
  const a: Record<string, string | number> = { q1: "growth_ready" };
  for (const q of SCORED_QUESTIONS) a[q.id] = 0;
  a[SCORED_QUESTIONS[SCORED_QUESTIONS.length - 1].id] = lastValue;
  return a;
}

describe("Business Check submission", () => {
  it("includes the final answer in the saved scores", () => {
    const low = buildSubmission(fullAnswers(0));
    const high = buildSubmission(fullAnswers(2));
    expect(low.missing).toEqual([]);
    expect(high.missing).toEqual([]);
    const total = (b: typeof low) => b.capacity_score + b.customer_money_score + b.growth_score;
    expect(total(high)).toBeGreaterThan(total(low));
  });

  it("refuses an answer set missing the final question", () => {
    const a = fullAnswers(2);
    const lastId = SCORED_QUESTIONS[SCORED_QUESTIONS.length - 1].id;
    delete a[lastId];
    expect(buildSubmission(a).missing).toEqual([lastId]);
  });

  it("requires every question", () => {
    expect(buildSubmission({}).missing).toEqual(REQUIRED_ANSWER_IDS);
  });
});
