import React from "react";

export function Topbar() {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-end border-b border-slate-800 bg-slate-950/80 px-5 text-sm backdrop-blur">
      <div className="flex items-center gap-4 text-xs text-slate-400">
        <span className="hidden md:inline">Environment: Local</span>
        <div className="h-7 w-7 rounded-full bg-slate-800" />
      </div>
    </header>
  );
}
