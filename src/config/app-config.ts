/**
 * App Configuration Module
 *
 * Single source of truth for application-wide configuration values.
 * Reads from environment variables with sensible fallbacks.
 *
 * @module config/app-config
 */

/**
 * Environment types supported by the application
 */
export type AppEnvironment = "local" | "development" | "staging" | "production";

/**
 * Application configuration object
 */
export interface AppConfig {
  /** Current environment name */
  environment: AppEnvironment;
  /** Display label for the environment (for UI) */
  environmentLabel: string;
  /** Whether the app is running in development mode */
  isDevelopment: boolean;
  /** Whether the app is running in production mode */
  isProduction: boolean;
  /** MockAPI base URL (if configured) */
  mockApiBaseUrl: string | undefined;
}

/**
 * Determines the current environment based on env vars
 */
function getEnvironment(): AppEnvironment {
  const envVar = process.env.NEXT_PUBLIC_APP_ENV?.toLowerCase();

  if (envVar === "production" || envVar === "prod") return "production";
  if (envVar === "staging" || envVar === "stage") return "staging";
  if (envVar === "development" || envVar === "dev") return "development";

  // Default to local for development builds
  return "local";
}

/**
 * Gets a human-readable label for the environment
 */
function getEnvironmentLabel(env: AppEnvironment): string {
  const labels: Record<AppEnvironment, string> = {
    local: "Local",
    development: "Development",
    staging: "Staging",
    production: "Production",
  };
  return labels[env];
}

/**
 * Application configuration singleton
 *
 * Use this to access environment and config values throughout the app.
 *
 * @example
 * ```tsx
 * import { appConfig } from '@/config/app-config';
 *
 * if (appConfig.isDevelopment) {
 *   console.log('Running in dev mode');
 * }
 *
 * <span>{appConfig.environmentLabel}</span>
 * ```
 */
export const appConfig: AppConfig = {
  environment: getEnvironment(),
  environmentLabel: getEnvironmentLabel(getEnvironment()),
  isDevelopment:
    getEnvironment() === "development" || getEnvironment() === "local",
  isProduction: getEnvironment() === "production",
  mockApiBaseUrl: process.env.NEXT_PUBLIC_MOCKAPI_BASE_URL,
};
