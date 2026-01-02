'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  ParallaxColumn, 
  HorizontalDrift, 
  ScrollReveal, 
} from '@/components/scroll/ScrollAnimations'
import ParallaxImage from '@/components/media/ParallaxImage'
import PixelBlast, { PixelField, PixelConstellation } from '@/components/effects/PixelBlast'

// if (typeof window !== 'undefined') {
//   gsap.registerPlugin(ScrollTrigger)
// }

export default function Home() {
  useEffect(() => {
    const initGSAP = async () => {
      if (typeof window !== 'undefined') {
        const gsapModule = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        const gsap = gsapModule.default
        gsap. registerPlugin(ScrollTrigger)
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
      <div className="relative z-20 min-h-screen grid grid-rows-[auto_1fr_auto] px-6 md:px-12 lg:px-20">
        
        {/* Top — Logo & Year */}
        <motion.div
          className="pt-8 md:pt-12 flex justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <img src="/aarohan.png" alt="Aarohan" className="h-8 md:h-10 w-auto opacity-70" />
          <span className="text-label text-gold/40">© 2026</span>
        </motion.div>

        {/* Middle — Main content */}
        <div className="flex items-center">
          <div className="w-full grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Large title */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -40 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            >
              <img 
                src="/aarohan.svg" 
                alt="Aarohan" 
                className="h-32 md:h-44 lg:h-56 w-auto"
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
   MANIFESTO SECTION
   ═══════════════════════════════════════════════════════════ */

function ManifestoSection() {
  return (
    <section className="pt-32 md:pt-48 pb-16 md:pb-24 relative bg-void">
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(212,175,55,0.04)_0%,transparent_60%)]" />
      
      <div className="grid-container relative z-10">
        {/* Section number */}
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-16">
            <span className="text-gold/60 text-label">01</span>
            <div className="w-12 h-px bg-gold/30" />
            <span className="text-label text-mist/40">Manifesto</span>
          </div>
        </ScrollReveal>

        {/* Main statement */}
        <div className="max-w-5xl">
          <ScrollReveal delay={0.1}>
            <h2 className="text-display-md md:text-display-lg text-ivory leading-[1.1] mb-8">
              We craft digital experiences that
              <span className="text-gold"> transcend</span> the ordinary.
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="text-body-lg text-mist/60 max-w-2xl leading-relaxed">
              Where others see websites, we see opportunities to define legacies. 
              Every pixel is intentional. Every interaction, memorable.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   CINEMATIC SCROLL SECTION
   ═══════════════════════════════════════════════════════════ */

function CinematicScrollSection() {
  return (
    <section className="relative py-section overflow-hidden">
      <div className="grid-container">
        <div className="grid grid-cols-12 gap-gutter min-h-[120vh]">
          {/* Column A — Scrolls Down */}
          <div className="col-span-4 hidden lg:block">
            <ParallaxColumn direction="down" speed={80}>
              <div className="space-y-6">
                <ParallaxImage
                  src="https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=800"
                  alt="Architectural detail"
                  className="aspect-[3/4]"
                />
                <div className="py-6">
                  <span className="text-label text-mist/40">01</span>
                  <p className="text-body-md text-mist/60 mt-2">
                    Form follows intention
                  </p>
                </div>
                <ParallaxImage
                  src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800"
                  alt="Geometric structure"
                  className="aspect-square"
                />
              </div>
            </ParallaxColumn>
          </div>

          {/* Column B — Scrolls Up */}
          <div className="col-span-12 lg:col-span-4">
            <ParallaxColumn direction="up" speed={60}>
              <div className="space-y-6 pt-[15vh]">
                <div className="py-6">
                  <ScrollReveal>
                    <h2 className="text-display-md text-ivory mb-3">
                      Precision
                    </h2>
                    <p className="text-body-md text-mist/60 max-w-md">
                      Every pixel considered. Every interaction deliberate.
                      Nothing arbitrary survives our process.
                    </p>
                  </ScrollReveal>
                </div>
                <ParallaxImage
                  src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800"
                  alt="Urban geometry"
                  className="aspect-[4/5]"
                />
                <div className="py-6">
                  <span className="text-label text-mist/40">02</span>
                  <p className="text-body-md text-mist/60 mt-2">
                    Silence speaks loudest
                  </p>
                </div>
              </div>
            </ParallaxColumn>
          </div>

          {/* Column C — Slower Parallax */}
          <div className="col-span-4 hidden lg:block">
            <ParallaxColumn direction="down" speed={40}>
              <div className="space-y-6 pt-[30vh]">
                <HorizontalDrift amount={20} direction="left">
                  <ParallaxImage
                    src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800"
                    alt="Material texture"
                    className="aspect-[5/4]"
                  />
                </HorizontalDrift>
                <div className="py-6">
                  <span className="text-label text-mist/40">03</span>
                  <p className="text-body-md text-mist/60 mt-2">
                    Restraint is confidence
                  </p>
                </div>
                <ParallaxImage
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"
                  alt="Minimal space"
                  className="aspect-[3/4]"
                />
              </div>
            </ParallaxColumn>
          </div>
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
                <div className="relative aspect-[21/9] overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-void/50 group-hover:bg-void/30 transition-colors duration-700" />
                  
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

function ProjectItem({
  project,
  index,
}: {
  project: { title: string; category: string; year: string; image: string }
  index: number
}) {
  const isEven = index % 2 === 0

  return (
    <ScrollReveal delay={index * 0.1}>
      <article
        className={`grid grid-cols-12 gap-gutter items-center ${
          isEven ? '' : 'direction-rtl'
        }`}
        data-cursor="expand"
        data-cursor-text="View"
      >
        {/* Image */}
        <div
          className={`col-span-12 lg:col-span-7 ${
            isEven ? '' : 'lg:col-start-6'
          }`}
          style={{ direction: 'ltr' }}
        >
          <HorizontalDrift amount={20} direction={isEven ? 'right' : 'left'}>
            <ParallaxImage
              src={project.image}
              alt={project.title}
              className="aspect-[16/10]"
            />
          </HorizontalDrift>
        </div>

        {/* Info */}
        <div
          className={`col-span-12 lg:col-span-4 ${
            isEven ? 'lg:col-start-9' : 'lg:col-start-1'
          } mt-8 lg:mt-0`}
          style={{ direction: 'ltr' }}
        >
          <span className="text-label text-mist/40 block mb-2">
            {project.year}
          </span>
          <h3 className="text-display-sm text-ivory mb-2">{project.title}</h3>
          <p className="text-body-sm text-mist/60">{project.category}</p>
        </div>
      </article>
    </ScrollReveal>
  )
}

/* ═══════════════════════════════════════════════════════════
   APPROACH SECTION
   ═══════════════════════════════════════════════════════════ */

function ApproachSection() {
  const approaches = [
    {
      number: '01',
      title: 'Strategic Foundation',
      description:
        'Before design begins, we understand the territory. Market position, competitive landscape, audience psychology.',
    },
    {
      number: '02',
      title: 'Architectural Design',
      description:
        'We construct experiences with engineering precision. Every element serves the whole.',
    },
    {
      number: '03',
      title: 'Technical Excellence',
      description:
        'Performance is non-negotiable. Speed, accessibility, and scalability are designed in, not added on.',
    },
  ]

  return (
    <section className="section-void bg-void relative">
      {/* Pixel Burst Effect */}
      <PixelBlast count={15} color="gold" pattern="burst" className="opacity-40" />
      
      {/* Gold accent line */}
      <div className="absolute left-0 top-1/2 w-24 h-px bg-gradient-to-r from-gold/40 to-transparent" />

      <div className="grid-container">
        <div className="grid grid-cols-12 gap-gutter">
          {/* Left label */}
          <div className="col-span-12 md:col-span-3 mb-block md:mb-0">
            <ScrollReveal>
              <span className="text-label text-mist/50">Our Approach</span>
            </ScrollReveal>
          </div>

          {/* Approach items */}
          <div className="col-span-12 md:col-span-9 lg:col-span-8">
            {approaches.map((item, index) => (
              <ScrollReveal key={item.number} delay={index * 0.1}>
                <div className="border-t border-mist/10 py-element group">
                  <div className="flex gap-6">
                    <span className="text-label text-gold/60 shrink-0">
                      {item.number}
                    </span>
                    <div>
                      <h3 className="text-display-sm text-ivory mb-3 group-hover:text-gold transition-colors duration-400">
                        {item.title}
                      </h3>
                      <p className="text-body-md text-mist/60 max-w-lg">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
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
            <img src="/aarohan.png" alt="Aarohan" className="h-8 w-auto mb-2" />
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
              {['LinkedIn', 'Twitter', 'Instagram'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-body-sm text-mist/60 hover:text-ivory transition-colors duration-250"
                >
                  {social}
                </a>
              ))}
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
