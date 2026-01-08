'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Theme = 'dark' | 'light'

interface RippleState {
  x: number
  y: number
  toTheme: Theme
  id: number
}

interface ThemeProviderState {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: (e?: React.MouseEvent) => void
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)
  const [ripple, setRipple] = useState<RippleState | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('aarohan-theme') as Theme | null
    if (stored) {
      setTheme(stored)
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    localStorage.setItem('aarohan-theme', theme)
  }, [theme, mounted])

  const toggleTheme = useCallback((e?: React.MouseEvent) => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'

    // Get click position for ripple origin
    let x = window.innerWidth - 80
    let y = 40

    if (e) {
      x = e.clientX
      y = e.clientY
    }

    // Start ripple animation
    setRipple({ x, y, toTheme: newTheme, id: Date.now() })

    // Change theme quickly after ripple starts expanding
    setTimeout(() => {
      setTheme(newTheme)
    }, 400)

    // Clear ripple after animation completes
    setTimeout(() => {
      setRipple(null)
    }, 800)
  }, [theme])

  // Calculate max radius needed to cover the entire screen
  const getMaxRadius = () => {
    if (typeof window === 'undefined') return 2000
    return Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) * 1.2
  }

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}

      {/* Elegant Ripple Transition */}
      <AnimatePresence>
        {ripple && (
          <motion.div
            key={ripple.id}
            className="fixed inset-0 pointer-events-none z-[9998]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {/* Main ripple — clean, single expanding circle */}
            <motion.div
              className="absolute rounded-full"
              style={{
                left: ripple.x,
                top: ripple.y,
                backgroundColor: ripple.toTheme === 'light' ? '#FAF8F5' : '#151412',
                translateX: '-50%',
                translateY: '-50%',
              }}
              initial={{ width: 0, height: 0 }}
              animate={{
                width: getMaxRadius() * 2,
                height: getMaxRadius() * 2,
              }}
              transition={{
                duration: 0.6,
                ease: [0.32, 0.72, 0, 1], // Custom ease — fast start, smooth end
              }}
            />

            {/* Subtle gold accent ring — single, elegant */}
            <motion.div
              className="absolute rounded-full"
              style={{
                left: ripple.x,
                top: ripple.y,
                translateX: '-50%',
                translateY: '-50%',
                border: `2px solid ${ripple.toTheme === 'light' ? '#B8943D' : '#c7a258'}`,
              }}
              initial={{ width: 0, height: 0, opacity: 0.8 }}
              animate={{
                width: getMaxRadius() * 0.6,
                height: getMaxRadius() * 0.6,
                opacity: 0,
              }}
              transition={{
                duration: 0.8,
                ease: [0.32, 0.72, 0, 1],
              }}
            />

            {/* Center icon — small, quick flash */}
            <motion.div
              className="absolute"
              style={{
                left: ripple.x,
                top: ripple.y,
                translateX: '-50%',
                translateY: '-50%',
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: [0, 1.2, 1], opacity: [1, 1, 0] }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
                times: [0, 0.4, 1],
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: ripple.toTheme === 'light'
                    ? 'rgba(184, 148, 61, 0.15)'
                    : 'rgba(199, 162, 88, 0.15)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {ripple.toTheme === 'light' ? (
                  <svg
                    className="w-5 h-5"
                    style={{ color: '#B8943D' }}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <path
                      d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    style={{ color: '#c7a258' }}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                  </svg>
                )}
              </div>
            </motion.div>

            {/* Minimal label — appears briefly */}
            <motion.div
              className="absolute"
              style={{
                left: ripple.x,
                top: ripple.y + 50,
                translateX: '-50%',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0, 1, 0], y: [10, 0, -5] }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                times: [0, 0.3, 1],
              }}
            >
              <span
                className="text-xs uppercase tracking-[0.2em] font-medium"
                style={{
                  color: ripple.toTheme === 'light' ? '#B8943D' : '#c7a258',
                }}
              >
                {ripple.toTheme === 'light' ? 'Light' : 'Dark'}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
