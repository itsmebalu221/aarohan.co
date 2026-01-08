'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useTheme } from '@/components/theme/ThemeProvider'
import { ScrollReveal } from '@/components/scroll/ScrollAnimations'
import PixelBlast, { PixelField } from '@/components/effects/PixelBlast'

export default function Home() {
  useEffect(() => {
    const initGSAP = async () => {
      if (typeof window !== 'undefined') {
        const gsapModule = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        const gsap = gsapModule.default
        gsap.registerPlugin(ScrollTrigger)
      }
    }
    initGSAP()
  }, [])
  return (
    <>
      <EntrySection />
      <ManifestoSection />
      <CinematicScrollSection />
      <SelectedWorkSection />
      <ApproachSection />
      <ClosingSection />
    </>
  )
}

/* ═══════════════════════════════════════════════════════════
   ENTRY SECTION
   ═══════════════════════════════════════════════════════════ */

function EntrySection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="min-h-screen relative bg-void overflow-hidden">
      {/* Full bleed background image with overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-void via-void/90 to-void z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(212,175,55,0.08)_0%,transparent_50%)]" />
      </div>

      {/* Content grid */}
      <div className="relative z-20 min-h-screen grid grid-rows-[1fr_auto] px-6 md:px-12 lg:px-20 pt-16 md:pt-20">

        {/* Middle — Main content */}
        <div className="flex items-center">
          <div className="w-full grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Large title - Theme aware */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -40 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            >
              <Image
                src={theme === 'light' ? '/light-version-title.svg' : '/dark-version-title.svg'}
                alt="Aarohan Studio - Digital Excellence"
                width={400}
                height={200}
                className="h-32 md:h-44 lg:h-56 w-auto"
                priority
              />
            </motion.div>

            {/* Right: Description block */}
            <motion.div
              className="md:max-w-sm md:ml-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <div className="w-8 h-px bg-gold/50 mb-6" />
              <p className="text-body-lg text-mist/70 leading-relaxed">
                A digital studio crafting premium experiences for visionary brands.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <span className="text-label text-mist/40">Based in India</span>
                <span className="text-mist/20">•</span>
                <span className="text-label text-mist/40">Available Worldwide</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom — Services & Scroll */}
        <motion.div
          className="pb-8 md:pb-12 flex justify-between items-end"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="hidden md:flex gap-8">
            {['Strategy', 'Design', 'Development'].map((service, i) => (
              <span key={service} className="text-label text-mist/30">
                {String(i + 1).padStart(2, '0')} {service}
              </span>
            ))}
          </div>

          <motion.div
            className="flex items-center gap-3 cursor-pointer group"
            whileHover={{ y: 2 }}
          >
            <span className="text-label text-mist/40 group-hover:text-mist/60 transition-colors">
              Explore
            </span>
            <motion.svg
              className="w-4 h-4 text-mist/40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </motion.svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   VISION SECTION — Clean, Symmetric, Mesmerizing
   ═══════════════════════════════════════════════════════════ */

function ManifestoSection() {
  const words = ['Visionary', 'Strategic', 'Precise', 'Timeless']
  const [activeWord, setActiveWord] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % words.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-32 md:py-48 relative bg-void overflow-hidden">
      {/* Floating orbs - subtle ambient effect */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(199,162,88,0.08) 0%, transparent 70%)',
            top: '10%',
            left: '-10%',
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(199,162,88,0.05) 0%, transparent 70%)',
            bottom: '10%',
            right: '-5%',
          }}
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="grid-container relative z-10">
        {/* Centered symmetric layout */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Animated word cycle */}
          <ScrollReveal>
            <div className="mb-8 h-10 overflow-hidden">
              <motion.div
                animate={{ y: -activeWord * 40 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {words.map((word, i) => (
                  <div
                    key={i}
                    className="h-10 flex items-center justify-center"
                  >
                    <span className="text-label text-gold tracking-[0.3em] uppercase">
                      {word}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Main headline */}
          <ScrollReveal delay={0.1}>
            <h2 className="text-display-lg md:text-display-xl text-ivory leading-[1] mb-8">
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
              >
                We craft experiences
              </motion.span>
              <br />
              <motion.span
                className="inline-block text-mist/40"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
              >
                that define brands.
              </motion.span>
            </h2>
          </ScrollReveal>

          {/* Decorative line */}
          <motion.div
            className="w-px h-16 bg-gradient-to-b from-transparent via-gold/40 to-transparent mx-auto mb-8"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          />

          {/* Subtext */}
          <ScrollReveal delay={0.3}>
            <p className="text-body-lg text-mist/50 max-w-xl mx-auto leading-relaxed">
              Where strategy meets artistry. Where every pixel has purpose.
              Where your vision becomes digital reality.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   SHOWCASE SECTION — Symmetric Cards with Staggered Animation
   ═══════════════════════════════════════════════════════════ */

function CinematicScrollSection() {
  const features = [
    {
      number: '01',
      title: 'Strategy',
      desc: 'Research-driven decisions that align with your business goals.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
        </svg>
      ),
    },
    {
      number: '02',
      title: 'Design',
      desc: 'Pixel-perfect interfaces that captivate and convert.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
        </svg>
      ),
    },
    {
      number: '03',
      title: 'Development',
      desc: 'Performant code that scales with your ambitions.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      ),
    },
    {
      number: '04',
      title: 'Growth',
      desc: 'Continuous optimization that drives measurable results.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
      ),
    },
  ]

  return (
    <section className="py-24 md:py-40 bg-void relative">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="grid-container relative z-10">
        {/* Section header - centered */}
        <div className="text-center mb-20">
          <ScrollReveal>
            <span className="text-label text-gold/60 tracking-[0.3em] block mb-4">
              OUR PROCESS
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-display-md md:text-display-lg text-ivory">
              Four pillars of excellence
            </h2>
          </ScrollReveal>
        </div>

        {/* Symmetric 4-column grid with equal height cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              viewport={{ once: true, margin: '-100px' }}
              className="h-full"
            >
              <motion.div
                className="glass-card p-8 h-full flex flex-col items-center justify-start text-center group cursor-default"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-full glass-subtle flex items-center justify-center mb-6 text-gold group-hover:bg-gold/10 transition-colors duration-300">
                  {feature.icon}
                </div>

                {/* Number */}
                <span className="text-gold/30 text-label block mb-3">
                  {feature.number}
                </span>

                {/* Title */}
                <h3 className="text-display-sm text-ivory mb-3 group-hover:text-gold transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-body-sm text-mist/50 flex-1">
                  {feature.desc}
                </p>

                {/* Bottom accent line */}
                <div className="w-8 h-px bg-gold/20 mt-6 group-hover:w-12 group-hover:bg-gold/40 transition-all duration-300" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


/* ═══════════════════════════════════════════════════════════
   SELECTED WORK SECTION
   ═══════════════════════════════════════════════════════════ */

function SelectedWorkSection() {
  const projects = [
    {
      title: 'Meridian',
      category: 'Brand Architecture',
      year: '2025',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200',
      description: 'Redefining luxury real estate presence in the digital age.',
    },
    {
      title: 'Vantage',
      category: 'Digital Platform',
      year: '2025',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200',
      description: 'A seamless investment experience for discerning clients.',
    },
    {
      title: 'Axiom',
      category: 'Strategic Identity',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200',
      description: 'Visual language that speaks to the future of finance.',
    },
  ]

  return (
    <section className="py-24 md:py-32 relative bg-void overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px] -translate-y-1/2" />

      <div className="grid-container relative z-10">
        {/* Section header */}
        <div className="mb-20 md:mb-32">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-gold/60 text-label">02</span>
              <div className="w-12 h-px bg-gold/30" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-display-lg md:text-display-xl text-ivory max-w-3xl">
              Work that defines
              <span className="text-gold"> categories</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Project cards — Full width stacked */}
        <div className="space-y-6">
          {projects.map((project, index) => (
            <ScrollReveal key={project.title} delay={index * 0.1}>
              <article
                className="group cursor-pointer relative"
                data-cursor="expand"
                data-cursor-text="View"
              >
                {/* Full width image card */}
                <div className="relative aspect-[21/9] overflow-hidden rounded-xl">
                  <Image
                    src={project.image}
                    alt={`${project.title} - ${project.category} project`}
                    fill
                    sizes="100vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  {/* Glass overlay */}
                  <div className="absolute inset-0 bg-void/40 backdrop-blur-[2px] group-hover:bg-void/20 group-hover:backdrop-blur-0 transition-all duration-700" />

                  {/* Content overlay */}
                  <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
                    {/* Top row */}
                    <div className="flex justify-between items-start">
                      <span className="text-gold/70 text-label">{String(index + 1).padStart(2, '0')}</span>
                      <span className="text-mist/50 text-label">{project.year}</span>
                    </div>

                    {/* Bottom row */}
                    <div className="flex justify-between items-end">
                      <div>
                        <h3 className="text-display-md md:text-display-lg text-ivory mb-2 group-hover:text-gold transition-colors duration-500">
                          {project.title}
                        </h3>
                        <p className="text-body-md text-mist/60 max-w-lg">
                          {project.description}
                        </p>
                      </div>
                      <div className="hidden md:flex items-center gap-4">
                        <span className="text-label text-mist/40 group-hover:text-gold transition-colors duration-300">{project.category}</span>
                        <div className="w-4 h-px bg-mist/30 group-hover:w-8 group-hover:bg-gold transition-all duration-500" />
                      </div>
                    </div>
                  </div>

                  {/* Border on hover */}
                  <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/20 transition-colors duration-500" />
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* More work CTA */}
        <ScrollReveal delay={0.2}>
          <div className="mt-20 pt-12 border-t border-mist/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <p className="text-body-lg text-mist/40 max-w-md">
              Every project is a partnership. A shared vision brought to life with precision.
            </p>
            <a
              href="/work"
              className="group flex items-center gap-4"
            >
              <span className="text-body-lg text-ivory group-hover:text-gold transition-colors duration-300">All Projects</span>
              <div className="w-6 h-px bg-mist/40 group-hover:w-12 group-hover:bg-gold transition-all duration-500" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}



/* ═══════════════════════════════════════════════════════════
   APPROACH SECTION — Interactive Timeline with Enhanced Transitions
   ═══════════════════════════════════════════════════════════ */

function ApproachSection() {
  const [activeStep, setActiveStep] = useState(0)

  const approaches = [
    {
      number: '01',
      title: 'Discover',
      subtitle: 'Strategic Foundation',
      description: 'We dive deep into your brand, market, and audience. Understanding the why before the how.',
      details: ['Brand audit', 'Market research', 'User interviews', 'Competitor analysis'],
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      ),
    },
    {
      number: '02',
      title: 'Design',
      subtitle: 'Architectural Vision',
      description: 'Crafting experiences with precision. Every pixel intentional, every interaction meaningful.',
      details: ['Wireframing', 'Visual design', 'Prototyping', 'Design systems'],
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
        </svg>
      ),
    },
    {
      number: '03',
      title: 'Develop',
      subtitle: 'Technical Excellence',
      description: 'Building with performance at the core. Clean code, scalable architecture, future-proof.',
      details: ['Frontend dev', 'CMS integration', 'API development', 'Performance optimization'],
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      ),
    },
    {
      number: '04',
      title: 'Deliver',
      subtitle: 'Launch & Beyond',
      description: 'We don\'t just launch and leave. Continuous optimization for lasting impact.',
      details: ['QA testing', 'Deployment', 'Analytics setup', 'Ongoing support'],
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>
      ),
    },
  ]

  return (
    <section className="py-32 md:py-48 relative bg-void overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(ellipse at 30% 50%, rgba(199,162,88,0.03) 0%, transparent 50%)',
            'radial-gradient(ellipse at 70% 50%, rgba(199,162,88,0.03) 0%, transparent 50%)',
            'radial-gradient(ellipse at 30% 50%, rgba(199,162,88,0.03) 0%, transparent 50%)',
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="grid-container relative z-10">
        {/* Section header - centered */}
        <div className="text-center mb-20">
          <ScrollReveal>
            <span className="text-label text-gold/60 tracking-[0.3em] block mb-4">
              HOW WE WORK
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-display-lg md:text-display-xl text-ivory">
              A process refined<br />
              <span className="text-mist/40">to perfection</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Interactive Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Left - Step selector */}
          <div className="relative">
            {/* Vertical line connector */}
            <div className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-mist/5 via-mist/10 to-mist/5" />

            {/* Progress line */}
            <motion.div
              className="absolute left-6 top-6 w-px origin-top"
              style={{
                background: 'linear-gradient(to bottom, #c7a258, #c7a258 80%, transparent)',
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: activeStep / (approaches.length - 1) }}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            />

            <div className="space-y-2">
              {approaches.map((step, i) => (
                <motion.div
                  key={i}
                  className={`relative flex items-center gap-5 p-4 rounded-xl cursor-pointer transition-all duration-300 ${activeStep === i
                    ? 'bg-gold/5'
                    : 'hover:bg-mist/5'
                    }`}
                  onClick={() => setActiveStep(i)}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: activeStep === i ? 0 : 8 }}
                >
                  {/* Step indicator with icon */}
                  <motion.div
                    className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${activeStep === i
                      ? 'bg-gold text-void shadow-lg shadow-gold/20'
                      : activeStep > i
                        ? 'bg-gold/20 text-gold border border-gold/30'
                        : 'bg-void border border-mist/20 text-mist/40'
                      }`}
                    animate={{
                      scale: activeStep === i ? 1 : 0.9,
                    }}
                    transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                  >
                    {activeStep > i ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    ) : (
                      step.icon
                    )}

                    {/* Pulse ring for active - with key to prevent flickering */}
                    {activeStep === i && (
                      <motion.div
                        key={`pulse-${i}`}
                        className="absolute inset-0 rounded-full border-2 border-gold/50"
                        animate={{
                          scale: [1, 1.4, 1.4],
                          opacity: [0.4, 0, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeOut'
                        }}
                      />
                    )}
                  </motion.div>

                  {/* Step content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`text-label transition-colors duration-300 ${activeStep === i ? 'text-gold' : 'text-mist/30'
                        }`}>
                        {step.number}
                      </span>
                      <h3 className={`text-display-sm transition-colors duration-300 ${activeStep === i ? 'text-ivory' : 'text-mist/60'
                        }`}>
                        {step.title}
                      </h3>
                    </div>
                    <p className={`text-body-sm transition-colors duration-300 ${activeStep === i ? 'text-mist/50' : 'text-mist/30'
                      }`}>
                      {step.subtitle}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <motion.div
                    className="text-gold"
                    animate={{
                      opacity: activeStep === i ? 1 : 0,
                      x: activeStep === i ? 0 : -10
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right - Detail panel with AnimatePresence */}
          <div className="relative lg:sticky lg:top-32 h-fit">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                className="glass-panel p-8 md:p-12 relative overflow-hidden"
              >
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-gold/10 via-gold/5 to-transparent" />
                <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-gold/5 to-transparent" />

                {/* Large bold background number - unique style */}
                <div className="absolute -top-8 -right-4 select-none pointer-events-none">
                  {/* Outer glow layer */}
                  <motion.div
                    className="absolute inset-0 blur-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <span
                      className="text-[180px] md:text-[260px] font-black leading-none"
                      style={{
                        WebkitTextStroke: '2px rgba(199, 162, 88, 0.15)',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {approaches[activeStep].number}
                    </span>
                  </motion.div>

                  {/* Main number with stroke effect */}
                  <motion.span
                    className="text-[180px] md:text-[260px] font-black leading-none block"
                    initial={{ opacity: 0, scale: 0.8, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
                    style={{
                      background: 'linear-gradient(135deg, rgba(199, 162, 88, 0.12) 0%, rgba(199, 162, 88, 0.04) 50%, rgba(199, 162, 88, 0.08) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      WebkitTextStroke: '1px rgba(199, 162, 88, 0.08)',
                    }}
                  >
                    {approaches[activeStep].number}
                  </motion.span>
                </div>

                <div className="relative z-10">
                  {/* Icon with line-drawing animation */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mb-6"
                  >

                    {/* Animated SVG with line-drawing effect */}
                    <svg className="w-7 h-7 text-gold" viewBox="0 0 24 24" fill="none">
                      {activeStep === 0 && (
                        <>
                          <motion.circle
                            cx="11" cy="11" r="7"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                          />
                          <motion.path
                            d="M21 21l-4.35-4.35"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
                          />
                        </>
                      )}
                      {activeStep === 1 && (
                        <>
                          {/* Same paintbrush as list - with line drawing */}
                          <motion.path
                            d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128z"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                          />
                          <motion.path
                            d="M9.53 16.122a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" }}
                          />
                          <motion.path
                            d="M12.918 14.502a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.7, delay: 0.7, ease: "easeInOut" }}
                          />
                          <motion.path
                            d="M12.918 14.502a6.776 6.776 0 00-3.42-3.42"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.3, delay: 1.2, ease: "easeOut" }}
                          />
                        </>
                      )}
                      {activeStep === 2 && (
                        <>
                          <motion.path
                            d="M16 18l6-6-6-6"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                          />
                          <motion.path
                            d="M8 6l-6 6 6 6"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, delay: 0.3, ease: "easeInOut" }}
                          />
                          <motion.path
                            d="M14 4l-4 16"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
                          />
                        </>
                      )}
                      {activeStep === 3 && (
                        <>
                          {/* Rocket body */}
                          <motion.path
                            d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                          />
                          <motion.path
                            d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11.95A22.18 22.18 0 0112 15z"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
                          />
                          {/* Rocket window */}
                          <motion.circle
                            cx="16" cy="8" r="2"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.9, ease: "easeOut" }}
                          />
                          {/* Exhaust flames */}
                          <motion.path
                            d="M9 12H4s.55-3.03 2-4c1.62-1.08 4 0 4 0"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.4, delay: 1.1, ease: "easeOut" }}
                          />
                          <motion.path
                            d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-4 0-4"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.4, delay: 1.3, ease: "easeOut" }}
                          />
                        </>
                      )}
                    </svg>
                  </motion.div>

                  <motion.span
                    className="text-gold text-label block mb-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    {approaches[activeStep].subtitle}
                  </motion.span>

                  <motion.h3
                    className="text-display-md md:text-display-lg text-ivory mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                  >
                    {approaches[activeStep].title}
                  </motion.h3>

                  <motion.p
                    className="text-body-lg text-mist/60 mb-10 leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    {approaches[activeStep].description}
                  </motion.p>

                  {/* Detail tags */}
                  <div className="flex flex-wrap gap-3">
                    {approaches[activeStep].details.map((detail, i) => (
                      <motion.span
                        key={detail}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.25 + i * 0.05 }}
                        className="px-4 py-2 text-body-sm text-gold/70 bg-gold/5 border border-gold/10 rounded-full"
                      >
                        {detail}
                      </motion.span>
                    ))}
                  </div>

                  {/* Step navigation */}
                  <motion.div
                    className="flex items-center justify-between mt-10 pt-6 border-t border-mist/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    <button
                      onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                      disabled={activeStep === 0}
                      className="flex items-center gap-2 text-body-sm text-mist/40 hover:text-gold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                      Previous
                    </button>
                    <span className="text-label text-mist/30">
                      {activeStep + 1} / {approaches.length}
                    </span>
                    <button
                      onClick={() => setActiveStep(Math.min(approaches.length - 1, activeStep + 1))}
                      disabled={activeStep === approaches.length - 1}
                      className="flex items-center gap-2 text-body-sm text-mist/40 hover:text-gold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Next
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}



/* ═══════════════════════════════════════════════════════════
   CLOSING SECTION
   ═══════════════════════════════════════════════════════════ */

function ClosingSection() {
  return (
    <footer className="section-void relative">
      {/* Pixel Field — Subtle closing ambience */}
      <PixelField count={20} color="gold" className="opacity-30" />

      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mist/20 to-transparent" />

      <div className="grid-container">
        {/* Main closing statement */}
        <div className="mb-section">
          <ScrollReveal>
            <p className="text-display-lg text-ivory/90 max-w-4xl text-balance">
              Ready to build something that matters?
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="mt-element">
              <a
                href="/contact"
                className="inline-flex items-center gap-3 text-body-lg text-mist/70 hover:text-gold transition-colors duration-400 group"
                data-cursor-text="Start"
              >
                <span>Begin a conversation</span>
                <span className="w-6 h-px bg-current group-hover:w-10 transition-all duration-400" />
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Footer grid */}
        <div className="grid grid-cols-12 gap-gutter pt-block border-t border-mist/10">
          {/* Logo/Name */}
          <div className="col-span-12 md:col-span-4 mb-8 md:mb-0">
            <Image
              src="/aarohan1.png"
              alt="Aarohan Studio Logo"
              width={120}
              height={32}
              className="h-8 w-auto mb-2"
            />
            <p className="text-body-sm text-mist/50 mt-2">Digital Excellence</p>
          </div>

          {/* Contact */}
          <div className="col-span-6 md:col-span-2">
            <span className="text-label text-mist/40 block mb-3">Contact</span>
            <a
              href="mailto:hello@aarohan.studio"
              className="text-body-sm text-mist/60 hover:text-ivory transition-colors duration-250 block"
            >
              hello@aarohan.studio
            </a>
          </div>

          {/* Location */}
          <div className="col-span-6 md:col-span-2">
            <span className="text-label text-mist/40 block mb-3">Location</span>
            <p className="text-body-sm text-mist/60">Global</p>
          </div>

          {/* Social */}
          <div className="col-span-12 md:col-span-4 mt-6 md:mt-0 md:text-right">
            <span className="text-label text-mist/40 block mb-3">Connect</span>
            <div className="flex gap-5 md:justify-end">
              <a
                href="https://linkedin.com/company/aarohan-studio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on LinkedIn"
                className="text-body-sm text-mist/60 hover:text-ivory transition-colors duration-250"
              >
                LinkedIn
              </a>
              <a
                href="https://twitter.com/aarohan_studio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Twitter"
                className="text-body-sm text-mist/60 hover:text-ivory transition-colors duration-250"
              >
                Twitter
              </a>
              <a
                href="https://instagram.com/aarohan.studio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="text-body-sm text-mist/60 hover:text-ivory transition-colors duration-250"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-section pt-element border-t border-mist/5 flex justify-between items-center">
          <span className="text-body-xs text-mist/30">
            © {new Date().getFullYear()} Aarohan Studio
          </span>
          <span className="text-body-xs text-mist/30">All rights reserved</span>
        </div>
      </div>
    </footer>
  )
}
