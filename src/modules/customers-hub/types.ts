/**
 * Customers Hub Types
 *
 * Type definitions for the unified Customers Hub experience.
 * These types support both current Petclinic-derived data and
 * future mockapi.io integration.
 */

import type {
  Customer,
  CustomerSuccessMetrics,
} from "@/modules/customers/types";

// =============================================================================
// SEGMENT TYPES
// =============================================================================

/**
 * Customer segment categories
 * TODO: Replace with mockapi /segments endpoint
 */
export type CustomerSegment = "all" | "active" | "at-risk" | "vip" | "new";

/**
 * Tab configuration for the Customers Hub
 */
export interface SegmentTab {
  id: CustomerSegment;
  label: string;
  description: string;
  color: "default" | "success" | "warning" | "danger" | "info";
}

// =============================================================================
// ENRICHED CUSTOMER TYPE
// =============================================================================

/**
 * Customer with derived CS metrics and segment
 * This is the view model used in the Customers Hub
 */
export interface EnrichedCustomer extends Customer {
  /** Derived segment based on health/value */
  segment: CustomerSegment;
  /** Customer success metrics */
  metrics: CustomerSuccessMetrics;
  /** Mock MRR for display */
  mrr: number;
  /** Days since last interaction (mock) */
  daysSinceContact: number;
}

// =============================================================================
// FILTER STATE
// =============================================================================

/**
 * Filter state for the Customers Hub
 */
export interface CustomersHubFilterState {
  /** Text search query */
  searchQuery: string;
  /** Selected segment tab */
  segment: CustomerSegment;
  /** Health score range filter */
  healthRange: "all" | "healthy" | "moderate" | "at-risk";
  /** MRR range filter */
  mrrRange: "all" | "low" | "medium" | "high" | "enterprise";
}

// =============================================================================
// SEGMENT SUMMARY
// =============================================================================

/**
 * Summary statistics for a segment
 */
export interface SegmentSummary {
  segment: CustomerSegment;
  count: number;
  percentage: number;
  totalMrr: number;
  avgHealthScore: number;
}

/**
 * Complete segmentation summary
 */
export interface SegmentationSummary {
  total: number;
  segments: SegmentSummary[];
}
