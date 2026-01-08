'use client'

import { useEffect, useRef, useCallback } from 'react'

// Tech & Design symbols that will float around
const TECH_SYMBOLS = [
  '{ }', '< >', '</', '/>', '[ ]', '( )',  // Code brackets
  '#', '@', '*', '&', '%', '::',           // Common symbols
  '+=', '=>', '&&', '||', '!=', '==',      // Operators
  '◇', '○', '△', '□', '⬡', '✦',            // Design shapes
  '→', '←', '↑', '↓', '⟳', '⟲',            // Arrows
  'px', 'em', 'rem', 'vh', 'vw',           // CSS units
  '01', '10', '{}', '[]',                  // Binary/code
]

interface Sparkle {
  x: number
  y: number
  size: number
  opacity: number
  vx: number
  vy: number
  rotation: number
  rotationSpeed: number
  hue: number
  twinkleSpeed: number
  twinklePhase: number
  life: number
  maxLife: number
  symbol: string
}

interface MagicOrb {
  x: number
  y: number
  radius: number
  opacity: number
  pulsePhase: number
  pulseSpeed: number
  hue: number
}

export default function FairyMagic() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sparkles = useRef<Sparkle[]>([])
  const orbs = useRef<MagicOrb[]>([])
  const frameRef = useRef<number>(0)
  const mouseRef = useRef({ x: -100, y: -100, lastX: 0, lastY: 0 })
  const timeRef = useRef(0)

  // Initialize floating orbs
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    // Create ambient floating orbs - reduced count
    for (let i = 0; i < 3; i++) {
      orbs.current.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: 100 + Math.random() * 80,
        opacity: 0.015 + Math.random() * 0.01, // More subtle
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.008 + Math.random() * 0.005,
        hue: 38 + Math.random() * 12, // Warm gold hues
      })
    }
  }, [])

  const addSparkle = useCallback((x: number, y: number, count: number = 1) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 0.5 + Math.random() * 2
      const symbol = TECH_SYMBOLS[Math.floor(Math.random() * TECH_SYMBOLS.length)]
      
      sparkles.current.push({
        x: x + (Math.random() - 0.5) * 30,
        y: y + (Math.random() - 0.5) * 30,
        size: 8 + Math.random() * 10, // Font size for symbols - smaller
        opacity: 0.4 + Math.random() * 0.25, // Lower opacity
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.5, // Slight upward drift
        rotation: (Math.random() - 0.5) * 0.3, // Slight tilt only
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        hue: 35 + Math.random() * 20, // Golden range
        twinkleSpeed: 0.08 + Math.random() * 0.1,
        twinklePhase: Math.random() * Math.PI * 2,
        life: 0,
        maxLife: 80 + Math.random() * 80,
        symbol,
      })
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', resize)
    resize()

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - mouseRef.current.lastX
      const dy = e.clientY - mouseRef.current.lastY
      const speed = Math.sqrt(dx * dx + dy * dy)

      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY

      // Trail sparkles based on movement speed - reduced intensity
      if (speed > 8) {
        addSparkle(e.clientX, e.clientY, Math.min(Math.floor(speed / 20), 2))
      }

      mouseRef.current.lastX = e.clientX
      mouseRef.current.lastY = e.clientY
    }

    const handleClick = (e: MouseEvent) => {
      // Burst of tech symbols on click - reduced
      for (let i = 0; i < 6; i++) {
        setTimeout(() => {
          addSparkle(
            e.clientX + (Math.random() - 0.5) * 40,
            e.clientY + (Math.random() - 0.5) * 40,
            1
          )
        }, i * 40)
      }
    }

    const animate = () => {
      timeRef.current++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw ambient magic orbs (soft glowing circles)
      orbs.current.forEach((orb, i) => {
        orb.pulsePhase += orb.pulseSpeed
        const pulse = Math.sin(orb.pulsePhase) * 0.3 + 0.7
        
        // Gentle floating motion
        orb.x += Math.sin(timeRef.current * 0.005 + i) * 0.3
        orb.y += Math.cos(timeRef.current * 0.003 + i * 2) * 0.2
        
        // Wrap around screen
        if (orb.x < -orb.radius) orb.x = canvas.width + orb.radius
        if (orb.x > canvas.width + orb.radius) orb.x = -orb.radius
        if (orb.y < -orb.radius) orb.y = canvas.height + orb.radius
        if (orb.y > canvas.height + orb.radius) orb.y = -orb.radius

        const gradient = ctx.createRadialGradient(
          orb.x, orb.y, 0,
          orb.x, orb.y, orb.radius
        )
        gradient.addColorStop(0, `hsla(${orb.hue}, 60%, 55%, ${orb.opacity * pulse})`)
        gradient.addColorStop(0.5, `hsla(${orb.hue}, 50%, 50%, ${orb.opacity * pulse * 0.5})`)
        gradient.addColorStop(1, `hsla(${orb.hue}, 40%, 45%, 0)`)

        ctx.beginPath()
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      // Draw cursor glow - subtle warm aura
      const cursorGlow = ctx.createRadialGradient(
        mouseRef.current.x, mouseRef.current.y, 0,
        mouseRef.current.x, mouseRef.current.y, 80
      )
      cursorGlow.addColorStop(0, 'hsla(42, 60%, 55%, 0.06)')
      cursorGlow.addColorStop(0.5, 'hsla(42, 50%, 50%, 0.02)')
      cursorGlow.addColorStop(1, 'hsla(42, 45%, 45%, 0)')
      
      ctx.beginPath()
      ctx.arc(mouseRef.current.x, mouseRef.current.y, 80, 0, Math.PI * 2)
      ctx.fillStyle = cursorGlow
      ctx.fill()

      // Update and draw sparkles (tech symbols)
      for (let i = sparkles.current.length - 1; i >= 0; i--) {
        const s = sparkles.current[i]
        
        // Update physics
        s.life++
        s.x += s.vx
        s.y += s.vy
        s.vy += 0.015 // Gentle gravity
        s.vx *= 0.99 // Drag
        s.vy *= 0.99
        s.rotation += s.rotationSpeed
        s.twinklePhase += s.twinkleSpeed

        // Fade out
        const lifeRatio = s.life / s.maxLife
        const fadeOpacity = s.opacity * (1 - lifeRatio)
        const twinkle = (Math.sin(s.twinklePhase) * 0.3 + 0.7)

        if (s.life >= s.maxLife) {
          sparkles.current.splice(i, 1)
          continue
        }

        const finalOpacity = fadeOpacity * twinkle * 0.6 // Reduced overall intensity
        const color = `hsla(${s.hue}, 55%, 45%, ${finalOpacity})`
        const glowColor = `hsla(${s.hue}, 60%, 50%, ${finalOpacity * 0.4})`

        ctx.save()
        ctx.translate(s.x, s.y)
        ctx.rotate(s.rotation)
        
        // Draw glow behind symbol
        ctx.shadowColor = glowColor
        ctx.shadowBlur = 12
        
        // Draw tech symbol as text
        ctx.font = `${s.size}px "SF Mono", "Fira Code", "Monaco", monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = color
        ctx.fillText(s.symbol, 0, 0)
        
        ctx.restore()
      }

      // Background floating tech symbols (subtle ambient layer)
      const bgSymbols = ['{ }', '< >', '◇', '⬡', '#', '01', '→']
      const symbolCount = 8 // Reduced count
      for (let i = 0; i < symbolCount; i++) {
        const seed = i * 9876.5432
        const x = ((seed * 1.7) % 1) * canvas.width
        const baseY = ((seed * 3.1) % 1) * canvas.height
        const floatOffset = Math.sin(timeRef.current * 0.008 + i * 0.7) * 20
        const y = baseY + floatOffset
        const twinkle = Math.sin(timeRef.current * 0.015 + i * 0.8) * 0.5 + 0.5
        const rotation = Math.sin(timeRef.current * 0.003 + i) * 0.15
        
        if (twinkle > 0.25) {
          ctx.save()
          ctx.translate(x, y)
          ctx.rotate(rotation)
          ctx.font = `${12 + (i % 4) * 2}px "SF Mono", monospace`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillStyle = `hsla(42, 45%, 50%, ${twinkle * 0.08})`
          ctx.fillText(bgSymbols[i % bgSymbols.length], 0, 0)
          ctx.restore()
        }
      }

      frameRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('click', handleClick)
    frameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
      cancelAnimationFrame(frameRef.current)
    }
  }, [addSparkle])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[5] block dark:hidden"
      style={{ touchAction: 'none' }}
    />
  )
}
