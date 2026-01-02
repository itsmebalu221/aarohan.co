import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'The philosophy and team behind Aarohan Studio.',
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
