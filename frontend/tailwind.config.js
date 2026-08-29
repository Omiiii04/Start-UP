/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ShwaX Studio inspired sleek OLED dark palette
        background: '#050505',
        surface: {
          DEFAULT: '#0e0e13',
          dim: '#08080b',
          bright: '#181822',
          low: '#0a0a0f',
          container: '#14141c',
          high: '#1c1c27',
          highest: '#252533',
          border: 'rgba(255, 255, 255, 0.08)',
          borderDark: 'rgba(255, 255, 255, 0.14)',
        },
        primary: {
          DEFAULT: '#7c3aed',   // Vibrant violet/purple
          dark: '#5b21b6',
          light: '#a78bfa',
          container: 'rgba(124, 58, 237, 0.18)',
          fixed: 'rgba(124, 58, 237, 0.08)',
        },
        navy: {
          DEFAULT: '#ffffff',
          dark: '#e4e4e7',
          light: '#14141c',
        },
        secondary: {
          DEFAULT: '#a78bfa',
          container: 'rgba(167, 139, 250, 0.15)',
        },
        tertiary: {
          DEFAULT: '#34d399',
          container: 'rgba(52, 211, 153, 0.15)',
          light: '#6ee7b7',
        },
        success: '#34d399',
        warning: '#fbbf24',
        error: '#f87171',
        darkBg: '#050505',
        darkCard: '#0e0e13',
      },
      fontFamily: {
        headline: ['Hanken Grotesk', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        card: '0px 4px 24px rgba(0, 0, 0, 0.6)',
        cardHover: '0px 8px 32px rgba(124, 58, 237, 0.25)',
        modal: '0px 16px 48px rgba(0, 0, 0, 0.8)',
        glow: '0 0 24px rgba(124, 58, 237, 0.45)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.8', filter: 'drop-shadow(0 0 12px rgba(124, 58, 237, 0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 24px rgba(124, 58, 237, 0.75))' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradientFlow: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        radarPing: {
          '0%': { transform: 'scale(0.95)', opacity: '0.8' },
          '50%': { transform: 'scale(1.6)', opacity: '0' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        blobDrift: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(24px, -30px) scale(1.08)' },
          '66%': { transform: 'translate(-20px, 15px) scale(0.95)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-up': 'fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-down': 'fadeInDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pop-in': 'popIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 4s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'gradient-flow': 'gradientFlow 6s ease infinite',
        'radar-ping': 'radarPing 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'spin-slow': 'spinSlow 20s linear infinite',
        'blob-drift': 'blobDrift 10s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}

