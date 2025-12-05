import { fetchPetclinicOwners } from "@/features/customers/api/petclinic-owners-fetch";

export const dynamic = "force-dynamic";

export default async function Page() {
  const result = await fetchPetclinicOwners();

  if (result.error || !result.data) {
    return (
      <main className="min-h-screen w-full flex justify-center px-4 py-8">
        <div className="w-full max-w-4xl space-y-4">
          <h1 className="text-2xl font-semibold">
            Petclinic Owners (Raw Response)
          </h1>
          <div className="rounded-md border border-red-300 bg-red-50 p-4 text-sm text-red-800 background-color: black">
            <p className="font-medium mb-1">Failed to load Petclinic owners.</p>
            <p className="mb-2">{result.error ?? "Unknown error occurred."}</p>
            {result.endpointTried?.length ? (
              <div>
                <p className="font-medium">Endpoints tried:</p>
                <ul className="list-disc list-inside">
                  {result.endpointTried.map((u: string) => (
                    <li key={u}>{u}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full flex justify-center px-4 py-8">
      <div className="w-full max-w-4xl space-y-4">
        <h1 className="text-2xl font-semibold">
          Petclinic Owners (Raw Response)
        </h1>
        <section className="rounded-md border bg-gray-100 p-4 shadow-sm">
          <pre className="whitespace-pre-wrap break-words text-xs md:text-sm overflow-auto max-h-[70vh] bg-black">
            {JSON.stringify(result.data, null, 2)}
          </pre>
        </section>
        {result.endpointTried?.length ? (
          <p className="text-xs text-gray-500">
            Fetched from:{" "}
            {result.endpointTried[result.endpointTried.length - 1]}
          </p>
        ) : null}
      </div>
    </main>
  );
}
