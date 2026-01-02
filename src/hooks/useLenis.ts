'use client'

import { useEffect, useRef, RefObject } from 'react'

let lenisInstance: any = null

export function useLenis(): any {
  const lenisRef = useRef<any>(null)

  useEffect(() => {
    // Only import and initialize on client-side
    const initLenis = async () => {
      if (typeof window === 'undefined') return

      const [{ default: Lenis }, gsapModule, { ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger')
      ])
      
      const gsap = gsapModule.default
      gsap.registerPlugin(ScrollTrigger)

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

      gsap.ticker.add((time: number) => {
        lenis.raf(time * 1000)
      })

      gsap.ticker.lagSmoothing(0)
    }

    initLenis()
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
