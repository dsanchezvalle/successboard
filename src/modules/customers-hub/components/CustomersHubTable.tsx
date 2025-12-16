/**
 * CustomersHubTable - Enhanced customer table
 *
 * Displays customers with health scores, segments, and MRR.
 * Uses semantic table structure for accessibility.
 *
 * @accessibility
 * - Semantic <table>, <thead>, <tbody>, <th>, <td>
 * - scope="col" on header cells
 * - Focus-visible on links
 * - Status indicated by color AND text
 */

import * as React from "react";
import Link from "next/link";
import { cn } from "@/design-system/utils/cn";
import type { CustomerHubListItem, CustomerSegmentTab } from "@/modules/api";

export interface CustomersHubTableProps {
  /** Customers to display */
  customers: CustomerHubListItem[];
  /** Additional CSS classes */
  className?: string;
}

/**
 * Segment badge styles using DS semantic tokens for proper light/dark theming
 */
const segmentStyles: Record<
  CustomerSegmentTab,
  { bg: string; text: string; label: string }
> = {
  all: { bg: "bg-bg-muted", text: "text-text-secondary", label: "All" },
  active: {
    bg: "bg-success-bg",
    text: "text-success-foreground",
    label: "Active",
  },
  "at-risk": {
    bg: "bg-error-bg",
    text: "text-error-foreground",
    label: "At-Risk",
  },
  vip: { bg: "bg-info-bg", text: "text-info-foreground", label: "VIP" },
  onboarding: {
    bg: "bg-warning-bg",
    text: "text-warning-foreground",
    label: "Onboarding",
  },
  trial: { bg: "bg-bg-subtle", text: "text-text-secondary", label: "Trial" },
};

function getHealthColor(score: number): string {
  if (score >= 70) return "text-success-icon";
  if (score >= 40) return "text-warning-icon";
  return "text-error-icon";
}

function getHealthBg(score: number): string {
  if (score >= 70) return "bg-success-icon";
  if (score >= 40) return "bg-warning-icon";
  return "bg-error-icon";
}

export function CustomersHubTable({
  customers,
  className,
}: CustomersHubTableProps) {
  if (customers.length === 0) {
    return (
      <div className="rounded-xl border border-border-default bg-bg-surface p-8 text-center shadow-sm">
        <p className="text-sm text-text-muted">
          No customers match the current filters.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "overflow-x-auto rounded-xl border border-border-default bg-bg-surface shadow-sm scrollbar-thin scrollbar-thumb-border-muted scrollbar-track-transparent",
        className
      )}
    >
      <table className="w-full text-left text-sm">
        <thead className="border-b border-border-default bg-bg-subtle">
          <tr>
            <th
              scope="col"
              className="px-2 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted sm:px-3 lg:px-4"
            >
              Customer
            </th>
            <th
              scope="col"
              className="px-2 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted sm:px-3 lg:px-4 hidden sm:table-cell"
            >
              Segment
            </th>
            <th
              scope="col"
              className="px-2 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted sm:px-3 lg:px-4"
            >
              Health
            </th>
            <th
              scope="col"
              className="px-2 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted sm:px-3 lg:px-4"
            >
              MRR
            </th>
            <th
              scope="col"
              className="px-2 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted sm:px-3 lg:px-4 hidden lg:table-cell"
            >
              Last Contact
            </th>
            <th
              scope="col"
              className="px-2 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted sm:px-3 lg:px-4 hidden xl:table-cell"
            >
              Tier
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-default">
          {customers.map((customer) => {
            const segment = segmentStyles[customer.segment];
            const healthScore = customer.healthScore;

            return (
              <tr
                key={customer.id}
                className="transition-colors hover:bg-bg-subtle"
              >
                {/* Customer Name */}
                {/* TODO: Customer detail page navigation will be handled in a future batch */}
                <td className="px-2 py-3 sm:px-3 lg:px-4">
                  <Link
                    href={`/customers/${customer.id}`}
                    className={cn(
                      "font-medium text-ds-primary-foreground hover:text-ds-primary-hover hover:underline",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
                    )}
                  >
                    {customer.name}
                  </Link>
                  <div className="mt-0.5 text-xs text-text-muted">
                    {customer.companyName}
                  </div>
                </td>

                {/* Segment Badge */}
                <td className="px-2 py-3 sm:px-3 lg:px-4 hidden sm:table-cell">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                      segment.bg,
                      segment.text
                    )}
                  >
                    {segment.label}
                  </span>
                </td>

                {/* Health Score */}
                <td className="px-2 py-3 sm:px-3 lg:px-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 relative">
                      {/* Background circle */}
                      <svg className="h-8 w-8 -rotate-90" viewBox="0 0 36 36">
                        <circle
                          cx="18"
                          cy="18"
                          r="14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="text-bg-muted"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeDasharray={`${healthScore * 0.88} 88`}
                          strokeLinecap="round"
                          className={getHealthColor(healthScore)}
                        />
                      </svg>
                      <span
                        className={cn(
                          "absolute inset-0 flex items-center justify-center text-[10px] font-bold",
                          getHealthColor(healthScore)
                        )}
                      >
                        {healthScore}
                      </span>
                    </div>
                  </div>
                </td>

                {/* MRR */}
                <td className="px-2 py-3 sm:px-3 lg:px-4">
                  <span className="font-medium tabular-nums text-text-primary">
                    {customer.mrrFormatted}
                  </span>
                  <span className="text-text-muted">/mo</span>
                </td>

                {/* Last Contact */}
                <td className="px-2 py-3 sm:px-3 lg:px-4 hidden lg:table-cell">
                  <span
                    className={cn(
                      "text-sm",
                      customer.daysSinceContact > 30
                        ? "text-error-icon"
                        : customer.daysSinceContact > 14
                        ? "text-warning-icon"
                        : "text-text-muted"
                    )}
                  >
                    {customer.daysSinceContact}d ago
                  </span>
                </td>

                {/* Tier */}
                <td className="px-2 py-3 sm:px-3 lg:px-4 text-text-muted hidden xl:table-cell">
                  {customer.tierLabel}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

CustomersHubTable.displayName = "CustomersHubTable";
