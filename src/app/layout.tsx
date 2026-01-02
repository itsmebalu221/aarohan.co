import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import ClientLayout from "./ClientLayout";


const displayFont = Inter({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500"],
});

const monoFont = Inter({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Aarohan Tech",
    template: "%s — Aarohan Tech",
  },
  description: "Digital authority through design.",
  metadataBase: new URL("https://aarohan.studio"),
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
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=the-seasons@400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/aarohan.png" />
      </head>
      <body className="bg-void text-ivory antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
