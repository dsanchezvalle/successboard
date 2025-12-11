/**
 * Customers Hub Module
 *
 * Unified customer management experience combining customers list
 * and segmentation into a single hub.
 *
 * TODO: Replace frontend-derived segments with mockapi.io endpoints
 */

// Components
export * from "./components";

// Types
export * from "./types";

// Utilities
export {
  enrichCustomer,
  enrichCustomers,
  calculateSegmentationSummary,
  filterBySegment,
  filterBySearch,
  filterByHealthRange,
  filterByMrrRange,
} from "./utils/derive-customer-segments";
