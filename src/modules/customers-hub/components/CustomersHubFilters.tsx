/**
 * CustomersHubFilters - Search and filter controls
 *
 * Provides search and filtering capabilities for the Customers Hub.
 * Uses Design System tokens for styling.
 *
 * @accessibility
 * - Proper labels for all form controls
 * - Focus-visible styles
 */

"use client";

import * as React from "react";
import { cn } from "@/design-system/utils/cn";
import type { CustomersHubFilterState } from "../types";

export interface CustomersHubFiltersProps {
  /** Current filter state */
  value: CustomersHubFilterState;
  /** Callback when filters change */
  onChange: (filters: CustomersHubFilterState) => void;
  /** Additional CSS classes */
  className?: string;
}

export function CustomersHubFilters({
  value,
  onChange,
  className,
}: CustomersHubFiltersProps) {
  const update = <K extends keyof CustomersHubFilterState>(
    key: K,
    newValue: CustomersHubFilterState[K]
  ) => {
    onChange({ ...value, [key]: newValue });
  };

  const inputStyles = cn(
    "block w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100",
    "placeholder:text-gray-500",
    "focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
    "transition-colors"
  );

  const labelStyles = "block text-xs font-medium text-gray-400 mb-1";

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-xl border border-gray-800 bg-gray-900/60 p-4 sm:flex-row sm:items-end",
        className
      )}
    >
      {/* Search */}
      <div className="flex-1">
        <label htmlFor="customers-search" className={labelStyles}>
          Search
        </label>
        <div className="relative">
          <input
            id="customers-search"
            type="search"
            placeholder="Search by name, email, city..."
            value={value.searchQuery}
            onChange={(e) => update("searchQuery", e.target.value)}
            className={inputStyles}
          />
          <svg
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Health Range */}
      <div className="sm:w-40">
        <label htmlFor="customers-health" className={labelStyles}>
          Health Score
        </label>
        <select
          id="customers-health"
          value={value.healthRange}
          onChange={(e) =>
            update(
              "healthRange",
              e.target.value as CustomersHubFilterState["healthRange"]
            )
          }
          className={inputStyles}
        >
          <option value="all">All scores</option>
          <option value="healthy">Healthy (70+)</option>
          <option value="moderate">Moderate (40-69)</option>
          <option value="at-risk">At-Risk (&lt;40)</option>
        </select>
      </div>

      {/* MRR Range */}
      <div className="sm:w-40">
        <label htmlFor="customers-mrr" className={labelStyles}>
          MRR Range
        </label>
        <select
          id="customers-mrr"
          value={value.mrrRange}
          onChange={(e) =>
            update(
              "mrrRange",
              e.target.value as CustomersHubFilterState["mrrRange"]
            )
          }
          className={inputStyles}
        >
          <option value="all">All MRR</option>
          <option value="low">&lt; $1,000</option>
          <option value="medium">$1,000 - $2,499</option>
          <option value="high">$2,500 - $3,999</option>
          <option value="enterprise">$4,000+</option>
        </select>
      </div>

      {/* Clear Filters */}
      {(value.searchQuery ||
        value.healthRange !== "all" ||
        value.mrrRange !== "all") && (
        <button
          type="button"
          onClick={() =>
            onChange({
              ...value,
              searchQuery: "",
              healthRange: "all",
              mrrRange: "all",
            })
          }
          className={cn(
            "rounded-lg px-3 py-2 text-sm font-medium text-gray-400",
            "hover:bg-gray-800 hover:text-gray-200",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500",
            "transition-colors"
          )}
        >
          Clear
        </button>
      )}
    </div>
  );
}

CustomersHubFilters.displayName = "CustomersHubFilters";
