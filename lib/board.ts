import type {
  Inspection,
  InspectionResult,
  InspectionStatus,
  Ncr,
  NcrStatus,
} from "./types";
import { inspections, ncrs } from "../data/sample";

function byUpdatedDesc<T extends { updatedAt: string }>(a: T, b: T) {
  return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
}

export type InspectionFilters = {
  statuses?: readonly InspectionStatus[];
  results?: readonly InspectionResult[];
};

export type NcrFilters = {
  statuses?: readonly NcrStatus[];
};

export function getInspections(filters: InspectionFilters = {}): Inspection[] {
  const items = [...inspections].sort(byUpdatedDesc);
  return items.filter(
    (item) =>
      (!filters.statuses?.length || filters.statuses.includes(item.status)) &&
      (!filters.results?.length || filters.results.includes(item.result))
  );
}

export function getNcrs(filters: NcrFilters = {}): Ncr[] {
  const items = [...ncrs].sort(byUpdatedDesc);
  return items.filter(
    (item) => !filters.statuses?.length || filters.statuses.includes(item.status)
  );
}

export function getRecentInspections(limit = 4): Inspection[] {
  return getInspections().slice(0, limit);
}

/** NCRs that still need attention (not closed/cancelled). */
export function getAttentionNcrs(): Ncr[] {
  return getNcrs({ statuses: ["OPEN", "UNDER_REVIEW", "CONTAINED"] });
}

export function getBoardSummary() {
  const openNcrs = getNcrs({ statuses: ["OPEN", "UNDER_REVIEW"] }).length;
  const contained = getNcrs({ statuses: ["CONTAINED"] }).length;
  const activeInspections = getInspections({
    statuses: ["PLANNED", "IN_PROGRESS"],
  }).length;
  const failed = getInspections({ results: ["FAIL"] }).length;
  return {
    openNcrs,
    contained,
    activeInspections,
    failed,
    inspectionCount: inspections.length,
    ncrCount: ncrs.length,
  };
}
