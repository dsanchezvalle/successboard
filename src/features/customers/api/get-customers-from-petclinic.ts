import type { Customer } from "@/features/customers/types";
import type { PetclinicOwner } from "@/features/customers/api/raw-types";
import { fetchPetclinicOwners } from "@/features/customers/api/petclinic-owners-fetch";
import { mapPetclinicOwnersToCustomers } from "@/features/customers/api/adapters";

export async function getCustomersFromPetclinic(): Promise<{
  customers: Customer[];
  error?: string;
}> {
  const result = await fetchPetclinicOwners();

  if (result.error || !result.data) {
    return {
      customers: [],
      error: result.error ?? "Unable to load customers from Petclinic.",
    };
  }

  const data = result.data;

  let owners: PetclinicOwner[] = [];

  if (Array.isArray(data)) {
    owners = data;
  } else {
    owners =
      data._embedded?.owners ?? data._embedded?.ownerList ?? data.content ?? [];
  }

  const customers = mapPetclinicOwnersToCustomers(owners);

  return { customers };
}
