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
import type { SegmentationSummary } from "../types";

export interface CustomersHubHeaderProps {
  /** Segmentation summary for metrics display */
  summary: SegmentationSummary;
  /** Additional CSS classes */
  className?: string;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function CustomersHubHeader({
  summary,
  className,
}: CustomersHubHeaderProps) {
  const totalMrr = summary.segments.reduce((sum, s) => sum + s.totalMrr, 0);
  const atRiskSegment = summary.segments.find((s) => s.segment === "at-risk");
  const vipSegment = summary.segments.find((s) => s.segment === "vip");

  return (
    <header className={cn("space-y-4", className)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <Heading level={1} className="text-gray-50">
            Customers
          </Heading>
          <Text
            variant="body"
            color="muted"
            className="max-w-2xl text-gray-400"
          >
            Manage your customer portfolio, track health scores, and identify
            opportunities.
          </Text>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-gray-800 bg-gray-900/60 px-3 py-2">
          <div className="text-xs font-medium text-gray-500">
            Total Customers
          </div>
          <div className="mt-0.5 text-xl font-semibold tabular-nums text-gray-100">
            {summary.total}
          </div>
        </div>
        <div className="rounded-lg border border-gray-800 bg-gray-900/60 px-3 py-2">
          <div className="text-xs font-medium text-gray-500">Total MRR</div>
          <div className="mt-0.5 text-xl font-semibold tabular-nums text-gray-100">
            {formatCurrency(totalMrr)}
          </div>
        </div>
        <div className="rounded-lg border border-amber-800/50 bg-amber-950/20 px-3 py-2">
          <div className="text-xs font-medium text-amber-400/80">At-Risk</div>
          <div className="mt-0.5 text-xl font-semibold tabular-nums text-amber-300">
            {atRiskSegment?.count ?? 0}
          </div>
        </div>
        <div className="rounded-lg border border-blue-800/50 bg-blue-950/20 px-3 py-2">
          <div className="text-xs font-medium text-blue-400/80">VIP</div>
          <div className="mt-0.5 text-xl font-semibold tabular-nums text-blue-300">
            {vipSegment?.count ?? 0}
          </div>
        </div>
      </div>
    </header>
  );
}

CustomersHubHeader.displayName = "CustomersHubHeader";
