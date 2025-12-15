/**
 * Mock Document Data
 *
 * Sample document for the Documents MVP demo.
 */

import type { Document, AIAction } from "../types";

export const mockDocument: Document = {
  id: "1",
  title: "Q1 2024 Success Plan",
  subtitle: "Acme Corporation",
  metadata: {
    owner: "Sarah Chen",
    lastUpdated: "March 15, 2024",
    framework: "MEDDICC",
    template: "Enterprise Success Plan",
  },
  sections: [
    {
      id: "executive-summary",
      title: "Executive Summary",
      content:
        "This success plan outlines the strategic objectives and key milestones for Acme Corporation's Q1 2024 engagement. Our primary focus is driving product adoption across all departments while ensuring alignment with their digital transformation initiative.",
    },
    {
      id: "business-objectives",
      title: "Business Objectives",
      content:
        "The primary objective for Acme Corporation in Q1 2024 is to increase product adoption across all departments, with a specific focus on the Sales and Marketing teams. This initiative aligns with their broader digital transformation strategy announced in January 2024.",
      subsections: [
        {
          id: "primary-goals",
          title: "Primary Goals for Q1 2024",
          content:
            "Key stakeholders have identified three critical success factors that will drive value realization:",
          items: [
            "Achieve 80% active user rate across Sales organization by end of Q1",
            "Complete integration with Salesforce CRM to streamline workflows",
            "Reduce time-to-value for new users from 14 days to 7 days",
          ],
        },
      ],
    },
    {
      id: "metrics-decision-criteria",
      title: "Metrics & Decision Criteria",
      content: "",
      subsections: [
        {
          id: "economic-buyer",
          title: "Economic Buyer Decision Criteria",
          content:
            "CFO requires minimum 20% reduction in operational costs and clear ROI demonstration within 6 months of full deployment.",
        },
        {
          id: "technical-criteria",
          title: "Technical Evaluation Criteria",
          content:
            "CTO has mandated SOC 2 Type II compliance, 99.9% uptime SLA, and seamless SSO integration with existing Okta infrastructure.",
        },
      ],
    },
    {
      id: "stakeholder-map",
      title: "Stakeholder Map",
      content:
        "Understanding the key decision makers and influencers is critical for success.",
      subsections: [
        {
          id: "champions",
          title: "Champions",
          content:
            "Emily Davis (VP Sales Operations) - Primary champion driving adoption within sales team. Has executive sponsorship from CRO.",
        },
        {
          id: "economic-buyer-stakeholder",
          title: "Economic Buyer",
          content:
            "Michael Thompson (CFO) - Final budget approval authority. Focused on ROI and cost reduction metrics.",
        },
      ],
    },
    {
      id: "action-items",
      title: "Action Items",
      content: "",
      subsections: [
        {
          id: "immediate-actions",
          title: "Immediate (This Week)",
          content: "",
          items: [
            "Schedule technical deep-dive with IT team",
            "Send ROI calculator to CFO",
            "Confirm pilot group participants",
          ],
        },
        {
          id: "short-term-actions",
          title: "Short Term (This Month)",
          content: "",
          items: [
            "Complete Salesforce integration setup",
            "Launch pilot program with Sales team",
            "Establish weekly check-in cadence",
          ],
        },
      ],
    },
  ],
};

export const aiActions: AIAction[] = [
  {
    id: "section-summary",
    label: "Section Summary",
    description: "Generate a concise summary of the current section",
    icon: "summary",
    color: "blue",
  },
  {
    id: "rewrite-section",
    label: "Rewrite Section",
    description: "Improve tone and structure while maintaining key points",
    icon: "rewrite",
    color: "purple",
  },
  {
    id: "improve-clarity",
    label: "Improve Clarity",
    description: "Make the content more clear and actionable",
    icon: "clarity",
    color: "amber",
  },
  {
    id: "explain-framework",
    label: "Explain Framework",
    description: "Get insights on how MEDDICC applies to this section",
    icon: "framework",
    color: "red",
  },
  {
    id: "generate-content",
    label: "Generate Content",
    description: "Create new content based on your inputs and context",
    icon: "generate",
    color: "green",
  },
];

export const documentOutline = mockDocument.sections.map((section) => ({
  id: section.id,
  title: section.title,
}));
