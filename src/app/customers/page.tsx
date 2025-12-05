import { getCustomersFromPetclinic } from "@/features/customers/api/get-customers-from-petclinic";

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

  if (!customers.length) {
    return (
      <main className="min-h-screen w-full flex justify-center px-4 py-8">
        <div className="w-full max-w-4xl space-y-4">
          <h1 className="text-2xl font-semibold">Customers</h1>
          <p className="text-sm text-gray-600">No customers found.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full flex justify-center px-4 py-8">
      <div className="w-full max-w-5xl space-y-4">
        <h1 className="text-2xl font-semibold">Customers</h1>
        <div className="overflow-x-auto rounded-md border bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-600">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">City</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Source</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <td className="px-4 py-2 font-medium text-gray-900">
                    {customer.name}
                  </td>
                  <td className="px-4 py-2 text-gray-700">
                    {customer.city ?? "-"}
                  </td>
                  <td className="px-4 py-2 text-gray-700">
                    {customer.address ?? "-"}
                  </td>
                  <td className="px-4 py-2 text-gray-700">
                    {customer.phone ?? "-"}
                  </td>
                  <td className="px-4 py-2 text-gray-700">
                    {customer.createdFrom}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
