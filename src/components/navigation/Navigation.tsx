'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// GSAP will be dynamically imported inside useEffect to avoid SSR issues

interface NavItem {
  href: string
  label: string
  manifesto: string
  index: string
}

const navItems: NavItem[] = [
  { href: '/', label: 'Origin', manifesto: 'Return to Beginning', index: '00' },
  { href: '/work', label: 'Work', manifesto: 'Build Digital Authority', index: '01' },
  { href: '/services', label: 'Services', manifesto: 'Design With Intent', index: '02' },
  { href: '/about', label: 'About', manifesto: 'Understand Our Method', index: '03' },
  { href: '/contact', label: 'Contact', manifesto: 'Scale With Precision', index: '04' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [scrolled, setScrolled] = useState(false)

  // Scroll detection for trigger visibility shift
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Proximity-based trigger scale
  useEffect(() => {
    const trigger = triggerRef.current
    if (!trigger) return

    let gsap: any

    const initGsap = async () => {
      const gsapModule = await import('gsap')
      gsap = gsapModule.default

      const handleMouseMove = (e: MouseEvent) => {
        const rect = trigger.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const distance = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        )
        const maxDistance = 300
        const scale = 1 + Math.max(0, 1 - distance / maxDistance) * 0.15
        
        gsap.to(trigger, {
          scale,
          duration: 0.4,
          ease: 'power2.out',
        })
      }

      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }

    initGsap()
  }, [])

  // Close nav on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.15,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.03,
        staggerDirection: -1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      y: -30,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.65, 0, 0.35, 1],
      },
    },
  }

  return (
    <>
      {/* Navigation Trigger — Bottom Right, Architectural */}
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          fixed z-[100] transition-all duration-400 ease-luxury
          ${scrolled ? 'bottom-6 right-6' : 'bottom-8 right-8'}
          ${isOpen ? 'mix-blend-difference' : ''}
        `}
        aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
      >
        <div className="relative w-11 h-11 flex items-center justify-center">
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 border border-mist/20 rounded-full"
            animate={{
              scale: isOpen ? 1.15 : 1,
              borderColor: isOpen ? 'rgba(255,255,255,0.7)' : 'rgba(209,212,218,0.3)',
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
          
          {/* Inner content */}
          <div className="relative flex flex-col items-center justify-center gap-[3px]">
            <motion.span
              className="block w-3 h-px bg-ivory origin-center"
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 2 : 0,
              }}
              transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
            />
            <motion.span
              className="block w-3 h-px bg-ivory origin-center"
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? -2 : 0,
              }}
              transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
            />
          </div>
        </div>
      </button>

      {/* Full-screen Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={navRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-[90] bg-[#0a0a0c]">

            {/* Navigation Content */}
            <div className="relative h-full flex flex-col justify-center px-gutter">
              <motion.nav
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="max-w-7xl mx-auto w-full"
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    variants={itemVariants}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="relative border-t border-mist/10 first:border-t-0"
                  >
                    <Link
                      href={item.href}
                      className="group flex items-center justify-between py-3 md:py-4"
                    >
                      {/* Index */}
                      <span className={`text-label w-8 md:w-10 transition-colors duration-300 ${
                        pathname === item.href ? 'text-ivory' : 'text-mist/50'
                      }`}>
                        {item.index}
                      </span>

                      {/* Main Label */}
                      <div className="flex-1 overflow-hidden">
                        <motion.div
                          className={`text-display-sm md:text-display-md transition-all duration-300 ${
                            pathname === item.href 
                              ? 'text-ivory italic' 
                              : 'text-ivory not-italic'
                          }`}
                          animate={{
                            x: hoveredIndex === index ? 16 : 0,
                          }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                          {pathname === item.href ? (
                            <>
                              <span className="text-gold">{item.label.charAt(0)}</span>
                              {item.label.slice(1)}
                            </>
                          ) : (
                            item.label
                          )}
                        </motion.div>
                      </div>

                      {/* Manifesto Text — appears on hover */}
                      <motion.div
                        className="hidden md:block absolute right-0 text-body-sm text-mist/50 max-w-xs text-right"
                        initial={{ opacity: 0, x: 16 }}
                        animate={{
                          opacity: hoveredIndex === index ? 1 : 0,
                          x: hoveredIndex === index ? 0 : 16,
                        }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {item.manifesto}
                      </motion.div>

                      {/* Hover Line */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-px bg-ivory/20 origin-left"
                        initial={{ scaleX: 0 }}
                        animate={{
                          scaleX: hoveredIndex === index ? 1 : 0,
                        }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              {/* Footer Info */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute bottom-8 left-0 right-0 px-gutter"
              >
                <div className="max-w-7xl mx-auto flex justify-between items-end">
                  <div className="flex items-center gap-3">
                    <img src="/aarohan.png" alt="Aarohan" className="h-5 w-auto opacity-60" />
                    <span className="text-label text-mist/40">Digital Excellence</span>
                  </div>
                  <div className="text-label text-mist/40">
                    MMXXVI
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
