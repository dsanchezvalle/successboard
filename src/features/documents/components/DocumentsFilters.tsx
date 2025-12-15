"use client";

import { Search, X, ChevronDown } from "lucide-react";
import type { DocumentType, DocumentStatus } from "@/modules/api";
import type { SortField, SortOrder } from "../data/documents-service";

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface DocumentsFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  documentType: DocumentType | "";
  onDocumentTypeChange: (value: DocumentType | "") => void;
  status: DocumentStatus | "";
  onStatusChange: (value: DocumentStatus | "") => void;
  frameworkId: string;
  onFrameworkChange: (value: string) => void;
  customerId: string;
  onCustomerChange: (value: string) => void;
  sortField: SortField;
  sortOrder: SortOrder;
  onSortChange: (field: SortField, order: SortOrder) => void;
  documentTypes: FilterOption[];
  statuses: FilterOption[];
  frameworks: FilterOption[];
  customers: FilterOption[];
}

const sortOptions: { value: string; label: string }[] = [
  { value: "createdAt-desc", label: "Newest first" },
  { value: "createdAt-asc", label: "Oldest first" },
  { value: "title-asc", label: "Title A-Z" },
  { value: "title-desc", label: "Title Z-A" },
  { value: "customerName-asc", label: "Customer A-Z" },
  { value: "customerName-desc", label: "Customer Z-A" },
];

export function DocumentsFilters({
  search,
  onSearchChange,
  documentType,
  onDocumentTypeChange,
  status,
  onStatusChange,
  frameworkId,
  onFrameworkChange,
  customerId,
  onCustomerChange,
  sortField,
  sortOrder,
  onSortChange,
  documentTypes,
  statuses,
  frameworks,
  customers,
}: DocumentsFiltersProps) {
  const hasActiveFilters = documentType || status || frameworkId || customerId;

  const handleSortChange = (value: string) => {
    const [field, order] = value.split("-") as [SortField, SortOrder];
    onSortChange(field, order);
  };

  const clearAllFilters = () => {
    onSearchChange("");
    onDocumentTypeChange("");
    onStatusChange("");
    onFrameworkChange("");
    onCustomerChange("");
  };

  return (
    <div className="space-y-3">
      {/* Search and Sort Row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search documents..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-9 w-full rounded-lg border border-border-default bg-bg-surface pl-9 pr-3 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
          />
          {search && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-text-muted hover:text-text-primary"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted">Sort by:</span>
          <select
            value={`${sortField}-${sortOrder}`}
            onChange={(e) => handleSortChange(e.target.value)}
            className="h-8 rounded-md border border-border-default bg-bg-surface px-2 pr-7 text-sm text-text-primary focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary appearance-none cursor-pointer"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filter Chips Row */}
      <div className="flex flex-wrap items-center gap-2">
        <FilterSelect
          label="Type"
          value={documentType}
          onChange={(v) => onDocumentTypeChange(v as DocumentType | "")}
          options={documentTypes}
          placeholder="All types"
        />
        <FilterSelect
          label="Status"
          value={status}
          onChange={(v) => onStatusChange(v as DocumentStatus | "")}
          options={statuses}
          placeholder="All statuses"
        />
        <FilterSelect
          label="Framework"
          value={frameworkId}
          onChange={onFrameworkChange}
          options={frameworks}
          placeholder="All frameworks"
        />
        <FilterSelect
          label="Customer"
          value={customerId}
          onChange={onCustomerChange}
          options={customers}
          placeholder="All customers"
        />

        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-text-muted hover:bg-bg-subtle hover:text-text-primary transition-colors"
          >
            <X className="h-3 w-3" />
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}

interface FilterSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  placeholder: string;
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
}: FilterSelectProps) {
  const selectedOption = options.find((o) => o.value === value);
  const displayLabel = selectedOption ? selectedOption.label : placeholder;

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-8 rounded-full border px-3 pr-7 text-xs font-medium appearance-none cursor-pointer transition-colors focus:outline-none focus:ring-1 focus:ring-brand-primary ${
          value
            ? "border-brand-primary/30 bg-brand-primary/10 text-brand-primary"
            : "border-border-default bg-bg-surface text-text-secondary hover:border-border-strong"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label} {opt.count !== undefined && `(${opt.count})`}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 pointer-events-none text-current opacity-60" />
    </div>
  );
}
