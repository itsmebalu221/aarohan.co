import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Strategic design services that build digital authority and competitive advantage.',
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
