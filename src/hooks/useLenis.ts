'use client'

import { useEffect, useRef, RefObject } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance: Lenis | null = null

export function useLenis(): Lenis | null {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (lenisInstance) {
      lenisRef.current = lenisInstance
      return
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    })

    lenisInstance = lenis
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      // Don't destroy on unmount - it's a singleton
    }
  }, [])

  return lenisRef.current
}

export function useScrollVelocity(): RefObject<number> {
  const velocity = useRef(0)

  useEffect(() => {
    if (!lenisInstance) return

    const handleScroll = ({ velocity: v }: { velocity: number }) => {
      velocity.current = v
    }

    lenisInstance.on('scroll', handleScroll)

    return () => {
      lenisInstance?.off('scroll', handleScroll)
    }
  }, [])

  return velocity
}

export function scrollTo(target: string | number | HTMLElement, options?: {
  offset?: number
  duration?: number
  immediate?: boolean
}) {
  lenisInstance?.scrollTo(target, options)
}
