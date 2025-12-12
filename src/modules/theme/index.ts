/**
 * Theme Module
 *
 * Provides light/dark theme support for SuccessBoard.
 *
 * @module theme
 *
 * @example
 * ```tsx
 * // In layout.tsx
 * import { ThemeProvider } from '@/modules/theme';
 *
 * export default function Layout({ children }) {
 *   return (
 *     <ThemeProvider defaultTheme="dark">
 *       {children}
 *     </ThemeProvider>
 *   );
 * }
 *
 * // In a component
 * import { useTheme } from '@/modules/theme';
 *
 * function MyComponent() {
 *   const { theme, toggleTheme } = useTheme();
 *   // ...
 * }
 * ```
 */

export {
  ThemeProvider,
  useTheme,
  STORAGE_KEY,
  THEME_ATTRIBUTE,
} from "./theme-context";

export { ThemeSwitcher } from "./ThemeSwitcher";

export type {
  Theme,
  ResolvedTheme,
  ThemeContextValue,
  ThemeProviderProps,
} from "./theme-context";

export type { ThemeSwitcherProps } from "./ThemeSwitcher";
