import { getCustomerById } from "@/modules/api/customers-service";
import { getCustomerSuccessMetricsMock } from "@/modules/customers/mocks/getCustomerSuccessMetrics";
import { CustomerSuccessPanel } from "@/modules/customers/components/CustomerSuccessPanel";
import { getCustomerInteractionsMock } from "@/modules/customers/mocks/getCustomerInteractionsMock";
import { CustomerInteractionsTimeline } from "@/modules/customers/components/CustomerInteractionsTimeline";
import { CustomerDetailCard } from "@/modules/customers/components/CustomerDetailCard";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type PageParams = {
  id: string;
};

interface PageProps {
  params: Promise<PageParams>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  console.log("[customers/[id]] route params", resolvedParams);

  // Use robust getCustomerById function
  const customer = await getCustomerById(id);

  // Handle not found case with proper notFound() instead of redirect
  if (!customer) {
    notFound();
  }

  // Get mock data for metrics and interactions (these are already mocked)
  const metrics = getCustomerSuccessMetricsMock(customer.id);
  const interactions = getCustomerInteractionsMock(customer.id);

  return (
    <main className="min-h-screen w-full flex justify-center px-4 py-8">
      <div className="w-full max-w-5xl space-y-6">
        <header className="sticky top-16 z-10 space-y-1 bg-slate-950/80 pb-2 pt-1 backdrop-blur">
          <h1 className="text-3xl font-semibold">{customer.name}</h1>
          <p className="text-sm text-slate-400">{customer.companyName}</p>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <CustomerDetailCard
            title="Customer Success overview"
            subtitle="Mocked metrics for development only"
          >
            <CustomerSuccessPanel metrics={metrics} />
          </CustomerDetailCard>
          <CustomerDetailCard title="Account details">
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
              <div>
                <dt className="font-medium text-slate-300">Company</dt>
                <dd className="text-slate-50">{customer.companyName}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-300">Tier</dt>
                <dd className="text-slate-50">{customer.tierLabel}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-300">Health Score</dt>
                <dd className="text-slate-50">{customer.healthScore}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-300">MRR</dt>
                <dd className="text-slate-50">{customer.mrrFormatted}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-300">CSM</dt>
                <dd className="text-slate-50">{customer.csmName}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-300">Lifecycle Stage</dt>
                <dd className="text-slate-50">{customer.lifecycleLabel}</dd>
              </div>
            </dl>
          </CustomerDetailCard>
        </div>

        <CustomerDetailCard title="Recent interactions">
          <CustomerInteractionsTimeline interactions={interactions} />
        </CustomerDetailCard>
      </div>
    </main>
  );
}
