/**
 * Overview Page - Main Customer Success Dashboard
 *
 * The primary landing page showing customer success metrics, health indicators,
 * and actionable insights.
 *
 * Data is fetched from the mockapi.io backend via the overview-service.
 * Falls back to mock data if the API is not configured.
 */

import { HomeOverview } from "@/features/overview/components/HomeOverview";
import { OverviewKpisGrid } from "@/modules/overview/components/OverviewKpisGrid";
import { QuickActions } from "@/modules/overview/components/QuickActions";
import { AccountsNeedingAttention } from "@/modules/overview/components/AccountsNeedingAttention";
import {
  getOverviewDashboardData,
  getMockOverviewData,
  isApiConfigured,
  type OverviewDashboardData,
} from "@/modules/api";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Fetch dashboard data from API or use mock data
  let dashboardData: OverviewDashboardData;

  if (isApiConfigured()) {
    dashboardData = await getOverviewDashboardData({ atRiskLimit: 3 });
  } else {
    // Use mock data for development/demo when API is not configured
    dashboardData = getMockOverviewData();
  }

  const { kpis, healthDistribution, accountsNeedingAttention, isFallback } =
    dashboardData;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="space-y-8">
        {/* Page Header */}
        <HomeOverview />

        {/* API Status Banner (only shown if using fallback) */}
        {isFallback && (
          <div className="rounded-lg border border-amber-800/50 bg-amber-950/30 px-4 py-3 text-sm text-amber-200">
            <p className="font-medium">Using demo data</p>
            <p className="text-xs text-amber-300/70">
              Configure NEXT_PUBLIC_MOCKAPI_BASE_URL to connect to your backend.
            </p>
          </div>
        )}

        {/* Key Metrics & Health */}
        <OverviewKpisGrid kpis={kpis} healthDistribution={healthDistribution} />

        {/* Two-column layout for Actions and Attention */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Quick Actions */}
          <QuickActions atRiskCount={kpis.atRiskCustomers} />

          {/* Accounts Needing Attention */}
          <AccountsNeedingAttention accounts={accountsNeedingAttention} />
        </div>
      </div>
    </div>
  );
}
