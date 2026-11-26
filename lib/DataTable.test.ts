import { describe, expect, it } from "vitest";

import { formatTime } from "./DataTable";

describe("formatTime", () => {
  it("formats valid timestamps", () => {
    expect(formatTime("2026-11-10T08:15:00Z")).not.toBe(
      "2026-11-10T08:15:00Z"
    );
  });

  it("preserves invalid date values", () => {
    expect(formatTime("not-a-date")).toBe("not-a-date");
  });
});
