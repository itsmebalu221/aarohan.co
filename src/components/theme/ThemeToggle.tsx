'use client'

import { motion } from 'framer-motion'
import { useTheme } from './ThemeProvider'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) return null
  
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 md:top-8 md:right-20 z-[100] group flex items-center gap-3"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Label */}
      <span className="text-label text-mist/60 hidden md:block group-hover:text-ivory transition-colors duration-300">
        {isDark ? 'Dark' : 'Light'}
      </span>
      
      {/* Toggle Track */}
      <div className="relative w-12 h-6 rounded-full border border-mist/30 bg-void/50 backdrop-blur-sm">
        {/* Toggle Thumb */}
        <motion.div
          className="absolute top-1 w-4 h-4 rounded-full bg-gold"
          initial={false}
          animate={{ left: isDark ? 4 : 24 }}
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
          animate={{ opacity: isDark ? 0 : 1, scale: isDark ? 0.5 : 1 }}
          transition={{ duration: 0.2 }}
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
          animate={{ opacity: isDark ? 1 : 0, scale: isDark ? 1 : 0.5 }}
          transition={{ duration: 0.2 }}
        >
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </motion.svg>
      </div>
    </button>
  )
}
