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

/**
 * Segment card styles using DS semantic tokens for proper light/dark theming
 */
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
    color: "text-success-foreground",
    bgColor: "bg-success-bg",
    borderColor: "border-success-border",
    ringColor: "ring-success-icon",
  },
  "at-risk": {
    label: "At-Risk",
    description: "Accounts needing attention",
    color: "text-error-foreground",
    bgColor: "bg-error-bg",
    borderColor: "border-error-border",
    ringColor: "ring-error-icon",
  },
  vip: {
    label: "VIP",
    description: "High-value accounts",
    color: "text-info-foreground",
    bgColor: "bg-info-bg",
    borderColor: "border-info-border",
    ringColor: "ring-info-icon",
  },
  onboarding: {
    label: "Onboarding",
    description: "Recently signed customers",
    color: "text-warning-foreground",
    bgColor: "bg-warning-bg",
    borderColor: "border-warning-border",
    ringColor: "ring-warning-icon",
  },
  trial: {
    label: "Trial",
    description: "Evaluating the product",
    color: "text-text-secondary",
    bgColor: "bg-bg-subtle",
    borderColor: "border-border-default",
    ringColor: "ring-border-strong",
  },
};

export function SegmentSummaryCards({
  summary,
  selectedSegment,
  onSegmentClick,
  className,
}: SegmentSummaryCardsProps) {
  return (
    <div
      className={cn(
        "grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
        className
      )}
    >
      {summary.segments.map((segment) => {
        const config =
          segmentConfig[segment.segment as Exclude<CustomerSegmentTab, "all">];
        if (!config) return null;

        const isSelected = selectedSegment === segment.segment;
        const isClickable = !!onSegmentClick;

        // Determine responsive visibility class for mobile
        // - When "all" selected: hide all cards on mobile, show on tablet+
        // - When specific segment selected: show only that segment on mobile, all on tablet+
        const getMobileVisibility = () => {
          if (selectedSegment === "all") {
            return "hidden sm:flex"; // Hide all on mobile when "all" selected
          }
          if (selectedSegment && isSelected) {
            return "flex"; // Show selected segment on all viewports
          }
          if (selectedSegment && !isSelected) {
            return "hidden sm:flex"; // Hide non-selected on mobile, show on tablet+
          }
          return "flex"; // Default: show all
        };

        return (
          <button
            key={segment.segment}
            type="button"
            onClick={() => onSegmentClick?.(segment.segment)}
            disabled={!isClickable}
            className={cn(
              "group relative h-full flex-col overflow-hidden rounded-xl border p-4 text-left transition-all",
              getMobileVisibility(),
              config.bgColor,
              config.borderColor,
              isClickable &&
                "cursor-pointer hover:scale-[1.02] hover:shadow-lg",
              isSelected && "ring-2 ring-offset-2 ring-offset-bg-page",
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
              <span className="text-3xl font-bold tabular-nums text-text-primary">
                {segment.count}
              </span>
              <span className="ml-1 text-sm text-text-muted">customers</span>
            </div>

            {/* Metrics */}
            <div className="mt-3 flex items-center gap-4 text-xs text-text-muted">
              <div>
                <span className="text-text-placeholder">MRR:</span>{" "}
                <span className="font-medium text-text-secondary">
                  {segment.totalMrrFormatted}
                </span>
              </div>
              <div>
                <span className="text-text-placeholder">Avg Health:</span>{" "}
                <span
                  className={cn(
                    "font-medium",
                    segment.avgHealthScore >= 70
                      ? "text-success-icon"
                      : segment.avgHealthScore >= 40
                      ? "text-warning-icon"
                      : "text-error-icon"
                  )}
                >
                  {segment.avgHealthScore.toFixed(0)}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="mt-2 text-xs text-text-muted">{config.description}</p>

            {/* Click indicator */}
            {isClickable && (
              <div
                className={cn(
                  "absolute right-3 top-1/2 -translate-y-1/2 text-text-disabled transition-transform group-hover:translate-x-1",
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
