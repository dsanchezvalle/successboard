/**
 * HomeOverview - Dashboard header section
 *
 * Displays the welcome message and page header for the Overview screen.
 * Uses the OverviewHeader component from the overview module.
 */

import { OverviewHeader } from "@/modules/overview/components/OverviewHeader";

export function HomeOverview() {
  return (
    <OverviewHeader
      title="Welcome to SuccessBoard"
      subtitle="Your customer success command center. Monitor health metrics, track engagement, and identify opportunities across your entire customer portfolio."
    />
  );
}
