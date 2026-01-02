"use client";

export default function Error() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="grid-container text-center">
        <span className="text-label text-gold/60 block mb-4">Error</span>
        <h1 className="text-display-md text-ivory mb-4">Something went wrong</h1>
        <p className="text-body-md text-mist/60 mb-8">
          An unexpected error has occurred.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-4 text-body-md text-mist/70 hover:text-gold transition-colors duration-300"
        >
          <span>Return home</span>
          <span className="w-6 h-px bg-current" />
        </a>
      </div>
    </section>
  )
}
