export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="grid-container text-center">
        <span className="text-label text-mist/40 block mb-4">404</span>
        <h1 className="text-display-md text-ivory mb-4">Page not found</h1>
        <p className="text-body-md text-mist/60 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-4 text-body-md text-mist/70 hover:text-gold transition-colors duration-300"
        >
          <span className="w-6 h-px bg-current" />
          <span>Return home</span>
        </a>
      </div>
    </section>
  )
}
