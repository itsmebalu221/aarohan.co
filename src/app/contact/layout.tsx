import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Begin a conversation about your next project.',
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
