import React from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-50">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col bg-slate-950">
        <Topbar />
        <main className="flex-1 px-8 py-6 lg:px-10 xl:px-12">{children}</main>
      </div>
    </div>
  );
}
