/**
 * Segmentation Page - Redirects to Customers Hub
 *
 * Segmentation is now part of the unified Customers Hub experience.
 * This page renders the same Customers Hub but with segment view context.
 *
 * Route: /segmentation → Customers Hub with segment summary visible
 */

import { Suspense } from "react";
import { getCustomersFromPetclinic } from "@/features/customers/api/get-customers-from-petclinic";
import type { Customer } from "@/modules/customers/types";
import { Heading, Text } from "@/design-system/primitives";
import {
  CustomersHubClient,
  enrichCustomers,
  calculateSegmentationSummary,
} from "@/modules/customers-hub";

export const dynamic = "force-dynamic";

export default async function SegmentationPage() {
  const { customers, error } = await getCustomersFromPetclinic();

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="space-y-4">
          <Heading level={1} className="text-gray-50">
            Segmentation
          </Heading>
          <div
            className="rounded-xl border border-red-800/50 bg-red-950/30 p-4"
            role="alert"
          >
            <Text variant="body" color="error" weight="medium" className="mb-1">
              Failed to load customers.
            </Text>
            <Text variant="small" color="error">
              {error}
            </Text>
          </div>
        </div>
      </div>
    );
  }

  // Enrich customers with derived metrics and segments
  // TODO: Replace with mockapi /customers endpoint that returns enriched data
  const typedCustomers = (customers ?? []) as unknown as Customer[];
  const enrichedCustomers = enrichCustomers(typedCustomers);
  const summary = calculateSegmentationSummary(enrichedCustomers);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <Suspense fallback={<SegmentationSkeleton />}>
        {/* Render Customers Hub - "all" tab shows segment summary cards */}
        <CustomersHubClient
          customers={enrichedCustomers}
          summary={summary}
          initialSegment="all"
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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="h-32 rounded-xl bg-gray-800/50" />
        <div className="h-32 rounded-xl bg-gray-800/50" />
        <div className="h-32 rounded-xl bg-gray-800/50" />
        <div className="h-32 rounded-xl bg-gray-800/50" />
      </div>
    </div>
  );
}
