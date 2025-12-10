import { HomeOverview } from "@/features/overview/components/HomeOverview";
import { getOverviewKpis } from "@/modules/overview/get-overview-kpis";
import { OverviewKpisGrid } from "@/modules/overview/components/OverviewKpisGrid";
import { Container, Section } from "@/design-system/primitives";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const kpis = await getOverviewKpis();

  return (
    <Container maxWidth="xl" padding="md" className="py-8">
      <Section as="div" spacing="none" gap="lg" aria-label="Dashboard overview">
        <HomeOverview />
        <OverviewKpisGrid kpis={kpis} />
      </Section>
    </Container>
  );
}
