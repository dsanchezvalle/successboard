# MockAPI Integration

This document describes the MockAPI integration for SuccessBoard and the data contract alignment between the API, fallback data, and frontend types.

## Data Sources

### Primary: MockAPI (Production/Development)

When `NEXT_PUBLIC_MOCKAPI_BASE_URL` is set in `.env.local`, the application fetches data from the MockAPI backend. This is the **authoritative source** for all customer, framework, document, interaction, and metrics data.

```env
NEXT_PUBLIC_MOCKAPI_BASE_URL=https://<your-project-id>.mockapi.io/api
```

> The actual MockAPI base URL is environment-specific and should be set locally in `.env.local` or via deployment environment variables.

### Fallback: Demo Data (Offline/Unconfigured)

When the API is unavailable or not configured, the application uses fallback data to ensure the UI always renders. **This data is for demo purposes only** and should not be considered authoritative.

Fallback data sources:

- **`tools/mockapi-seeds/`** — JSON seed files used for validation and reference
- **Inline mock data** — Hardcoded in service files (`customers-service.ts`, `overview-service.ts`)

> ⚠️ **Note**: The seed files and inline fallback data are normalized to match the MockAPI contract but are not kept in sync with live MockAPI data. They exist solely to provide a functional demo experience when the API is unavailable.

## Data Contract

All data follows these conventions:

| Field Type   | Format                  | Example                                 |
| ------------ | ----------------------- | --------------------------------------- |
| IDs          | String                  | `"1"`, `"2"`, `"10"`                    |
| Foreign Keys | String (valid ID)       | `csmId: "4"` references `users.id: "4"` |
| Colors       | Hex string              | `"#ef4444"`                             |
| Enums        | Lowercase kebab-case    | `"at-risk"`, `"qbr-deck"`               |
| Breakdowns   | `SegmentMetric[]` array | See `MetricsSummary` type               |

## Related Documentation

- [AUDIT_REPORT.md](./AUDIT_REPORT.md) — Audit findings and status
- [PATCHLOG.md](./PATCHLOG.md) — Applied fixes and changes
- [MOCKAPI_SCHEMA_CHANGES.md](./MOCKAPI_SCHEMA_CHANGES.md) — Required MockAPI schema updates

---

## Smoke Test Checklist

### API Mode (MockAPI Connected)

1. Ensure `.env.local` has `NEXT_PUBLIC_MOCKAPI_BASE_URL` set
2. Run `npm run build` — should compile without errors
3. Run `npm run dev` and verify:
   - [ ] Overview page (`/`) loads with real metrics
   - [ ] Customers list (`/customers`) loads with customer data
   - [ ] Customer detail page loads when clicking a customer

### Fallback Mode (No API)

1. Unset or remove `NEXT_PUBLIC_MOCKAPI_BASE_URL` from `.env.local`
2. Run `npm run dev` and verify:
   - [ ] Overview page (`/`) loads with fallback data (zeros or demo values)
   - [ ] Customers list (`/customers`) loads with demo customers
   - [ ] No runtime errors in browser console

Both modes should render without crashes. The fallback mode will show demo data with a potential `isFallback: true` indicator in the data.
