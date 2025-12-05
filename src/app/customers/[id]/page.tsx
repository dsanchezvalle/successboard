import { getCustomerDetail } from "@/modules/customers/get-customer-detail";
import { getCustomerSuccessMetricsMock } from "@/modules/customers/mocks/getCustomerSuccessMetrics";
import { CustomerSuccessPanel } from "@/modules/customers/components/CustomerSuccessPanel";
import { getCustomerInteractionsMock } from "@/modules/customers/mocks/getCustomerInteractionsMock";
import { CustomerInteractionsTimeline } from "@/modules/customers/components/CustomerInteractionsTimeline";
import { CustomerDetailCard } from "@/modules/customers/components/CustomerDetailCard";
import { redirect } from "next/navigation";

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

  const { customer, error, notFound } = await getCustomerDetail(id);

  if (notFound) {
    redirect("/customers");
  }

  if (error || !customer) {
    return (
      <main className="min-h-screen w-full flex justify-center px-4 py-8">
        <div className="w-full max-w-4xl space-y-4">
          <h1 className="text-2xl font-semibold">Customer</h1>
          <div className="rounded-md border border-red-300 bg-red-50 p-4 text-sm text-red-800">
            <p className="font-medium mb-1">Failed to load customer.</p>
            <p className="mb-0">{error ?? "Customer not found."}</p>
          </div>
        </div>
      </main>
    );
  }

  const metrics = getCustomerSuccessMetricsMock(customer.id);
  const interactions = getCustomerInteractionsMock(customer.id);

  return (
    <main className="min-h-screen w-full flex justify-center px-4 py-8">
      <div className="w-full max-w-5xl space-y-6">
        <header className="sticky top-16 z-10 space-y-1 bg-slate-950/80 pb-2 pt-1 backdrop-blur">
          <h1 className="text-3xl font-semibold">{customer.fullName}</h1>
          <p className="text-sm text-slate-400">
            {customer.city ?? "Unknown city"}
          </p>
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
                <dt className="font-medium text-slate-300">Address</dt>
                <dd className="text-slate-50">
                  {customer.address ?? "No address available"}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-slate-300">Telephone</dt>
                <dd className="text-slate-50">
                  {customer.telephone ?? "No phone available"}
                </dd>
              </div>
            </dl>
          </CustomerDetailCard>
        </div>

        <CustomerDetailCard title="Pets">
          {customer.pets.length === 0 ? (
            <p className="text-sm text-slate-400">No pets registered.</p>
          ) : (
            <ul className="space-y-1 text-sm text-slate-50">
              {customer.pets.map((pet) => (
                <li key={pet.id} className="flex items-baseline gap-2">
                  <span className="font-medium text-slate-50">{pet.name}</span>
                  <span className="text-slate-400 text-xs">
                    ({pet.type} · {pet.birthDate})
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CustomerDetailCard>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Recent interactions</h2>
          <CustomerInteractionsTimeline interactions={interactions} />
        </section>
      </div>
    </main>
  );
}
