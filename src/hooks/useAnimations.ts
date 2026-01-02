'use client'

import { useEffect, useRef, RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface UseParallaxOptions {
  speed?: number
  direction?: 'vertical' | 'horizontal'
  start?: string
  end?: string
}

export function useParallax<T extends HTMLElement>(
  options: UseParallaxOptions = {}
): RefObject<T> {
  const {
    speed = 0.5,
    direction = 'vertical',
    start = 'top bottom',
    end = 'bottom top',
  } = options
  
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const property = direction === 'vertical' ? 'y' : 'x'
    const distance = 100 * speed

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { [property]: -distance },
        {
          [property]: distance,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start,
            end,
            scrub: true,
          },
        }
      )
    })

    return () => ctx.revert()
  }, [speed, direction, start, end])

  return ref
}

export function useScrollProgress(
  ref: RefObject<HTMLElement>,
  onProgress?: (progress: number) => void
) {
  useEffect(() => {
    const element = ref.current
    if (!element) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          onProgress?.(self.progress)
        },
      })
    })

    return () => ctx.revert()
  }, [ref, onProgress])
}

export function useRevealAnimation<T extends HTMLElement>(
  options: {
    delay?: number
    duration?: number
    y?: number
  } = {}
): RefObject<T> {
  const { delay = 0, duration = 1.2, y = 60 } = options
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    gsap.set(element, { opacity: 0, y })

    const ctx = gsap.context(() => {
      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    })

    return () => ctx.revert()
  }, [delay, duration, y])

  return ref
}

export function useSplitTextReveal<T extends HTMLElement>(
  options: {
    stagger?: number
    duration?: number
  } = {}
): RefObject<T> {
  const { stagger = 0.08, duration = 1.2 } = options
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Split text into spans
    const text = element.textContent || ''
    const words = text.split(' ')
    element.innerHTML = words
      .map(
        (word) =>
          `<span class="inline-block overflow-hidden"><span class="inline-block" style="transform: translateY(100%)">${word}</span></span>`
      )
      .join(' ')

    const innerSpans = element.querySelectorAll('span > span')

    const ctx = gsap.context(() => {
      gsap.to(innerSpans, {
        y: 0,
        duration,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    })

    return () => ctx.revert()
  }, [stagger, duration])

  return ref
}
