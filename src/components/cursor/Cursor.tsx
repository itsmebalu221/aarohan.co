'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isHoveringLink, setIsHoveringLink] = useState(false)
  const [cursorText, setCursorText] = useState('')

  useEffect(() => {
    const cursor = cursorRef.current
    const dot = cursorDotRef.current
    if (!cursor || !dot) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    let dotX = 0
    let dotY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animate = () => {
      // Smooth follow for outer cursor - increased lerp for less lag
      const cursorLerp = 0.15
      cursorX += (mouseX - cursorX) * cursorLerp
      cursorY += (mouseY - cursorY) * cursorLerp
      cursor.style.transform = `translate3d(${cursorX - 20}px, ${cursorY - 20}px, 0)`

      // Faster follow for dot - snappier response
      const dotLerp = 0.35
      dotX += (mouseX - dotX) * dotLerp
      dotY += (mouseY - dotY) * dotLerp
      dot.style.transform = `translate3d(${dotX - 2}px, ${dotY - 2}px, 0)`

      requestAnimationFrame(animate)
    }

    // Detect hoverable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      if (target.matches('a, button, [data-cursor="pointer"]')) {
        setIsHoveringLink(true)
      }
      
      if (target.matches('[data-cursor-text]')) {
        setCursorText(target.getAttribute('data-cursor-text') || '')
        setIsHovering(true)
      }
      
      if (target.matches('[data-cursor="expand"]')) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      if (target.matches('a, button, [data-cursor="pointer"]')) {
        setIsHoveringLink(false)
      }
      
      if (target.matches('[data-cursor-text], [data-cursor="expand"]')) {
        setIsHovering(false)
        setCursorText('')
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseout', handleMouseOut, { passive: true })
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = 'none'
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [])

  return (
    <>
      {/* Outer cursor ring */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center will-change-transform"
        animate={{
          width: isHovering ? 80 : isHoveringLink ? 56 : 40,
          height: isHovering ? 80 : isHoveringLink ? 56 : 40,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="absolute inset-0 border border-ivory rounded-full"
          animate={{
            opacity: isHovering ? 1 : 0.4,
          }}
          transition={{ duration: 0.25 }}
        />
        
        {/* Cursor text */}
        <motion.span
          className="text-body-xs text-ivory uppercase tracking-wider"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: cursorText ? 1 : 0,
            scale: cursorText ? 1 : 0.8,
          }}
          transition={{ duration: 0.25 }}
        >
          {cursorText}
        </motion.span>
      </motion.div>

      {/* Inner dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1 h-1 bg-ivory rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block will-change-transform"
      />
    </>
  )
}
