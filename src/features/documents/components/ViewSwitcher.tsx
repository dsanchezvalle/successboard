"use client";

import { LayoutGrid, List } from "lucide-react";

export type ViewMode = "table" | "cards";

interface ViewSwitcherProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export function ViewSwitcher({
  viewMode,
  onViewModeChange,
}: ViewSwitcherProps) {
  return (
    <div className="flex items-center rounded-lg border border-border-default bg-bg-surface p-0.5">
      <button
        onClick={() => onViewModeChange("table")}
        className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
          viewMode === "table"
            ? "bg-bg-subtle text-text-primary"
            : "text-text-muted hover:text-text-secondary"
        }`}
        aria-label="Table view"
        aria-pressed={viewMode === "table"}
      >
        <List className="h-4 w-4" />
      </button>
      <button
        onClick={() => onViewModeChange("cards")}
        className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
          viewMode === "cards"
            ? "bg-bg-subtle text-text-primary"
            : "text-text-muted hover:text-text-secondary"
        }`}
        aria-label="Card view"
        aria-pressed={viewMode === "cards"}
      >
        <LayoutGrid className="h-4 w-4" />
      </button>
    </div>
  );
}
