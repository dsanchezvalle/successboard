/**
 * SegmentSummaryCards - Visual segment distribution
 *
 * Displays segment summary cards with counts and metrics.
 * Used in the "Segments" view of the Customers Hub.
 *
 * @accessibility
 * - Semantic section structure
 * - Color supplemented with text labels
 */

import * as React from "react";
import { cn } from "@/design-system/utils/cn";
import type { SegmentationSummary, CustomerSegment } from "../types";

export interface SegmentSummaryCardsProps {
  /** Segmentation summary data */
  summary: SegmentationSummary;
  /** Currently selected segment */
  selectedSegment?: CustomerSegment;
  /** Callback when a segment card is clicked */
  onSegmentClick?: (segment: CustomerSegment) => void;
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

const segmentConfig: Record<
  Exclude<CustomerSegment, "all">,
  {
    label: string;
    description: string;
    color: string;
    bgColor: string;
    borderColor: string;
  }
> = {
  active: {
    label: "Active",
    description: "Healthy, engaged customers",
    color: "text-green-400",
    bgColor: "bg-green-950/30",
    borderColor: "border-green-800/50",
  },
  "at-risk": {
    label: "At-Risk",
    description: "Accounts needing attention",
    color: "text-amber-400",
    bgColor: "bg-amber-950/30",
    borderColor: "border-amber-800/50",
  },
  vip: {
    label: "VIP",
    description: "High-value accounts",
    color: "text-blue-400",
    bgColor: "bg-blue-950/30",
    borderColor: "border-blue-800/50",
  },
  new: {
    label: "New",
    description: "Recently onboarded",
    color: "text-purple-400",
    bgColor: "bg-purple-950/30",
    borderColor: "border-purple-800/50",
  },
};

export function SegmentSummaryCards({
  summary,
  selectedSegment,
  onSegmentClick,
  className,
}: SegmentSummaryCardsProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {summary.segments.map((segment) => {
        const config =
          segmentConfig[segment.segment as Exclude<CustomerSegment, "all">];
        if (!config) return null;

        const isSelected = selectedSegment === segment.segment;
        const isClickable = !!onSegmentClick;

        return (
          <button
            key={segment.segment}
            type="button"
            onClick={() => onSegmentClick?.(segment.segment)}
            disabled={!isClickable}
            className={cn(
              "group relative overflow-hidden rounded-xl border p-4 text-left transition-all",
              config.bgColor,
              config.borderColor,
              isClickable &&
                "cursor-pointer hover:scale-[1.02] hover:shadow-lg",
              isSelected && "ring-2 ring-offset-2 ring-offset-gray-950",
              isSelected && segment.segment === "active" && "ring-green-500",
              isSelected && segment.segment === "at-risk" && "ring-amber-500",
              isSelected && segment.segment === "vip" && "ring-blue-500",
              isSelected && segment.segment === "new" && "ring-purple-500",
              !isClickable && "cursor-default"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className={cn("text-sm font-semibold", config.color)}>
                {config.label}
              </h3>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-xs font-medium tabular-nums",
                  config.bgColor,
                  config.color
                )}
              >
                {segment.percentage.toFixed(0)}%
              </span>
            </div>

            {/* Count */}
            <div className="mt-2">
              <span className="text-3xl font-bold tabular-nums text-gray-100">
                {segment.count}
              </span>
              <span className="ml-1 text-sm text-gray-500">customers</span>
            </div>

            {/* Metrics */}
            <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
              <div>
                <span className="text-gray-400">MRR:</span>{" "}
                <span className="font-medium text-gray-300">
                  {formatCurrency(segment.totalMrr)}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Avg Health:</span>{" "}
                <span
                  className={cn(
                    "font-medium",
                    segment.avgHealthScore >= 70
                      ? "text-green-400"
                      : segment.avgHealthScore >= 40
                      ? "text-amber-400"
                      : "text-red-400"
                  )}
                >
                  {segment.avgHealthScore.toFixed(0)}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="mt-2 text-xs text-gray-500">{config.description}</p>

            {/* Click indicator */}
            {isClickable && (
              <div
                className={cn(
                  "absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 transition-transform group-hover:translate-x-1",
                  config.color
                )}
              >
                →
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

SegmentSummaryCards.displayName = "SegmentSummaryCards";
