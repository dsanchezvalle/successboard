import Link from "next/link";
import type { Customer } from "@/modules/customers/types";

interface CustomersTableProps {
  customers: Customer[];
}

export function CustomersTable({ customers }: CustomersTableProps) {
  return (
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
                <Link
                  href={`/customers/${customer.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {customer.name}
                </Link>
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
  );
}
