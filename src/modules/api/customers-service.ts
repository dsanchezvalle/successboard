/**
 * Customers Service
 *
 * Facade for fetching and transforming Customers Hub data.
 * Provides a clean interface between the Customers UI and the mockapi backend.
 *
 * @module api/customers-service
 */

import {
  mockapi,
  type Customer,
  type Framework,
  type LifecycleStage,
  type CustomerTier,
  type TrendDirection,
  formatCurrency,
  formatCurrencyCompact,
  getHealthStatus,
  getLifecycleLabel,
  getTierLabel,
  type HealthStatus,
} from "./index";
import { isApiConfigured } from "./overview-service";

// =============================================================================
// VIEW MODEL TYPES
// =============================================================================

/**
 * Customer segment for UI tabs
 */
export type CustomerSegmentTab =
  | "all"
  | "active"
  | "at-risk"
  | "vip"
  | "onboarding"
  | "trial";

/**
 * Customer list item view model for the Customers Hub table
 */
export interface CustomerHubListItem {
  id: string;
  name: string;
  companyName: string;
  tier: CustomerTier;
  tierLabel: string;
  lifecycleStage: LifecycleStage;
  lifecycleLabel: string;
  healthScore: number;
  healthStatus: HealthStatus;
  healthTrend: TrendDirection;
  mrr: number;
  mrrFormatted: string;
  csmName: string;
  lastInteractionAt?: string;
  daysSinceContact: number;
  daysUntilRenewal?: number;
  riskFlags: string[];
  riskFlagCount: number;
  hasRiskFlags: boolean;
  /** Derived segment for filtering */
  segment: CustomerSegmentTab;
}

/**
 * Segment summary for cards/tabs
 */
export interface SegmentSummaryItem {
  segment: CustomerSegmentTab;
  label: string;
  count: number;
  percentage: number;
  totalMrr: number;
  totalMrrFormatted: string;
  avgHealthScore: number;
  color: "default" | "success" | "warning" | "danger" | "info";
}

/**
 * Complete segmentation summary
 */
export interface CustomersSegmentationSummary {
  total: number;
  totalMrr: number;
  totalMrrFormatted: string;
  avgHealthScore: number;
  segments: SegmentSummaryItem[];
}

/**
 * Framework/saved segment view model
 */
export interface FrameworkListItem {
  id: string;
  name: string;
  description: string;
  type: string;
  color: string;
  customerCount: number;
  isDefault: boolean;
}

/**
 * Complete Customers Hub data
 */
export interface CustomersHubData {
  /** Customer list items for the table */
  customers: CustomerHubListItem[];
  /** Segmentation summary for tabs and cards */
  summary: CustomersSegmentationSummary;
  /** Saved frameworks/segments (optional) */
  frameworks: FrameworkListItem[];
  /** Timestamp when data was fetched */
  fetchedAt: string;
  /** Whether data came from fallback/mock */
  isFallback: boolean;
}

// =============================================================================
// SEGMENT CONFIGURATION
// =============================================================================

const SEGMENT_CONFIG: Record<
  CustomerSegmentTab,
  { label: string; color: SegmentSummaryItem["color"] }
> = {
  all: { label: "All Customers", color: "default" },
  active: { label: "Active", color: "success" },
  "at-risk": { label: "At-Risk", color: "danger" },
  vip: { label: "VIP", color: "info" },
  onboarding: { label: "Onboarding", color: "warning" },
  trial: { label: "Trial", color: "default" },
};

// =============================================================================
// MAPPERS
// =============================================================================

/**
 * Derive segment from customer data
 */
function deriveSegment(customer: Customer): CustomerSegmentTab {
  // At-risk takes priority
  if (customer.lifecycleStage === "at-risk" || customer.healthScore < 50) {
    return "at-risk";
  }

  // VIP: strategic tier or high MRR
  if (customer.tier === "strategic" || customer.mrr >= 5000000) {
    return "vip";
  }

  // Lifecycle-based segments
  if (customer.lifecycleStage === "onboarding") {
    return "onboarding";
  }

  if (customer.lifecycleStage === "trial") {
    return "trial";
  }

  // Default to active
  return "active";
}

/**
 * Calculate days since last interaction
 */
function calculateDaysSinceContact(lastInteractionAt?: string): number {
  if (!lastInteractionAt) return 0;

  const lastInteraction = new Date(lastInteractionAt);
  const now = new Date();
  return Math.floor(
    (now.getTime() - lastInteraction.getTime()) / (1000 * 60 * 60 * 24)
  );
}

/**
 * Map API customer to hub list item
 */
function mapCustomerToHubListItem(customer: Customer): CustomerHubListItem {
  const segment = deriveSegment(customer);
  const daysSinceContact = calculateDaysSinceContact(
    customer.lastInteractionAt
  );

  return {
    id: customer.id,
    name: customer.name,
    companyName: customer.companyName,
    tier: customer.tier,
    tierLabel: getTierLabel(customer.tier),
    lifecycleStage: customer.lifecycleStage,
    lifecycleLabel: getLifecycleLabel(customer.lifecycleStage),
    healthScore: customer.healthScore,
    healthStatus: getHealthStatus(customer.healthScore),
    healthTrend: customer.healthTrend,
    mrr: customer.mrr,
    mrrFormatted: formatCurrency(customer.mrr, customer.currency),
    csmName: customer.csmName,
    lastInteractionAt: customer.lastInteractionAt,
    daysSinceContact,
    daysUntilRenewal: customer.daysUntilRenewal,
    riskFlags: customer.riskFlags,
    riskFlagCount: customer.riskFlags.length,
    hasRiskFlags: customer.riskFlags.length > 0,
    segment,
  };
}

/**
 * Map API framework to list item
 */
function mapFrameworkToListItem(framework: Framework): FrameworkListItem {
  return {
    id: framework.id,
    name: framework.name,
    description: framework.description,
    type: framework.type,
    color: framework.color,
    customerCount: framework.customerCount ?? 0,
    isDefault: framework.isDefault,
  };
}

/**
 * Calculate segmentation summary from customer list
 */
function calculateSegmentationSummary(
  customers: CustomerHubListItem[]
): CustomersSegmentationSummary {
  const total = customers.length;
  const totalMrr = customers.reduce((sum, c) => sum + c.mrr, 0);
  const avgHealthScore =
    total > 0
      ? customers.reduce((sum, c) => sum + c.healthScore, 0) / total
      : 0;

  // Group by segment
  const segmentGroups: Record<CustomerSegmentTab, CustomerHubListItem[]> = {
    all: customers,
    active: [],
    "at-risk": [],
    vip: [],
    onboarding: [],
    trial: [],
  };

  for (const customer of customers) {
    if (customer.segment !== "all") {
      segmentGroups[customer.segment].push(customer);
    }
  }

  // Build segment summaries
  const segmentKeys: CustomerSegmentTab[] = [
    "active",
    "at-risk",
    "vip",
    "onboarding",
    "trial",
  ];
  const segments: SegmentSummaryItem[] = segmentKeys.map((segment) => {
    const segmentCustomers = segmentGroups[segment];
    const count = segmentCustomers.length;
    const percentage = total > 0 ? (count / total) * 100 : 0;
    const segmentTotalMrr = segmentCustomers.reduce((sum, c) => sum + c.mrr, 0);
    const segmentAvgHealth =
      count > 0
        ? segmentCustomers.reduce((sum, c) => sum + c.healthScore, 0) / count
        : 0;

    const config = SEGMENT_CONFIG[segment];

    return {
      segment,
      label: config.label,
      count,
      percentage,
      totalMrr: segmentTotalMrr,
      totalMrrFormatted: formatCurrencyCompact(segmentTotalMrr, "USD"),
      avgHealthScore: segmentAvgHealth,
      color: config.color,
    };
  });

  return {
    total,
    totalMrr,
    totalMrrFormatted: formatCurrencyCompact(totalMrr, "USD"),
    avgHealthScore,
    segments,
  };
}

// =============================================================================
// FALLBACK DATA
// =============================================================================

/**
 * Generate mock customers for demo/fallback
 */
function getMockCustomers(): CustomerHubListItem[] {
  const mockData: CustomerHubListItem[] = [
    {
      id: "cust_001",
      name: "Acme Corporation",
      companyName: "Acme Corp",
      tier: "enterprise",
      tierLabel: "Enterprise",
      lifecycleStage: "active",
      lifecycleLabel: "Active",
      healthScore: 85,
      healthStatus: "thriving",
      healthTrend: "up",
      mrr: 2500000,
      mrrFormatted: "$25,000",
      csmName: "Sarah Johnson",
      lastInteractionAt: new Date(
        Date.now() - 5 * 24 * 60 * 60 * 1000
      ).toISOString(),
      daysSinceContact: 5,
      daysUntilRenewal: 45,
      riskFlags: [],
      riskFlagCount: 0,
      hasRiskFlags: false,
      segment: "active",
    },
    {
      id: "cust_002",
      name: "TechStart Inc",
      companyName: "TechStart Inc",
      tier: "mid-market",
      tierLabel: "Mid-Market",
      lifecycleStage: "at-risk",
      lifecycleLabel: "At-Risk",
      healthScore: 42,
      healthStatus: "at-risk",
      healthTrend: "down",
      mrr: 800000,
      mrrFormatted: "$8,000",
      csmName: "Mike Chen",
      lastInteractionAt: new Date(
        Date.now() - 25 * 24 * 60 * 60 * 1000
      ).toISOString(),
      daysSinceContact: 25,
      daysUntilRenewal: 15,
      riskFlags: ["low-adoption", "support-escalation"],
      riskFlagCount: 2,
      hasRiskFlags: true,
      segment: "at-risk",
    },
    {
      id: "cust_003",
      name: "Global Services Ltd",
      companyName: "Global Services Ltd",
      tier: "strategic",
      tierLabel: "Strategic",
      lifecycleStage: "active",
      lifecycleLabel: "Active",
      healthScore: 92,
      healthStatus: "thriving",
      healthTrend: "up",
      mrr: 7500000,
      mrrFormatted: "$75,000",
      csmName: "Sarah Johnson",
      lastInteractionAt: new Date(
        Date.now() - 2 * 24 * 60 * 60 * 1000
      ).toISOString(),
      daysSinceContact: 2,
      daysUntilRenewal: 120,
      riskFlags: [],
      riskFlagCount: 0,
      hasRiskFlags: false,
      segment: "vip",
    },
    {
      id: "cust_004",
      name: "StartupXYZ",
      companyName: "StartupXYZ",
      tier: "smb",
      tierLabel: "SMB",
      lifecycleStage: "onboarding",
      lifecycleLabel: "Onboarding",
      healthScore: 68,
      healthStatus: "healthy",
      healthTrend: "up",
      mrr: 150000,
      mrrFormatted: "$1,500",
      csmName: "Emily Davis",
      lastInteractionAt: new Date(
        Date.now() - 1 * 24 * 60 * 60 * 1000
      ).toISOString(),
      daysSinceContact: 1,
      riskFlags: [],
      riskFlagCount: 0,
      hasRiskFlags: false,
      segment: "onboarding",
    },
    {
      id: "cust_005",
      name: "MegaCorp Industries",
      companyName: "MegaCorp Industries",
      tier: "enterprise",
      tierLabel: "Enterprise",
      lifecycleStage: "active",
      lifecycleLabel: "Active",
      healthScore: 78,
      healthStatus: "healthy",
      healthTrend: "flat",
      mrr: 3200000,
      mrrFormatted: "$32,000",
      csmName: "Mike Chen",
      lastInteractionAt: new Date(
        Date.now() - 8 * 24 * 60 * 60 * 1000
      ).toISOString(),
      daysSinceContact: 8,
      daysUntilRenewal: 90,
      riskFlags: [],
      riskFlagCount: 0,
      hasRiskFlags: false,
      segment: "active",
    },
    {
      id: "cust_006",
      name: "CloudFirst Solutions",
      companyName: "CloudFirst Solutions",
      tier: "mid-market",
      tierLabel: "Mid-Market",
      lifecycleStage: "trial",
      lifecycleLabel: "Trial",
      healthScore: 55,
      healthStatus: "at-risk",
      healthTrend: "flat",
      mrr: 0,
      mrrFormatted: "$0",
      csmName: "Emily Davis",
      lastInteractionAt: new Date(
        Date.now() - 3 * 24 * 60 * 60 * 1000
      ).toISOString(),
      daysSinceContact: 3,
      riskFlags: [],
      riskFlagCount: 0,
      hasRiskFlags: false,
      segment: "trial",
    },
    {
      id: "cust_007",
      name: "DataDriven Co",
      companyName: "DataDriven Co",
      tier: "enterprise",
      tierLabel: "Enterprise",
      lifecycleStage: "at-risk",
      lifecycleLabel: "At-Risk",
      healthScore: 35,
      healthStatus: "critical",
      healthTrend: "down",
      mrr: 4500000,
      mrrFormatted: "$45,000",
      csmName: "Sarah Johnson",
      lastInteractionAt: new Date(
        Date.now() - 45 * 24 * 60 * 60 * 1000
      ).toISOString(),
      daysSinceContact: 45,
      daysUntilRenewal: 30,
      riskFlags: ["champion-left", "no-engagement"],
      riskFlagCount: 2,
      hasRiskFlags: true,
      segment: "at-risk",
    },
    {
      id: "cust_008",
      name: "InnovateTech",
      companyName: "InnovateTech",
      tier: "smb",
      tierLabel: "SMB",
      lifecycleStage: "active",
      lifecycleLabel: "Active",
      healthScore: 72,
      healthStatus: "healthy",
      healthTrend: "up",
      mrr: 250000,
      mrrFormatted: "$2,500",
      csmName: "Mike Chen",
      lastInteractionAt: new Date(
        Date.now() - 12 * 24 * 60 * 60 * 1000
      ).toISOString(),
      daysSinceContact: 12,
      daysUntilRenewal: 180,
      riskFlags: [],
      riskFlagCount: 0,
      hasRiskFlags: false,
      segment: "active",
    },
  ];

  return mockData;
}

/**
 * Get fallback data when API is unavailable
 */
function getFallbackData(): CustomersHubData {
  const customers = getMockCustomers();
  const summary = calculateSegmentationSummary(customers);

  return {
    customers,
    summary,
    frameworks: [],
    fetchedAt: new Date().toISOString(),
    isFallback: true,
  };
}

// =============================================================================
// SERVICE FUNCTIONS
// =============================================================================

/**
 * Fetch complete Customers Hub data
 *
 * This is the main entry point for the Customers page.
 * It fetches customers and frameworks, then maps them to view models.
 *
 * @param options - Fetch options
 * @returns Customers Hub data
 *
 * @example
 * ```ts
 * const data = await getCustomersHubData();
 * console.log(data.customers.length); // 156
 * console.log(data.summary.segments); // [{ segment: "active", count: 98 }, ...]
 * ```
 */
export async function getCustomersHubData(options?: {
  /** Limit number of customers */
  limit?: number;
  /** Filter by lifecycle stage */
  lifecycleStage?: LifecycleStage;
  /** Filter by tier */
  tier?: CustomerTier;
}): Promise<CustomersHubData> {
  // Check if API is configured
  if (!isApiConfigured()) {
    console.warn("[customers-service] API not configured, using fallback data");
    return getFallbackData();
  }

  try {
    // Fetch customers and frameworks in parallel
    const [customersResult, frameworksResult] = await Promise.allSettled([
      mockapi.getCustomers({
        limit: options?.limit ?? 100,
        lifecycleStage: options?.lifecycleStage,
        tier: options?.tier,
      }),
      mockapi.getFrameworks(),
    ]);

    // Handle customers
    let customers: CustomerHubListItem[] = [];
    if (customersResult.status === "fulfilled") {
      customers = customersResult.value.data.map(mapCustomerToHubListItem);
    } else {
      console.warn(
        "[customers-service] Failed to fetch customers:",
        customersResult.reason
      );
      return getFallbackData();
    }

    // Handle frameworks
    let frameworks: FrameworkListItem[] = [];
    if (frameworksResult.status === "fulfilled") {
      frameworks = frameworksResult.value.data.map(mapFrameworkToListItem);
    } else {
      console.warn(
        "[customers-service] Failed to fetch frameworks:",
        frameworksResult.reason
      );
      // Continue without frameworks - customers are more important
    }

    // Calculate summary
    const summary = calculateSegmentationSummary(customers);

    return {
      customers,
      summary,
      frameworks,
      fetchedAt: new Date().toISOString(),
      isFallback: false,
    };
  } catch (error) {
    console.error("[customers-service] Error fetching customers data:", error);
    return getFallbackData();
  }
}

/**
 * Get mock customers hub data for development/demo purposes
 *
 * This provides realistic-looking data when the API is not configured.
 */
export function getMockCustomersHubData(): CustomersHubData {
  return getFallbackData();
}

// =============================================================================
// FILTER UTILITIES
// =============================================================================

/**
 * Filter customers by segment
 */
export function filterCustomersBySegment(
  customers: CustomerHubListItem[],
  segment: CustomerSegmentTab
): CustomerHubListItem[] {
  if (segment === "all") return customers;
  return customers.filter((c) => c.segment === segment);
}

/**
 * Filter customers by search query
 */
export function filterCustomersBySearch(
  customers: CustomerHubListItem[],
  query: string
): CustomerHubListItem[] {
  if (!query.trim()) return customers;

  const lowerQuery = query.toLowerCase();
  return customers.filter(
    (c) =>
      c.name.toLowerCase().includes(lowerQuery) ||
      c.companyName.toLowerCase().includes(lowerQuery) ||
      c.csmName.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Filter customers by health range
 */
export function filterCustomersByHealthRange(
  customers: CustomerHubListItem[],
  range: "all" | "healthy" | "moderate" | "at-risk"
): CustomerHubListItem[] {
  if (range === "all") return customers;

  return customers.filter((c) => {
    switch (range) {
      case "healthy":
        return c.healthScore >= 70;
      case "moderate":
        return c.healthScore >= 40 && c.healthScore < 70;
      case "at-risk":
        return c.healthScore < 40;
      default:
        return true;
    }
  });
}

/**
 * Filter customers by MRR range (in cents)
 */
export function filterCustomersByMrrRange(
  customers: CustomerHubListItem[],
  range: "all" | "low" | "medium" | "high" | "enterprise"
): CustomerHubListItem[] {
  if (range === "all") return customers;

  return customers.filter((c) => {
    const mrrDollars = c.mrr / 100;
    switch (range) {
      case "low":
        return mrrDollars < 5000;
      case "medium":
        return mrrDollars >= 5000 && mrrDollars < 25000;
      case "high":
        return mrrDollars >= 25000 && mrrDollars < 100000;
      case "enterprise":
        return mrrDollars >= 100000;
      default:
        return true;
    }
  });
}
