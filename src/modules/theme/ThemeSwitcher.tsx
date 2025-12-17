"use client";

/**
 * Theme Switcher Component
 *
 * Accessible toggle button for switching between light and dark themes.
 * Uses proper ARIA attributes and focus-visible styling.
 *
 * @module theme/ThemeSwitcher
 */

import { useTheme } from "./theme-context";

/**
 * Sun icon for light mode
 */
function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

/**
 * Moon icon for dark mode
 */
function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

export interface ThemeSwitcherProps {
  /** Additional CSS classes */
  className?: string;
  /** Size variant */
  size?: "sm" | "md";
}

/**
 * ThemeSwitcher
 *
 * An accessible button that toggles between light and dark themes.
 * Shows a sun icon in dark mode (to switch to light) and moon icon in light mode (to switch to dark).
 *
 * @accessibility
 * - Uses aria-label to describe the action
 * - Has visible focus ring for keyboard navigation
 * - Respects prefers-reduced-motion for transitions
 *
 * @example
 * ```tsx
 * <ThemeSwitcher />
 * <ThemeSwitcher size="sm" />
 * ```
 */
export function ThemeSwitcher({
  className = "",
  size = "md",
}: ThemeSwitcherProps) {
  const { resolvedTheme, toggleTheme } = useTheme();

  const isDark = resolvedTheme === "dark";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-9 w-9",
  };

  const iconSizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      className={`
        inline-flex items-center justify-center rounded-full
        ${sizeClasses[size]}
        bg-bg-subtle hover:bg-bg-muted
        text-text-secondary hover:text-text-primary
        border border-border-default
        transition-colors duration-150 cursor-pointer
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page
        ${className}
      `.trim()}
    >
      {isDark ? (
        <SunIcon className={iconSizeClasses[size]} />
      ) : (
        <MoonIcon className={iconSizeClasses[size]} />
      )}
    </button>
  );
}
