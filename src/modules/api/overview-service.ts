/**
 * Overview Service
 *
 * Facade for fetching and transforming Overview dashboard data.
 * Provides a clean interface between the Overview UI and the mockapi backend.
 *
 * @module api/overview-service
 */

import {
  mockapi,
  type MetricsSummary,
  type Customer,
  type TrendDirection,
  formatCurrency,
  formatCurrencyCompact,
  formatPercent,
  getHealthStatus,
  getTrendColor,
  type HealthStatus,
} from "./index";
import { MockApiError } from "./mockapi";

// =============================================================================
// VIEW MODEL TYPES
// =============================================================================

/**
 * Account needing attention (at-risk customer summary)
 */
export interface AtRiskAccountViewModel {
  id: string;
  name: string;
  healthScore: number;
  riskReason: string;
  daysSinceContact: number;
  mrr: number;
  mrrFormatted: string;
}

/**
 * Health distribution for the progress bar
 */
export interface HealthDistributionViewModel {
  total: number;
  active: number;
  activePercent: number;
  atRisk: number;
  atRiskPercent: number;
  vip: number;
  vipPercent: number;
  onboarding: number;
  onboardingPercent: number;
}

/**
 * KPI metrics for the Overview grid
 */
export interface OverviewKpisViewModel {
  // Revenue
  mrr: number;
  mrrFormatted: string;
  mrrTrend: TrendDirection;
  mrrTrendValue: string;

  // Customers
  totalCustomers: number;
  customersTrend: TrendDirection;
  customersTrendValue: string;

  // Churn
  churnRate: number;
  churnRateFormatted: string;
  churnTrend: TrendDirection;
  churnTrendValue: string;
  churnStatus: "success" | "warning" | "danger";

  // Health
  avgHealthScore: number;
  healthStatus: HealthStatus;
  healthTrend: TrendDirection;

  // Segments
  activeCustomers: number;
  atRiskCustomers: number;
  vipCustomers: number;
  onboardingCustomers: number;
  trialCustomers: number;

  // Retention (optional, for future use)
  nrr?: number;
  nrrFormatted?: string;
  grr?: number;
  grrFormatted?: string;
}

/**
 * Complete Overview dashboard data
 */
export interface OverviewDashboardData {
  /** KPI metrics for cards and grids */
  kpis: OverviewKpisViewModel;
  /** Health distribution for progress bar */
  healthDistribution: HealthDistributionViewModel;
  /** At-risk accounts needing attention */
  accountsNeedingAttention: AtRiskAccountViewModel[];
  /** Timestamp when data was fetched */
  fetchedAt: string;
  /** Whether data came from fallback/mock */
  isFallback: boolean;
}

// =============================================================================
// FALLBACK DATA
// =============================================================================

/**
 * Fallback data when API is unavailable
 * This ensures the UI always renders something meaningful
 */
function getFallbackData(): OverviewDashboardData {
  return {
    kpis: {
      mrr: 0,
      mrrFormatted: "$0",
      mrrTrend: "flat",
      mrrTrendValue: "0%",
      totalCustomers: 0,
      customersTrend: "flat",
      customersTrendValue: "0%",
      churnRate: 0,
      churnRateFormatted: "0%",
      churnTrend: "flat",
      churnTrendValue: "0%",
      churnStatus: "success",
      avgHealthScore: 0,
      healthStatus: "at-risk",
      healthTrend: "flat",
      activeCustomers: 0,
      atRiskCustomers: 0,
      vipCustomers: 0,
      onboardingCustomers: 0,
      trialCustomers: 0,
    },
    healthDistribution: {
      total: 0,
      active: 0,
      activePercent: 0,
      atRisk: 0,
      atRiskPercent: 0,
      vip: 0,
      vipPercent: 0,
      onboarding: 0,
      onboardingPercent: 0,
    },
    accountsNeedingAttention: [],
    fetchedAt: new Date().toISOString(),
    isFallback: true,
  };
}

// =============================================================================
// MAPPERS
// =============================================================================

/**
 * Map API metrics to KPIs view model
 */
function mapMetricsToKpis(metrics: MetricsSummary): OverviewKpisViewModel {
  const churnStatus: "success" | "warning" | "danger" =
    metrics.churnRate > 0.1
      ? "danger"
      : metrics.churnRate > 0.05
      ? "warning"
      : "success";

  // Find segment counts from breakdown
  const activeSegment = metrics.lifecycleBreakdown?.find(
    (s) => s.segmentId === "active" || s.segmentName.toLowerCase() === "active"
  );
  const atRiskSegment = metrics.lifecycleBreakdown?.find(
    (s) =>
      s.segmentId === "at-risk" || s.segmentName.toLowerCase().includes("risk")
  );
  const vipSegment = metrics.tierBreakdown?.find(
    (s) => s.segmentId === "strategic" || s.segmentName.toLowerCase() === "vip"
  );
  const onboardingSegment = metrics.lifecycleBreakdown?.find(
    (s) =>
      s.segmentId === "onboarding" ||
      s.segmentName.toLowerCase() === "onboarding"
  );
  const trialSegment = metrics.lifecycleBreakdown?.find(
    (s) => s.segmentId === "trial" || s.segmentName.toLowerCase() === "trial"
  );

  return {
    mrr: metrics.totalMrr,
    mrrFormatted: formatCurrencyCompact(metrics.totalMrr, metrics.currency),
    mrrTrend: "up", // TODO: Calculate from historical data
    mrrTrendValue: "+5.2%",

    totalCustomers: metrics.totalCustomers,
    customersTrend: "up",
    customersTrendValue: "+12%",

    churnRate: metrics.churnRate,
    churnRateFormatted: formatPercent(metrics.churnRate),
    churnTrend: metrics.churnTrend,
    churnTrendValue: metrics.churnTrend === "up" ? "+2.1%" : "-1.5%",
    churnStatus,

    avgHealthScore: metrics.avgHealthScore,
    healthStatus: getHealthStatus(metrics.avgHealthScore),
    healthTrend: metrics.healthTrend,

    activeCustomers:
      activeSegment?.customerCount ?? Math.round(metrics.totalCustomers * 0.6),
    atRiskCustomers: metrics.atRiskCount,
    vipCustomers: metrics.vipCount,
    onboardingCustomers:
      onboardingSegment?.customerCount ?? metrics.onboardingCount,
    trialCustomers: trialSegment?.customerCount ?? metrics.trialCount,

    nrr: metrics.netRevenueRetention,
    nrrFormatted: formatPercent(metrics.netRevenueRetention),
    grr: metrics.grossRevenueRetention,
    grrFormatted: formatPercent(metrics.grossRevenueRetention),
  };
}

/**
 * Map metrics to health distribution view model
 */
function mapMetricsToHealthDistribution(
  metrics: MetricsSummary
): HealthDistributionViewModel {
  const total = metrics.totalCustomers;

  // Use lifecycle breakdown if available, otherwise estimate
  const activeSegment = metrics.lifecycleBreakdown?.find(
    (s) => s.segmentId === "active" || s.segmentName.toLowerCase() === "active"
  );
  const onboardingSegment = metrics.lifecycleBreakdown?.find(
    (s) => s.segmentId === "onboarding"
  );

  const active = activeSegment?.customerCount ?? Math.round(total * 0.6);
  const atRisk = metrics.atRiskCount;
  const vip = metrics.vipCount;
  const onboarding =
    onboardingSegment?.customerCount ?? metrics.onboardingCount;

  return {
    total,
    active,
    activePercent: total > 0 ? (active / total) * 100 : 0,
    atRisk,
    atRiskPercent: total > 0 ? (atRisk / total) * 100 : 0,
    vip,
    vipPercent: total > 0 ? (vip / total) * 100 : 0,
    onboarding,
    onboardingPercent: total > 0 ? (onboarding / total) * 100 : 0,
  };
}

/**
 * Map at-risk customers to view model
 */
function mapCustomerToAtRiskAccount(
  customer: Customer
): AtRiskAccountViewModel {
  // Calculate days since last interaction
  let daysSinceContact = 0;
  if (customer.lastInteractionAt) {
    const lastInteraction = new Date(customer.lastInteractionAt);
    const now = new Date();
    daysSinceContact = Math.floor(
      (now.getTime() - lastInteraction.getTime()) / (1000 * 60 * 60 * 24)
    );
  }

  // Determine primary risk reason
  let riskReason = "Health score declining";
  if (customer.riskFlags.length > 0) {
    const flagLabels: Record<string, string> = {
      "low-adoption": "Low product adoption",
      "billing-issue": "Billing issues detected",
      "champion-left": "Champion left the company",
      "support-escalation": "Support escalation active",
      "no-engagement": "No engagement in 30+ days",
      "delayed-renewal": "Renewal discussion pending",
      "negative-nps": "Negative NPS feedback",
    };
    riskReason = flagLabels[customer.riskFlags[0]] ?? customer.riskFlags[0];
  } else if (daysSinceContact > 30) {
    riskReason = `No contact in ${daysSinceContact}+ days`;
  }

  return {
    id: customer.id,
    name: customer.name,
    healthScore: customer.healthScore,
    riskReason,
    daysSinceContact,
    mrr: customer.mrr / 100, // Convert cents to dollars for display
    mrrFormatted: formatCurrency(customer.mrr, customer.currency),
  };
}

// =============================================================================
// SERVICE FUNCTIONS
// =============================================================================

/**
 * Fetch complete Overview dashboard data
 *
 * This is the main entry point for the Overview page.
 * It fetches metrics and at-risk customers, then maps them to view models.
 *
 * @param options - Fetch options
 * @returns Overview dashboard data
 *
 * @example
 * ```ts
 * const data = await getOverviewDashboardData();
 * console.log(data.kpis.mrrFormatted); // "$125K"
 * console.log(data.accountsNeedingAttention.length); // 3
 * ```
 */
export async function getOverviewDashboardData(options?: {
  /** Maximum number of at-risk accounts to fetch */
  atRiskLimit?: number;
}): Promise<OverviewDashboardData> {
  const { atRiskLimit = 5 } = options ?? {};

  try {
    // Fetch metrics and at-risk customers in parallel
    const [metricsResult, customersResult] = await Promise.allSettled([
      mockapi.getOverviewMetrics(),
      mockapi.getCustomers({
        lifecycleStage: "at-risk",
        sortBy: "healthScore",
        sortOrder: "asc",
        limit: atRiskLimit,
      }),
    ]);

    // Handle metrics
    let metrics: MetricsSummary;
    if (metricsResult.status === "fulfilled") {
      metrics = metricsResult.value;
    } else {
      console.warn(
        "[overview-service] Failed to fetch metrics:",
        metricsResult.reason
      );
      return getFallbackData();
    }

    // Handle at-risk customers
    let atRiskCustomers: Customer[] = [];
    if (customersResult.status === "fulfilled") {
      atRiskCustomers = customersResult.value.data;
    } else {
      console.warn(
        "[overview-service] Failed to fetch at-risk customers:",
        customersResult.reason
      );
      // Continue with empty list - metrics are more important
    }

    // Map to view models
    const kpis = mapMetricsToKpis(metrics);
    const healthDistribution = mapMetricsToHealthDistribution(metrics);
    const accountsNeedingAttention = atRiskCustomers.map(
      mapCustomerToAtRiskAccount
    );

    return {
      kpis,
      healthDistribution,
      accountsNeedingAttention,
      fetchedAt: new Date().toISOString(),
      isFallback: false,
    };
  } catch (error) {
    console.error("[overview-service] Error fetching overview data:", error);

    // Return fallback data on error
    return getFallbackData();
  }
}

/**
 * Check if the API is configured and available
 *
 * @returns Whether the API is ready to use
 */
export function isApiConfigured(): boolean {
  return !!process.env.NEXT_PUBLIC_MOCKAPI_BASE_URL;
}

/**
 * Get mock overview data for development/demo purposes
 *
 * This provides realistic-looking data when the API is not configured.
 * Useful for local development and demos.
 */
export function getMockOverviewData(): OverviewDashboardData {
  return {
    kpis: {
      mrr: 12500000, // $125,000 in cents
      mrrFormatted: "$125K",
      mrrTrend: "up",
      mrrTrendValue: "+5.2%",
      totalCustomers: 156,
      customersTrend: "up",
      customersTrendValue: "+12%",
      churnRate: 0.035,
      churnRateFormatted: "3.5%",
      churnTrend: "down",
      churnTrendValue: "-1.5%",
      churnStatus: "success",
      avgHealthScore: 72,
      healthStatus: "healthy",
      healthTrend: "up",
      activeCustomers: 98,
      atRiskCustomers: 12,
      vipCustomers: 24,
      onboardingCustomers: 8,
      trialCustomers: 14,
      nrr: 1.12,
      nrrFormatted: "112%",
      grr: 0.94,
      grrFormatted: "94%",
    },
    healthDistribution: {
      total: 156,
      active: 98,
      activePercent: 62.8,
      atRisk: 12,
      atRiskPercent: 7.7,
      vip: 24,
      vipPercent: 15.4,
      onboarding: 8,
      onboardingPercent: 5.1,
    },
    accountsNeedingAttention: [
      {
        id: "cust_001",
        name: "Acme Corporation",
        healthScore: 35,
        riskReason: "No engagement in 30+ days",
        daysSinceContact: 45,
        mrr: 2500,
        mrrFormatted: "$2,500",
      },
      {
        id: "cust_002",
        name: "TechStart Inc",
        healthScore: 42,
        riskReason: "Support escalation active",
        daysSinceContact: 12,
        mrr: 1800,
        mrrFormatted: "$1,800",
      },
      {
        id: "cust_003",
        name: "Global Services Ltd",
        healthScore: 28,
        riskReason: "Renewal discussion pending",
        daysSinceContact: 8,
        mrr: 4200,
        mrrFormatted: "$4,200",
      },
    ],
    fetchedAt: new Date().toISOString(),
    isFallback: false,
  };
}
