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
import type {
  CustomersSegmentationSummary,
  CustomerSegmentTab,
} from "@/modules/api";

export interface SegmentSummaryCardsProps {
  /** Segmentation summary data */
  summary: CustomersSegmentationSummary;
  /** Currently selected segment */
  selectedSegment?: CustomerSegmentTab;
  /** Callback when a segment card is clicked */
  onSegmentClick?: (segment: CustomerSegmentTab) => void;
  /** Additional CSS classes */
  className?: string;
}

const segmentConfig: Record<
  Exclude<CustomerSegmentTab, "all">,
  {
    label: string;
    description: string;
    color: string;
    bgColor: string;
    borderColor: string;
    ringColor: string;
  }
> = {
  active: {
    label: "Active",
    description: "Healthy, engaged customers",
    color: "text-green-400",
    bgColor: "bg-green-950/30",
    borderColor: "border-green-800/50",
    ringColor: "ring-green-500",
  },
  "at-risk": {
    label: "At-Risk",
    description: "Accounts needing attention",
    color: "text-red-400",
    bgColor: "bg-red-950/30",
    borderColor: "border-red-800/50",
    ringColor: "ring-red-500",
  },
  vip: {
    label: "VIP",
    description: "High-value accounts",
    color: "text-blue-400",
    bgColor: "bg-blue-950/30",
    borderColor: "border-blue-800/50",
    ringColor: "ring-blue-500",
  },
  onboarding: {
    label: "Onboarding",
    description: "Recently signed customers",
    color: "text-amber-400",
    bgColor: "bg-amber-950/30",
    borderColor: "border-amber-800/50",
    ringColor: "ring-amber-500",
  },
  trial: {
    label: "Trial",
    description: "Evaluating the product",
    color: "text-purple-400",
    bgColor: "bg-purple-950/30",
    borderColor: "border-purple-800/50",
    ringColor: "ring-purple-500",
  },
};

export function SegmentSummaryCards({
  summary,
  selectedSegment,
  onSegmentClick,
  className,
}: SegmentSummaryCardsProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-5", className)}>
      {summary.segments.map((segment) => {
        const config =
          segmentConfig[segment.segment as Exclude<CustomerSegmentTab, "all">];
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
              isSelected && config.ringColor,
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
                  {segment.totalMrrFormatted}
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
