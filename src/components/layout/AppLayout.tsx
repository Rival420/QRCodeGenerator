/**
 * AppLayout Component.
 *
 * Overall page structure: header, main content area, and footer.
 * Provides consistent max-width container and spacing.
 */

import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface AppLayoutProps {
  /** Main content of the application. */
  children: ReactNode;
}

/** Full-page layout with header, scrollable content, and footer. */
export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
