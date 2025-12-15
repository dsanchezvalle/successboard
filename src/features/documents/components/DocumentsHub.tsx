"use client";

import { useState, useMemo, useEffect } from "react";
import type { DocumentType, DocumentStatus } from "@/modules/api";
import type {
  DocumentListItem,
  DocumentsHubData,
  SortField,
  SortOrder,
} from "../data/documents-service";
import { DocumentsFilters } from "./DocumentsFilters";
import { DocumentsTable } from "./DocumentsTable";
import { DocumentsGrid } from "./DocumentsGrid";
import { ViewSwitcher, type ViewMode } from "./ViewSwitcher";

interface DocumentsHubProps {
  initialData: DocumentsHubData;
}

export function DocumentsHub({ initialData }: DocumentsHubProps) {
  // View mode state
  const [viewMode, setViewMode] = useState<ViewMode>("table");

  // Filter state
  const [search, setSearch] = useState("");
  const [documentType, setDocumentType] = useState<DocumentType | "">("");
  const [status, setStatus] = useState<DocumentStatus | "">("");
  const [frameworkId, setFrameworkId] = useState("");
  const [customerId, setCustomerId] = useState("");

  // Sort state
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  // Responsive: force card view on mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const effectiveViewMode = isMobile ? "cards" : viewMode;

  // Filter and sort documents client-side
  const filteredDocuments = useMemo(() => {
    let result = [...initialData.documents];

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (doc) =>
          doc.title.toLowerCase().includes(searchLower) ||
          doc.customerName.toLowerCase().includes(searchLower) ||
          (doc.description?.toLowerCase().includes(searchLower) ?? false)
      );
    }

    // Document type filter
    if (documentType) {
      result = result.filter((doc) => doc.documentType === documentType);
    }

    // Status filter
    if (status) {
      result = result.filter((doc) => doc.status === status);
    }

    // Framework filter
    if (frameworkId) {
      result = result.filter((doc) => doc.frameworkId === frameworkId);
    }

    // Customer filter
    if (customerId) {
      result = result.filter((doc) => doc.customerId === customerId);
    }

    // Sorting
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case "createdAt":
          comparison =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "customerName":
          comparison = a.customerName.localeCompare(b.customerName);
          break;
        case "documentType":
          comparison = a.documentTypeLabel.localeCompare(b.documentTypeLabel);
          break;
      }
      return sortOrder === "desc" ? -comparison : comparison;
    });

    return result;
  }, [
    initialData.documents,
    search,
    documentType,
    status,
    frameworkId,
    customerId,
    sortField,
    sortOrder,
  ]);

  const handleSortChange = (field: SortField, order: SortOrder) => {
    setSortField(field);
    setSortOrder(order);
  };

  const handleTableSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters + View Switcher Row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <DocumentsFilters
            search={search}
            onSearchChange={setSearch}
            documentType={documentType}
            onDocumentTypeChange={setDocumentType}
            status={status}
            onStatusChange={setStatus}
            frameworkId={frameworkId}
            onFrameworkChange={setFrameworkId}
            customerId={customerId}
            onCustomerChange={setCustomerId}
            sortField={sortField}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
            documentTypes={initialData.documentTypes}
            statuses={initialData.statuses}
            frameworks={initialData.frameworks}
            customers={initialData.customers}
          />
        </div>

        {/* View Switcher - hidden on mobile */}
        <div className="hidden md:block shrink-0">
          <ViewSwitcher viewMode={viewMode} onViewModeChange={setViewMode} />
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-text-muted">
        <span>
          {filteredDocuments.length} document
          {filteredDocuments.length !== 1 ? "s" : ""}
          {(search || documentType || status || frameworkId || customerId) && (
            <span> matching filters</span>
          )}
        </span>
      </div>

      {/* Document List */}
      {effectiveViewMode === "table" ? (
        <DocumentsTable
          documents={filteredDocuments}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleTableSort}
        />
      ) : (
        <DocumentsGrid documents={filteredDocuments} />
      )}
    </div>
  );
}
