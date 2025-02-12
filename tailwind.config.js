/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-5deg)' },
          '75%': { transform: 'rotate(5deg)' },
        },
        shrinkAndMove: {
          '0%': {
            transform: 'scale(1) translate(0, 0)',
          },
          '100%': {
            transform: 'scale(0.2) translate(-800px, 250px)',
          },
        },
        fadeIn: {
          '0%': {
            opacity: '0',
            transform: 'translate(-120px, -150px) scale(0.5)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate(-120px, -150px) scale(3.0)',
          },
        },
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translate(-50%, 50px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate(-50%, 0)',
          },
        },
      },
      animation: {
        'shake-limited': 'shake 0.5s ease-in-out 10',
        'shrink-and-move': 'shrinkAndMove 1s ease-in-out forwards',
        'fade-in': 'fadeIn 1s ease-in-out forwards',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}
