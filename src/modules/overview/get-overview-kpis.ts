/**
 * @deprecated This module is deprecated. Use `getOverviewDashboardData()` from
 * `@/modules/api` instead, which fetches data from the mockapi.io backend.
 *
 * This legacy helper derives mock metrics from Petclinic data and will be
 * removed in a future cleanup batch.
 *
 * @see {@link @/modules/api/overview-service.ts}
 */

import { getCustomersFromPetclinic } from "@/features/customers/api/get-customers-from-petclinic";
import type { OverviewKpis } from "@/modules/overview/types";

/**
 * @deprecated Use `getOverviewDashboardData()` from `@/modules/api` instead.
 */
export async function getOverviewKpis(): Promise<OverviewKpis> {
  const { customers, error } = await getCustomersFromPetclinic();

  const safeCustomers = error || !customers ? [] : customers;

  const totalCustomers = safeCustomers.length;

  const customersWithPets = safeCustomers.filter(
    (c) => (c.petsCount ?? 0) > 0
  ).length;

  const customersWithoutPets = totalCustomers - customersWithPets;

  const totalPets = safeCustomers.reduce(
    (sum, c) => sum + (c.petsCount ?? 0),
    0
  );

  const avgPetsPerCustomer =
    totalCustomers > 0 ? totalPets / totalCustomers : 0;

  // Mock CS metrics derived from counts for determinism
  const activeRatio = totalCustomers > 0 ? 0.7 : 0;
  const atRiskRatio = totalCustomers > 0 ? 0.15 : 0;
  const vipRatio = totalCustomers > 0 ? 0.1 : 0;

  const activeCustomers = Math.round(totalCustomers * activeRatio);
  const atRiskCustomers = Math.round(totalCustomers * atRiskRatio);
  const vipCustomers = Math.max(1, Math.round(totalCustomers * vipRatio));

  // Churn rate as 0–1 fraction, loosely tied to at-risk share
  const churnRate = totalCustomers > 0 ? atRiskCustomers / totalCustomers : 0;

  // Mock MRR: base + per-customer amount
  const baseMrr = 5000;
  const perCustomer = 250;
  const mrr = baseMrr + totalCustomers * perCustomer;

  return {
    totalCustomers,
    customersWithPets,
    customersWithoutPets,
    avgPetsPerCustomer,
    activeCustomers,
    atRiskCustomers,
    vipCustomers,
    churnRate,
    mrr,
  };
}
