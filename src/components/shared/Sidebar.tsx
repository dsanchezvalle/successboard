"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/design-system/utils/cn";

import { Activity, Building2, Files } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { label: "Pulse", href: "/", icon: Activity },
  { label: "Accounts", href: "/customers", icon: Building2 },
  { label: "Documents", href: "/documents", icon: Files },
];

/**
 * Sidebar - Main navigation sidebar
 *
 * Responsive behavior:
 * - Desktop (>= lg): Expanded rail with icon + label
 * - Tablet (md to < lg): Collapsed rail with icon + small label below
 * - Mobile (< md): Hidden (bottom nav used instead)
 *
 * Uses semantic <aside> and <nav> elements with proper ARIA labeling.
 * Uses design system semantic tokens for theming.
 */
export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Tablet sidebar (md to < lg): Collapsed with icon + label below */}
      <aside
        className="hidden md:flex lg:hidden w-20 shrink-0 flex-col border-r border-border-default bg-bg-surface/80 px-2 py-4"
        aria-label="Main navigation"
      >
        {/* Logo placeholder */}
        <div className="mb-6 flex items-center justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-lg font-bold text-white shadow-md">
            SB
          </div>
        </div>

        <nav aria-label="Primary">
          <ul className="space-y-2" role="list">
            {navItems.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    aria-label={item.label}
                    className={cn(
                      "flex flex-col items-center gap-1 rounded-md px-3 py-2 transition-colors duration-150",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
                      active
                        ? "bg-bg-subtle text-indigo-400"
                        : "text-text-secondary hover:bg-bg-subtle hover:text-text-primary"
                    )}
                  >
                    <div className="flex h-8 w-8 items-center justify-center">
                      <Icon className="h-6 w-6 shrink-0" />
                    </div>
                    <span
                      className={cn(
                        "text-[10px] leading-tight text-center",
                        active ? "font-medium" : "font-normal"
                      )}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Desktop sidebar (>= lg): Expanded with icon + label side by side */}
      <aside
        className="hidden lg:flex w-52 shrink-0 flex-col border-r border-border-default bg-bg-surface/80 px-3 py-4 text-sm"
        aria-label="Main navigation"
      >
        {/* Logo placeholder */}
        <div className="mb-8 flex items-center justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-lg font-bold text-white shadow-md">
            SB
          </div>
        </div>

        <nav aria-label="Primary">
          <ul className="space-y-1" role="list">
            {navItems.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-2 transition-colors duration-150",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
                      active
                        ? "bg-bg-subtle text-indigo-400 font-medium"
                        : "text-text-secondary hover:bg-bg-subtle hover:text-text-primary"
                    )}
                  >
                    <div className="flex h-6 w-6 items-center justify-center">
                      <Icon className="h-5 w-5 shrink-0" />
                    </div>
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}

/**
 * MobileBottomNav - Bottom navigation bar for mobile devices
 *
 * Visible only on mobile (< md). Fixed to bottom of viewport.
 * Icon + label layout with clear active states.
 */
export function MobileBottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 flex md:hidden border-t border-border-default bg-bg-surface/95 backdrop-blur-sm safe-area-pb"
      aria-label="Mobile navigation"
    >
      <ul className="flex w-full justify-around" role="list">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center gap-1 py-4 px-3 transition-colors duration-150",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-border-focus",
                  active ? "text-indigo-400" : "text-text-secondary"
                )}
              >
                <div className="flex h-7 w-7 items-center justify-center">
                  <Icon
                    className={cn(
                      "h-6 w-6 shrink-0",
                      active && "text-indigo-400"
                    )}
                  />
                </div>
                <span
                  className={cn(
                    "text-[11px] leading-tight",
                    active ? "font-medium" : "font-normal"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
