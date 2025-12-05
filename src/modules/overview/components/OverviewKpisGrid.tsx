import type { OverviewKpis } from "@/modules/overview/types";
import { KpiCard } from "@/modules/overview/components/KpiCard";

interface OverviewKpisGridProps {
  kpis: OverviewKpis;
}

function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function OverviewKpisGrid({ kpis }: OverviewKpisGridProps) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-semibold text-slate-50">Overview KPIs</h2>
        <p className="text-xs text-slate-400">
          High-level snapshot of your customer base and health, combining real
          Petclinic data with mocked CS metrics.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total customers"
          value={formatNumber(kpis.totalCustomers)}
          description="Unique Petclinic owners."
        />
        <KpiCard
          title="Customers with pets"
          value={formatNumber(kpis.customersWithPets)}
          description="Owners that have at least one pet."
        />
        <KpiCard
          title="Customers without pets"
          value={formatNumber(kpis.customersWithoutPets)}
          description="Owners currently without registered pets."
        />
        <KpiCard
          title="Avg. pets per customer"
          value={kpis.avgPetsPerCustomer.toFixed(2)}
          description="Based on Petclinic owner records."
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Active customers (mock)"
          value={formatNumber(kpis.activeCustomers)}
          description="Estimated active accounts."
        />
        <KpiCard
          title="At-risk customers (mock)"
          value={formatNumber(kpis.atRiskCustomers)}
          description="Accounts requiring attention."
        />
        <KpiCard
          title="VIP customers (mock)"
          value={formatNumber(kpis.vipCustomers)}
          description="High-value accounts."
        />
        <KpiCard
          title="Churn rate (mock)"
          value={formatPercent(kpis.churnRate)}
          description="Approximate risk based on at-risk share."
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="MRR (mock)"
          value={formatCurrency(kpis.mrr)}
          description="Estimated monthly recurring revenue."
        />
      </div>
    </section>
  );
}
