/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a365d',
          light: '#2a4a7f',
          dark: '#0f2340',
        },
        accent: {
          DEFAULT: '#c53030',
          light: '#e53e3e',
          dark: '#9b2c2c',
        },
        gold: {
          DEFAULT: '#d69e2e',
          light: '#ecc94b',
        },
        background: {
          dark: '#0a0a0a',
          section: '#111111',
          card: 'rgba(255, 255, 255, 0.05)',
          glass: 'rgba(255, 255, 255, 0.08)',
        },
        text: {
          primary: '#f7fafc',
          secondary: '#a0aec0',
          muted: '#94a3b8',
        },
        border: 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
        '4xl': '6rem',
      },
      borderRadius: {
        sm: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
        '2xl': '2rem',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 3px rgba(0,0,0,0.3)',
        md: '0 4px 12px rgba(0,0,0,0.4)',
        lg: '0 8px 30px rgba(0,0,0,0.5)',
        xl: '0 16px 50px rgba(0,0,0,0.6)',
        glow: '0 0 20px rgba(26, 54, 93, 0.3)',
      },
      height: {
        navbar: '72px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease forwards',
        slideUp: 'slideUp 0.5s ease forwards',
        slideInLeft: 'slideInLeft 0.5s ease forwards',
        slideInRight: 'slideInRight 0.5s ease forwards',
        scaleIn: 'scaleIn 0.5s ease forwards',
        shimmer: 'shimmer 2s linear infinite',
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
