import Link from "next/link";
import { getBoardSummary, getInspections, getNcrs } from "@/lib/board";
import { ResultBadge, SeverityBadge, StatusBadge } from "@/lib/badges";
import { DataTable, formatTime } from "@/lib/DataTable";

export default function HomePage() {
  const summary = getBoardSummary();
  const recentInspections = getInspections().slice(0, 4);
  const openNcrs = getNcrs().filter((n) => n.status !== "CLOSED" && n.status !== "CANCELLED");

  const cards = [
    { label: "Active inspections", value: summary.activeInspections, hint: "PLANNED + IN_PROGRESS" },
    { label: "Failed inspections", value: summary.failed, hint: "result = FAIL" },
    { label: "Open / review NCRs", value: summary.openNcrs, hint: "needs attention" },
    { label: "Contained NCRs", value: summary.contained, hint: "action recorded" },
  ];

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Quality operations board
        </h1>
        <p className="mt-3 max-w-2xl text-slate-400">
          Sample overview of inspections and nonconformance reports. Designed to sit alongside{" "}
          <span className="mono text-slate-300">qms-inspection-service</span> and{" "}
          <span className="mono text-slate-300">qms-ncr-service</span>.
        </p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <article
            key={card.label}
            className="rounded-xl border border-slate-800 bg-[#121820] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.22)]"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{card.label}</p>
            <p className="mt-2 text-3xl font-semibold text-teal-300">{card.value}</p>
            <p className="mt-1 text-xs text-slate-500">{card.hint}</p>
          </article>
        ))}
      </section>

      <section className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-lg font-semibold text-white">Recent inspections</h2>
          <Link href="/inspections" className="text-sm font-medium text-teal-400 hover:text-teal-300">
            View all
          </Link>
        </div>
        <DataTable
          columns={["Title", "Lot", "Status", "Result", "Updated"]}
          rows={recentInspections.map((item) => [
            item.title,
            <span key={`${item.id}-lot`} className="mono text-slate-300">{item.lotNumber}</span>,
            <StatusBadge key={`${item.id}-status`} value={item.status} />,
            <ResultBadge key={`${item.id}-result`} value={item.result} />,
            <span key={`${item.id}-time`} className="text-slate-400">{formatTime(item.updatedAt)}</span>,
          ])}
        />
      </section>

      <section className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-lg font-semibold text-white">Open NCR queue</h2>
          <Link href="/ncrs" className="text-sm font-medium text-teal-400 hover:text-teal-300">
            View all
          </Link>
        </div>
        <DataTable
          columns={["NCR", "Title", "Severity", "Status", "Lot"]}
          rows={openNcrs.map((item) => [
            <span key={`${item.id}-num`} className="mono text-slate-300">{item.ncrNumber}</span>,
            item.title,
            <SeverityBadge key={`${item.id}-sev`} value={item.severity} />,
            <StatusBadge key={`${item.id}-status`} value={item.status} />,
            <span key={`${item.id}-lot`} className="mono text-slate-300">{item.lotNumber}</span>,
          ])}
        />
      </section>
    </div>
  );
}
