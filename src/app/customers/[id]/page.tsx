import { getCustomerDetail } from "@/modules/customers/get-customer-detail";
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

  return (
    <main className="min-h-screen w-full flex justify-center px-4 py-8">
      <div className="w-full max-w-4xl space-y-6">
        <header className="space-y-1">
          <h1 className="text-3xl font-semibold">{customer.fullName}</h1>
          <p className="text-sm text-gray-600">
            {customer.city ?? "Unknown city"}
          </p>
        </header>

        <section className="rounded-md border bg-white p-4 shadow-sm space-y-2">
          <h2 className="text-lg font-semibold">Account details</h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <div>
              <dt className="font-medium text-gray-700">Address</dt>
              <dd className="text-gray-900">
                {customer.address ?? "No address available"}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-700">Telephone</dt>
              <dd className="text-gray-900">
                {customer.telephone ?? "No phone available"}
              </dd>
            </div>
          </dl>
        </section>

        <section className="rounded-md border bg-white p-4 shadow-sm space-y-3">
          <h2 className="text-lg font-semibold">Pets</h2>
          {customer.pets.length === 0 ? (
            <p className="text-sm text-gray-600">No pets registered.</p>
          ) : (
            <ul className="space-y-1 text-sm">
              {customer.pets.map((pet) => (
                <li key={pet.id} className="flex items-baseline gap-2">
                  <span className="font-medium text-gray-900">{pet.name}</span>
                  <span className="text-gray-500 text-xs">
                    ({pet.type} · {pet.birthDate})
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-md border border-dashed bg-gray-50 p-4 text-sm text-gray-600 space-y-1">
          <h2 className="text-lg font-semibold text-gray-800">
            Customer Success metrics
          </h2>
          <p>
            Health score, churn risk, and other CS metrics will appear here in a
            future iteration.
          </p>
        </section>
      </div>
    </main>
  );
}
