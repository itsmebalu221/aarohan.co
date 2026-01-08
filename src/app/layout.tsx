import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Providers from "./providers";

// Consolidated font loading - using Inter with all needed weights
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Aarohan Tech",
    template: "%s — Aarohan Tech",
  },
  description: "Digital authority through design. A strategic design studio crafting premium digital experiences for visionary brands.",
  keywords: ["web design", "digital agency", "branding", "development", "UI/UX", "India"],
  authors: [{ name: "Aarohan Studio" }],
  creator: "Aarohan Studio",
  metadataBase: new URL("https://aarohan.studio"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Aarohan Studio",
    title: "Aarohan Tech — Digital Excellence",
    description: "A strategic design studio crafting premium digital experiences for visionary brands.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aarohan Tech",
    description: "Digital authority through design.",
  },
};

export const viewport: Viewport = {
  themeColor: "#131215",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} dark`}
      style={{
        ['--font-display' as string]: 'var(--font-body)',
        ['--font-mono' as string]: 'ui-monospace, monospace'
      }}
      suppressHydrationWarning
    >
      <head>
        {/* Preload external font for better performance */}
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=the-seasons@400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/aarohan1.png" />
      </head>
      <body className="bg-void text-ivory antialiased">
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2 focus:bg-gold focus:text-void focus:rounded focus:outline-none"
        >
          Skip to main content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

