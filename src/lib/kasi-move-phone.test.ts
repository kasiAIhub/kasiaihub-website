import { describe, expect, it } from "vitest";
import { normaliseSaWhatsApp } from "./kasi-move-phone";

describe("normaliseSaWhatsApp", () => {
  it("accepts local 0791234567", () => expect(normaliseSaWhatsApp("0791234567")).toBe("+27791234567"));
  it("accepts +27791234567", () => expect(normaliseSaWhatsApp("+27791234567")).toBe("+27791234567"));
  it("rejects short numbers", () => expect(normaliseSaWhatsApp("079123")).toBeNull());
});
