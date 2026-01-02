'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/scroll/ScrollAnimations'

const projectTypes = [
  'Brand Strategy',
  'Visual Identity',
  'Digital Experience',
  'Development',
  'Full Scope',
]

const budgetRanges = [
  '$25k – $50k',
  '$50k – $100k',
  '$100k – $250k',
  '$250k+',
]

export default function ContactPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null)
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState('submitting')
    
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setFormState('success')
  }

  return (
    <>
      {/* Entry */}
      <section className="min-h-[45vh] flex flex-col justify-end relative">
        <div className="grid-container pb-block">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="text-label text-mist/50 block mb-3">Inquire</span>
          </motion.div>
          
          <motion.h1
            className="text-display-lg text-ivory"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Begin a conversation
          </motion.h1>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-void">
        <div className="grid-container">
          <div className="grid grid-cols-12 gap-gutter">
            {/* Left column — Info */}
            <div className="col-span-12 lg:col-span-4 mb-block lg:mb-0">
              <ScrollReveal>
                <p className="text-body-lg text-mist/60 mb-element">
                  We partner with select clients on meaningful projects. 
                  If you're ready to build something exceptional, we'd like 
                  to hear from you.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="border-t border-mist/10 pt-element mt-element">
                  <span className="text-label text-mist/40 block mb-3">Direct</span>
                  <a 
                    href="mailto:hello@aarohan.studio" 
                    className="text-body-md text-ivory hover:text-gold transition-colors duration-250"
                  >
                    hello@aarohan.studio
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="mt-element">
                  <span className="text-label text-mist/40 block mb-3">Response</span>
                  <p className="text-body-sm text-mist/50">
                    We respond to all inquiries within 48 hours.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Right column — Form */}
            <div className="col-span-12 lg:col-span-7 lg:col-start-6">
              {formState === 'success' ? (
                <SuccessState />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-element">
                  {/* Name & Email */}
                  <ScrollReveal>
                    <div className="grid grid-cols-2 gap-gutter">
                      <FormField
                        label="Name"
                        name="name"
                        type="text"
                        required
                      />
                      <FormField
                        label="Email"
                        name="email"
                        type="email"
                        required
                      />
                    </div>
                  </ScrollReveal>

                  {/* Company */}
                  <ScrollReveal delay={0.1}>
                    <FormField
                      label="Company"
                      name="company"
                      type="text"
                    />
                  </ScrollReveal>

                  {/* Project Type */}
                  <ScrollReveal delay={0.2}>
                    <fieldset>
                      <legend className="text-label text-mist/50 mb-4">
                        Project Type
                      </legend>
                      <div className="flex flex-wrap gap-3">
                        {projectTypes.map((type) => (
                          <SelectButton
                            key={type}
                            label={type}
                            selected={selectedType === type}
                            onClick={() => setSelectedType(type)}
                          />
                        ))}
                      </div>
                    </fieldset>
                  </ScrollReveal>

                  {/* Budget */}
                  <ScrollReveal delay={0.3}>
                    <fieldset>
                      <legend className="text-label text-mist/50 mb-4">
                        Budget Range
                      </legend>
                      <div className="flex flex-wrap gap-3">
                        {budgetRanges.map((range) => (
                          <SelectButton
                            key={range}
                            label={range}
                            selected={selectedBudget === range}
                            onClick={() => setSelectedBudget(range)}
                          />
                        ))}
                      </div>
                    </fieldset>
                  </ScrollReveal>

                  {/* Message */}
                  <ScrollReveal delay={0.4}>
                    <FormField
                      label="Tell us about your project"
                      name="message"
                      type="textarea"
                      required
                    />
                  </ScrollReveal>

                  {/* Submit */}
                  <ScrollReveal delay={0.5}>
                    <div className="pt-element">
                      <button
                        type="submit"
                        disabled={formState === 'submitting'}
                        className="group relative inline-flex items-center gap-4 text-body-lg text-ivory hover:text-gold transition-colors duration-400 disabled:opacity-50"
                      >
                        <span>
                          {formState === 'submitting' ? 'Sending...' : 'Send Inquiry'}
                        </span>
                        <span className="w-8 h-px bg-current group-hover:w-12 transition-all duration-400" />
                      </button>
                    </div>
                  </ScrollReveal>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Contact */}
      <section className="section-breath">
        <div className="grid-container">
          <ScrollReveal>
            <div className="border-t border-mist/10 pt-block">
              <div className="grid grid-cols-12 gap-gutter">
                <div className="col-span-12 md:col-span-4">
                  <span className="text-label text-mist/40 block mb-3">New Business</span>
                  <a 
                    href="mailto:new@aarohan.studio" 
                    className="text-body-md text-mist/60 hover:text-ivory transition-colors duration-250"
                  >
                    new@aarohan.studio
                  </a>
                </div>
                <div className="col-span-12 md:col-span-4 mt-6 md:mt-0">
                  <span className="text-label text-mist/40 block mb-3">Press</span>
                  <a 
                    href="mailto:press@aarohan.studio" 
                    className="text-body-md text-mist/60 hover:text-ivory transition-colors duration-250"
                  >
                    press@aarohan.studio
                  </a>
                </div>
                <div className="col-span-12 md:col-span-4 mt-6 md:mt-0">
                  <span className="text-label text-mist/40 block mb-3">Social</span>
                  <div className="flex gap-5">
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
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}

function FormField({
  label,
  name,
  type,
  required = false,
}: {
  label: string
  name: string
  type: 'text' | 'email' | 'textarea'
  required?: boolean
}) {
  const inputClasses = `
    w-full bg-transparent border-b border-mist/20 py-3 text-body-md text-ivory
    placeholder:text-mist/30 focus:outline-none focus:border-gold/50
    transition-colors duration-250
  `

  return (
    <div>
      <label className="text-label text-mist/50 block mb-1.5" htmlFor={name}>
        {label}
        {required && <span className="text-gold/60 ml-1">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          required={required}
          rows={4}
          className={`${inputClasses} resize-none`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          className={inputClasses}
        />
      )}
    </div>
  )
}

function SelectButton({
  label,
  selected,
  onClick,
}: {
  label: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        px-3 py-1.5 text-body-sm border transition-all duration-250
        ${selected 
          ? 'border-gold/60 text-gold bg-gold/5' 
          : 'border-mist/20 text-mist/60 hover:border-mist/40 hover:text-mist/80'
        }
      `}
    >
      {label}
    </button>
  )
}

function SuccessState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="py-section"
    >
      <div className="mb-element">
        <motion.div
          className="w-12 h-px bg-gold mb-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        />
        <h2 className="text-display-sm text-ivory mb-3">
          Message received
        </h2>
        <p className="text-body-lg text-mist/60">
          Thank you for reaching out. We'll review your inquiry and 
          respond within 48 hours.
        </p>
      </div>
    </motion.div>
  )
}
