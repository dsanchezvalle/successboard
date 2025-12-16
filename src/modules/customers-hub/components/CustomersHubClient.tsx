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
  CustomerHubListItem,
  CustomersSegmentationSummary,
  CustomerSegmentTab,
} from "@/modules/api";
import {
  filterCustomersBySegment,
  filterCustomersBySearch,
  filterCustomersByHealthRange,
  filterCustomersByMrrRange,
} from "@/modules/api";
import { CustomersHubHeader } from "./CustomersHubHeader";
import { CustomersHubTabs } from "./CustomersHubTabs";
import { CustomersHubFilters } from "./CustomersHubFilters";
import { CustomersHubTable } from "./CustomersHubTable";
import { SegmentSummaryCards } from "./SegmentSummaryCards";

/**
 * Filter state for the Customers Hub
 */
interface CustomersHubFilterState {
  searchQuery: string;
  segment: CustomerSegmentTab;
  healthRange: "all" | "healthy" | "moderate" | "at-risk";
  mrrRange: "all" | "low" | "medium" | "high" | "enterprise";
}

export interface CustomersHubClientProps {
  /** Customer list items from API */
  customers: CustomerHubListItem[];
  /** Segmentation summary */
  summary: CustomersSegmentationSummary;
  /** Initial segment from URL */
  initialSegment?: CustomerSegmentTab;
  /** Whether using fallback/demo data */
  isFallback?: boolean;
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
  isFallback = false,
  className,
}: CustomersHubClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize segment from URL or prop
  const urlSegment = searchParams.get("segment") as CustomerSegmentTab | null;
  const [filters, setFilters] = React.useState<CustomersHubFilterState>({
    ...DEFAULT_FILTERS,
    segment: urlSegment || initialSegment,
  });

  // Update URL when segment changes
  const handleSegmentChange = (segment: CustomerSegmentTab) => {
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
    result = filterCustomersBySegment(result, filters.segment);

    // Filter by search
    result = filterCustomersBySearch(result, filters.searchQuery);

    // Filter by health range
    result = filterCustomersByHealthRange(result, filters.healthRange);

    // Filter by MRR range
    result = filterCustomersByMrrRange(result, filters.mrrRange);

    return result;
  }, [customers, filters]);

  return (
    <div className={cn("space-y-6", className)}>
      {/* Demo Data Banner */}
      {isFallback && (
        <div className="rounded-lg border border-warning-border bg-warning-bg px-4 py-3 text-sm text-warning-foreground">
          <p className="font-medium">Using demo data</p>
          <p className="text-xs text-warning-foreground/80">
            Configure NEXT_PUBLIC_MOCKAPI_BASE_URL to connect to your backend.
          </p>
        </div>
      )}

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
        {/* Segment Summary Cards - always rendered, visibility controlled by component */}
        <SegmentSummaryCards
          summary={summary}
          selectedSegment={filters.segment}
          onSegmentClick={handleSegmentChange}
        />

        {/* Filters */}
        <CustomersHubFilters value={filters} onChange={setFilters} />

        {/* Results count */}
        <div className="flex items-center justify-between text-sm text-text-muted">
          <span>
            Showing{" "}
            <span className="font-medium text-text-secondary">
              {filteredCustomers.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-text-secondary">
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
