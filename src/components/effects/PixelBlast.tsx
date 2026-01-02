'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Pixel {
  x: number
  y: number
  size: number
  delay: number
  duration: number
  opacity: number
}

interface PixelBlastProps {
  count?: number
  className?: string
  color?: 'gold' | 'mist' | 'ivory'
  pattern?: 'scattered' | 'burst' | 'drift'
}

export default function PixelBlast({ 
  count = 20, 
  className = '',
  color = 'gold',
  pattern = 'scattered'
}: PixelBlastProps) {
  const pixels = useRef<Pixel[]>([])

  // Generate pixels once
  if (pixels.current.length === 0) {
    for (let i = 0; i < count; i++) {
      const pixel: Pixel = {
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 2,
        duration: Math.random() * 3 + 2,
        opacity: Math.random() * 0.5 + 0.1,
      }
      
      // Adjust based on pattern
      if (pattern === 'burst') {
        // Cluster toward center then spread
        pixel.x = 50 + (Math.random() - 0.5) * 60
        pixel.y = 50 + (Math.random() - 0.5) * 60
      } else if (pattern === 'drift') {
        // Horizontal bias
        pixel.y = Math.random() * 40 + 30
      }
      
      pixels.current.push(pixel)
    }
  }

  const colorClasses = {
    gold: 'bg-gold',
    mist: 'bg-mist',
    ivory: 'bg-ivory',
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {pixels.current.map((pixel, i) => (
        <motion.div
          key={i}
          className={`absolute ${colorClasses[color]}`}
          style={{
            left: `${pixel.x}%`,
            top: `${pixel.y}%`,
            width: pixel.size,
            height: pixel.size,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, pixel.opacity, pixel.opacity, 0],
            scale: [0, 1, 1, 0],
          }}
          transition={{
            duration: pixel.duration,
            delay: pixel.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 3,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   PIXEL FIELD — Static scattered pixels with scroll parallax
   ═══════════════════════════════════════════════════════════ */

export function PixelField({ 
  count = 30,
  className = '',
  color = 'mist' as 'gold' | 'mist' | 'ivory',
}) {
  const pixels: Pixel[] = []
  
  for (let i = 0; i < count; i++) {
    pixels.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: 0,
      duration: 0,
      opacity: Math.random() * 0.3 + 0.05,
    })
  }

  const colorClasses = {
    gold: 'bg-gold',
    mist: 'bg-mist',
    ivory: 'bg-ivory',
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {pixels.map((pixel, i) => (
        <div
          key={i}
          className={`absolute ${colorClasses[color]}`}
          style={{
            left: `${pixel.x}%`,
            top: `${pixel.y}%`,
            width: pixel.size,
            height: pixel.size,
            opacity: pixel.opacity,
          }}
        />
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   PIXEL TRAIL — Animated trail of pixels
   ═══════════════════════════════════════════════════════════ */

export function PixelTrail({
  direction = 'horizontal' as 'horizontal' | 'vertical',
  count = 12,
  className = '',
}) {
  const pixels = []
  
  for (let i = 0; i < count; i++) {
    const pos = (i / count) * 100
    const offset = Math.sin(i * 0.5) * 20
    
    pixels.push({
      x: direction === 'horizontal' ? pos : 50 + offset,
      y: direction === 'vertical' ? pos : 50 + offset,
      size: Math.random() * 2 + 1,
      delay: i * 0.1,
      opacity: 0.1 + (i / count) * 0.3,
    })
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {pixels.map((pixel, i) => (
        <motion.div
          key={i}
          className="absolute bg-gold"
          style={{
            left: `${pixel.x}%`,
            top: `${pixel.y}%`,
            width: pixel.size,
            height: pixel.size,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, pixel.opacity, 0] }}
          transition={{
            duration: 2,
            delay: pixel.delay,
            repeat: Infinity,
            repeatDelay: 1,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   PIXEL CONSTELLATION — Connected dots pattern
   ═══════════════════════════════════════════════════════════ */

export function PixelConstellation({
  className = '',
}) {
  // Pre-defined constellation points for elegant placement
  const points = [
    { x: 15, y: 20 },
    { x: 25, y: 35 },
    { x: 18, y: 50 },
    { x: 30, y: 45 },
    { x: 40, y: 25 },
    { x: 75, y: 15 },
    { x: 82, y: 30 },
    { x: 78, y: 45 },
    { x: 85, y: 55 },
    { x: 70, y: 60 },
    { x: 60, y: 75 },
    { x: 50, y: 85 },
    { x: 35, y: 80 },
    { x: 20, y: 70 },
  ]

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {points.map((point, i) => (
        <motion.div
          key={i}
          className="absolute bg-gold rounded-full"
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`,
            width: 2,
            height: 2,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.4, 0.4, 0],
            scale: [0, 1, 1, 0],
          }}
          transition={{
            duration: 4,
            delay: i * 0.2,
            repeat: Infinity,
            repeatDelay: 2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
