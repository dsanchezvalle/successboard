/**
 * MobileCollapsibleFilters - Collapsible search & filters for mobile
 *
 * A mobile-only collapsible container for search and filter controls.
 * Collapsed by default to maximize content visibility.
 *
 * @accessibility
 * - aria-expanded for collapse state
 * - aria-controls linking header to content
 * - Keyboard accessible toggle
 */

"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/design-system/utils/cn";

export interface MobileCollapsibleFiltersProps {
  /** Filter content to render when expanded */
  children: React.ReactNode;
  /** Whether any filters are currently active */
  hasActiveFilters?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export function MobileCollapsibleFilters({
  children,
  hasActiveFilters = false,
  className,
}: MobileCollapsibleFiltersProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const contentId = React.useId();

  return (
    <div
      className={cn(
        "rounded-xl border border-border-default bg-bg-surface shadow-sm",
        className
      )}
    >
      {/* Collapsible Header */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls={contentId}
        className={cn(
          "flex w-full items-center justify-between px-4 py-3",
          "text-left text-sm font-medium text-text-primary",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-border-focus",
          "transition-colors hover:bg-bg-subtle rounded-xl",
          isExpanded && "rounded-b-none border-b border-border-default"
        )}
      >
        <div className="flex items-center gap-2">
          <span>Search &amp; Filters</span>
          {hasActiveFilters && (
            <span className="inline-flex h-2 w-2 rounded-full bg-brand-primary" />
          )}
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-text-muted transition-transform duration-200",
            isExpanded && "rotate-180"
          )}
        />
      </button>

      {/* Collapsible Content */}
      <div
        id={contentId}
        className={cn(
          "grid transition-all duration-200 ease-in-out",
          isExpanded
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

MobileCollapsibleFilters.displayName = "MobileCollapsibleFilters";
