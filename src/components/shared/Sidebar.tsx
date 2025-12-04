import React from "react";
import Link from "next/link";

const navItems = [
  { label: "Overview", href: "/" },
  { label: "Customers", href: "/customers" },
  { label: "Interactions", href: "/interactions" },
  { label: "Settings", href: "/settings" },
];

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-800 bg-slate-950/80 px-4 py-6 text-sm md:block">
      <div className="mb-8 px-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        SuccessBoard
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center rounded-md px-2 py-1.5 text-slate-300 transition hover:bg-slate-800/70 hover:text-slate-50"
          >
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
