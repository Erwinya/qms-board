import type { InspectionResult, InspectionStatus, NcrSeverity, NcrStatus } from "@/lib/types";

const base =
  "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold tracking-wide";

export function StatusBadge({ value }: { value: InspectionStatus | NcrStatus }) {
  const map: Record<string, string> = {
    PLANNED: "bg-slate-700/60 text-slate-200",
    IN_PROGRESS: "bg-sky-900/50 text-sky-200",
    COMPLETED: "bg-emerald-900/40 text-emerald-200",
    CANCELLED: "bg-zinc-800 text-zinc-400",
    OPEN: "bg-amber-900/45 text-amber-200",
    UNDER_REVIEW: "bg-orange-900/45 text-orange-200",
    CONTAINED: "bg-teal-900/45 text-teal-200",
    CLOSED: "bg-emerald-900/40 text-emerald-200",
  };
  return <span className={`${base} ${map[value] ?? "bg-zinc-800 text-zinc-300"}`}>{value}</span>;
}

export function ResultBadge({ value }: { value: InspectionResult }) {
  if (!value) return <span className="text-sm text-slate-500">—</span>;
  const map: Record<string, string> = {
    PASS: "bg-emerald-900/40 text-emerald-200",
    FAIL: "bg-rose-900/45 text-rose-200",
    CONDITIONAL: "bg-amber-900/45 text-amber-200",
  };
  return <span className={`${base} ${map[value]}`}>{value}</span>;
}

export function SeverityBadge({ value }: { value: NcrSeverity }) {
  const map: Record<string, string> = {
    LOW: "bg-slate-700/60 text-slate-200",
    MEDIUM: "bg-amber-900/45 text-amber-200",
    HIGH: "bg-orange-900/50 text-orange-100",
    CRITICAL: "bg-rose-900/55 text-rose-100",
  };
  return <span className={`${base} ${map[value]}`}>{value}</span>;
}
