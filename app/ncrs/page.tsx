import { getNcrs } from "@/lib/board";
import { SeverityBadge, StatusBadge } from "@/lib/badges";
import { DataTable, formatTime } from "@/lib/DataTable";
import { FilterChips } from "@/lib/FilterChips";
import type { NcrStatus } from "@/lib/types";

export const metadata = {
  title: "NCRs | QMS Board",
};

const STATUS_OPTIONS: Array<{ label: string; value: string | null }> = [
  { label: "All", value: null },
  { label: "OPEN", value: "OPEN" },
  { label: "UNDER_REVIEW", value: "UNDER_REVIEW" },
  { label: "CONTAINED", value: "CONTAINED" },
  { label: "CLOSED", value: "CLOSED" },
  { label: "CANCELLED", value: "CANCELLED" },
];

function isNcrStatus(value: string | undefined): value is NcrStatus {
  return (
    value === "OPEN" ||
    value === "UNDER_REVIEW" ||
    value === "CONTAINED" ||
    value === "CLOSED" ||
    value === "CANCELLED"
  );
}

export default async function NcrsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status: rawStatus } = await searchParams;
  const status = isNcrStatus(rawStatus) ? rawStatus : undefined;
  const ncrs = getNcrs(status);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-white">Nonconformance reports</h1>
        <p className="mt-2 text-slate-400">
          Severity, status, and containment context for open quality events.
        </p>
      </div>
      <FilterChips basePath="/ncrs" options={STATUS_OPTIONS} active={status ?? null} />
      <DataTable
        columns={["NCR", "Title", "Lot", "Severity", "Status", "Containment", "Updated"]}
        emptyMessage={status ? `No NCRs with status ${status}.` : "No nonconformance reports are available."}
        rows={ncrs.map((item) => [
          <span key={`${item.id}-num`} className="mono">{item.ncrNumber}</span>,
          item.title,
          <span key={`${item.id}-lot`} className="mono">{item.lotNumber}</span>,
          <SeverityBadge key={`${item.id}-sev`} value={item.severity} />,
          <StatusBadge key={`${item.id}-status`} value={item.status} />,
          item.containmentAction ?? "—",
          <span key={`${item.id}-time`} className="text-slate-400">{formatTime(item.updatedAt)}</span>,
        ])}
      />
    </div>
  );
}
