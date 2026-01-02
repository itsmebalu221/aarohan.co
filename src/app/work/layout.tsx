import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected projects demonstrating digital authority and strategic design excellence.',
}

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
