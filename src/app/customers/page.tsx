import { getCustomersFromPetclinic } from "@/features/customers/api/get-customers-from-petclinic";
import type { Customer } from "@/modules/customers/types";
import { CustomersPageClient } from "@/modules/customers/components/CustomersPageClient";

export const dynamic = "force-dynamic";

export default async function Page() {
  const { customers, error } = await getCustomersFromPetclinic();

  if (error) {
    return (
      <main className="min-h-screen w-full flex justify-center px-4 py-8">
        <div className="w-full max-w-4xl space-y-4">
          <h1 className="text-2xl font-semibold">Customers</h1>
          <div className="rounded-md border border-red-300 bg-red-50 p-4 text-sm text-red-800">
            <p className="font-medium mb-1">Failed to load customers.</p>
            <p className="mb-0">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  const typedCustomers = customers as unknown as Customer[];

  const availableCities = Array.from(
    new Set(
      typedCustomers
        .map((c) => c.city)
        .filter(
          (c): c is string => typeof c === "string" && c.trim().length > 0
        )
    )
  ).sort((a, b) => a.localeCompare(b));

  return (
    <main className="min-h-screen w-full flex justify-center px-4 py-8">
      <div className="w-full max-w-5xl space-y-4">
        <h1 className="text-2xl font-semibold">Customers</h1>
        {typedCustomers.length === 0 ? (
          <p className="text-sm text-gray-600">No customers found.</p>
        ) : (
          <CustomersPageClient
            customers={typedCustomers}
            availableCities={availableCities}
          />
        )}
      </div>
    </main>
  );
}
