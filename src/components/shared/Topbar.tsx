import React from "react";

/**
 * Topbar - Application header bar
 *
 * Sticky header with environment indicator and user avatar placeholder.
 * Uses semantic <header> element.
 */
export function Topbar() {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-end border-b border-gray-800 bg-gray-950/80 px-4 text-sm backdrop-blur sm:px-6">
      <div className="flex items-center gap-4 text-xs text-gray-400">
        <span className="hidden md:inline">Environment: Local</span>
        <div
          className="h-7 w-7 rounded-full bg-gray-800"
          role="img"
          aria-label="User avatar"
        />
      </div>
    </header>
  );
}
