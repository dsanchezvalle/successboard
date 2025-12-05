import { HomeOverview } from "@/features/overview/components/HomeOverview";
import { getOverviewKpis } from "@/modules/overview/get-overview-kpis";
import { OverviewKpisGrid } from "@/modules/overview/components/OverviewKpisGrid";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const kpis = await getOverviewKpis();

  return (
    <main className="min-h-screen w-full flex justify-center px-4 py-8">
      <div className="w-full max-w-6xl space-y-6">
        <HomeOverview />
        <OverviewKpisGrid kpis={kpis} />
      </div>
    </main>
  );
}
