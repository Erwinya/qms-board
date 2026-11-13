import Link from "next/link";

export function FilterChips({
  basePath,
  options,
  active,
}: {
  basePath: string;
  options: Array<{ label: string; value: string | null }>;
  active?: string | null;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const href = option.value ? `${basePath}?status=${option.value}` : basePath;
        const isActive = (option.value ?? null) === (active ?? null);
        return (
          <Link
            key={option.label}
            href={href}
            className={`rounded-md border px-2.5 py-1 text-xs font-semibold tracking-wide transition ${
              isActive
                ? "border-teal-500/60 bg-teal-900/30 text-teal-200"
                : "border-slate-700 bg-slate-900/40 text-slate-400 hover:border-slate-500 hover:text-slate-200"
            }`}
          >
            {option.label}
          </Link>
        );
      })}
    </div>
  );
}
