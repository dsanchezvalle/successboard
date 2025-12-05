import type { Customer } from "@/modules/customers/types";
import type {
  CustomerSegmentationEntry,
  CustomerSegment,
} from "@/modules/segmentation/types";
import { getCustomerSuccessMetricsMock } from "@/modules/customers/mocks/getCustomerSuccessMetrics";

function pickSegment(
  customer: Customer,
  healthScore: number,
  lifetimeValue: number
): CustomerSegment {
  const petsCount = customer.petsCount ?? 0;

  // VIP: very healthy OR very high value OR many pets
  if (healthScore >= 85 || lifetimeValue >= 40000 || petsCount >= 3) {
    return "vip";
  }

  // At-risk: low health
  if (healthScore < 50) {
    return "at-risk";
  }

  // Default: active
  return "active";
}

export function getCustomerSegmentation(
  customers: Customer[]
): CustomerSegmentationEntry[] {
  return customers.map((customer) => {
    const numericId = Number(customer.id);
    const metrics = getCustomerSuccessMetricsMock(numericId || 1);

    const segment = pickSegment(
      customer,
      metrics.healthScore,
      metrics.lifetimeValue
    );

    return {
      customerId: numericId || 0,
      segment,
    };
  });
}
