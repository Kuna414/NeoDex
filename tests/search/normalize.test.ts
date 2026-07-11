import { describe, expect, it } from "vitest";
import {
  normalizeDexQuery,
  normalizeSearchText,
} from "../../core/search/normalize";

describe("normalizeSearchText", () => {
  it("normalizes case, accents and punctuation", () => {
    expect(normalizeSearchText("  Flabébé!  ")).toBe("flabebe");
  });

  it("normalizes German sharp s", () => {
    expect(normalizeSearchText("Fuß")).toBe("fuss");
  });

  it("keeps Pokémon gender symbols", () => {
    expect(normalizeSearchText("Nidoran♀")).toBe("nidoran♀");
  });
});

describe("normalizeDexQuery", () => {
  it("removes leading zeroes from numeric searches", () => {
    expect(normalizeDexQuery("00025")).toBe("25");
  });
});
