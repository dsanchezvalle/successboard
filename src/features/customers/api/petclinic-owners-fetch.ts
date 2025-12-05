import { fetchJson } from "@/lib/api";
import type { PetclinicOwnersResponse } from "@/features/customers/api/raw-types";

const OWNER_ENDPOINT_CANDIDATES = [
  "http://localhost:8080/api/customer/owners",
  "http://localhost:8080/api/gateway/owners",
  "http://localhost:8080/api/owners",
];

export async function fetchPetclinicOwners(): Promise<{
  data?: PetclinicOwnersResponse;
  error?: string;
  endpointTried: string[];
}> {
  const tried: string[] = [];

  for (const url of OWNER_ENDPOINT_CANDIDATES) {
    tried.push(url);

    try {
      const data = await fetchJson<PetclinicOwnersResponse>(url, {
        cache: "no-store",
      });

      console.log(
        "[petclinic-owners-fetch] Successfully fetched Petclinic owners from",
        url
      );
      console.log(
        "[petclinic-owners-fetch] Sample response shape:",
        data &&
          ("_embedded" in data
            ? Object.keys(data._embedded ?? {})
            : Object.keys(data ?? {}))
      );

      return { data, endpointTried: tried };
    } catch (error) {
      console.error(
        "[petclinic-owners-fetch] Failed fetching from",
        url,
        error
      );
    }
  }

  return {
    error: "Unable to fetch Petclinic owners from any known endpoint.",
    endpointTried: tried,
  };
}
