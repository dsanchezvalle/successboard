/**
 * MobileCustomerCards - Mobile card list for customers
 *
 * Renders a list of customer cards optimized for mobile viewports.
 * This replaces the table view on mobile for better touch experience.
 */

"use client";

import { cn } from "@/design-system/utils/cn";
import type { CustomerHubListItem } from "@/modules/api";
import { MobileCustomerCard } from "./MobileCustomerCard";

export interface MobileCustomerCardsProps {
  /** Customers to display */
  customers: CustomerHubListItem[];
  /** Additional CSS classes */
  className?: string;
}

export function MobileCustomerCards({
  customers,
  className,
}: MobileCustomerCardsProps) {
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
    <div className={cn("space-y-3", className)}>
      {customers.map((customer) => (
        <MobileCustomerCard key={customer.id} customer={customer} />
      ))}
    </div>
  );
}

MobileCustomerCards.displayName = "MobileCustomerCards";
