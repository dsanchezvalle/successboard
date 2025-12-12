"use client";

import React from "react";
import { ThemeSwitcher } from "@/modules/theme";

/**
 * Topbar - Application header bar
 *
 * Sticky header with theme switcher, environment indicator, and user avatar.
 * Uses semantic <header> element and design system tokens for theming.
 */
export function Topbar() {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-end border-b border-border-default bg-bg-surface/80 px-4 text-sm backdrop-blur sm:px-6">
      <div className="flex items-center gap-3 text-xs text-text-muted">
        <span className="hidden md:inline">Environment: Local</span>
        <ThemeSwitcher size="sm" />
        <div
          className="h-7 w-7 rounded-full bg-bg-subtle"
          role="img"
          aria-label="User avatar"
        />
      </div>
    </header>
  );
}
