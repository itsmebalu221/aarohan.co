'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ScrollReveal } from '@/components/scroll/ScrollAnimations'

const services = [
  {
    id: 'design',
    number: '01',
    title: 'Design',
    subtitle: 'Pixel-perfect experiences',
    description: 'From software interfaces to stunning websites, we craft designs that captivate users and elevate brands. Clean aesthetics with purpose-driven functionality.',
    capabilities: [
      'UI/UX Design',
      'Software Interface Design',
      'Website Design',
      'Mobile App Design',
      'Dashboard Design',
    ],
  },
  {
    id: 'branding',
    number: '02',
    title: 'Branding & Graphics',
    subtitle: 'Visual identity systems',
    description: 'Comprehensive branding solutions that tell your story. Logos, banners, marketing materials—everything your brand needs to stand out.',
    capabilities: [
      'Logo Design',
      'Brand Identity',
      'Banner Design',
      'Social Media Graphics',
      'Print Design',
    ],
  },
  {
    id: 'development',
    number: '03',
    title: 'Development',
    subtitle: 'Code that performs',
    description: 'Full-stack development with modern technologies. We build fast, scalable, and secure digital products that work flawlessly.',
    capabilities: [
      'Website Development',
      'Web Applications',
      'E-commerce Solutions',
      'CMS Development',
      'API Integration',
    ],
  },
  {
    id: 'marketing',
    number: '04',
    title: 'Digital Marketing',
    subtitle: 'Growth that matters',
    description: 'Strategic digital marketing that drives real results. From SEO to social media, we help your brand reach the right audience.',
    capabilities: [
      'SEO Optimization',
      'Social Media Marketing',
      'Content Strategy',
      'PPC Advertising',
      'Analytics & Reporting',
    ],
  },
]

export default function ServicesPage() {
  const [activeService, setActiveService] = useState<string | null>(null)

  return (
    <>
      {/* Entry */}
      <section className="min-h-[55vh] flex flex-col justify-end relative">
        <div className="grid-container pb-block">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="text-label text-mist/50 block mb-3">Capabilities</span>
          </motion.div>
          
          <div className="grid grid-cols-12 gap-gutter">
            <div className="col-span-12 lg:col-span-8">
              <motion.h1
                className="text-display-lg text-ivory"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                Services
              </motion.h1>
            </div>
            <div className="col-span-12 lg:col-span-4 flex items-end">
              <motion.p
                className="text-body-md text-mist/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Design, development & marketing solutions for brands that want to lead.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-void">
        <div className="grid-container">
          {services.map((service, index) => (
            <ServiceItem
              key={service.id}
              service={service}
              index={index}
              isActive={activeService === service.id}
              onHover={() => setActiveService(service.id)}
              onLeave={() => setActiveService(null)}
            />
          ))}
        </div>
      </section>

      {/* Process Section */}
      <ProcessSection />

      {/* Closing */}
      <section className="section-breath">
        <div className="grid-container">
          <ScrollReveal>
            <div className="grid grid-cols-12 gap-gutter">
              <div className="col-span-12 lg:col-span-8">
                <p className="text-display-sm text-mist/60 mb-element">
                  Services are only valuable when they solve the right problem.
                </p>
                <p className="text-display-sm text-ivory">
                  Let's define yours.
                </p>
              </div>
              <div className="col-span-12 lg:col-span-4 flex items-end justify-start lg:justify-end mt-8 lg:mt-0">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-4 text-body-md text-mist/70 hover:text-gold transition-colors duration-400"
                >
                  <span>Begin consultation</span>
                  <span className="w-6 h-px bg-current" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}

function ServiceItem({
  service,
  index,
  isActive,
  onHover,
  onLeave,
}: {
  service: typeof services[0]
  index: number
  isActive: boolean
  onHover: () => void
  onLeave: () => void
}) {
  return (
    <ScrollReveal delay={index * 0.08}>
      <article
        className="border-t border-mist/10 py-block group"
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        <div className="grid grid-cols-12 gap-gutter">
          {/* Number */}
          <div className="col-span-2 lg:col-span-1">
            <span className="text-label text-gold/60">{service.number}</span>
          </div>

          {/* Title & Subtitle */}
          <div className="col-span-10 lg:col-span-4">
            <h2 className="text-display-sm text-ivory group-hover:text-gold transition-colors duration-400 mb-1">
              {service.title}
            </h2>
            <p className="text-body-sm text-mist/50">{service.subtitle}</p>
          </div>

          {/* Description */}
          <div className="col-span-12 lg:col-span-4 mt-4 lg:mt-0">
            <p className="text-body-md text-mist/60">{service.description}</p>
          </div>

          {/* Capabilities */}
          <div className="col-span-12 lg:col-span-3 mt-4 lg:mt-0">
            <motion.div
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0.5,
                x: isActive ? 0 : -8,
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <ul className="space-y-0.5">
                {service.capabilities.map((cap) => (
                  <li key={cap} className="text-body-xs text-mist/40">
                    {cap}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Hover line */}
        <motion.div
          className="h-px bg-gold/30 mt-block origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isActive ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </article>
    </ScrollReveal>
  )
}

function ProcessSection() {
  return (
    <section className="py-32 md:py-40 relative bg-void">
      <div className="grid-container text-center">
        <ScrollReveal>
          <p className="text-display-sm md:text-display-md text-mist/40 max-w-3xl mx-auto leading-relaxed">
            We <span className="text-ivory">listen</span>, we <span className="text-ivory">design</span>, we <span className="text-ivory">build</span>, we <span className="text-gold">deliver</span>.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
