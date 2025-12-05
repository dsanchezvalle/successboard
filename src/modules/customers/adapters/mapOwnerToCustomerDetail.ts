import type { PetclinicOwnerRaw } from "@/data/petclinic/raw-types";
import type { CustomerDetail } from "@/modules/customers/types";

export function mapOwnerToCustomerDetail(
  owner: PetclinicOwnerRaw
): CustomerDetail {
  const fullName = `${owner.firstName} ${owner.lastName}`.trim();

  return {
    id: owner.id,
    fullName,
    address: owner.address ?? null,
    city: owner.city ?? null,
    telephone: owner.telephone ?? null,
    pets:
      owner.pets?.map((pet) => ({
        id: pet.id,
        name: pet.name,
        birthDate: pet.birthDate,
        type: pet.type?.name ?? "Unknown",
      })) ?? [],
  };
}
