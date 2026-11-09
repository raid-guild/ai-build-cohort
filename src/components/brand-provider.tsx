"use client";

import { ThemeProvider } from "@raidguild/brand-system";

export function BrandProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider defaultReign="louchi">{children}</ThemeProvider>;
}
