/**
 * Overview Page - Main Customer Success Dashboard
 *
 * The primary landing page showing customer success metrics, health indicators,
 * and actionable insights. Data fetching happens server-side via getOverviewKpis.
 *
 * TODO: Replace Petclinic-derived metrics with mockapi.io endpoints
 */

import { HomeOverview } from "@/features/overview/components/HomeOverview";
import { getOverviewKpis } from "@/modules/overview/get-overview-kpis";
import { OverviewKpisGrid } from "@/modules/overview/components/OverviewKpisGrid";
import { QuickActions } from "@/modules/overview/components/QuickActions";
import { AccountsNeedingAttention } from "@/modules/overview/components/AccountsNeedingAttention";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const kpis = await getOverviewKpis();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="space-y-8">
        {/* Page Header */}
        <HomeOverview />

        {/* Key Metrics & Health */}
        <OverviewKpisGrid kpis={kpis} />

        {/* Two-column layout for Actions and Attention */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Quick Actions */}
          <QuickActions atRiskCount={kpis.atRiskCustomers} />

          {/* Accounts Needing Attention */}
          <AccountsNeedingAttention limit={3} />
        </div>
      </div>
    </div>
  );
}
