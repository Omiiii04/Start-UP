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
        background: '#f7f9fb',
        surface: {
          DEFAULT: '#ffffff',
          dim: '#d8dadc',
          bright: '#f7f9fb',
          low: '#f2f4f6',
          container: '#eceef0',
          high: '#e6e8ea',
          highest: '#e0e3e5',
          border: '#e2e8f0',
          borderDark: '#cbd5e1',
        },
        primary: {
          DEFAULT: '#0052ff', // Electric Blue
          dark: '#003ec7',
          light: '#b7c4ff',
          container: '#dfe3ff',
          fixed: '#dde1ff',
        },
        navy: {
          DEFAULT: '#0a192f',
          dark: '#050d1a',
          light: '#1e293b',
        },
        secondary: {
          DEFAULT: '#515f78',
          container: '#d2e0fe',
        },
        tertiary: {
          DEFAULT: '#005b21',
          container: '#79ff8f',
          light: '#69ff87',
        },
        success: '#00c853',
        warning: '#f59e0b',
        error: '#ba1a1a',
        darkBg: '#0f172a',
        darkCard: '#1e293b',
      },
      fontFamily: {
        headline: ['Hanken Grotesk', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        card: '0px 4px 20px rgba(0, 0, 0, 0.05)',
        cardHover: '0px 8px 30px rgba(0, 82, 255, 0.12)',
        modal: '0px 12px 32px rgba(10, 25, 47, 0.12)',
        glow: '0 0 15px rgba(0, 82, 255, 0.35)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      }
    },
  },
  plugins: [],
}
