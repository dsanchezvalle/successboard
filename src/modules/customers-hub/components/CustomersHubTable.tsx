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

const segmentStyles: Record<
  CustomerSegmentTab,
  { bg: string; text: string; label: string }
> = {
  all: { bg: "bg-gray-800", text: "text-gray-300", label: "All" },
  active: { bg: "bg-green-900/50", text: "text-green-400", label: "Active" },
  "at-risk": {
    bg: "bg-red-900/50",
    text: "text-red-400",
    label: "At-Risk",
  },
  vip: { bg: "bg-blue-900/50", text: "text-blue-400", label: "VIP" },
  onboarding: {
    bg: "bg-amber-900/50",
    text: "text-amber-400",
    label: "Onboarding",
  },
  trial: { bg: "bg-purple-900/50", text: "text-purple-400", label: "Trial" },
};

function getHealthColor(score: number): string {
  if (score >= 70) return "text-green-400";
  if (score >= 40) return "text-amber-400";
  return "text-red-400";
}

function getHealthBg(score: number): string {
  if (score >= 70) return "bg-green-500";
  if (score >= 40) return "bg-amber-500";
  return "bg-red-500";
}

export function CustomersHubTable({
  customers,
  className,
}: CustomersHubTableProps) {
  if (customers.length === 0) {
    return (
      <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-8 text-center">
        <p className="text-sm text-gray-500">
          No customers match the current filters.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/60 shadow-sm",
        className
      )}
    >
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-gray-800 bg-gray-900/80">
          <tr>
            <th
              scope="col"
              className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400"
            >
              Customer
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400"
            >
              Segment
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400"
            >
              Health
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400"
            >
              MRR
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400"
            >
              Last Contact
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400"
            >
              Tier
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {customers.map((customer) => {
            const segment = segmentStyles[customer.segment];
            const healthScore = customer.healthScore;

            return (
              <tr
                key={customer.id}
                className="transition-colors hover:bg-gray-800/60"
              >
                {/* Customer Name */}
                <td className="px-4 py-3">
                  <Link
                    href={`/customers/${customer.id}`}
                    className={cn(
                      "font-medium text-blue-400 hover:text-blue-300 hover:underline",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                    )}
                  >
                    {customer.name}
                  </Link>
                  <div className="mt-0.5 text-xs text-gray-500">
                    {customer.companyName}
                  </div>
                </td>

                {/* Segment Badge */}
                <td className="px-4 py-3">
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
                <td className="px-4 py-3">
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
                          className="text-gray-800"
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
                <td className="px-4 py-3">
                  <span className="font-medium tabular-nums text-gray-200">
                    {customer.mrrFormatted}
                  </span>
                  <span className="text-gray-500">/mo</span>
                </td>

                {/* Last Contact */}
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "text-sm",
                      customer.daysSinceContact > 30
                        ? "text-red-400"
                        : customer.daysSinceContact > 14
                        ? "text-amber-400"
                        : "text-gray-400"
                    )}
                  >
                    {customer.daysSinceContact}d ago
                  </span>
                </td>

                {/* Tier */}
                <td className="px-4 py-3 text-gray-400">
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
