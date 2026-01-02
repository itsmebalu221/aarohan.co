'use client'

import { useEffect } from 'react'
import { useLenis } from '@/hooks'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenis = useLenis()

  useEffect(() => {
    // Lenis is initialized through the hook
  }, [lenis])

  return <>{children}</>
}
