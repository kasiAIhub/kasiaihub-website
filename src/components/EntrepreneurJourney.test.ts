import { describe, expect, it } from "vitest";
import { toggleJourneySession } from "./EntrepreneurJourney";

describe("independent journey session selection", () => {
  it("allows Session 2 without selecting Session 1", () => {
    expect(toggleJourneySession({ s1: false, s2: false, s3: false }, "s2"))
      .toEqual({ s1: false, s2: true, s3: false });
  });

  it("allows Session 3 without selecting Sessions 1 or 2", () => {
    expect(toggleJourneySession({ s1: false, s2: false, s3: false }, "s3"))
      .toEqual({ s1: false, s2: false, s3: true });
  });

  it("removing Session 1 does not remove independently selected sessions", () => {
    expect(toggleJourneySession({ s1: true, s2: true, s3: true }, "s1"))
      .toEqual({ s1: false, s2: true, s3: true });
  });
});