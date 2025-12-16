/**
 * MockAPI Client
 *
 * Typed API client for mockapi.io backend.
 * Provides functions for all SuccessBoard API endpoints.
 *
 * @module api/mockapi
 *
 * @example
 * ```ts
 * import { mockapi } from "@/modules/api";
 *
 * // Fetch all customers
 * const customers = await mockapi.getCustomers();
 *
 * // Fetch a specific customer
 * const customer = await mockapi.getCustomerById("cust_123");
 *
 * // Fetch with filters
 * const atRiskCustomers = await mockapi.getCustomers({
 *   lifecycleStage: "at-risk",
 *   sortBy: "healthScore",
 *   sortOrder: "asc"
 * });
 * ```
 */

import type {
  Customer,
  Framework,
  Interaction,
  Document,
  Template,
  MetricsSummary,
  PaginatedResponse,
  ApiError,
  CustomerQueryParams,
  InteractionQueryParams,
  DocumentQueryParams,
  ListQueryParams,
} from "./types";

// =============================================================================
// CONFIGURATION
// =============================================================================

/**
 * Base URL for mockapi.io endpoints
 * Configure via NEXT_PUBLIC_MOCKAPI_BASE_URL environment variable
 *
 * @example "https://64abc123def456.mockapi.io/api/v1"
 */
const BASE_URL = process.env.NEXT_PUBLIC_MOCKAPI_BASE_URL ?? "";

/**
 * Default request timeout in milliseconds
 */
const DEFAULT_TIMEOUT = 10000;

/**
 * Default pagination limit
 */
const DEFAULT_LIMIT = 25;

// =============================================================================
// ERROR HANDLING
// =============================================================================

/**
 * Custom error class for API errors
 */
export class MockApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code: string,
    public readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = "MockApiError";
  }

  /**
   * Create from API error response
   */
  static fromResponse(status: number, body: ApiError): MockApiError {
    // Safely handle missing or malformed message
    const message = body?.message || `HTTP ${status} error`;
    const code = body?.code || `HTTP_${status}`;
    return new MockApiError(message, status, code, body?.details);
  }

  /**
   * Create from fetch error
   */
  static fromFetchError(error: unknown): MockApiError {
    if (error instanceof MockApiError) {
      return error;
    }
    const message = error instanceof Error ? error.message : "Unknown error";
    return new MockApiError(message, 0, "FETCH_ERROR");
  }
}

// =============================================================================
// HTTP UTILITIES
// =============================================================================

/**
 * Build URL with query parameters
 */
function buildUrl(
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined>
): string {
  const url = new URL(endpoint, BASE_URL);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const finalUrl = url.toString();
  console.log(`[mockapi] Built URL: ${finalUrl}`);
  return finalUrl;
}

/**
 * Generic fetch wrapper with error handling and typing
 */
async function fetchJson<T>(
  endpoint: string,
  options?: RequestInit & {
    params?: Record<string, string | number | boolean | undefined>;
  }
): Promise<T> {
  const { params, ...fetchOptions } = options ?? {};
  const url = buildUrl(endpoint, params);

  // Check if BASE_URL is configured
  if (!BASE_URL) {
    console.warn(
      "[mockapi] NEXT_PUBLIC_MOCKAPI_BASE_URL is not configured. Using mock data fallback."
    );
    throw new MockApiError(
      "MockAPI base URL not configured",
      0,
      "CONFIG_ERROR"
    );
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...fetchOptions?.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorBody: ApiError;
      try {
        const text = await response.text();
        console.log(`[mockapi] Error response body: ${text}`);
        errorBody = JSON.parse(text);
      } catch (parseError) {
        console.warn(
          `[mockapi] Failed to parse error response as JSON:`,
          parseError
        );
        errorBody = {
          code: `HTTP_${response.status}`,
          message: response.statusText || "Request failed",
        };
      }
      throw MockApiError.fromResponse(response.status, errorBody);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof MockApiError) {
      throw error;
    }

    if (error instanceof DOMException && error.name === "AbortError") {
      throw new MockApiError("Request timeout", 0, "TIMEOUT_ERROR");
    }

    throw MockApiError.fromFetchError(error);
  }
}

/**
 * Convert query params to URL search params format
 */
function toSearchParams(
  params: ListQueryParams & Record<string, unknown>
): Record<string, string | number | boolean | undefined> {
  const result: Record<string, string | number | boolean | undefined> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      result[key] = value as string | number | boolean;
    }
  });

  return result;
}

// =============================================================================
// CUSTOMER ENDPOINTS
// =============================================================================

/**
 * Fetch all customers with optional filtering and pagination
 *
 * @param params - Query parameters for filtering and pagination
 * @returns Paginated list of customers
 *
 * @example
 * ```ts
 * // Get all customers
 * const all = await getCustomers();
 *
 * // Get at-risk enterprise customers
 * const atRisk = await getCustomers({
 *   lifecycleStage: "at-risk",
 *   tier: "enterprise"
 * });
 * ```
 */
export async function getCustomers(
  params?: CustomerQueryParams
): Promise<PaginatedResponse<Customer>> {
  const queryParams = toSearchParams({
    page: params?.page ?? 1,
    limit: params?.limit ?? DEFAULT_LIMIT,
    ...params,
  });

  // mockapi.io returns array directly, we wrap it
  const data = await fetchJson<Customer[]>("/customers", {
    params: queryParams,
  });

  return {
    data,
    total: data.length, // mockapi.io doesn't return total, estimate from response
    page: params?.page ?? 1,
    limit: params?.limit ?? DEFAULT_LIMIT,
    hasMore: data.length === (params?.limit ?? DEFAULT_LIMIT),
  };
}

/**
 * Fetch a single customer by ID
 *
 * @param id - Customer ID
 * @returns Customer details
 *
 * @example
 * ```ts
 * const customer = await getCustomerById("cust_abc123");
 * console.log(customer.name, customer.healthScore);
 * ```
 */
export async function getCustomerById(id: string): Promise<Customer> {
  return fetchJson<Customer>(`/customers/${id}`);
}

/**
 * Create a new customer
 *
 * @param customer - Customer data (without id, createdAt, updatedAt)
 * @returns Created customer with generated fields
 */
export async function createCustomer(
  customer: Omit<Customer, "id" | "createdAt" | "updatedAt">
): Promise<Customer> {
  return fetchJson<Customer>("/customers", {
    method: "POST",
    body: JSON.stringify(customer),
  });
}

/**
 * Update an existing customer
 *
 * @param id - Customer ID
 * @param updates - Partial customer data to update
 * @returns Updated customer
 */
export async function updateCustomer(
  id: string,
  updates: Partial<Omit<Customer, "id" | "createdAt">>
): Promise<Customer> {
  return fetchJson<Customer>(`/customers/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });
}

/**
 * Delete a customer
 *
 * @param id - Customer ID
 */
export async function deleteCustomer(id: string): Promise<void> {
  await fetchJson<void>(`/customers/${id}`, { method: "DELETE" });
}

// =============================================================================
// FRAMEWORK ENDPOINTS
// =============================================================================

/**
 * Fetch all frameworks/segments
 *
 * @param params - Query parameters for filtering and pagination
 * @returns Paginated list of frameworks
 *
 * @example
 * ```ts
 * const frameworks = await getFrameworks();
 * const segments = frameworks.data.filter(f => f.type === "segment");
 * ```
 */
export async function getFrameworks(
  params?: ListQueryParams
): Promise<PaginatedResponse<Framework>> {
  const queryParams = toSearchParams({
    page: params?.page ?? 1,
    limit: params?.limit ?? DEFAULT_LIMIT,
    ...params,
  });

  const data = await fetchJson<Framework[]>("/frameworks", {
    params: queryParams,
  });

  return {
    data,
    total: data.length,
    page: params?.page ?? 1,
    limit: params?.limit ?? DEFAULT_LIMIT,
    hasMore: data.length === (params?.limit ?? DEFAULT_LIMIT),
  };
}

/**
 * Fetch a single framework by ID
 *
 * @param id - Framework ID
 * @returns Framework details
 */
export async function getFrameworkById(id: string): Promise<Framework> {
  return fetchJson<Framework>(`/frameworks/${id}`);
}

/**
 * Fetch customers belonging to a specific framework/segment
 *
 * @param frameworkId - Framework ID
 * @param params - Additional query parameters
 * @returns Paginated list of customers in the framework
 */
export async function getCustomersByFramework(
  frameworkId: string,
  params?: Omit<CustomerQueryParams, "frameworkId">
): Promise<PaginatedResponse<Customer>> {
  return getCustomers({ ...params, frameworkId });
}

// =============================================================================
// INTERACTION ENDPOINTS
// =============================================================================

/**
 * Fetch interactions with optional filtering
 *
 * @param params - Query parameters for filtering and pagination
 * @returns Paginated list of interactions
 *
 * @example
 * ```ts
 * // Get all interactions for a customer
 * const interactions = await getInteractions({ customerId: "cust_123" });
 *
 * // Get recent QBRs
 * const qbrs = await getInteractions({
 *   type: "qbr",
 *   sortBy: "date",
 *   sortOrder: "desc"
 * });
 * ```
 */
export async function getInteractions(
  params?: InteractionQueryParams
): Promise<PaginatedResponse<Interaction>> {
  const queryParams = toSearchParams({
    page: params?.page ?? 1,
    limit: params?.limit ?? DEFAULT_LIMIT,
    ...params,
  });

  const data = await fetchJson<Interaction[]>("/interactions", {
    params: queryParams,
  });

  return {
    data,
    total: data.length,
    page: params?.page ?? 1,
    limit: params?.limit ?? DEFAULT_LIMIT,
    hasMore: data.length === (params?.limit ?? DEFAULT_LIMIT),
  };
}

/**
 * Fetch interactions for a specific customer
 *
 * @param customerId - Customer ID
 * @param params - Additional query parameters
 * @returns Paginated list of interactions
 */
export async function getInteractionsByCustomer(
  customerId: string,
  params?: Omit<InteractionQueryParams, "customerId">
): Promise<PaginatedResponse<Interaction>> {
  return getInteractions({ ...params, customerId });
}

/**
 * Fetch a single interaction by ID
 *
 * @param id - Interaction ID
 * @returns Interaction details
 */
export async function getInteractionById(id: string): Promise<Interaction> {
  return fetchJson<Interaction>(`/interactions/${id}`);
}

/**
 * Create a new interaction
 *
 * @param interaction - Interaction data
 * @returns Created interaction
 */
export async function createInteraction(
  interaction: Omit<Interaction, "id" | "createdAt" | "updatedAt">
): Promise<Interaction> {
  return fetchJson<Interaction>("/interactions", {
    method: "POST",
    body: JSON.stringify(interaction),
  });
}

// =============================================================================
// DOCUMENT ENDPOINTS
// =============================================================================

/**
 * Fetch documents with optional filtering
 *
 * @param params - Query parameters for filtering and pagination
 * @returns Paginated list of documents
 *
 * @example
 * ```ts
 * // Get all QBR decks
 * const qbrDecks = await getDocuments({ documentType: "qbr-deck" });
 *
 * // Get documents for a customer
 * const customerDocs = await getDocuments({ customerId: "cust_123" });
 * ```
 */
export async function getDocuments(
  params?: DocumentQueryParams
): Promise<PaginatedResponse<Document>> {
  const queryParams = toSearchParams({
    page: params?.page ?? 1,
    limit: params?.limit ?? DEFAULT_LIMIT,
    ...params,
  });

  const data = await fetchJson<Document[]>("/documents", {
    params: queryParams,
  });

  return {
    data,
    total: data.length,
    page: params?.page ?? 1,
    limit: params?.limit ?? DEFAULT_LIMIT,
    hasMore: data.length === (params?.limit ?? DEFAULT_LIMIT),
  };
}

/**
 * Fetch documents for a specific customer
 *
 * @param customerId - Customer ID
 * @param params - Additional query parameters
 * @returns Paginated list of documents
 */
export async function getDocumentsByCustomer(
  customerId: string,
  params?: Omit<DocumentQueryParams, "customerId">
): Promise<PaginatedResponse<Document>> {
  return getDocuments({ ...params, customerId });
}

/**
 * Fetch a single document by ID
 *
 * @param id - Document ID
 * @returns Document details
 */
export async function getDocumentById(id: string): Promise<Document> {
  return fetchJson<Document>(`/documents/${id}`);
}

/**
 * Create a new document
 *
 * @param document - Document data
 * @returns Created document
 */
export async function createDocument(
  document: Omit<Document, "id" | "createdAt" | "updatedAt">
): Promise<Document> {
  return fetchJson<Document>("/documents", {
    method: "POST",
    body: JSON.stringify(document),
  });
}

/**
 * Update a document
 *
 * @param id - Document ID
 * @param updates - Partial document data to update
 * @returns Updated document
 */
export async function updateDocument(
  id: string,
  updates: Partial<Omit<Document, "id" | "createdAt">>
): Promise<Document> {
  return fetchJson<Document>(`/documents/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });
}

// =============================================================================
// TEMPLATE ENDPOINTS
// =============================================================================

/**
 * Fetch all templates
 *
 * @param params - Query parameters for filtering and pagination
 * @returns Paginated list of templates
 *
 * @example
 * ```ts
 * const templates = await getTemplates();
 * const qbrTemplates = templates.data.filter(t => t.category === "qbr");
 * ```
 */
export async function getTemplates(
  params?: ListQueryParams
): Promise<PaginatedResponse<Template>> {
  const queryParams = toSearchParams({
    page: params?.page ?? 1,
    limit: params?.limit ?? DEFAULT_LIMIT,
    ...params,
  });

  const data = await fetchJson<Template[]>("/templates", {
    params: queryParams,
  });

  return {
    data,
    total: data.length,
    page: params?.page ?? 1,
    limit: params?.limit ?? DEFAULT_LIMIT,
    hasMore: data.length === (params?.limit ?? DEFAULT_LIMIT),
  };
}

/**
 * Fetch a single template by ID
 *
 * @param id - Template ID
 * @returns Template details
 */
export async function getTemplateById(id: string): Promise<Template> {
  return fetchJson<Template>(`/templates/${id}`);
}

// =============================================================================
// METRICS ENDPOINTS
// =============================================================================

/**
 * Fetch overview metrics summary
 *
 * @returns Aggregated metrics for dashboard display
 *
 * @example
 * ```ts
 * const metrics = await getOverviewMetrics();
 * console.log(`Total MRR: $${metrics.totalMrr / 100}`);
 * console.log(`At-risk customers: ${metrics.atRiskCount}`);
 * ```
 */
export async function getOverviewMetrics(): Promise<MetricsSummary> {
  const data = await fetchJson<MetricsSummary | MetricsSummary[]>("/metrics");
  // MockAPI returns an array; extract the first (snapshot) record
  if (Array.isArray(data)) {
    if (data.length === 0) {
      throw new MockApiError("No metrics data available", 404, "NO_DATA");
    }
    return data[0];
  }
  return data;
}

// =============================================================================
// CONVENIENCE EXPORTS
// =============================================================================

/**
 * Grouped API client for namespaced imports
 *
 * @example
 * ```ts
 * import { mockapi } from "@/modules/api";
 *
 * const customers = await mockapi.getCustomers();
 * const metrics = await mockapi.getOverviewMetrics();
 * ```
 */
export const mockapi = {
  // Customers
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,

  // Frameworks
  getFrameworks,
  getFrameworkById,
  getCustomersByFramework,

  // Interactions
  getInteractions,
  getInteractionsByCustomer,
  getInteractionById,
  createInteraction,

  // Documents
  getDocuments,
  getDocumentsByCustomer,
  getDocumentById,
  createDocument,
  updateDocument,

  // Templates
  getTemplates,
  getTemplateById,

  // Metrics
  getOverviewMetrics,
} as const;

export default mockapi;
