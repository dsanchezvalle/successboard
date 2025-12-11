/**
 * Segmentation Page
 *
 * Segmentation is part of the unified Customers Hub experience.
 * This page renders the Customers Hub with the "all" segment selected
 * to show segment summary cards prominently.
 *
 * Data is fetched from the mockapi.io backend via the customers-service.
 * Falls back to mock data if the API is not configured.
 */

import { Suspense } from "react";
import { CustomersHubClient } from "@/modules/customers-hub/components/CustomersHubClient";
import {
  getCustomersHubData,
  getMockCustomersHubData,
  isApiConfigured,
  type CustomersHubData,
} from "@/modules/api";

export const dynamic = "force-dynamic";

export default async function SegmentationPage() {
  // Fetch dashboard data from API or use mock data
  let hubData: CustomersHubData;

  if (isApiConfigured()) {
    hubData = await getCustomersHubData();
  } else {
    hubData = getMockCustomersHubData();
  }

  const { customers, summary, isFallback } = hubData;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <Suspense fallback={<SegmentationSkeleton />}>
        {/* Render Customers Hub - "all" tab shows segment summary cards */}
        <CustomersHubClient
          customers={customers}
          summary={summary}
          initialSegment="all"
          isFallback={isFallback}
        />
      </Suspense>
    </div>
  );
}

function SegmentationSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-24 rounded-xl bg-gray-800/50" />
      <div className="h-12 rounded-lg bg-gray-800/50" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="h-32 rounded-xl bg-gray-800/50" />
        <div className="h-32 rounded-xl bg-gray-800/50" />
        <div className="h-32 rounded-xl bg-gray-800/50" />
        <div className="h-32 rounded-xl bg-gray-800/50" />
        <div className="h-32 rounded-xl bg-gray-800/50" />
      </div>
    </div>
  );
}
