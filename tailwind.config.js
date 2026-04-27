/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        display: ['"Playfair Display"', 'serif'],
      },
      colors: {
        cream: '#F5EFE6',
        blush: '#E8C4B8',
        dustrose: '#C4847A',
        midnight: '#080508',
        deepspace: '#0D0008',
        stardust: '#1A0010',
        cherry: '#b3002d',
        cherrylight: '#e8003d',
        cherrydark: '#6b0019',
        glow: '#FF4060',
        soft: '#FFB3C1',
        crimson: '#8B0020',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'pulse-cherry': 'pulseCherry 2.5s ease-in-out infinite',
        'drift': 'drift 20s linear infinite',
        'glow-ring': 'glowRing 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        pulseCherry: {
          '0%, 100%': { boxShadow: '0 0 12px rgba(179,0,45,0.4), 0 0 24px rgba(179,0,45,0.2)' },
          '50%': { boxShadow: '0 0 24px rgba(179,0,45,0.8), 0 0 48px rgba(179,0,45,0.4)' },
        },
        drift: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100vw)' },
        },
        glowRing: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
