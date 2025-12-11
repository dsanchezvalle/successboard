/**
 * Customer Segment Derivation Utilities
 *
 * @deprecated This module is deprecated. Use the customers-service from
 * `@/modules/api` instead, which fetches data from the mockapi.io backend.
 *
 * These legacy helpers derive mock metrics from Petclinic data and will be
 * removed in a future cleanup batch.
 *
 * @see {@link @/modules/api/customers-service.ts}
 */

import type {
  Customer,
  CustomerSuccessMetrics,
} from "@/modules/customers/types";
import type {
  EnrichedCustomer,
  CustomerSegment,
  SegmentSummary,
  SegmentationSummary,
} from "../types";
import { getCustomerSuccessMetricsMock } from "@/modules/customers/mocks/getCustomerSuccessMetrics";

// =============================================================================
// SEGMENT DERIVATION
// =============================================================================

/**
 * Derive segment from customer metrics
 * TODO: Replace with mockapi segment assignment
 */
function deriveSegment(
  customer: Customer,
  metrics: CustomerSuccessMetrics,
  mrr: number
): CustomerSegment {
  const { healthScore, lifetimeValue } = metrics;
  const petsCount = customer.petsCount ?? 0;

  // VIP: High health + high value OR many pets (high engagement)
  if (healthScore >= 80 && (lifetimeValue >= 30000 || mrr >= 3000)) {
    return "vip";
  }

  // At-risk: Low health score
  if (healthScore < 50) {
    return "at-risk";
  }

  // New: Recently created (mock based on ID for demo)
  const numericId = Number(customer.id);
  if (numericId > 8) {
    return "new";
  }

  // Default: Active
  return "active";
}

/**
 * Generate mock MRR based on customer ID
 * TODO: Replace with mockapi customer.mrr field
 */
function deriveMrr(customerId: number): number {
  // Deterministic mock MRR: $500 - $5000
  const base = (customerId * 789) % 4500;
  return 500 + base;
}

/**
 * Generate mock days since contact
 * TODO: Replace with mockapi customer.lastContactDate
 */
function deriveDaysSinceContact(customerId: number): number {
  // Deterministic mock: 1-60 days
  return 1 + ((customerId * 17) % 60);
}

// =============================================================================
// ENRICHMENT
// =============================================================================

/**
 * Enrich a customer with derived metrics and segment
 * TODO: Replace with mockapi /customers/:id endpoint that returns enriched data
 */
export function enrichCustomer(customer: Customer): EnrichedCustomer {
  const numericId = Number(customer.id) || 1;
  const metrics = getCustomerSuccessMetricsMock(numericId);
  const mrr = deriveMrr(numericId);
  const segment = deriveSegment(customer, metrics, mrr);
  const daysSinceContact = deriveDaysSinceContact(numericId);

  return {
    ...customer,
    segment,
    metrics,
    mrr,
    daysSinceContact,
  };
}

/**
 * Enrich all customers with derived data
 */
export function enrichCustomers(customers: Customer[]): EnrichedCustomer[] {
  return customers.map(enrichCustomer);
}

// =============================================================================
// SEGMENTATION SUMMARY
// =============================================================================

/**
 * Calculate segmentation summary from enriched customers
 * TODO: Replace with mockapi /segments/summary endpoint
 */
export function calculateSegmentationSummary(
  customers: EnrichedCustomer[]
): SegmentationSummary {
  const total = customers.length;

  const segmentCounts: Record<CustomerSegment, EnrichedCustomer[]> = {
    all: customers,
    active: [],
    "at-risk": [],
    vip: [],
    new: [],
  };

  // Group customers by segment
  for (const customer of customers) {
    if (customer.segment !== "all") {
      segmentCounts[customer.segment].push(customer);
    }
  }

  // Calculate summaries for each segment (excluding "all")
  const segmentKeys: CustomerSegment[] = ["active", "at-risk", "vip", "new"];
  const segments: SegmentSummary[] = segmentKeys.map((segment) => {
    const segmentCustomers = segmentCounts[segment];
    const count = segmentCustomers.length;
    const percentage = total > 0 ? (count / total) * 100 : 0;
    const totalMrr = segmentCustomers.reduce((sum, c) => sum + c.mrr, 0);
    const avgHealthScore =
      count > 0
        ? segmentCustomers.reduce((sum, c) => sum + c.metrics.healthScore, 0) /
          count
        : 0;

    return {
      segment,
      count,
      percentage,
      totalMrr,
      avgHealthScore,
    };
  });

  return { total, segments };
}

// =============================================================================
// FILTERING
// =============================================================================

/**
 * Filter customers by segment
 */
export function filterBySegment(
  customers: EnrichedCustomer[],
  segment: CustomerSegment
): EnrichedCustomer[] {
  if (segment === "all") {
    return customers;
  }
  return customers.filter((c) => c.segment === segment);
}

/**
 * Filter customers by search query
 */
export function filterBySearch(
  customers: EnrichedCustomer[],
  query: string
): EnrichedCustomer[] {
  if (!query.trim()) {
    return customers;
  }

  const lowerQuery = query.toLowerCase();
  return customers.filter(
    (c) =>
      c.name.toLowerCase().includes(lowerQuery) ||
      c.city?.toLowerCase().includes(lowerQuery) ||
      c.email?.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Filter customers by health range
 */
export function filterByHealthRange(
  customers: EnrichedCustomer[],
  range: "all" | "healthy" | "moderate" | "at-risk"
): EnrichedCustomer[] {
  if (range === "all") return customers;

  return customers.filter((c) => {
    const score = c.metrics.healthScore;
    switch (range) {
      case "healthy":
        return score >= 70;
      case "moderate":
        return score >= 40 && score < 70;
      case "at-risk":
        return score < 40;
      default:
        return true;
    }
  });
}

/**
 * Filter customers by MRR range
 */
export function filterByMrrRange(
  customers: EnrichedCustomer[],
  range: "all" | "low" | "medium" | "high" | "enterprise"
): EnrichedCustomer[] {
  if (range === "all") return customers;

  return customers.filter((c) => {
    const mrr = c.mrr;
    switch (range) {
      case "low":
        return mrr < 1000;
      case "medium":
        return mrr >= 1000 && mrr < 2500;
      case "high":
        return mrr >= 2500 && mrr < 4000;
      case "enterprise":
        return mrr >= 4000;
      default:
        return true;
    }
  });
}
