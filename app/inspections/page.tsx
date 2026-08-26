import { getInspections } from "@/lib/board";
import { ResultBadge, StatusBadge } from "@/lib/badges";
import { DataTable, formatTime } from "@/lib/DataTable";

export const metadata = {
  title: "Inspections | QMS Board",
};

export default function InspectionsPage() {
  const inspections = getInspections();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-white">Inspections</h1>
        <p className="mt-2 text-slate-400">
          Planned-to-completed quality checks with optional NCR linkage.
        </p>
      </div>
      <DataTable
        columns={["Title", "Lot", "Part", "Inspector", "Status", "Result", "Related NCR", "Updated"]}
        emptyMessage="No inspections are available."
        rows={inspections.map((item) => [
          item.title,
          <span key={`${item.id}-lot`} className="mono">{item.lotNumber}</span>,
          <span key={`${item.id}-part`} className="mono">{item.partNumber}</span>,
          item.inspector,
          <StatusBadge key={`${item.id}-status`} value={item.status} />,
          <ResultBadge key={`${item.id}-result`} value={item.result} />,
          item.relatedNcrNumber ? (
            <span key={`${item.id}-ncr`} className="mono text-teal-300">{item.relatedNcrNumber}</span>
          ) : (
            "—"
          ),
          <span key={`${item.id}-time`} className="text-slate-400">{formatTime(item.updatedAt)}</span>,
        ])}
      />
    </div>
  );
}
