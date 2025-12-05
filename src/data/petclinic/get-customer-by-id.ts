import { fetchJson, type ApiError } from "@/lib/api";
import type {
  PetclinicOwnerDetailResponseRaw,
  PetclinicOwnerRaw,
} from "@/data/petclinic/raw-types";

const OWNER_BY_ID_ENDPOINT = "http://localhost:8080/api/customer/owners";

export async function getCustomerByIdRaw(
  id: string | number
): Promise<{ owner?: PetclinicOwnerRaw; error?: string; notFound?: boolean }> {
  const url = `${OWNER_BY_ID_ENDPOINT}/${id}`;

  try {
    const data = await fetchJson<
      PetclinicOwnerDetailResponseRaw | PetclinicOwnerRaw
    >(url, { cache: "no-store" });

    if (Array.isArray(data)) {
      return { error: "Unexpected array response when fetching owner by id." };
    }

    if ("firstName" in data && "lastName" in data) {
      return { owner: data as PetclinicOwnerRaw };
    }

    const embeddedOwner = (data as PetclinicOwnerDetailResponseRaw)._embedded
      ?.owner;

    if (!embeddedOwner) {
      return {
        notFound: true,
        error: "Owner not found in Petclinic response.",
      };
    }

    return { owner: embeddedOwner };
  } catch (error: unknown) {
    const apiError = error as ApiError;

    if (typeof apiError?.status === "number" && apiError.status === 404) {
      return {
        notFound: true,
        error: "Customer not found.",
      };
    }

    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to load customer from Petclinic.",
    };
  }
}
