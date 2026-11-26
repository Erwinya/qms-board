import { describe, expect, it } from "vitest";

import {
  getAttentionNcrs,
  getBoardSummary,
  getInspections,
  getNcrs,
} from "./board";

describe("board filters", () => {
  it("returns inspections matching any selected status", () => {
    const items = getInspections({
      statuses: ["PLANNED", "IN_PROGRESS"],
    });

    expect(items.map((item) => item.id)).toEqual(["2", "4"]);
  });

  it("filters inspections by result", () => {
    const items = getInspections({ results: ["FAIL"] });

    expect(items.map((item) => item.id)).toEqual(["1"]);
  });

  it("combines status and result filters", () => {
    const items = getInspections({
      statuses: ["COMPLETED"],
      results: ["PASS", "CONDITIONAL"],
    });

    expect(items.map((item) => item.id)).toEqual(["5", "3"]);
  });

  it("returns NCRs matching any selected status", () => {
    const items = getNcrs({ statuses: ["OPEN", "UNDER_REVIEW"] });

    expect(items.map((item) => item.id)).toEqual(["1", "3"]);
  });

  it("keeps attention and summary counts aligned with board filters", () => {
    expect(getAttentionNcrs().map((item) => item.id)).toEqual(["2", "1", "3"]);
    expect(getBoardSummary()).toMatchObject({
      activeInspections: 2,
      failed: 1,
      openNcrs: 2,
      contained: 1,
    });
  });
});
