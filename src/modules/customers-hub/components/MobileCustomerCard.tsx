/**
 * MobileCustomerCard - Mobile-optimized customer card
 *
 * Displays customer information in a scannable card format for mobile viewports.
 * Replaces table rows on mobile for better touch interaction.
 *
 * @accessibility
 * - Semantic structure
 * - Focus-visible styles on link
 * - Color supplemented with text labels
 */

"use client";

import Link from "next/link";
import { cn } from "@/design-system/utils/cn";
import type { CustomerHubListItem, CustomerSegmentTab } from "@/modules/api";

export interface MobileCustomerCardProps {
  /** Customer data */
  customer: CustomerHubListItem;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Segment badge styles using DS semantic tokens
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

export function MobileCustomerCard({
  customer,
  className,
}: MobileCustomerCardProps) {
  const segment = segmentStyles[customer.segment];
  const healthScore = customer.healthScore;

  return (
    <Link
      href={`/customers/${customer.id}`}
      className={cn(
        "block rounded-xl border border-border-default bg-bg-surface p-4 transition-all",
        "hover:border-brand-primary/30 hover:shadow-md hover:shadow-black/5",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus",
        className
      )}
    >
      {/* Header: Name + Segment Badge */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-medium text-text-primary truncate">
            {customer.name}
          </h3>
          <p className="text-sm text-text-muted truncate">
            {customer.companyName}
          </p>
        </div>
        <span
          className={cn(
            "shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
            segment.bg,
            segment.text
          )}
        >
          {segment.label}
        </span>
      </div>

      {/* Health + MRR Row */}
      <div className="mt-3 flex items-center justify-between">
        {/* Health Score */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 relative">
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
          <span className="text-xs text-text-muted">Health</span>
        </div>

        {/* MRR */}
        <div className="text-right">
          <span className="font-medium tabular-nums text-text-primary">
            {customer.mrrFormatted}
          </span>
          <span className="text-text-muted">/mo</span>
        </div>
      </div>
    </Link>
  );
}

MobileCustomerCard.displayName = "MobileCustomerCard";
