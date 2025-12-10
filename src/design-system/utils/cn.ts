/**
 * Class name utility
 *
 * Combines clsx and tailwind-merge for conditional class names
 * with proper Tailwind class deduplication.
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
