/**
 * API Data Mappers
 *
 * Transform API responses into view models for UI consumption.
 * These mappers provide a clean separation between API data shapes
 * and the shapes expected by UI components.
 *
 * @module api/mappers
 *
 * TODO: Implement mappers when integrating mockapi with UI components
 */

import type {
  Customer,
  MetricsSummary,
  Framework,
  LifecycleStage,
  CustomerTier,
  TrendDirection,
} from "./types";

// =============================================================================
// CURRENCY FORMATTING
// =============================================================================

/**
 * Format cents to currency string
 *
 * @param cents - Amount in cents
 * @param currency - Currency code (default: USD)
 * @returns Formatted currency string
 *
 * @example
 * ```ts
 * formatCurrency(2500000) // "$25,000"
 * formatCurrency(2500000, "EUR") // "€25,000"
 * ```
 */
export function formatCurrency(
  cents: number,
  currency: string = "USD"
): string {
  const amount = cents / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format cents to compact currency string
 *
 * @param cents - Amount in cents
 * @param currency - Currency code (default: USD)
 * @returns Compact formatted currency string
 *
 * @example
 * ```ts
 * formatCurrencyCompact(2500000) // "$25K"
 * formatCurrencyCompact(125000000) // "$1.25M"
 * ```
 */
export function formatCurrencyCompact(
  cents: number,
  currency: string = "USD"
): string {
  const amount = cents / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(amount);
}

// =============================================================================
// PERCENTAGE FORMATTING
// =============================================================================

/**
 * Format decimal to percentage string
 *
 * @param decimal - Decimal value (0-1)
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted percentage string
 *
 * @example
 * ```ts
 * formatPercent(0.035) // "3.5%"
 * formatPercent(0.035, 0) // "4%"
 * ```
 */
export function formatPercent(decimal: number, decimals: number = 1): string {
  return `${(decimal * 100).toFixed(decimals)}%`;
}

// =============================================================================
// HEALTH SCORE UTILITIES
// =============================================================================

/**
 * Health score status levels
 */
export type HealthStatus = "critical" | "at-risk" | "healthy" | "thriving";

/**
 * Get health status from score
 *
 * @param score - Health score (0-100)
 * @returns Health status category
 */
export function getHealthStatus(score: number): HealthStatus {
  if (score < 40) return "critical";
  if (score < 70) return "at-risk";
  if (score < 85) return "healthy";
  return "thriving";
}

/**
 * Get display color for health status
 *
 * @param status - Health status
 * @returns Tailwind color class
 */
export function getHealthColor(status: HealthStatus): string {
  switch (status) {
    case "critical":
      return "text-red-400";
    case "at-risk":
      return "text-amber-400";
    case "healthy":
      return "text-green-400";
    case "thriving":
      return "text-emerald-400";
  }
}

/**
 * Get background color for health status
 *
 * @param status - Health status
 * @returns Tailwind background color class
 */
export function getHealthBgColor(status: HealthStatus): string {
  switch (status) {
    case "critical":
      return "bg-red-900/50";
    case "at-risk":
      return "bg-amber-900/50";
    case "healthy":
      return "bg-green-900/50";
    case "thriving":
      return "bg-emerald-900/50";
  }
}

// =============================================================================
// LIFECYCLE STAGE UTILITIES
// =============================================================================

/**
 * Get display label for lifecycle stage
 */
export function getLifecycleLabel(stage: LifecycleStage): string {
  const labels: Record<LifecycleStage, string> = {
    prospect: "Prospect",
    trial: "Trial",
    onboarding: "Onboarding",
    active: "Active",
    expanding: "Expanding",
    "at-risk": "At-Risk",
    churned: "Churned",
  };
  return labels[stage];
}

/**
 * Get display color for lifecycle stage
 */
export function getLifecycleColor(stage: LifecycleStage): string {
  const colors: Record<LifecycleStage, string> = {
    prospect: "text-gray-400",
    trial: "text-purple-400",
    onboarding: "text-blue-400",
    active: "text-green-400",
    expanding: "text-emerald-400",
    "at-risk": "text-amber-400",
    churned: "text-red-400",
  };
  return colors[stage];
}

// =============================================================================
// TIER UTILITIES
// =============================================================================

/**
 * Get display label for customer tier
 */
export function getTierLabel(tier: CustomerTier): string {
  const labels: Record<CustomerTier, string> = {
    smb: "SMB",
    "mid-market": "Mid-Market",
    enterprise: "Enterprise",
    strategic: "Strategic",
  };
  return labels[tier];
}

/**
 * Get display color for customer tier
 */
export function getTierColor(tier: CustomerTier): string {
  const colors: Record<CustomerTier, string> = {
    smb: "text-gray-400",
    "mid-market": "text-blue-400",
    enterprise: "text-purple-400",
    strategic: "text-amber-400",
  };
  return colors[tier];
}

// =============================================================================
// TREND UTILITIES
// =============================================================================

/**
 * Get trend icon character
 */
export function getTrendIcon(trend: TrendDirection): string {
  switch (trend) {
    case "up":
      return "↑";
    case "down":
      return "↓";
    case "flat":
      return "→";
  }
}

/**
 * Get trend color
 *
 * @param trend - Trend direction
 * @param invertColors - If true, "up" is bad (e.g., for churn rate)
 */
export function getTrendColor(
  trend: TrendDirection,
  invertColors: boolean = false
): string {
  if (trend === "flat") return "text-gray-400";

  const isPositive = invertColors ? trend === "down" : trend === "up";
  return isPositive ? "text-green-400" : "text-red-400";
}

// =============================================================================
// VIEW MODEL MAPPERS
// =============================================================================

/**
 * Customer view model for list display
 *
 * TODO: Use this when integrating Customers Hub with mockapi
 */
export interface CustomerListItem {
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
  mrrFormatted: string;
  arrFormatted: string;
  csmName: string;
  lastInteractionAt?: string;
  daysUntilRenewal?: number;
  riskFlagCount: number;
  hasRiskFlags: boolean;
}

/**
 * Map API customer to list view model
 *
 * @param customer - API customer object
 * @returns Customer list item view model
 *
 * TODO: Use this when integrating Customers Hub with mockapi
 */
export function mapCustomerToListItem(customer: Customer): CustomerListItem {
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
    mrrFormatted: formatCurrency(customer.mrr, customer.currency),
    arrFormatted: formatCurrency(customer.arr, customer.currency),
    csmName: customer.csmName,
    lastInteractionAt: customer.lastInteractionAt,
    daysUntilRenewal: customer.daysUntilRenewal,
    riskFlagCount: customer.riskFlags.length,
    hasRiskFlags: customer.riskFlags.length > 0,
  };
}

/**
 * Overview metrics view model
 *
 * TODO: Use this when integrating Overview with mockapi
 */
export interface OverviewMetricsViewModel {
  totalCustomers: number;
  totalMrrFormatted: string;
  totalArrFormatted: string;
  churnRateFormatted: string;
  churnTrend: TrendDirection;
  churnTrendColor: string;
  atRiskCount: number;
  vipCount: number;
  avgHealthScore: number;
  healthStatus: HealthStatus;
  healthTrend: TrendDirection;
  healthTrendColor: string;
  expansionPipelineFormatted: string;
  nrrFormatted: string;
  grrFormatted: string;
}

/**
 * Map API metrics to overview view model
 *
 * @param metrics - API metrics summary
 * @returns Overview metrics view model
 *
 * TODO: Use this when integrating Overview with mockapi
 */
export function mapMetricsToOverview(
  metrics: MetricsSummary
): OverviewMetricsViewModel {
  return {
    totalCustomers: metrics.totalCustomers,
    totalMrrFormatted: formatCurrencyCompact(
      metrics.totalMrr,
      metrics.currency
    ),
    totalArrFormatted: formatCurrencyCompact(
      metrics.totalArr,
      metrics.currency
    ),
    churnRateFormatted: formatPercent(metrics.churnRate),
    churnTrend: metrics.churnTrend,
    churnTrendColor: getTrendColor(metrics.churnTrend, true), // Inverted: down is good
    atRiskCount: metrics.atRiskCount,
    vipCount: metrics.vipCount,
    avgHealthScore: metrics.avgHealthScore,
    healthStatus: getHealthStatus(metrics.avgHealthScore),
    healthTrend: metrics.healthTrend,
    healthTrendColor: getTrendColor(metrics.healthTrend),
    expansionPipelineFormatted: formatCurrencyCompact(
      metrics.expansionPipelineMrr,
      metrics.currency
    ),
    nrrFormatted: formatPercent(metrics.netRevenueRetention),
    grrFormatted: formatPercent(metrics.grossRevenueRetention),
  };
}

/**
 * Framework/Segment view model
 *
 * TODO: Use this when integrating segment filters with mockapi
 */
export interface FrameworkViewModel {
  id: string;
  name: string;
  description: string;
  type: string;
  color: string;
  customerCount: number;
  isDefault: boolean;
}

/**
 * Map API framework to view model
 */
export function mapFrameworkToViewModel(
  framework: Framework
): FrameworkViewModel {
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
