/**
 * CustomersHubClient - Client-side Customers Hub container
 *
 * Manages tab state, filtering, and renders the appropriate view.
 * This is the main client component for the Customers Hub.
 */

"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/design-system/utils/cn";
import type {
  EnrichedCustomer,
  CustomerSegment,
  CustomersHubFilterState,
  SegmentationSummary,
} from "../types";
import {
  filterBySegment,
  filterBySearch,
  filterByHealthRange,
  filterByMrrRange,
} from "../utils/derive-customer-segments";
import { CustomersHubHeader } from "./CustomersHubHeader";
import { CustomersHubTabs } from "./CustomersHubTabs";
import { CustomersHubFilters } from "./CustomersHubFilters";
import { CustomersHubTable } from "./CustomersHubTable";
import { SegmentSummaryCards } from "./SegmentSummaryCards";

export interface CustomersHubClientProps {
  /** Enriched customers data */
  customers: EnrichedCustomer[];
  /** Segmentation summary */
  summary: SegmentationSummary;
  /** Initial segment from URL */
  initialSegment?: CustomerSegment;
  /** Additional CSS classes */
  className?: string;
}

const DEFAULT_FILTERS: CustomersHubFilterState = {
  searchQuery: "",
  segment: "all",
  healthRange: "all",
  mrrRange: "all",
};

export function CustomersHubClient({
  customers,
  summary,
  initialSegment = "all",
  className,
}: CustomersHubClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize segment from URL or prop
  const urlSegment = searchParams.get("segment") as CustomerSegment | null;
  const [filters, setFilters] = React.useState<CustomersHubFilterState>({
    ...DEFAULT_FILTERS,
    segment: urlSegment || initialSegment,
  });

  // Update URL when segment changes
  const handleSegmentChange = (segment: CustomerSegment) => {
    setFilters((prev) => ({ ...prev, segment }));

    // Update URL without full navigation
    const params = new URLSearchParams(searchParams.toString());
    if (segment === "all") {
      params.delete("segment");
    } else {
      params.set("segment", segment);
    }
    const newUrl = params.toString()
      ? `?${params.toString()}`
      : window.location.pathname;
    router.replace(newUrl, { scroll: false });
  };

  // Apply all filters
  const filteredCustomers = React.useMemo(() => {
    let result = customers;

    // Filter by segment
    result = filterBySegment(result, filters.segment);

    // Filter by search
    result = filterBySearch(result, filters.searchQuery);

    // Filter by health range
    result = filterByHealthRange(result, filters.healthRange);

    // Filter by MRR range
    result = filterByMrrRange(result, filters.mrrRange);

    return result;
  }, [customers, filters]);

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header with summary metrics */}
      <CustomersHubHeader summary={summary} />

      {/* Segment Tabs */}
      <CustomersHubTabs
        value={filters.segment}
        onChange={handleSegmentChange}
        summary={summary}
      />

      {/* Tab Panel */}
      <div
        role="tabpanel"
        id={`tabpanel-${filters.segment}`}
        aria-labelledby={`tab-${filters.segment}`}
        className="space-y-4"
      >
        {/* Segment Summary Cards (shown for "all" segment) */}
        {filters.segment === "all" && (
          <SegmentSummaryCards
            summary={summary}
            onSegmentClick={handleSegmentChange}
          />
        )}

        {/* Filters */}
        <CustomersHubFilters value={filters} onChange={setFilters} />

        {/* Results count */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>
            Showing{" "}
            <span className="font-medium text-gray-300">
              {filteredCustomers.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-gray-300">
              {customers.length}
            </span>{" "}
            customers
          </span>
        </div>

        {/* Table */}
        <CustomersHubTable customers={filteredCustomers} />
      </div>
    </div>
  );
}

CustomersHubClient.displayName = "CustomersHubClient";
