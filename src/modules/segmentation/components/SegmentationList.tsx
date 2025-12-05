import Link from "next/link";
import type { Customer } from "@/modules/customers/types";
import type {
  CustomerSegmentationEntry,
  CustomerSegment,
} from "@/modules/segmentation/types";

interface SegmentationListProps {
  segment: CustomerSegment;
  customers: Customer[];
  segmentation: CustomerSegmentationEntry[];
}

export function SegmentationList({
  segment,
  customers,
  segmentation,
}: SegmentationListProps) {
  const idsForSegment = new Set(
    segmentation
      .filter((entry) => entry.segment === segment)
      .map((entry) => String(entry.customerId))
  );

  const customersInSegment = customers.filter((c) => idsForSegment.has(c.id));

  if (!customersInSegment.length) {
    return (
      <p className="text-sm text-slate-400">
        No customers found in this segment.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 shadow-sm">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-slate-800 text-xs font-semibold uppercase tracking-wide text-slate-400">
          <tr>
            <th className="px-2 py-2">Name</th>
            <th className="px-2 py-2">City</th>
            <th className="px-2 py-2">Telephone</th>
          </tr>
        </thead>
        <tbody>
          {customersInSegment.map((customer) => (
            <tr
              key={customer.id}
              className="border-b border-slate-800 last:border-b-0 hover:bg-slate-800/60"
            >
              <td className="px-2 py-2 font-medium text-slate-50">
                <Link
                  href={`/customers/${customer.id}`}
                  className="text-blue-400 hover:underline"
                >
                  {customer.name}
                </Link>
              </td>
              <td className="px-2 py-2 text-slate-300">
                {customer.city ?? "-"}
              </td>
              <td className="px-2 py-2 text-slate-300">
                {customer.phone ?? "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
