import Link from "next/link";
import { getInspections } from "@/lib/board";
import { ResultBadge, StatusBadge } from "@/lib/badges";
import { DataTable, formatTime } from "@/lib/DataTable";
import { FilterChips } from "@/lib/FilterChips";
import { parseInspectionFilters, type QueryValue } from "@/lib/filters";

export const metadata = {
  title: "Inspections | QMS Board",
};

const STATUS_OPTIONS: Array<{ label: string; value: string | null }> = [
  { label: "All", value: null },
  { label: "PLANNED", value: "PLANNED" },
  { label: "IN_PROGRESS", value: "IN_PROGRESS" },
  { label: "COMPLETED", value: "COMPLETED" },
  { label: "CANCELLED", value: "CANCELLED" },
];

export default async function InspectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: QueryValue; result?: QueryValue }>;
}) {
  const filters = parseInspectionFilters(await searchParams);
  const inspections = getInspections(filters);
  const activeStatus =
    filters.statuses.length === 1 ? filters.statuses[0] : null;
  const hasFilters = filters.statuses.length > 0 || filters.results.length > 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-white">Inspections</h1>
        <p className="mt-2 text-slate-400">
          Planned-to-completed quality checks with optional NCR linkage.
        </p>
      </div>
      <FilterChips basePath="/inspections" options={STATUS_OPTIONS} active={activeStatus} />
      <DataTable
        columns={["Title", "Lot", "Part", "Inspector", "Status", "Result", "Related NCR", "Updated"]}
        emptyMessage={
          hasFilters
            ? "No inspections match the selected filters."
            : "No inspections are available."
        }
        rows={inspections.map((item) => [
          item.title,
          <span key={`${item.id}-lot`} className="mono">{item.lotNumber}</span>,
          <span key={`${item.id}-part`} className="mono">{item.partNumber}</span>,
          item.inspector,
          <StatusBadge key={`${item.id}-status`} value={item.status} />,
          <ResultBadge key={`${item.id}-result`} value={item.result} />,
          item.relatedNcrNumber ? (
            <Link
              key={`${item.id}-ncr`}
              href="/ncrs"
              className="mono text-teal-300 hover:text-teal-200"
            >
              {item.relatedNcrNumber}
            </Link>
          ) : (
            "—"
          ),
          <span key={`${item.id}-time`} className="text-slate-400">{formatTime(item.updatedAt)}</span>,
        ])}
      />
    </div>
  );
}
