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
        // ProjectMart-inspired clean white/light palette
        background: '#f8f8fa',
        surface: {
          DEFAULT: '#ffffff',
          dim: '#f3f4f6',
          bright: '#ffffff',
          low: '#f9fafb',
          container: '#f1f3f5',
          high: '#e9ecef',
          highest: '#dee2e6',
          border: 'rgba(0, 0, 0, 0.08)',
          borderDark: 'rgba(0, 0, 0, 0.14)',
        },
        primary: {
          DEFAULT: '#18181b',   // Elegant faint black / soft charcoal
          dark: '#09090b',      // Deeper black on hover
          light: '#27272a',     // Subtle zinc charcoal
          container: 'rgba(24, 24, 27, 0.08)',
          fixed: 'rgba(24, 24, 27, 0.04)',
        },
        // Semi-faint black brand accent
        brand: {
          DEFAULT: '#18181b',
          hover: '#09090b',
          light: 'rgba(24, 24, 27, 0.06)',
          muted: 'rgba(24, 24, 27, 0.65)',
          border: 'rgba(24, 24, 27, 0.15)',
        },
        navy: {
          DEFAULT: '#18181b',
          dark: '#09090b',
          light: '#f4f4f5',
        },
        secondary: {
          DEFAULT: '#3f3f46',
          container: 'rgba(63, 63, 70, 0.08)',
        },
        tertiary: {
          DEFAULT: '#10b981',
          container: 'rgba(16, 185, 129, 0.12)',
          light: '#34d399',
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        darkBg: '#09090b',
        darkCard: '#18181b',
      },
      fontFamily: {
        headline: ['Hanken Grotesk', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        card: '0px 2px 12px rgba(0, 0, 0, 0.06)',
        cardHover: '0px 8px 24px rgba(0, 0, 0, 0.10)',
        modal: '0px 16px 48px rgba(0, 0, 0, 0.18)',
        glow: '0 4px 14px rgba(24, 24, 27, 0.22)',
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
          '0%, 100%': { opacity: '0.9', filter: 'drop-shadow(0 0 8px rgba(24, 24, 27, 0.25))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 16px rgba(24, 24, 27, 0.45))' },
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

