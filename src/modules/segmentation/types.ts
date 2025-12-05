export type CustomerSegment = "active" | "at-risk" | "vip";

export interface CustomerSegmentationEntry {
  customerId: number;
  segment: CustomerSegment;
}
