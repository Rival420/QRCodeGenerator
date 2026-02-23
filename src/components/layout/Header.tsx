/**
 * Header Component.
 *
 * Application title bar with branding and theme toggle.
 */

import { QrCode } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

/** App header with title, tagline and theme toggle. */
export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <QrCode className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              QR-codegenerator
            </h1>
            <p className="text-sm text-muted-foreground">
              Maak gepersonaliseerde QR-codes met je eigen stijl
            </p>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
