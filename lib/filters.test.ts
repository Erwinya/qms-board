import { describe, expect, it } from "vitest";

import {
  buildFilterHref,
  parseInspectionFilters,
  parseNcrFilters,
} from "./filters";

describe("query filters", () => {
  it("parses repeated inspection filters and ignores invalid values", () => {
    expect(
      parseInspectionFilters({
        status: ["PLANNED", "IN_PROGRESS", "UNKNOWN"],
        result: ["FAIL", "FAIL"],
      })
    ).toEqual({
      statuses: ["PLANNED", "IN_PROGRESS"],
      results: ["FAIL"],
    });
  });

  it("parses repeated NCR statuses", () => {
    expect(
      parseNcrFilters({ status: ["OPEN", "UNDER_REVIEW", "INVALID"] })
    ).toEqual({ statuses: ["OPEN", "UNDER_REVIEW"] });
  });

  it("builds repeated query parameters", () => {
    expect(
      buildFilterHref("/inspections", {
        status: ["PLANNED", "IN_PROGRESS"],
        result: ["FAIL"],
      })
    ).toBe(
      "/inspections?status=PLANNED&status=IN_PROGRESS&result=FAIL"
    );
  });
});
