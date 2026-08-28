"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Board" },
  { href: "/inspections", label: "Inspections" },
  { href: "/ncrs", label: "NCRs" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-1" aria-label="Primary">
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-md px-3 py-2 text-sm font-medium transition ${
              active
                ? "bg-slate-800 text-white"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
