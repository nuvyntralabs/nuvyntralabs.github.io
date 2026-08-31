import type { Metadata } from "next";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { siteGraph } from "@/lib/json-ld";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.shortName,
  authors: [{ name: siteConfig.author, url: siteConfig.authorUrl }],
  creator: siteConfig.author,
  publisher: siteConfig.name,
  category: "technology",
  keywords: [
    "Nuvyntra Labs",
    "Niladri Prasad Padhy",
    "Niladri Padhy",
    "applied R&D",
    "mobile infrastructure",
    "open source",
    ".NET MAUI",
    "NuGet",
    "Plugin.Maui",
    "MauiEssentials",
    "Plugin.Maui.GeoLocator",
    "Plugin.Maui.NetworkMonitor",
    "Plugin.Maui.OfflineSync",
    "Plugin.Maui.MVVMExpress",
    "MVVMExpress",
  ],
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/feed.xml",
      "text/plain": "/llms.txt",
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.shortName,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  ...(siteConfig.googleSiteVerification || siteConfig.bingSiteVerification
    ? {
        verification: {
          ...(siteConfig.googleSiteVerification
            ? { google: siteConfig.googleSiteVerification }
            : {}),
          ...(siteConfig.bingSiteVerification
            ? { other: { "msvalidate.01": siteConfig.bingSiteVerification } }
            : {}),
        },
      }
    : {}),
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontDisplay.variable}`}>
      <body className="font-sans">
        <JsonLd data={siteGraph()} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-foreground"
        >
          Skip to content
        </a>
        <Nav />
        <div id="main">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
