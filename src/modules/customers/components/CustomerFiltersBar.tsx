"use client";

import type { CustomerFilterState } from "@/modules/customers/types";

interface CustomerFiltersBarProps {
  value: CustomerFilterState;
  onChange: (next: CustomerFilterState) => void;
  availableCities: string[];
}

export function CustomerFiltersBar({
  value,
  onChange,
  availableCities,
}: CustomerFiltersBarProps) {
  function update<K extends keyof CustomerFilterState>(
    key: K,
    newValue: CustomerFilterState[K]
  ) {
    onChange({ ...value, [key]: newValue });
  }

  return (
    <div className="flex flex-col gap-3 rounded-md border border-slate-800 bg-slate-900/60 p-3 shadow-sm md:flex-row md:items-end md:justify-between text-slate-200">
      <div className="flex-1 space-y-1">
        <label
          className="block text-xs font-medium text-slate-300"
          htmlFor="customers-search"
        >
          Search
        </label>
        <input
          id="customers-search"
          type="text"
          className="block w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1.5 text-sm text-slate-100 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          placeholder="Search by name, city, phone..."
          value={value.searchQuery}
          onChange={(e) => update("searchQuery", e.target.value)}
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 md:flex-row md:justify-end">
        <div className="space-y-1">
          <label
            className="block text-xs font-medium text-slate-300"
            htmlFor="customers-city"
          >
            City
          </label>
          <select
            id="customers-city"
            className="block w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1.5 text-sm text-slate-100 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
            value={value.city ?? ""}
            onChange={(e) => update("city", e.target.value || null)}
          >
            <option value="">All cities</option>
            {availableCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label
            className="block text-xs font-medium text-slate-300"
            htmlFor="customers-pets-bucket"
          >
            Pets
          </label>
          <select
            id="customers-pets-bucket"
            className="block w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1.5 text-sm text-slate-100 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
            value={value.petsBucket}
            onChange={(e) =>
              update(
                "petsBucket",
                e.target.value as CustomerFilterState["petsBucket"]
              )
            }
          >
            <option value="all">All</option>
            <option value="none">No pets</option>
            <option value="few">1–2 pets</option>
            <option value="many">3+ pets</option>
          </select>
        </div>
      </div>
    </div>
  );
}
