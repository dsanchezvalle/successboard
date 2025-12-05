import { getCustomersFromPetclinic } from "@/features/customers/api/get-customers-from-petclinic";
import type { Customer } from "@/modules/customers/types";
import { getCustomerSegmentation } from "@/modules/segmentation/get-customer-segmentation";
import { SegmentationSummary } from "@/modules/segmentation/components/SegmentationSummary";
import { SegmentationList } from "@/modules/segmentation/components/SegmentationList";

export const dynamic = "force-dynamic";

export default async function SegmentationPage() {
  const { customers, error } = await getCustomersFromPetclinic();

  const typedCustomers = (customers ?? []) as unknown as Customer[];
  const segmentation = getCustomerSegmentation(typedCustomers);

  return (
    <main className="min-h-screen w-full flex justify-center px-4 py-8">
      <div className="w-full max-w-6xl space-y-6">
        <SegmentationSummary segmentation={segmentation} />

        {error && (
          <div className="rounded-xl border border-red-800 bg-red-900/40 px-4 py-3 text-sm text-red-100">
            <p className="font-medium">Warning: failed to refresh customers.</p>
            <p className="text-xs opacity-80">
              Showing segmentation based on the last available data.
            </p>
          </div>
        )}

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-50">
            Active customers
          </h2>
          <SegmentationList
            segment="active"
            customers={typedCustomers}
            segmentation={segmentation}
          />
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-50">
            At-risk customers
          </h2>
          <SegmentationList
            segment="at-risk"
            customers={typedCustomers}
            segmentation={segmentation}
          />
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-50">VIP customers</h2>
          <SegmentationList
            segment="vip"
            customers={typedCustomers}
            segmentation={segmentation}
          />
        </section>
      </div>
    </main>
  );
}
