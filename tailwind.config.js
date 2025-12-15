/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#F5F5DC', // cream
          dark: '#000000', // black
        },
        accent: {
          light: '#E8B4B8', // rose gold
          dark: '#FFD700', // gold
        },
        luxury: {
          cream: '#F5F5DC',
          rosegold: '#E8B4B8',
          gold: '#FFD700',
          black: '#000000',
          darkgray: '#1a1a1a',
        }
      },
      fontFamily: {
        luxury: ['Playfair Display', 'Georgia', 'serif'],
        elegant: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}