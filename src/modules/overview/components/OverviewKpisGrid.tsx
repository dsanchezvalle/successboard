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

import type { OverviewKpis } from "@/modules/overview/types";
import { MetricCard } from "./MetricCard";
import { MetricsSection } from "./MetricsSection";
import { CustomerHealthSummary } from "./CustomerHealthSummary";
import { RevenueHighlight } from "./RevenueHighlight";

interface OverviewKpisGridProps {
  kpis: OverviewKpis;
}

function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function OverviewKpisGrid({ kpis }: OverviewKpisGridProps) {
  // Determine status based on thresholds
  const churnStatus =
    kpis.churnRate > 0.2
      ? "danger"
      : kpis.churnRate > 0.1
      ? "warning"
      : "success";
  const atRiskStatus = kpis.atRiskCustomers > 5 ? "warning" : "default";

  return (
    <div className="space-y-8">
      {/* Hero Section: Revenue + Key Metrics */}
      <div className="grid gap-4 lg:grid-cols-3">
        <RevenueHighlight
          mrr={kpis.mrr}
          trend={5.2} // Mock trend for visual demo
          className="lg:col-span-1"
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:col-span-2">
          <MetricCard
            title="Total Customers"
            value={formatNumber(kpis.totalCustomers)}
            description="Active accounts in your portfolio"
            size="large"
            status="info"
            trend="up"
            trendValue="+12%"
          />
          <MetricCard
            title="Churn Rate"
            value={formatPercent(kpis.churnRate)}
            description="Monthly customer churn"
            size="large"
            status={churnStatus}
            trend={kpis.churnRate > 0.1 ? "up" : "down"}
            trendValue={kpis.churnRate > 0.1 ? "+2.1%" : "-1.5%"}
          />
        </div>
      </div>

      {/* Customer Health Visual */}
      <CustomerHealthSummary
        total={kpis.totalCustomers}
        active={kpis.activeCustomers}
        atRisk={kpis.atRiskCustomers}
        vip={kpis.vipCustomers}
      />

      {/* Customer Base Metrics */}
      <MetricsSection
        title="Customer Base"
        subtitle="Breakdown of your customer portfolio from Petclinic data"
        columns={4}
      >
        <MetricCard
          title="With Pets"
          value={formatNumber(kpis.customersWithPets)}
          description="Owners with registered pets"
          status="success"
        />
        <MetricCard
          title="Without Pets"
          value={formatNumber(kpis.customersWithoutPets)}
          description="Owners without pets yet"
          status={kpis.customersWithoutPets > 0 ? "warning" : "default"}
        />
        <MetricCard
          title="Avg. Pets/Customer"
          value={kpis.avgPetsPerCustomer.toFixed(2)}
          description="Pet density per owner"
        />
        <MetricCard
          title="Active Customers"
          value={formatNumber(kpis.activeCustomers)}
          description="Engaged accounts"
          status="success"
        />
      </MetricsSection>

      {/* Health & Risk Metrics */}
      <MetricsSection
        title="Health & Risk"
        subtitle="Customer success health indicators (mock data)"
        columns={3}
      >
        <MetricCard
          title="At-Risk Customers"
          value={formatNumber(kpis.atRiskCustomers)}
          description="Accounts needing attention"
          status={atRiskStatus}
          trend={kpis.atRiskCustomers > 3 ? "up" : "down"}
          trendValue={kpis.atRiskCustomers > 3 ? "+2" : "-1"}
        />
        <MetricCard
          title="VIP Customers"
          value={formatNumber(kpis.vipCustomers)}
          description="High-value accounts"
          status="info"
        />
        <MetricCard
          title="Health Score"
          value={`${Math.round((1 - kpis.churnRate) * 100)}%`}
          description="Overall portfolio health"
          status={
            kpis.churnRate < 0.1
              ? "success"
              : kpis.churnRate < 0.2
              ? "warning"
              : "danger"
          }
        />
      </MetricsSection>
    </div>
  );
}
