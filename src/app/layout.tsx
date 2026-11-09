import type { Metadata } from "next";
import "@raidguild/brand-system/tokens.css";
import "@raidguild/brand-system/fonts.css";
import { BrandProvider } from "@/components/brand-provider";
import "./globals.css";

const siteUrl = "https://ai-build-cohort-production.up.railway.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AI Build Cohort | RaidGuild",
  description: "Your team learns applied AI by building working prototypes for its own workflows, with hands-on guidance from RaidGuild builders.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "AI Build Cohort | RaidGuild",
    description: "Build working prototypes for your own workflows with hands-on guidance from RaidGuild builders.",
    url: siteUrl,
    images: [{ url: "/images/hero-light-poster.webp", width: 1600, height: 684, alt: "RaidGuild illustrated landscape" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-brand-reign="louchi"><body><BrandProvider>{children}</BrandProvider></body></html>;
}
