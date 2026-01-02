'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ScrollReveal, ParallaxColumn, HorizontalDrift } from '@/components/scroll/ScrollAnimations'
import ParallaxImage from '@/components/media/ParallaxImage'

const values = [
  {
    number: '01',
    title: 'Precision Over Decoration',
    description: 'Every element serves purpose. Ornament without function is noise.',
  },
  {
    number: '02',
    title: 'Strategy Before Aesthetics',
    description: "Beautiful work that doesn't solve the right problem is failure with style.",
  },
  {
    number: '03',
    title: 'Restraint as Confidence',
    description: 'Knowing what to leave out is more valuable than knowing what to add.',
  },
  {
    number: '04',
    title: 'Technical Excellence',
    description: 'Performance and accessibility are design decisions, not afterthoughts.',
  },
]

const team = [
  {
    name: 'Founding Partner',
    role: 'Creative Direction',
    description: 'Strategic vision and design philosophy',
  },
  {
    name: 'Design Partner',
    role: 'Visual Systems',
    description: 'Brand architecture and identity systems',
  },
  {
    name: 'Technical Partner',
    role: 'Engineering',
    description: 'Development leadership and technical strategy',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Entry */}
      <section className="pt-40 pb-24 md:pt-48 md:pb-32 bg-void">
        <div className="grid-container">
          <motion.h1
            className="text-display-lg md:text-display-xl text-ivory max-w-5xl"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            We build digital authority for brands that refuse mediocrity
          </motion.h1>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-void">
        <div className="grid-container">
          <div className="grid grid-cols-12 gap-gutter">
            {/* Left — Statement */}
            <div className="col-span-12 lg:col-span-7">
              <ScrollReveal>
                <p className="text-display-sm text-mist/70 mb-element">
                  Aarohan is not an agency in the conventional sense.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p className="text-body-lg text-mist/60 mb-6">
                  We are a strategic design studio that operates at the intersection 
                  of brand strategy, visual systems, and technical implementation. 
                  Our work is characterized by restraint, precision, and an 
                  uncompromising commitment to solving the right problems.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="text-body-lg text-mist/60">
                  We partner with organizations that understand the value of 
                  differentiation—brands that recognize that memorable design 
                  isn't about being louder, but about being more precise.
                </p>
              </ScrollReveal>
            </div>

            {/* Right — Image */}
            <div className="col-span-12 lg:col-span-4 lg:col-start-9 mt-block lg:mt-0">
              <HorizontalDrift amount={-30}>
                <ParallaxImage
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"
                  alt="Studio space"
                  className="aspect-[3/4]"
                />
              </HorizontalDrift>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-void relative">
        {/* Accent */}
        <div className="absolute left-0 top-1/2 w-16 h-px bg-gold/40" />

        <div className="grid-container">
          <div className="mb-block">
            <ScrollReveal>
              <span className="text-label text-mist/50">Principles</span>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-12 gap-gutter">
            {values.map((value, index) => (
              <div key={value.number} className="col-span-12 md:col-span-6 lg:col-span-3">
                <ScrollReveal delay={index * 0.08}>
                  <div className="border-t border-mist/10 pt-element h-full">
                    <span className="text-label text-gold/60 block mb-3">
                      {value.number}
                    </span>
                    <h3 className="text-body-lg text-ivory mb-3">
                      {value.title}
                    </h3>
                    <p className="text-body-sm text-mist/50">
                      {value.description}
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Break — Multi-column */}
      <section className="py-section overflow-hidden">
        <div className="grid-container">
          <div className="grid grid-cols-12 gap-gutter">
            <div className="col-span-5">
              <ParallaxColumn direction="down" speed={50}>
                <ParallaxImage
                  src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800"
                  alt="Detail"
                  className="aspect-[4/5]"
                />
              </ParallaxColumn>
            </div>
            <div className="col-span-5 col-start-7 pt-[15vh]">
              <ParallaxColumn direction="up" speed={40}>
                <ParallaxImage
                  src="https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=800"
                  alt="Texture"
                  className="aspect-square"
                />
              </ParallaxColumn>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-void">
        <div className="grid-container">
          <div className="grid grid-cols-12 gap-gutter mb-block">
            <div className="col-span-12 lg:col-span-4">
              <ScrollReveal>
                <span className="text-label text-mist/50 block mb-4">Team</span>
                <h2 className="text-display-md text-ivory">
                  Small by design
                </h2>
              </ScrollReveal>
            </div>
            <div className="col-span-12 lg:col-span-6 lg:col-start-7">
              <ScrollReveal delay={0.2}>
                <p className="text-body-lg text-mist/60">
                  We maintain a deliberately small team to ensure every project 
                  receives principal-level attention. No account managers, no 
                  junior handoffs—direct partnership with senior practitioners.
                </p>
              </ScrollReveal>
            </div>
          </div>

          {/* Team grid */}
          <div className="grid grid-cols-12 gap-gutter">
            {team.map((member, index) => (
              <div key={member.name} className="col-span-12 md:col-span-4">
                <ScrollReveal delay={index * 0.1}>
                  <div className="border-t border-mist/10 pt-element">
                    <span className="text-label text-gold/50 block mb-1">
                      {member.role}
                    </span>
                    <h3 className="text-display-sm text-ivory mb-1">
                      {member.name}
                    </h3>
                    <p className="text-body-sm text-mist/50">
                      {member.description}
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition */}
      <section className="section-breath">
        <div className="grid-container">
          <ScrollReveal>
            <div className="border-t border-mist/10 pt-block">
              <span className="text-label text-mist/40 block mb-element">
                Recognition
              </span>
              <div className="flex flex-wrap gap-x-12 gap-y-4">
                {['Awwwards', 'CSS Design Awards', 'FWA', 'Webby Awards'].map((award) => (
                  <span key={award} className="text-body-md text-mist/30">
                    {award}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Closing */}
      <section className="section-void">
        <div className="grid-container">
          <ScrollReveal>
            <p className="text-display-md text-ivory max-w-3xl mb-element">
              Interested in working together?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 text-body-lg text-mist/70 hover:text-gold transition-colors duration-400"
            >
              <span>Start a conversation</span>
              <span className="w-6 h-px bg-current" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
