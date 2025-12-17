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
    <div className="space-y-6 sm:space-y-8">
      {/* Hero Section: Revenue + Key Metrics (3-column on desktop) */}
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

      {/* Customer Segments - 2x2 on mobile, 4 columns on desktop */}
      <section className="space-y-3" aria-labelledby="segments-heading">
        <div className="space-y-1">
          <h2
            id="segments-heading"
            className="text-base font-semibold tracking-tight text-text-primary"
          >
            Customer Segments
          </h2>
          <p className="text-sm text-text-muted hidden sm:block">
            Breakdown of your customer portfolio by lifecycle stage
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <MetricCard
            title="Active"
            value={formatNumber(kpis.activeCustomers)}
            description="Healthy accounts"
            status="success"
            size="compact"
          />
          <MetricCard
            title="Onboarding"
            value={formatNumber(kpis.onboardingCustomers)}
            description="New customers"
            status="info"
            size="compact"
          />
          <MetricCard
            title="Trial"
            value={formatNumber(kpis.trialCustomers)}
            description="Evaluating"
            status="default"
            size="compact"
          />
          <MetricCard
            title="VIP"
            value={formatNumber(kpis.vipCustomers)}
            description="Strategic"
            status="info"
            size="compact"
          />
        </div>
      </section>

      {/* Health & Risk Metrics - responsive grid */}
      <section className="space-y-3" aria-labelledby="health-risk-heading">
        <div className="space-y-1">
          <h2
            id="health-risk-heading"
            className="text-base font-semibold tracking-tight text-text-primary"
          >
            Health & Risk
          </h2>
          <p className="text-sm text-text-muted hidden sm:block">
            Customer success health indicators
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <MetricCard
            title="At-Risk"
            value={formatNumber(kpis.atRiskCustomers)}
            description="Need attention"
            status={atRiskStatus}
            size="compact"
          />
          <MetricCard
            title="Health Score"
            value={`${Math.round(kpis.avgHealthScore)}%`}
            description="Portfolio avg"
            status={healthScoreStatus}
            trend={kpis.healthTrend}
            size="compact"
          />
          {kpis.nrrFormatted && (
            <MetricCard
              title="NRR"
              value={kpis.nrrFormatted}
              description="Net retention"
              status={kpis.nrr && kpis.nrr >= 1 ? "success" : "warning"}
              size="compact"
              className="col-span-2 sm:col-span-1"
            />
          )}
        </div>
      </section>
    </div>
  );
}
