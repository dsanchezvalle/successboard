/**
 * MetricCard - Premium KPI card component
 *
 * Displays a single metric with optional trend indicator and status color.
 * Uses Design System tokens for consistent styling.
 *
 * @accessibility
 * - Uses semantic structure with proper heading levels
 * - Color is not the only indicator (includes text labels)
 * - Good contrast ratios per WCAG AA
 */

import * as React from "react";
import { cn } from "@/design-system/utils/cn";

export type MetricStatus =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info";
export type MetricTrend = "up" | "down" | "neutral";
export type MetricSize = "default" | "large" | "compact";

export interface MetricCardProps {
  /** The metric label/title */
  title: string;
  /** The primary value to display */
  value: string | number;
  /** Optional description or context */
  description?: string;
  /** Visual status indicator */
  status?: MetricStatus;
  /** Trend direction */
  trend?: MetricTrend;
  /** Trend value (e.g., "+5%", "-2.3%") */
  trendValue?: string;
  /** Card size variant */
  size?: MetricSize;
  /** Optional icon component */
  icon?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

const statusStyles: Record<MetricStatus, string> = {
  default: "border-gray-800 bg-gray-900/60",
  success: "border-green-800/50 bg-green-950/30",
  warning: "border-amber-800/50 bg-amber-950/30",
  danger: "border-red-800/50 bg-red-950/30",
  info: "border-blue-800/50 bg-blue-950/30",
};

const statusAccentStyles: Record<MetricStatus, string> = {
  default: "bg-gray-700",
  success: "bg-green-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
  info: "bg-blue-500",
};

const trendStyles: Record<MetricTrend, { color: string; icon: string }> = {
  up: { color: "text-green-400", icon: "↑" },
  down: { color: "text-red-400", icon: "↓" },
  neutral: { color: "text-gray-400", icon: "→" },
};

const sizeStyles: Record<
  MetricSize,
  { card: string; value: string; title: string }
> = {
  compact: {
    card: "px-3 py-2.5",
    value: "text-xl",
    title: "text-[11px]",
  },
  default: {
    card: "px-4 py-4",
    value: "text-2xl",
    title: "text-xs",
  },
  large: {
    card: "px-5 py-5",
    value: "text-3xl",
    title: "text-sm",
  },
};

export function MetricCard({
  title,
  value,
  description,
  status = "default",
  trend,
  trendValue,
  size = "default",
  icon,
  className,
}: MetricCardProps) {
  const sizes = sizeStyles[size];

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-xl border shadow-sm transition-shadow duration-200 hover:shadow-md",
        statusStyles[status],
        sizes.card,
        className
      )}
    >
      {/* Status accent bar */}
      <div
        className={cn(
          "absolute left-0 top-0 h-full w-1 rounded-l-xl",
          statusAccentStyles[status]
        )}
        aria-hidden="true"
      />

      <div className="flex items-start justify-between gap-3 pl-2">
        <div className="min-w-0 flex-1">
          {/* Title */}
          <h3
            className={cn(
              "font-medium uppercase tracking-wide text-gray-400",
              sizes.title
            )}
          >
            {title}
          </h3>

          {/* Value + Trend */}
          <div className="mt-1 flex items-baseline gap-2">
            <span
              className={cn(
                "font-semibold tabular-nums text-gray-50",
                sizes.value
              )}
            >
              {value}
            </span>
            {trend && trendValue && (
              <span
                className={cn(
                  "flex items-center gap-0.5 text-xs font-medium",
                  trendStyles[trend].color
                )}
              >
                <span aria-hidden="true">{trendStyles[trend].icon}</span>
                <span>{trendValue}</span>
              </span>
            )}
          </div>

          {/* Description */}
          {description && (
            <p className="mt-1.5 text-xs leading-relaxed text-gray-500">
              {description}
            </p>
          )}
        </div>

        {/* Icon */}
        {icon && (
          <div className="flex-shrink-0 text-gray-600" aria-hidden="true">
            {icon}
          </div>
        )}
      </div>
    </article>
  );
}

MetricCard.displayName = "MetricCard";
