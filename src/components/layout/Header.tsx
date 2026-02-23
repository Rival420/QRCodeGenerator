/**
 * Header Component.
 *
 * Application title bar with branding.
 */

import { QrCode } from "lucide-react";

/** App header with title and QR code icon. */
export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto flex items-center gap-3 px-4 py-4">
        <QrCode className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-xl font-bold tracking-tight">QR Code Generator</h1>
          <p className="text-sm text-muted-foreground">
            Create branded, customizable QR codes
          </p>
        </div>
      </div>
    </header>
  );
}
