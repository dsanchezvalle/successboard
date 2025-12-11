/**
 * AccountsNeedingAttention - At-risk customer highlights
 *
 * Displays a summary of accounts that need immediate attention.
 * Receives data from the overview-service.
 *
 * @accessibility
 * - Uses semantic list structure
 * - Status indicators use color + text
 * - Focus-visible on interactive elements
 */

import * as React from "react";
import Link from "next/link";
import { cn } from "@/design-system/utils/cn";
import type { AtRiskAccountViewModel } from "@/modules/api";

function getHealthColor(score: number): string {
  if (score >= 70) return "text-green-400";
  if (score >= 50) return "text-amber-400";
  return "text-red-400";
}

function getHealthBg(score: number): string {
  if (score >= 70) return "bg-green-500";
  if (score >= 50) return "bg-amber-500";
  return "bg-red-500";
}

export interface AccountsNeedingAttentionProps {
  /** Accounts needing attention (from API) */
  accounts: AtRiskAccountViewModel[];
  /** Additional CSS classes */
  className?: string;
}

export function AccountsNeedingAttention({
  accounts,
  className,
}: AccountsNeedingAttentionProps) {
  if (accounts.length === 0) {
    return (
      <section
        className={cn("space-y-3", className)}
        aria-labelledby="attention-heading"
      >
        <h2
          id="attention-heading"
          className="text-base font-semibold tracking-tight text-gray-100"
        >
          Accounts Needing Attention
        </h2>
        <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-6 text-center">
          <p className="text-sm text-gray-500">
            No accounts need immediate attention. Great job!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn("space-y-3", className)}
      aria-labelledby="attention-heading"
    >
      <div className="flex items-center justify-between">
        <h2
          id="attention-heading"
          className="text-base font-semibold tracking-tight text-gray-100"
        >
          Accounts Needing Attention
        </h2>
        <Link
          href="/customers?status=at-risk"
          className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          View all →
        </Link>
      </div>

      <ul className="space-y-2" role="list">
        {accounts.map((account) => (
          <li key={account.id}>
            <Link
              href={`/customers/${account.id}`}
              className={cn(
                "group flex items-center gap-4 rounded-xl border border-gray-800 bg-gray-900/60 p-4",
                "transition-all duration-200 hover:bg-gray-800/80 hover:border-gray-700",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              )}
            >
              {/* Health Score Indicator */}
              <div className="flex-shrink-0">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold",
                    "bg-gray-800 ring-2",
                    account.healthScore >= 70
                      ? "ring-green-500/50"
                      : account.healthScore >= 50
                      ? "ring-amber-500/50"
                      : "ring-red-500/50"
                  )}
                >
                  <span className={getHealthColor(account.healthScore)}>
                    {account.healthScore}
                  </span>
                </div>
              </div>

              {/* Account Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-gray-200 group-hover:text-gray-50 truncate">
                    {account.name}
                  </h3>
                  <span className="flex-shrink-0 text-xs text-gray-500">
                    {account.mrrFormatted}/mo
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-gray-500">
                  {account.riskReason}
                </p>
              </div>

              {/* Days Since Contact */}
              <div className="flex-shrink-0 text-right">
                <div className="text-xs text-gray-500">Last contact</div>
                <div
                  className={cn(
                    "text-sm font-medium",
                    account.daysSinceContact > 30
                      ? "text-red-400"
                      : account.daysSinceContact > 14
                      ? "text-amber-400"
                      : "text-gray-300"
                  )}
                >
                  {account.daysSinceContact}d ago
                </div>
              </div>

              {/* Arrow */}
              <div
                className="flex-shrink-0 text-gray-600 group-hover:text-gray-400 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                →
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

AccountsNeedingAttention.displayName = "AccountsNeedingAttention";
