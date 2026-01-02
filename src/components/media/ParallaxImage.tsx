'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ParallaxImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  parallaxIntensity?: number
  priority?: boolean
}

export default function ParallaxImage({
  src,
  alt,
  width = 800,
  height = 1000,
  className = '',
  parallaxIntensity = 0.15,
  priority = false,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const image = imageRef.current
    if (!container || !image) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        image,
        { y: `-${parallaxIntensity * 100}%` },
        {
          y: `${parallaxIntensity * 100}%`,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        }
      )
    })

    return () => ctx.revert()
  }, [parallaxIntensity])

  // Calculate the overflow needed for parallax
  const overflow = parallaxIntensity * 100

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden transform-stable ${className}`}
    >
      {/* Reserve space to prevent CLS */}
      <div className="w-full" style={{ paddingBottom: '0' }} />
      
      <div
        ref={imageRef}
        className="absolute inset-0 will-change-transform"
        style={{
          top: `-${overflow}%`,
          bottom: `-${overflow}%`,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
        />
      </div>
    </div>
  )
}
