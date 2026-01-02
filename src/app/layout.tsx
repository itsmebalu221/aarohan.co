import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import Navigation from '@/components/navigation/Navigation'
import Cursor from '@/components/cursor/Cursor'
import SmoothScroll from '@/components/scroll/SmoothScroll'
import PageTransition from '@/components/transitions/PageTransition'

const displayFont = Inter({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['500', '600', '700'],
  preload: true,
})

const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500'],
  preload: true,
})

const monoFont = Inter({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: 'Aarohan Tech',
    template: '%s — Aarohan Tech',
  },
  description: 'Digital authority through design. Strategic creative direction for visionary brands.',
  keywords: ['digital agency', 'creative direction', 'brand strategy', 'design studio'],
  authors: [{ name: 'Aarohan Tech' }],
  creator: 'Aarohan Tech',
  metadataBase: new URL('https://aarohan.studio'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Aarohan Tech',
    title: 'Aarohan Tech',
    description: 'Digital authority through design',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aarohan Tech',
    description: 'Digital authority through design',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#131215',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=the-seasons@400,500,600,700&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/png" href="/aarohan.png" sizes="32x32" />
      </head>
      <body className="bg-void text-ivory antialiased selection:bg-gold selection:text-void">
        <SmoothScroll>
          {/* Noise Texture Overlay */}
          <div className="noise-overlay" aria-hidden="true" />

          {/* Custom Cursor — desktop only */}
          <Cursor />

          {/* Navigation */}
          <Navigation />

          {/* Page Content with Transitions */}
          <PageTransition>
            <main className="relative">{children}</main>
          </PageTransition>
        </SmoothScroll>
      </body>
    </html>
  )
}
