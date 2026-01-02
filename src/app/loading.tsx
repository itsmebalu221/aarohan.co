export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative w-12 h-12">
        {/* Outer ring */}
        <div className="absolute inset-0 border border-mist/20 rounded-full" />
        
        {/* Spinning segment */}
        <div 
          className="absolute inset-0 border border-transparent border-t-gold/60 rounded-full animate-spin"
          style={{ animationDuration: '1.2s' }}
        />
      </div>
    </div>
  )
}
