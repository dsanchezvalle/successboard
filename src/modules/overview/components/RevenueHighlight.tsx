/**
 * RevenueHighlight - Featured MRR display
 *
 * A prominent card for displaying Monthly Recurring Revenue
 * with visual emphasis and optional trend.
 *
 * @accessibility
 * - Semantic article structure
 * - Good contrast for all text elements
 */

import * as React from "react";
import { cn } from "@/design-system/utils/cn";

export interface RevenueHighlightProps {
  /** Monthly Recurring Revenue value (in cents if from API) */
  mrr: number;
  /** Pre-formatted MRR string (optional, takes precedence) */
  mrrFormatted?: string;
  /** Trend direction */
  trend?: "up" | "down" | "flat";
  /** Trend value string (e.g., "+5.2%") */
  trendValue?: string;
  /** Additional CSS classes */
  className?: string;
}

function formatCurrency(amount: number): string {
  // If amount is large (likely in cents), convert to dollars
  const value = amount > 100000 ? amount / 100 : amount;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function RevenueHighlight({
  mrr,
  mrrFormatted,
  trend,
  trendValue,
  className,
}: RevenueHighlightProps) {
  const isPositiveTrend = trend === "up";

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-xl border border-blue-800/40 bg-gradient-to-br from-blue-950/50 to-gray-900/80 p-5 shadow-md",
        className
      )}
    >
      {/* Decorative gradient overlay */}
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl"
        aria-hidden="true"
      />

      <div className="relative">
        <h3 className="text-xs font-medium uppercase tracking-wide text-blue-300/80">
          Monthly Recurring Revenue
        </h3>

        <div className="mt-2 flex items-baseline gap-3">
          <span className="text-4xl font-bold tabular-nums tracking-tight text-gray-50">
            {mrrFormatted ?? formatCurrency(mrr)}
          </span>

          {trend && trend !== "flat" && trendValue && (
            <span
              className={cn(
                "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                isPositiveTrend
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              )}
            >
              <span aria-hidden="true">{isPositiveTrend ? "↑" : "↓"}</span>
              <span>{trendValue}</span>
            </span>
          )}
        </div>

        <p className="mt-2 text-sm text-gray-500">
          Estimated monthly recurring revenue based on customer base.
        </p>
      </div>
    </article>
  );
}

RevenueHighlight.displayName = "RevenueHighlight";
