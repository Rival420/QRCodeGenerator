/**
 * ThemeToggle Component.
 *
 * Button to switch between light and dark theme.
 * Uses sun/moon icons with smooth transition.
 */

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

/** Toggle button for light/dark theme. */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={isDark ? "Schakel naar licht thema" : "Schakel naar donker thema"}
      className={cn(
        "relative rounded-full transition-colors hover:bg-accent",
        className,
      )}
    >
      <Sun
        className={cn(
          "h-5 w-5 transition-all duration-300",
          isDark ? "scale-0 opacity-0" : "scale-100 opacity-100",
        )}
        aria-hidden
      />
      <Moon
        className={cn(
          "absolute h-5 w-5 transition-all duration-300",
          isDark ? "scale-100 opacity-100" : "scale-0 opacity-0",
        )}
        aria-hidden
      />
    </Button>
  )
}
