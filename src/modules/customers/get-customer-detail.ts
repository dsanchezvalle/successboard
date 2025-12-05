import type { CustomerDetail } from "@/modules/customers/types";
import { getCustomerByIdRaw } from "@/data/petclinic/get-customer-by-id";
import { mapOwnerToCustomerDetail } from "@/modules/customers/adapters/mapOwnerToCustomerDetail";

export async function getCustomerDetail(
  id: string | number
): Promise<{ customer?: CustomerDetail; error?: string; notFound?: boolean }> {
  const { owner, error, notFound } = await getCustomerByIdRaw(id);

  if (notFound || !owner) {
    return {
      notFound: true,
      error: error ?? "Customer not found.",
    };
  }

  if (error) {
    return {
      error,
    };
  }

  return { customer: mapOwnerToCustomerDetail(owner) };
}
