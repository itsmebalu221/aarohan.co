'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTheme } from '@/components/theme/ThemeProvider'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isDark = theme === 'dark'

  return (
    <>
      {/* Main Navbar */}
      <motion.header
        className={`
          fixed top-0 left-0 right-0 z-[90]
          transition-all duration-500 ease-out
        `}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Glass background - appears on scroll (fades to bottom) */}
        <motion.div
          className="absolute inset-x-0 -top-1"
          style={{
            height: 'calc(100% + 40px)',
            backgroundColor: isDark
              ? 'rgba(21, 20, 18, 0.85)'
              : 'rgba(250, 248, 245, 0.85)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            maskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Content */}
        <div className="relative px-6 md:px-12 lg:px-20 py-4 md:py-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10 group">
            <motion.img
              src="/aarohan1.png"
              alt="Aarohan"
              className="h-7 md:h-8 w-auto transition-opacity duration-300 group-hover:opacity-70"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
          </Link>

          {/* Right side - Theme Toggle */}
          {mounted && (
            <div className="relative z-10 flex items-center gap-4">
              {/* Theme label */}
              <span className="text-xs uppercase tracking-widest text-mist/50 hidden md:block">
                {isDark ? 'Dark' : 'Light'}
              </span>

              {/* Toggle Button */}
              <button
                onClick={(e) => toggleTheme(e)}
                className="relative flex items-center gap-2 group"
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              >
                {/* Toggle Track - Glass effect */}
                <div className={`
                  relative w-11 h-6 rounded-full 
                  transition-all duration-300
                  ${scrolled
                    ? 'glass-subtle'
                    : 'bg-void/30 border border-mist/20'}
                `}>
                  {/* Toggle Thumb */}
                  <motion.div
                    className="absolute top-[3px] w-4 h-4 rounded-full bg-gold shadow-lg shadow-gold/20"
                    initial={false}
                    animate={{ left: isDark ? 3 : 21 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </div>

                {/* Sun/Moon Icon */}
                <div className="relative w-5 h-5">
                  {/* Sun */}
                  <motion.svg
                    className="absolute inset-0 text-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    initial={false}
                    animate={{ opacity: isDark ? 0 : 1, scale: isDark ? 0.5 : 1, rotate: isDark ? -90 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                  </motion.svg>
                  {/* Moon */}
                  <motion.svg
                    className="absolute inset-0 text-ivory"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    initial={false}
                    animate={{ opacity: isDark ? 1 : 0, scale: isDark ? 1 : 0.5, rotate: isDark ? 0 : 90 }}
                    transition={{ duration: 0.25 }}
                  >
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                  </motion.svg>
                </div>
              </button>
            </div>
          )}
        </div>
      </motion.header>
    </>
  )
}
