/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      textColor: {
        DEFAULT: '#000000',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'shake-infinite': {
          '0%, 100%': { transform: 'rotate(-10deg)' },
          '50%': { transform: 'rotate(10deg)' },
        },
        'shrink-and-move': {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '50%': { transform: 'scale(0.8) translate(0, 0)' },
          '100%': { transform: 'scale(0.3) translate(-150%, 150%)' },
        },
        'grow-and-center': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.5) translate(0, 0)',
          },
          '50%': {
            opacity: '0.5',
            transform: 'scale(1.2) translate(0, -20%)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1) translate(0, -30%)',
          },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-in-up': 'fade-in-up 0.5s ease-out',
        'shake-infinite': 'shake-infinite 0.5s ease-in-out infinite',
        'shrink-and-move': 'shrink-and-move 1s ease-in-out forwards',
        'grow-and-center': 'grow-and-center 1s ease-out forwards',
      },
    },
  },
  plugins: [],
}
