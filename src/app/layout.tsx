import type { Metadata } from "next";
import "@raidguild/brand-system/tokens.css";
import "@raidguild/brand-system/fonts.css";
import { BrandProvider } from "@/components/brand-provider";
import "./globals.css";

const siteUrl = "https://ai-build-cohort-production.up.railway.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AI Build Cohort | RaidGuild",
  description: "A one-month guided AI build cohort for 4–8 participants. Practical workshops, weekly support, and a demo day. Pilots start at $5,000 per team.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "AI Build Cohort | RaidGuild",
    description: "One month, 4–8 participants, and six guided sessions to build useful AI prototypes for your work. Starting at $5,000 per team.",
    url: siteUrl,
    images: [{ url: "/images/hero-light-poster.webp", width: 1600, height: 684, alt: "RaidGuild illustrated landscape" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-brand-reign="louchi"><body><BrandProvider>{children}</BrandProvider></body></html>;
}
