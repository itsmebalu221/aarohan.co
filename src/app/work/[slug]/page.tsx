'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ScrollReveal, ParallaxColumn, HorizontalDrift } from '@/components/scroll/ScrollAnimations'
import ParallaxImage from '@/components/media/ParallaxImage'

const projects: Record<string, {
  title: string
  category: string
  year: string
  client: string
  overview: string
  challenge: string
  approach: string
  results: string[]
  heroImage: string
  images: string[]
}> = {
  meridian: {
    title: 'Meridian',
    category: 'Brand Architecture',
    year: '2025',
    client: 'Meridian Capital Partners',
    overview: 'A comprehensive brand system for a global investment firm seeking to establish digital authority in a traditionally conservative industry.',
    challenge: 'Meridian needed to differentiate in a market where every competitor looks identical—navy blue, serif fonts, and stock imagery of handshakes.',
    approach: 'We stripped away convention. Starting with strategic positioning, we identified the white space: confidence without arrogance, precision without coldness. The visual system uses architectural photography, restrained typography, and deliberate negative space.',
    results: [
      'Brand recognition increased 340% within first quarter',
      'Website engagement time doubled',
      'Inquiries from target demographic increased 280%',
    ],
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920',
    images: [
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200',
      'https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=1200',
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200',
    ],
  },
  vantage: {
    title: 'Vantage',
    category: 'Digital Platform',
    year: '2025',
    client: 'Vantage Properties',
    overview: 'End-to-end platform design for a luxury real estate firm requiring immersive property experiences with uncompromising performance.',
    challenge: 'Luxury real estate websites are typically slow, image-heavy, and indistinguishable. Vantage needed a platform that felt as premium as the properties it showcased.',
    approach: 'Performance became a design principle. We optimized every asset, implemented progressive loading, and designed interactions that reward patience. The result is a site that loads fast but feels intentionally paced.',
    results: [
      'Page load time reduced to under 2 seconds',
      'Property inquiry conversion rate tripled',
      'Awwwards Site of the Day recognition',
    ],
    heroImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1920',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200',
      'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200',
    ],
  },
  axiom: {
    title: 'Axiom',
    category: 'Strategic Identity',
    year: '2024',
    client: 'Axiom Consulting',
    overview: 'Brand evolution for a technology consultancy undergoing strategic repositioning from generalist to specialist.',
    challenge: 'Axiom\'s existing brand communicated "we do everything" which meant they stood for nothing. They needed focus without limitation.',
    approach: 'We conducted extensive competitive analysis and stakeholder interviews. The new positioning—"Complex Made Clear"—informed every design decision. The visual system uses mathematical precision and deliberate clarity.',
    results: [
      'Average project value increased 60%',
      'Client retention improved to 94%',
      'Industry awards: 3 major recognitions',
    ],
    heroImage: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=1920',
    images: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200',
      'https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=1200',
      'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200',
    ],
  },
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects[params.slug]

  if (!project) {
    notFound()
  }

  return (
    <>
      {/* Hero */}
      <section className="min-h-screen relative flex flex-col justify-end">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <ParallaxImage
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full"
            parallaxIntensity={0.1}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-void/20" />
        </div>

        {/* Content */}
        <div className="relative z-10 grid-container pb-section">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="text-label text-mist/50">{project.year}</span>
            <span className="w-4 h-px bg-mist/30" />
            <span className="text-label text-mist/50">{project.category}</span>
          </motion.div>

          <motion.h1
            className="text-display-lg text-ivory mb-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {project.title}
          </motion.h1>

          <motion.p
            className="text-body-lg text-mist/60 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            {project.overview}
          </motion.p>
        </div>
      </section>

      {/* Project Details */}
      <section className="section-void">
        <div className="grid-container">
          <div className="grid grid-cols-12 gap-gutter">
            {/* Sidebar */}
            <div className="col-span-12 lg:col-span-3">
              <ScrollReveal>
                <div className="border-t border-mist/10 pt-element mb-8">
                  <span className="text-label text-mist/40 block mb-2">Client</span>
                  <p className="text-body-md text-ivory">{project.client}</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <div className="border-t border-mist/10 pt-element">
                  <span className="text-label text-mist/40 block mb-2">Scope</span>
                  <p className="text-body-md text-ivory">{project.category}</p>
                </div>
              </ScrollReveal>
            </div>

            {/* Content */}
            <div className="col-span-12 lg:col-span-8 lg:col-start-5">
              <ScrollReveal>
                <div className="mb-block">
                  <span className="text-label text-gold/60 block mb-4">Challenge</span>
                  <p className="text-body-lg text-mist/70">{project.challenge}</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="mb-block">
                  <span className="text-label text-gold/60 block mb-4">Approach</span>
                  <p className="text-body-lg text-mist/70">{project.approach}</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Image Grid */}
      <section className="py-section overflow-hidden">
        <div className="grid-container">
          <div className="grid grid-cols-12 gap-gutter">
            <div className="col-span-12 lg:col-span-7">
              <ParallaxColumn direction="down" speed={60}>
                <ParallaxImage
                  src={project.images[0]}
                  alt={`${project.title} detail`}
                  className="aspect-[4/3]"
                />
              </ParallaxColumn>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:col-start-9 pt-[15vh]">
              <ParallaxColumn direction="up" speed={40}>
                <HorizontalDrift amount={-20}>
                  <ParallaxImage
                    src={project.images[1]}
                    alt={`${project.title} detail`}
                    className="aspect-square"
                  />
                </HorizontalDrift>
              </ParallaxColumn>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="section-void">
        <div className="grid-container">
          <div className="grid grid-cols-12 gap-gutter">
            <div className="col-span-12 lg:col-span-4">
              <ScrollReveal>
                <span className="text-label text-mist/50">Results</span>
              </ScrollReveal>
            </div>
            <div className="col-span-12 lg:col-span-7 lg:col-start-6">
              {project.results.map((result, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="border-t border-mist/10 py-element">
                    <p className="text-display-sm text-ivory">{result}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Full-width Image */}
      <section className="py-section">
        <div className="grid-container">
          <HorizontalDrift amount={30}>
            <ParallaxImage
              src={project.images[2]}
              alt={`${project.title} detail`}
              className="aspect-[21/9]"
            />
          </HorizontalDrift>
        </div>
      </section>

      {/* Navigation */}
      <section className="section-breath">
        <div className="grid-container">
          <ScrollReveal>
            <div className="border-t border-mist/10 pt-block flex justify-between items-center">
              <Link
                href="/work"
                className="text-body-md text-mist/60 hover:text-ivory transition-colors duration-300 flex items-center gap-4"
              >
                <span className="w-6 h-px bg-current" />
                <span>All Projects</span>
              </Link>
              <Link
                href="/contact"
                className="text-body-md text-mist/60 hover:text-gold transition-colors duration-300 flex items-center gap-4"
              >
                <span>Start a project</span>
                <span className="w-6 h-px bg-current" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
