import React from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

interface AppShellProps {
  children: React.ReactNode;
}

/**
 * AppShell - Main application layout wrapper
 *
 * Provides the sidebar + topbar + main content structure.
 * Uses semantic HTML and design system color tokens for theming.
 */
export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-bg-page text-text-primary">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}
