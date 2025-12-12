/**
 * CustomersHubHeader - Page header for Customers Hub
 *
 * Displays the page title, description, and key summary metrics.
 * Uses Design System primitives.
 *
 * @accessibility
 * - H1 for page title
 * - Metrics have proper labels
 */

import * as React from "react";
import { Heading, Text } from "@/design-system/primitives";
import { cn } from "@/design-system/utils/cn";
import type { CustomersSegmentationSummary } from "@/modules/api";

export interface CustomersHubHeaderProps {
  /** Segmentation summary for metrics display */
  summary: CustomersSegmentationSummary;
  /** Additional CSS classes */
  className?: string;
}

export function CustomersHubHeader({
  summary,
  className,
}: CustomersHubHeaderProps) {
  const atRiskSegment = summary.segments.find((s) => s.segment === "at-risk");
  const vipSegment = summary.segments.find((s) => s.segment === "vip");

  return (
    <header className={cn("space-y-4", className)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <Heading level={1} className="text-text-primary">
            Customers
          </Heading>
          <Text
            variant="body"
            color="muted"
            className="max-w-2xl text-text-muted"
          >
            Manage your customer portfolio, track health scores, and identify
            opportunities.
          </Text>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-border-default bg-bg-surface px-3 py-2 shadow-sm">
          <div className="text-xs font-medium text-text-muted">
            Total Customers
          </div>
          <div className="mt-0.5 text-xl font-semibold tabular-nums text-text-primary">
            {summary.total}
          </div>
        </div>
        <div className="rounded-lg border border-border-default bg-bg-surface px-3 py-2 shadow-sm">
          <div className="text-xs font-medium text-text-muted">Total MRR</div>
          <div className="mt-0.5 text-xl font-semibold tabular-nums text-text-primary">
            {summary.totalMrrFormatted}
          </div>
        </div>
        <div className="rounded-lg border border-warning-border bg-warning-bg px-3 py-2 shadow-sm">
          <div className="text-xs font-medium text-warning-foreground">
            At-Risk
          </div>
          <div className="mt-0.5 text-xl font-semibold tabular-nums text-warning-foreground">
            {atRiskSegment?.count ?? 0}
          </div>
        </div>
        <div className="rounded-lg border border-info-border bg-info-bg px-3 py-2 shadow-sm">
          <div className="text-xs font-medium text-info-foreground">VIP</div>
          <div className="mt-0.5 text-xl font-semibold tabular-nums text-info-foreground">
            {vipSegment?.count ?? 0}
          </div>
        </div>
      </div>
    </header>
  );
}

CustomersHubHeader.displayName = "CustomersHubHeader";
