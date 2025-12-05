import Link from "next/link";
import type { Customer } from "@/modules/customers/types";

interface CustomersTableProps {
  customers: Customer[];
}

export function CustomersTable({ customers }: CustomersTableProps) {
  return (
    <div className="overflow-x-auto rounded-md border border-slate-800 bg-slate-900/60 shadow-sm">
      <table className="min-w-full text-left text-sm text-slate-200">
        <thead className="border-b border-slate-800 bg-slate-900/80 text-xs font-semibold uppercase tracking-wide text-slate-400">
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
              className="border-b border-slate-800 last:border-b-0 hover:bg-slate-800/60"
            >
              <td className="px-4 py-2 font-medium text-slate-50">
                <Link
                  href={`/customers/${customer.id}`}
                  className="text-sky-300 hover:text-sky-200 hover:underline"
                >
                  {customer.name}
                </Link>
              </td>
              <td className="px-4 py-2 text-slate-300">
                {customer.city ?? "-"}
              </td>
              <td className="px-4 py-2 text-slate-300">
                {customer.address ?? "-"}
              </td>
              <td className="px-4 py-2 text-slate-300">
                {customer.phone ?? "-"}
              </td>
              <td className="px-4 py-2 text-slate-400">
                {customer.createdFrom}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
