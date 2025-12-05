import type { Customer, CustomerFilterState } from "@/modules/customers/types";

function matchesSearch(customer: Customer, query: string): boolean {
  if (!query.trim()) return true;

  const q = query.toLowerCase();

  const values = [
    customer.name,
    customer.city ?? undefined,
    customer.address ?? undefined,
    customer.phone ?? undefined,
  ].filter(Boolean) as string[];

  return values.some((value) => value.toLowerCase().includes(q));
}

function matchesCity(customer: Customer, city: string | null): boolean {
  if (!city) return true;
  if (!customer.city) return false;
  return customer.city.toLowerCase() === city.toLowerCase();
}

function matchesPetsBucket(
  customer: Customer,
  bucket: CustomerFilterState["petsBucket"]
): boolean {
  if (bucket === "all") return true;

  const petCount = customer.petsCount ?? 0;

  switch (bucket) {
    case "none":
      return petCount === 0;
    case "few":
      return petCount >= 1 && petCount <= 2;
    case "many":
      return petCount >= 3;
    default:
      return true;
  }
}

export function filterCustomers(
  customers: Customer[],
  filters: CustomerFilterState
): Customer[] {
  return customers.filter((customer) => {
    if (!matchesSearch(customer, filters.searchQuery)) return false;
    if (!matchesCity(customer, filters.city)) return false;
    if (!matchesPetsBucket(customer, filters.petsBucket)) return false;
    return true;
  });
}
