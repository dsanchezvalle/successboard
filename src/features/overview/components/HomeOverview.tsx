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
      subtitle="Drive proactive success with AI-powered actionable insights. Elevate every customer journey through real-time health monitoring and strategic growth opportunities across your portfolio."
      maxWidth="2xl"
    />
  );
}
