import type { Inspection, Ncr } from "./types";
import { inspections, ncrs } from "../data/sample";

export function getInspections(): Inspection[] {
  return inspections;
}

export function getNcrs(): Ncr[] {
  return ncrs;
}

export function getBoardSummary() {
  const openNcrs = ncrs.filter((n) => n.status === "OPEN" || n.status === "UNDER_REVIEW").length;
  const contained = ncrs.filter((n) => n.status === "CONTAINED").length;
  const activeInspections = inspections.filter(
    (i) => i.status === "PLANNED" || i.status === "IN_PROGRESS"
  ).length;
  const failed = inspections.filter((i) => i.result === "FAIL").length;
  return { openNcrs, contained, activeInspections, failed, inspectionCount: inspections.length, ncrCount: ncrs.length };
}
