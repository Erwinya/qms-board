import type {
  InspectionResult,
  InspectionStatus,
  NcrStatus,
} from "./types";

export type QueryValue = string | string[] | undefined;

const INSPECTION_STATUSES: readonly InspectionStatus[] = [
  "PLANNED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
];
const INSPECTION_RESULTS: readonly Exclude<InspectionResult, null>[] = [
  "PASS",
  "FAIL",
  "CONDITIONAL",
];
const NCR_STATUSES: readonly NcrStatus[] = [
  "OPEN",
  "UNDER_REVIEW",
  "CONTAINED",
  "CLOSED",
  "CANCELLED",
];

function validValues<T extends string>(
  value: QueryValue,
  allowed: readonly T[]
): T[] {
  const values = Array.isArray(value) ? value : value ? [value] : [];
  return [...new Set(values.filter((item): item is T => allowed.includes(item as T)))];
}

export function parseInspectionFilters(searchParams: {
  status?: QueryValue;
  result?: QueryValue;
}) {
  return {
    statuses: validValues(searchParams.status, INSPECTION_STATUSES),
    results: validValues(searchParams.result, INSPECTION_RESULTS),
  };
}

export function parseNcrFilters(searchParams: { status?: QueryValue }) {
  return {
    statuses: validValues(searchParams.status, NCR_STATUSES),
  };
}

export function buildFilterHref(
  basePath: string,
  filters: Record<string, readonly string[] | undefined>
) {
  const query = new URLSearchParams();
  for (const [name, values] of Object.entries(filters)) {
    values?.forEach((value) => query.append(name, value));
  }
  const suffix = query.toString();
  return suffix ? `${basePath}?${suffix}` : basePath;
}
