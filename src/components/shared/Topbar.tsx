"use client";

import React from "react";
import { User, Settings, LogOut, HelpCircle } from "lucide-react";
import { ThemeSwitcher } from "@/modules/theme";
import { appConfig } from "@/config";
import { cn } from "@/design-system/utils/cn";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Topbar - Application header bar
 *
 * Premium sticky header with clear left/middle/right zones:
 * - Left: App branding/context (reserved for future use)
 * - Middle: AI feature access (Sparkles)
 * - Right: Environment indicator, theme switcher, user avatar
 *
 * @accessibility
 * - Uses semantic <header> element
 * - All interactive elements are focusable with visible focus rings
 * - Icon-only buttons have aria-labels
 * - Proper keyboard navigation (tab order)
 * - Appropriate hit targets (min 32x32px)
 */

/**
 * IconButton - Reusable icon button with consistent styling
 */
interface IconButtonProps {
  onClick?: () => void;
  ariaLabel: string;
  children: React.ReactNode;
  className?: string;
}

function IconButton({
  onClick,
  ariaLabel,
  children,
  className,
}: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-md",
        "bg-transparent hover:bg-bg-subtle",
        "text-text-muted hover:text-text-primary",
        "cursor-pointer transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg-surface",
        className
      )}
    >
      {children}
    </button>
  );
}

/**
 * UserAvatar - Initial-based avatar component
 */
interface UserAvatarProps {
  initial: string;
  size?: "sm" | "md";
  className?: string;
}

function UserAvatar({ initial, size = "sm", className }: UserAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8 text-sm",
    md: "h-9 w-9 text-base",
  };

  const handleProfile = () => {
    console.log("Navigate to profile");
    // TODO: Add navigation logic
  };

  const handleSettings = () => {
    console.log("Navigate to settings");
    // TODO: Add navigation logic
  };

  const handleHelp = () => {
    console.log("Navigate to help");
    // TODO: Add navigation logic
  };

  const handleSignOut = () => {
    console.log("Sign out");
    // TODO: Add sign out logic
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="User menu"
          className={cn(
            "inline-flex items-center justify-center rounded-full",
            "bg-ds-primary-subtle text-ds-primary-foreground",
            "font-medium",
            "cursor-pointer transition-all duration-150",
            "ring-2 ring-ds-primary/30",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg-surface",
            sizeClasses[size],
            className
          )}
        >
          {initial.toUpperCase()}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" sideOffset={8} align="end">
        <DropdownMenuItem onClick={handleProfile}>
          <User className="mr-3 h-4 w-4 text-text-muted" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSettings}>
          <Settings className="mr-3 h-4 w-4 text-text-muted" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleHelp}>
          <HelpCircle className="mr-3 h-4 w-4 text-text-muted" />
          Help & Support
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-3 h-4 w-4 text-text-muted" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * EnvironmentBadge - Shows current environment with appropriate styling
 */
function EnvironmentBadge() {
  const { environmentLabel, isProduction } = appConfig;

  // Don't show badge in production
  if (isProduction) return null;

  return (
    <span
      className={cn(
        "hidden md:inline-flex items-center px-2 py-0.5 rounded-md",
        "text-xs font-medium",
        "bg-bg-subtle text-text-muted",
        "border border-border-default"
      )}
    >
      {environmentLabel}
    </span>
  );
}

export function Topbar() {
  return (
    <header
      className={cn(
        "sticky top-0 z-20",
        "flex h-14 items-center justify-between",
        "border-b border-border-default",
        "bg-bg-surface/80 backdrop-blur-sm",
        "px-4 sm:px-6"
      )}
    >
      {/* Left zone - Reserved for breadcrumbs/context */}
      <div className="flex items-center gap-3">
        {/* Future: Breadcrumbs or page context */}
      </div>

      {/* Middle zone - Reserved for future features */}
      <div className="flex items-center">{/* Future: AI/Feature access */}</div>

      {/* Right zone - Theme, User */}
      <nav className="flex items-center gap-3" aria-label="User actions">
        <Tooltip>
          <TooltipTrigger>
            <ThemeSwitcher size="sm" />
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={8}>
            Switch theme
          </TooltipContent>
        </Tooltip>
        <UserAvatar initial="E" />
      </nav>
    </header>
  );
}
