"use client";

/**
 * Theme Context & Provider
 *
 * Provides light/dark theme support with:
 * - localStorage persistence
 * - System preference detection
 * - SSR-safe implementation
 *
 * @module theme/theme-context
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";

// =============================================================================
// TYPES
// =============================================================================

/**
 * Available theme options
 * - 'light': Light theme
 * - 'dark': Dark theme
 * - 'system': Follow system preference
 */
export type Theme = "light" | "dark" | "system";

/**
 * Resolved theme (what's actually applied to the DOM)
 */
export type ResolvedTheme = "light" | "dark";

/**
 * Theme context value
 */
export interface ThemeContextValue {
  /** Current theme setting (may be 'system') */
  theme: Theme;
  /** Resolved theme that's actually applied */
  resolvedTheme: ResolvedTheme;
  /** Update the theme */
  setTheme: (theme: Theme) => void;
  /** Toggle between light and dark (ignores system) */
  toggleTheme: () => void;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const STORAGE_KEY = "successboard-theme";
const DEFAULT_THEME: Theme = "dark";
const THEME_ATTRIBUTE = "data-theme";

// =============================================================================
// CONTEXT
// =============================================================================

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// =============================================================================
// UTILITIES
// =============================================================================

/**
 * Get the system color scheme preference
 */
function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/**
 * Get stored theme from localStorage
 */
function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
  } catch {
    // localStorage may be unavailable
  }
  return null;
}

/**
 * Store theme in localStorage
 */
function storeTheme(theme: Theme): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // localStorage may be unavailable
  }
}

/**
 * Resolve theme to actual light/dark value
 */
function resolveTheme(theme: Theme): ResolvedTheme {
  if (theme === "system") {
    return getSystemTheme();
  }
  return theme;
}

/**
 * Apply theme to document
 */
function applyTheme(resolvedTheme: ResolvedTheme): void {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute(THEME_ATTRIBUTE, resolvedTheme);
  // Also set class for Tailwind dark: variant compatibility
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(resolvedTheme);
}

// =============================================================================
// PROVIDER
// =============================================================================

export interface ThemeProviderProps {
  children: React.ReactNode;
  /** Default theme if none is stored */
  defaultTheme?: Theme;
  /** Force a specific theme (useful for testing) */
  forcedTheme?: ResolvedTheme;
}

/**
 * ThemeProvider
 *
 * Wrap your app with this provider to enable theme switching.
 * Reads initial theme from localStorage, then system preference, then default.
 *
 * @example
 * ```tsx
 * <ThemeProvider defaultTheme="dark">
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  children,
  defaultTheme = DEFAULT_THEME,
  forcedTheme,
}: ThemeProviderProps) {
  // Initialize with lazy initializer to avoid setState in effect
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme;
    const stored = getStoredTheme();
    return stored ?? defaultTheme;
  });

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => {
    if (typeof window === "undefined")
      return forcedTheme ?? resolveTheme(defaultTheme);
    const stored = getStoredTheme();
    const initial = stored ?? defaultTheme;
    return forcedTheme ?? resolveTheme(initial);
  });

  const mounted = useRef(false);

  // Apply theme on mount and when forcedTheme changes
  useEffect(() => {
    applyTheme(resolvedTheme);
    mounted.current = true;
  }, [resolvedTheme, forcedTheme]);

  // Listen for system preference changes when theme is 'system'
  useEffect(() => {
    if (theme !== "system" || forcedTheme) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      const newResolved = e.matches ? "dark" : "light";
      setResolvedTheme(newResolved);
      applyTheme(newResolved);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, forcedTheme]);

  // Set theme handler
  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      storeTheme(newTheme);
      const resolved = forcedTheme ?? resolveTheme(newTheme);
      setResolvedTheme(resolved);
      applyTheme(resolved);
    },
    [forcedTheme]
  );

  // Toggle between light and dark
  const toggleTheme = useCallback(() => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  }, [resolvedTheme, setTheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme,
    }),
    [theme, resolvedTheme, setTheme, toggleTheme]
  );

  // Prevent flash of wrong theme during SSR
  // Render children but with a script that sets theme immediately
  return (
    <ThemeContext.Provider value={value}>
      {/* Inline script to prevent FOUC - runs before React hydrates */}
      {!mounted && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('${STORAGE_KEY}');
                  var theme = stored || '${defaultTheme}';
                  var resolved = theme;
                  if (theme === 'system') {
                    resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  document.documentElement.setAttribute('${THEME_ATTRIBUTE}', resolved);
                  document.documentElement.classList.add(resolved);
                } catch (e) {}
              })();
            `,
          }}
        />
      )}
      {children}
    </ThemeContext.Provider>
  );
}

// =============================================================================
// HOOK
// =============================================================================

/**
 * useTheme hook
 *
 * Access the current theme and theme controls.
 *
 * @example
 * ```tsx
 * function ThemeToggle() {
 *   const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
 *
 *   return (
 *     <button onClick={toggleTheme}>
 *       Current: {resolvedTheme}
 *     </button>
 *   );
 * }
 * ```
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// =============================================================================
// EXPORTS
// =============================================================================

export { STORAGE_KEY, THEME_ATTRIBUTE };
