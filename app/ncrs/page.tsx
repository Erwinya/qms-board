import { getNcrs } from "@/lib/board";
import { SeverityBadge, StatusBadge } from "@/lib/badges";
import { DataTable, formatTime } from "@/lib/DataTable";

export const metadata = {
  title: "NCRs | QMS Board",
};

export default function NcrsPage() {
  const ncrs = getNcrs();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-white">Nonconformance reports</h1>
        <p className="mt-2 text-slate-400">
          Severity, status, and containment context for open quality events.
        </p>
      </div>
      <DataTable
        columns={["NCR", "Title", "Lot", "Severity", "Status", "Containment", "Updated"]}
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
