"use client";

import React from "react";
import Image from "next/image";
import { User, Settings, LogOut, HelpCircle } from "lucide-react";
import { ThemeSwitcher } from "@/modules/theme";
import { appConfig } from "@/config";
import { cn } from "@/design-system/utils/cn";
import { useTheme } from "@/modules/theme";
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

export function Topbar() {
  const { resolvedTheme } = useTheme();
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
      {/* Left zone - Logo on mobile */}
      <div className="flex items-center gap-3">
        <Image
          src={
            resolvedTheme === "light"
              ? "/logo-sm-light.png"
              : "/logo-sm-dark.png"
          }
          alt="SuccessBoard"
          width={32}
          height={32}
          className="md:hidden object-contain"
        />
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
