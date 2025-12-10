/**
 * CustomerHealthSummary - Visual health status breakdown
 *
 * Displays a visual summary of customer health distribution
 * with a progress bar and status breakdown.
 *
 * @accessibility
 * - Uses semantic structure
 * - Color is supplemented with text labels
 * - Progress bar has proper ARIA attributes
 */

import * as React from "react";
import { cn } from "@/design-system/utils/cn";

export interface CustomerHealthSummaryProps {
  /** Total number of customers */
  total: number;
  /** Number of active/healthy customers */
  active: number;
  /** Number of at-risk customers */
  atRisk: number;
  /** Number of VIP customers */
  vip: number;
  /** Additional CSS classes */
  className?: string;
}

export function CustomerHealthSummary({
  total,
  active,
  atRisk,
  vip,
  className,
}: CustomerHealthSummaryProps) {
  // Calculate percentages
  const activePercent = total > 0 ? (active / total) * 100 : 0;
  const atRiskPercent = total > 0 ? (atRisk / total) * 100 : 0;
  const vipPercent = total > 0 ? (vip / total) * 100 : 0;
  const otherPercent = Math.max(
    0,
    100 - activePercent - atRiskPercent - vipPercent
  );

  const segments = [
    {
      label: "Active",
      value: active,
      percent: activePercent,
      color: "bg-green-500",
    },
    {
      label: "At Risk",
      value: atRisk,
      percent: atRiskPercent,
      color: "bg-amber-500",
    },
    { label: "VIP", value: vip, percent: vipPercent, color: "bg-blue-500" },
  ];

  return (
    <article
      className={cn(
        "rounded-xl border border-gray-800 bg-gray-900/60 p-4 shadow-sm",
        className
      )}
    >
      <h3 className="text-xs font-medium uppercase tracking-wide text-gray-400">
        Customer Health Distribution
      </h3>

      {/* Progress bar */}
      <div
        className="mt-3 flex h-2.5 overflow-hidden rounded-full bg-gray-800"
        role="progressbar"
        aria-label="Customer health distribution"
        aria-valuenow={activePercent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {segments.map((segment) => (
          <div
            key={segment.label}
            className={cn("transition-all duration-300", segment.color)}
            style={{ width: `${segment.percent}%` }}
            title={`${segment.label}: ${
              segment.value
            } (${segment.percent.toFixed(1)}%)`}
          />
        ))}
        {otherPercent > 0 && (
          <div
            className="bg-gray-700"
            style={{ width: `${otherPercent}%` }}
            title={`Other: ${otherPercent.toFixed(1)}%`}
          />
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
        {segments.map((segment) => (
          <div key={segment.label} className="flex items-center gap-2">
            <span
              className={cn("h-2.5 w-2.5 rounded-full", segment.color)}
              aria-hidden="true"
            />
            <span className="text-xs text-gray-400">
              {segment.label}:{" "}
              <span className="font-medium text-gray-200">
                {segment.value.toLocaleString()}
              </span>
              <span className="ml-1 text-gray-500">
                ({segment.percent.toFixed(0)}%)
              </span>
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}

CustomerHealthSummary.displayName = "CustomerHealthSummary";
