import type { Customer } from "@/features/customers/types";
import type { PetclinicOwner } from "@/features/customers/api/raw-types";

export function mapPetclinicOwnerToCustomer(owner: PetclinicOwner): Customer {
  const name = `${owner.firstName} ${owner.lastName}`.trim();

  return {
    id: String(owner.id),
    name,
    city: owner.city,
    address: owner.address,
    phone: owner.telephone,
    petsCount: owner.pets?.length ?? 0,
    // Petclinic owners do not expose email by default; keep undefined.
    email: undefined,
    createdFrom: "petclinic",
  };
}

export function mapPetclinicOwnersToCustomers(
  owners: PetclinicOwner[] | undefined | null
): Customer[] {
  if (!owners || owners.length === 0) {
    return [];
  }

  return owners.map(mapPetclinicOwnerToCustomer);
}
