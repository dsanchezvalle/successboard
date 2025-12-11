/**
 * @deprecated Use `OverviewKpisViewModel` from `@/modules/api` instead.
 * This type is tied to the legacy Petclinic-derived metrics.
 */
export interface OverviewKpis {
  // Real metrics derived from Petclinic data
  totalCustomers: number;
  customersWithPets: number;
  customersWithoutPets: number;
  avgPetsPerCustomer: number;

  // Customer Success mock metrics
  activeCustomers: number;
  atRiskCustomers: number;
  vipCustomers: number;

  // 0–1 fraction
  churnRate: number;
  // Monthly Recurring Revenue (mock numeric, e.g. USD)
  mrr: number;
}
