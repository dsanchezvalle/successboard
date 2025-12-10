/**
 * Overview Module Components
 *
 * Export all overview-related components for easy importing.
 */

export {
  MetricCard,
  type MetricCardProps,
  type MetricStatus,
  type MetricTrend,
  type MetricSize,
} from "./MetricCard";
export { MetricsSection, type MetricsSectionProps } from "./MetricsSection";
export { OverviewHeader, type OverviewHeaderProps } from "./OverviewHeader";
export { OverviewKpisGrid } from "./OverviewKpisGrid";
export {
  CustomerHealthSummary,
  type CustomerHealthSummaryProps,
} from "./CustomerHealthSummary";
export {
  RevenueHighlight,
  type RevenueHighlightProps,
} from "./RevenueHighlight";
export { QuickActions, type QuickActionsProps } from "./QuickActions";
export {
  AccountsNeedingAttention,
  type AccountsNeedingAttentionProps,
} from "./AccountsNeedingAttention";

// Legacy export (can be removed once no longer used)
export { KpiCard } from "./KpiCard";
