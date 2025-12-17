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
  if (score >= 70) return "text-success-icon";
  if (score >= 50) return "text-warning-icon";
  return "text-error-icon";
}

function getHealthBg(score: number): string {
  if (score >= 70) return "bg-success-icon";
  if (score >= 50) return "bg-warning-icon";
  return "bg-error-icon";
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
          className="text-base font-semibold tracking-tight text-text-primary"
        >
          Accounts Needing Attention
        </h2>
        <div className="rounded-xl border border-border-default bg-bg-surface p-6 text-center shadow-sm">
          <p className="text-sm text-text-muted">
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
          className="text-base font-semibold tracking-tight text-text-primary"
        >
          Accounts Needing Attention
        </h2>
        <Link
          href="/customers?status=at-risk&segment=at-risk"
          className="text-xs font-medium text-ds-primary-foreground hover:text-ds-primary-hover transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
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
                "group flex items-center gap-4 rounded-xl border border-border-default bg-bg-surface p-4 shadow-sm",
                "transition-all duration-200 hover:bg-bg-subtle hover:border-border-strong",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus"
              )}
            >
              {/* Health Score Indicator */}
              <div className="flex-shrink-0">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold",
                    "bg-bg-subtle ring-2",
                    account.healthScore >= 70
                      ? "ring-success-icon/50"
                      : account.healthScore >= 50
                      ? "ring-warning-icon/50"
                      : "ring-error-icon/50"
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
                  <h3 className="text-sm font-medium text-text-primary group-hover:text-text-primary truncate">
                    {account.name}
                  </h3>
                  <span className="flex-shrink-0 text-xs text-text-muted">
                    {account.mrrFormatted}/mo
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-text-muted">
                  {account.riskReason}
                </p>
              </div>

              {/* Days Since Contact */}
              <div className="flex-shrink-0 text-right">
                <div className="text-xs text-text-muted">Last contact</div>
                <div
                  className={cn(
                    "text-sm font-medium",
                    account.daysSinceContact > 30
                      ? "text-error-icon"
                      : account.daysSinceContact > 14
                      ? "text-warning-icon"
                      : "text-text-secondary"
                  )}
                >
                  {account.daysSinceContact}d ago
                </div>
              </div>

              {/* Arrow */}
              <div
                className="flex-shrink-0 text-text-disabled group-hover:text-text-muted transition-transform group-hover:translate-x-0.5"
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
