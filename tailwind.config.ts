const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Locked color system - no deviations
        void: '#131215',
        ivory: '#ffffff',
        mist: '#d1d4da',
        gold: '#c7a258',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        // Display scale — architectural proportions with proper weights
        'display-hero': ['clamp(4rem, 12vw, 14rem)', { lineHeight: '0.85', letterSpacing: '-0.04em', fontWeight: '600' }],
        'display-lg': ['clamp(3rem, 8vw, 8rem)', { lineHeight: '0.9', letterSpacing: '-0.03em', fontWeight: '600' }],
        'display-md': ['clamp(2rem, 5vw, 5rem)', { lineHeight: '0.95', letterSpacing: '-0.02em', fontWeight: '500' }],
        'display-sm': ['clamp(1.5rem, 3vw, 3rem)', { lineHeight: '1.05', letterSpacing: '-0.01em', fontWeight: '500' }],
        // Body scale — consistent line-heights
        'body-lg': ['1.125rem', { lineHeight: '1.65', letterSpacing: '0' }],
        'body-md': ['1rem', { lineHeight: '1.65', letterSpacing: '0.005em' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],
        'body-xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],
      },
      spacing: {
        // Architectural spacing tokens — consistent with CSS variables
        'section': 'clamp(6rem, 15vh, 12rem)',
        'block': 'clamp(3rem, 8vh, 6rem)',
        'element': 'clamp(1.5rem, 4vh, 3rem)',
        'gutter': 'clamp(1rem, 2vw, 2rem)',
      },
      transitionDuration: {
        '150': '150ms',
        '250': '250ms',
        '400': '400ms',
        '600': '600ms',
        '1000': '1000ms',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'editorial': 'cubic-bezier(0.65, 0, 0.35, 1)',
        'precise': 'cubic-bezier(0.33, 1, 0.68, 1)',
      },
      animation: {
        'fade-up': 'fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'reveal': 'reveal 1s cubic-bezier(0.65, 0, 0.35, 1) forwards',
        'drift': 'drift 20s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        reveal: {
          '0%': { clipPath: 'inset(100% 0 0 0)' },
          '100%': { clipPath: 'inset(0 0 0 0)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(8px, -8px, 0)' },
        },
      },
      backgroundImage: {
        'noise': "url('/noise.png')",
      },
    },
  },
  plugins: [],
}

export default config
