import { getNcrs } from "@/lib/board";
import { SeverityBadge, StatusBadge } from "@/lib/badges";
import { DataTable, formatTime } from "@/lib/DataTable";
import { FilterChips } from "@/lib/FilterChips";
import { parseNcrFilters, type QueryValue } from "@/lib/filters";

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

export default async function NcrsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: QueryValue }>;
}) {
  const filters = parseNcrFilters(await searchParams);
  const ncrs = getNcrs(filters);
  const activeStatus =
    filters.statuses.length === 1 ? filters.statuses[0] : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-white">Nonconformance reports</h1>
        <p className="mt-2 text-slate-400">
          Severity, status, and containment context for open quality events.
        </p>
      </div>
      <FilterChips basePath="/ncrs" options={STATUS_OPTIONS} active={activeStatus} />
      <DataTable
        columns={["NCR", "Title", "Lot", "Severity", "Status", "Containment", "Updated"]}
        emptyMessage={
          filters.statuses.length
            ? "No NCRs match the selected filters."
            : "No nonconformance reports are available."
        }
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
