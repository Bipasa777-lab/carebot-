"use client";
// File: src/lib/utils.ts

/**
 * Merges Tailwind class names conditionally.
 * Used by ShadCN UI components for dynamic styling.
 */
export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}
