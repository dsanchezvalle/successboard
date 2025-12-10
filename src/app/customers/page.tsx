import { getCustomersFromPetclinic } from "@/features/customers/api/get-customers-from-petclinic";
import type { Customer } from "@/modules/customers/types";
import { CustomersPageClient } from "@/modules/customers/components/CustomersPageClient";
import { Container, Section, Heading, Text } from "@/design-system/primitives";

export const dynamic = "force-dynamic";

export default async function Page() {
  const { customers, error } = await getCustomersFromPetclinic();

  if (error) {
    return (
      <Container maxWidth="lg" padding="md" className="py-8">
        <Section as="div" spacing="sm" gap="sm" aria-label="Customers error">
          <Heading level={1}>Customers</Heading>
          <div
            className="rounded-md border border-red-300 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950"
            role="alert"
          >
            <Text variant="body" color="error" weight="medium" className="mb-1">
              Failed to load customers.
            </Text>
            <Text variant="small" color="error">
              {error}
            </Text>
          </div>
        </Section>
      </Container>
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
    <Container maxWidth="xl" padding="md" className="py-8">
      <Section as="div" spacing="none" gap="md" aria-label="Customers list">
        <Heading level={1}>Customers</Heading>
        {typedCustomers.length === 0 ? (
          <Text variant="small" color="muted">
            No customers found.
          </Text>
        ) : (
          <CustomersPageClient
            customers={typedCustomers}
            availableCities={availableCities}
          />
        )}
      </Section>
    </Container>
  );
}
