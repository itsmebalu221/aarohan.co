'use client'

import { useRef, useEffect, ReactNode } from 'react'

// GSAP will be dynamically imported inside useEffect to avoid SSR issues

interface ParallaxColumnProps {
  children: ReactNode
  direction?: 'up' | 'down'
  speed?: number
  className?: string
}

export function ParallaxColumn({
  children,
  direction = 'down',
  speed = 100,
  className = '',
}: ParallaxColumnProps) {
  const columnRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const column = columnRef.current
    if (!column) return

    const yStart = direction === 'down' ? -speed : speed
    const yEnd = direction === 'down' ? speed : -speed

    let ctx: any

    const initAnimation = async () => {
      const [gsapModule, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger')
      ])
      const gsap = gsapModule.default
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.fromTo(
          column,
          { y: yStart },
          {
            y: yEnd,
            ease: 'none',
            scrollTrigger: {
              trigger: column.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.5,
            },
          }
        )
      })
    }

    initAnimation()

    return () => ctx?.revert()
  }, [direction, speed])

  return (
    <div ref={columnRef} className={`will-change-transform transform-stable ${className}`}>
      {children}
    </div>
  )
}

interface HorizontalDriftProps {
  children: ReactNode
  amount?: number
  direction?: 'left' | 'right'
  className?: string
}

export function HorizontalDrift({
  children,
  amount = 50,
  direction = 'right',
  className = '',
}: HorizontalDriftProps) {
  const driftRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = driftRef.current
    if (!element) return

    const xStart = direction === 'right' ? -amount : amount
    const xEnd = direction === 'right' ? amount : -amount

    let ctx: any

    const initAnimation = async () => {
      const [gsapModule, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger')
      ])
      const gsap = gsapModule.default
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.fromTo(
          element,
          { x: xStart },
          {
            x: xEnd,
            ease: 'none',
            scrollTrigger: {
              trigger: element,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.5,
            },
          }
        )
      })
    }

    initAnimation()

    return () => ctx?.revert()
  }, [amount, direction])

  return (
    <div ref={driftRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  )
}

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}

export function ScrollReveal({
  children,
  delay = 0,
  y = 40,
  className = '',
}: ScrollRevealProps) {
  const revealRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = revealRef.current
    if (!element) return

    let ctx: any

    const initAnimation = async () => {
      const [gsapModule, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger')
      ])
      const gsap = gsapModule.default
      gsap.registerPlugin(ScrollTrigger)

      // Set initial state immediately to prevent flash
      gsap.set(element, { opacity: 0, y })

      // Check if element is already in viewport on load
      const rect = element.getBoundingClientRect()
      const isInView = rect.top < window.innerHeight * 0.9

      if (isInView) {
        // Element is already visible, animate immediately
        gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: delay + 0.1,
          ease: 'power3.out',
        })
      } else {
        // Element is below viewport, use scroll trigger
        ctx = gsap.context(() => {
          gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          })
        })
      }
    }

    initAnimation()

    return () => ctx?.revert()
  }, [delay, y])

  return (
    <div ref={revealRef} className={`will-change-transform-opacity ${className}`}>
      {children}
    </div>
  )
}

interface TextRevealProps {
  children: string
  className?: string
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export function TextReveal({
  children,
  className = '',
  tag: Tag = 'span',
}: TextRevealProps) {
  const textRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = textRef.current
    if (!element) return

    let ctx: any

    const initAnimation = async () => {
      const [gsapModule, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger')
      ])
      const gsap = gsapModule.default
      gsap.registerPlugin(ScrollTrigger)

      // Split into words, wrap each in overflow-hidden span
      const words = children.split(' ')
      element.innerHTML = words
        .map(
          (word) =>
            `<span class="inline-block overflow-hidden"><span class="inline-block translate-y-full will-change-transform">${word}</span></span>`
        )
        .join(' ')

      const innerSpans = element.querySelectorAll('span > span')

      // Set initial state
      gsap.set(innerSpans, { y: '100%' })

      // Check if element is already in viewport on load
      const rect = element.getBoundingClientRect()
      const isInView = rect.top < window.innerHeight * 0.9

      if (isInView) {
        // Element is already visible, animate immediately
        gsap.to(innerSpans, {
          y: 0,
          duration: 0.8,
          stagger: 0.04,
          ease: 'power3.out',
          delay: 0.1,
        })
      } else {
        ctx = gsap.context(() => {
          gsap.to(innerSpans, {
            y: 0,
            duration: 0.8,
            stagger: 0.04,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          })
        })
      }
    }

    initAnimation()

    return () => ctx?.revert()
  }, [children])

  return (
    // @ts-ignore - dynamic tag
    <Tag ref={textRef} className={className}>
      {children}
    </Tag>
  )
}
