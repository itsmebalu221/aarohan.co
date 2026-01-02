'use client'

import { useEffect } from 'react'


export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="grid-container text-center">
        <span className="text-label text-gold/60 block mb-4">Error</span>
        <h1 className="text-display-md text-ivory mb-4">Something went wrong</h1>
        <p className="text-body-md text-mist/60 mb-8">
          An unexpected error has occurred.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-4 text-body-md text-mist/70 hover:text-gold transition-colors duration-300"
        >
          <span>Try again</span>
          <span className="w-6 h-px bg-current" />
        </button>
      </div>
    </section>
  )
}
