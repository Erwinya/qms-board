import type { Inspection, InspectionStatus, Ncr, NcrStatus } from "./types";
import { inspections, ncrs } from "../data/sample";

function byUpdatedDesc<T extends { updatedAt: string }>(a: T, b: T) {
  return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
}

export function getInspections(status?: InspectionStatus): Inspection[] {
  const items = [...inspections].sort(byUpdatedDesc);
  if (!status) return items;
  return items.filter((item) => item.status === status);
}

export function getNcrs(status?: NcrStatus): Ncr[] {
  const items = [...ncrs].sort(byUpdatedDesc);
  if (!status) return items;
  return items.filter((item) => item.status === status);
}

export function getRecentInspections(limit = 4): Inspection[] {
  return getInspections().slice(0, limit);
}

/** NCRs that still need attention (not closed/cancelled). */
export function getAttentionNcrs(): Ncr[] {
  return getNcrs().filter((n) => n.status !== "CLOSED" && n.status !== "CANCELLED");
}

export function getBoardSummary() {
  const openNcrs = ncrs.filter((n) => n.status === "OPEN" || n.status === "UNDER_REVIEW").length;
  const contained = ncrs.filter((n) => n.status === "CONTAINED").length;
  const activeInspections = inspections.filter(
    (i) => i.status === "PLANNED" || i.status === "IN_PROGRESS"
  ).length;
  const failed = inspections.filter((i) => i.result === "FAIL").length;
  return {
    openNcrs,
    contained,
    activeInspections,
    failed,
    inspectionCount: inspections.length,
    ncrCount: ncrs.length,
  };
}
