'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ScrollReveal } from '@/components/scroll/ScrollAnimations'

const projects = [
  {
    id: 'brand-luxe',
    title: 'Brand Luxe',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
  },
  {
    id: 'techflow',
    title: 'TechFlow',
    category: 'Development',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
  },
  {
    id: 'flavor-hub',
    title: 'Flavor Hub',
    category: 'App Design',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
  },
  {
    id: 'metro-realty',
    title: 'Metro Realty',
    category: 'Website',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
  },
  {
    id: 'greenscape',
    title: 'GreenScape',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800',
  },
  {
    id: 'finwise',
    title: 'FinWise',
    category: 'Dashboard',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
  },
]

export default function WorkPage() {
  return (
    <>
      {/* Hero - About style, improved responsive */}
      <section className="pt-28 pb-16 md:pt-40 md:pb-24 bg-void">
        <div className="grid-container">
          <motion.h1
            className="text-display-md sm:text-display-lg md:text-display-xl text-ivory max-w-2xl md:max-w-4xl lg:max-w-5xl text-left leading-tight"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Crafting digital experiences that leave lasting impressions
          </motion.h1>
        </div>
      </section>

      {/* Projects - Classic Uniform Grid, fully responsive */}
      <section className="pb-20 md:pb-32 bg-void">
        <div className="grid-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-14 md:gap-y-20">
            {projects.map((project, index) => (
              <ScrollReveal key={project.id}>
                <Link href={`/work/${project.id}`} className="group block">
                  <article>
                    <div className="aspect-[4/3] md:aspect-[3/2] overflow-hidden bg-charcoal rounded-lg md:rounded-xl shadow-sm">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.04]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="mt-6 md:mt-8 flex flex-col md:flex-row md:items-baseline md:justify-between border-t border-mist/10 pt-5 md:pt-6 gap-2 md:gap-0">
                      <div>
                        <h2 className="text-title text-ivory group-hover:text-gold transition-colors duration-300">
                          {project.title}
                        </h2>
                        <span className="text-label text-mist/40 mt-1 block">
                          {project.category}
                        </span>
                      </div>
                      <span className="text-label text-mist/20 md:ml-4">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </article>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Banner */}
      <section className="bg-void py-32 md:py-40 border-t border-mist/10">
        <div className="grid-container">
          <ScrollReveal>
            <div className="text-center">
              <p className="text-label text-gold mb-6 tracking-widest">
                NEXT STEP
              </p>
              <h2 className="text-display-lg md:text-display-xl text-ivory mb-8 max-w-4xl mx-auto">
                Your Vision,<br />
                <span className="text-gold">Our Craft</span>
              </h2>
              <p className="text-body text-mist/60 max-w-lg mx-auto mb-12">
                Every great project starts with a conversation. 
                Let's discuss how we can bring your ideas to life.
              </p>
              <Link
                href="/contact"
                className="inline-block px-10 py-4 border border-gold text-gold hover:bg-gold hover:text-void transition-all duration-300 text-label tracking-wider"
              >
                GET IN TOUCH
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
