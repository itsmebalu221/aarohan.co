'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Page Content */}
        <motion.div
          variants={{
            initial: { opacity: 0 },
            animate: { 
              opacity: 1,
              transition: { duration: 0.4, delay: 0.3, ease: [0.65, 0, 0.35, 1] }
            },
            exit: { 
              opacity: 0,
              transition: { duration: 0.2, ease: [0.65, 0, 0.35, 1] }
            },
          }}
        >
          {children}
        </motion.div>

        {/* Transition Overlay — Slides up to reveal */}
        <motion.div
          className="fixed inset-0 z-[80] bg-void pointer-events-none"
          variants={{
            initial: { y: 0 },
            animate: { 
              y: '-100%',
              transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1], delay: 0.05 }
            },
            exit: { 
              y: 0,
              transition: { duration: 0.4, ease: [0.65, 0, 0.35, 1] }
            },
          }}
        />

        {/* Secondary reveal layer for depth */}
        <motion.div
          className="fixed inset-0 z-[79] bg-void/70 pointer-events-none"
          variants={{
            initial: { y: 0 },
            animate: { 
              y: '-100%',
              transition: { duration: 0.7, ease: [0.65, 0, 0.35, 1], delay: 0 }
            },
            exit: { 
              y: 0,
              transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] }
            },
          }}
        />
      </motion.div>
    </AnimatePresence>
  )
}
