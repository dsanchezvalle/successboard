/**
 * Document Types
 *
 * Types for the Documents MVP module.
 * Frameworks and Templates are presentational metadata only.
 */

export interface DocumentSection {
  id: string;
  title: string;
  content: string;
  subsections?: DocumentSubsection[];
}

export interface DocumentSubsection {
  id: string;
  title: string;
  content: string;
  items?: string[];
}

export interface DocumentMetadata {
  owner: string;
  lastUpdated: string;
  framework: string;
  template: string;
}

export interface Document {
  id: string;
  title: string;
  subtitle?: string;
  /** Document description or summary */
  description?: string;
  metadata: DocumentMetadata;
  sections: DocumentSection[];
}

export interface AIAction {
  id: string;
  label: string;
  description: string;
  icon: "summary" | "rewrite" | "clarity" | "framework" | "generate";
  color: "blue" | "purple" | "amber" | "red" | "green";
}
