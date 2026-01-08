'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorDotLightRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isHoveringLink, setIsHoveringLink] = useState(false)
  const [cursorText, setCursorText] = useState('')
  const [isTouchDevice, setIsTouchDevice] = useState(true) // Default to true to prevent flash on SSR

  // Detect touch device
  useEffect(() => {
    const checkTouchDevice = () => {
      const hasTouchScreen =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      setIsTouchDevice(hasTouchScreen)
    }

    checkTouchDevice()

    // Also listen for changes (e.g., switching between touch and mouse input)
    const mediaQuery = window.matchMedia('(pointer: coarse)')
    const handleChange = (e: MediaQueryListEvent) => {
      setIsTouchDevice(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    // Skip cursor logic entirely for touch devices
    if (isTouchDevice) return

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

      // Also update light mode dot
      if (cursorDotLightRef.current) {
        cursorDotLightRef.current.style.transform = `translate3d(${dotX - 4}px, ${dotY - 4}px, 0)`
      }

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
  }, [isTouchDevice])

  // Hide default cursor only on non-touch devices
  useEffect(() => {
    if (isTouchDevice) {
      document.body.style.cursor = 'auto'
      return
    }

    document.body.style.cursor = 'none'
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [isTouchDevice])

  // Don't render custom cursor on touch devices
  if (isTouchDevice) {
    return null
  }


  return (
    <>
      {/* Outer cursor ring */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center will-change-transform"
        animate={{
          width: isHovering ? 80 : isHoveringLink ? 56 : 40,
          height: isHovering ? 80 : isHoveringLink ? 56 : 40,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Dark mode ring */}
        <motion.div
          className="absolute inset-0 border border-white rounded-full hidden dark:block"
          style={{ mixBlendMode: 'difference' }}
          animate={{
            opacity: isHovering ? 1 : 0.4,
          }}
          transition={{ duration: 0.25 }}
        />
        {/* Light mode ring - solid dark */}
        <motion.div
          className="absolute inset-0 border-2 border-[#2a2520] rounded-full dark:hidden"
          animate={{
            opacity: isHovering ? 0.9 : 0.7,
          }}
          transition={{ duration: 0.25 }}
        />

        {/* Cursor text */}
        <motion.span
          className="text-body-xs text-ivory dark:text-white uppercase tracking-wider"
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

      {/* Inner dot - shared tracking */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1 h-1 rounded-full pointer-events-none z-[9999] hidden dark:md:block will-change-transform bg-white"
        style={{ mixBlendMode: 'difference' }}
      />
      {/* Inner dot - light mode */}
      <div
        ref={cursorDotLightRef}
        className="fixed top-0 left-0 w-2 h-2 bg-[#2a2520] rounded-full pointer-events-none z-[9999] md:block dark:hidden will-change-transform"
      />
    </>
  )
}
