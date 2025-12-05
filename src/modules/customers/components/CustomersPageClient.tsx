"use client";

import { useMemo, useState } from "react";
import type { Customer, CustomerFilterState } from "@/modules/customers/types";
import { filterCustomers } from "@/modules/customers/utils/filterCustomers";
import { CustomerFiltersBar } from "@/modules/customers/components/CustomerFiltersBar";
import { CustomersTable } from "@/modules/customers/components/CustomersTable";

interface CustomersPageClientProps {
  customers: Customer[];
  availableCities: string[];
}

const DEFAULT_FILTERS: CustomerFilterState = {
  searchQuery: "",
  city: null,
  petsBucket: "all",
};

export function CustomersPageClient({
  customers,
  availableCities,
}: CustomersPageClientProps) {
  const [filters, setFilters] = useState<CustomerFilterState>(DEFAULT_FILTERS);

  const filtered = useMemo(
    () => filterCustomers(customers, filters),
    [customers, filters]
  );

  return (
    <div className="space-y-4">
      <CustomerFiltersBar
        value={filters}
        onChange={setFilters}
        availableCities={availableCities}
      />

      {filtered.length === 0 ? (
        <p className="text-sm text-gray-600">
          No customers match the current filters.
        </p>
      ) : (
        <CustomersTable customers={filtered} />
      )}
    </div>
  );
}
