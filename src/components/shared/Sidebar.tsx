import React from "react";
import Link from "next/link";

const navItems = [
  { label: "Overview", href: "/" },
  { label: "Customers", href: "/customers" },
  { label: "Segmentation", href: "/segmentation" },
];

/**
 * Sidebar - Main navigation sidebar
 *
 * Uses semantic <aside> and <nav> elements with proper ARIA labeling.
 * Hidden on mobile, visible on md+ breakpoints.
 */
export function Sidebar() {
  return (
    <aside
      className="hidden w-64 shrink-0 border-r border-gray-800 bg-gray-950/80 px-4 py-6 text-sm md:block"
      aria-label="Main navigation"
    >
      <div className="mb-8 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
        SuccessBoard
      </div>
      <nav aria-label="Primary">
        <ul className="space-y-1" role="list">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center rounded-md px-2 py-1.5 text-gray-300 transition-colors duration-150 hover:bg-gray-800/70 hover:text-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
