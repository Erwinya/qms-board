import { NavLinks } from "@/lib/NavLinks";

export function SiteHeader() {
  return (
    <header className="border-b border-slate-800/80 bg-[#0d1218]/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-400">
            QMS Board
          </p>
          <p className="mt-1 text-sm text-slate-400">
            Inspection &amp; NCR overview
          </p>
        </div>
        <NavLinks />
      </div>
    </header>
  );
}
