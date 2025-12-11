/**
 * OverviewKpisGrid - Main dashboard metrics display
 *
 * Organizes KPIs into logical sections with visual hierarchy.
 * Uses the new MetricCard and section components.
 *
 * @accessibility
 * - Proper heading hierarchy (H2 for sections)
 * - Color supplemented with text labels
 * - Good contrast ratios
 */

import type {
  OverviewKpisViewModel,
  HealthDistributionViewModel,
} from "@/modules/api";
import { MetricCard } from "./MetricCard";
import { MetricsSection } from "./MetricsSection";
import { CustomerHealthSummary } from "./CustomerHealthSummary";
import { RevenueHighlight } from "./RevenueHighlight";

interface OverviewKpisGridProps {
  kpis: OverviewKpisViewModel;
  healthDistribution: HealthDistributionViewModel;
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function OverviewKpisGrid({
  kpis,
  healthDistribution,
}: OverviewKpisGridProps) {
  const atRiskStatus = kpis.atRiskCustomers > 5 ? "warning" : "default";

  // Determine health score status
  const healthScoreStatus =
    kpis.avgHealthScore >= 70
      ? "success"
      : kpis.avgHealthScore >= 50
      ? "warning"
      : "danger";

  return (
    <div className="space-y-8">
      {/* Hero Section: Revenue + Key Metrics */}
      <div className="grid gap-4 lg:grid-cols-3">
        <RevenueHighlight
          mrr={kpis.mrr}
          mrrFormatted={kpis.mrrFormatted}
          trend={kpis.mrrTrend}
          trendValue={kpis.mrrTrendValue}
          className="lg:col-span-1"
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:col-span-2">
          <MetricCard
            title="Total Customers"
            value={formatNumber(kpis.totalCustomers)}
            description="Active accounts in your portfolio"
            size="large"
            status="info"
            trend={kpis.customersTrend}
            trendValue={kpis.customersTrendValue}
          />
          <MetricCard
            title="Churn Rate"
            value={kpis.churnRateFormatted}
            description="Monthly customer churn"
            size="large"
            status={kpis.churnStatus}
            trend={kpis.churnTrend}
            trendValue={kpis.churnTrendValue}
          />
        </div>
      </div>

      {/* Customer Health Visual */}
      <CustomerHealthSummary
        total={healthDistribution.total}
        active={healthDistribution.active}
        atRisk={healthDistribution.atRisk}
        vip={healthDistribution.vip}
      />

      {/* Customer Segments */}
      <MetricsSection
        title="Customer Segments"
        subtitle="Breakdown of your customer portfolio by lifecycle stage"
        columns={4}
      >
        <MetricCard
          title="Active"
          value={formatNumber(kpis.activeCustomers)}
          description="Healthy, engaged accounts"
          status="success"
        />
        <MetricCard
          title="Onboarding"
          value={formatNumber(kpis.onboardingCustomers)}
          description="Recently signed customers"
          status="info"
        />
        <MetricCard
          title="Trial"
          value={formatNumber(kpis.trialCustomers)}
          description="Evaluating the product"
          status="default"
        />
        <MetricCard
          title="VIP"
          value={formatNumber(kpis.vipCustomers)}
          description="Strategic accounts"
          status="info"
        />
      </MetricsSection>

      {/* Health & Risk Metrics */}
      <MetricsSection
        title="Health & Risk"
        subtitle="Customer success health indicators"
        columns={3}
      >
        <MetricCard
          title="At-Risk Customers"
          value={formatNumber(kpis.atRiskCustomers)}
          description="Accounts needing attention"
          status={atRiskStatus}
        />
        <MetricCard
          title="Avg Health Score"
          value={`${Math.round(kpis.avgHealthScore)}%`}
          description="Portfolio health average"
          status={healthScoreStatus}
          trend={kpis.healthTrend}
        />
        {kpis.nrrFormatted && (
          <MetricCard
            title="Net Revenue Retention"
            value={kpis.nrrFormatted}
            description="Revenue retention rate"
            status={kpis.nrr && kpis.nrr >= 1 ? "success" : "warning"}
          />
        )}
      </MetricsSection>
    </div>
  );
}
