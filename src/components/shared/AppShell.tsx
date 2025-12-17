import React from "react";
import { Sidebar, MobileBottomNav } from "./Sidebar";
import { Topbar } from "./Topbar";

interface AppShellProps {
  children: React.ReactNode;
}

/**
 * AppShell - Main application layout wrapper
 *
 * Provides the sidebar + topbar + main content structure.
 * Responsive behavior:
 * - Desktop (>= lg): Expanded sidebar
 * - Tablet (md to < lg): Collapsed sidebar
 * - Mobile (< md): Bottom navigation bar
 *
 * Uses semantic HTML and design system color tokens for theming.
 */
export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-bg-page text-text-primary">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar />
        {/* pb-16 on mobile to account for fixed bottom nav height */}
        <main className="flex-1 px-4 py-6 pb-20 md:pb-6 sm:px-6 lg:px-8 xl:px-10">
          {children}
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
