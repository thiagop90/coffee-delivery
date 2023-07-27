/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        custom: '-8px 8px 0 #f3f4f6, -8px 8px 0 1px #e5e7eb',
      },
      backdropSaturate: {
        180: '1.8',
      },
      colors: {
        base: {
          title: '#272221',
          subtitle: '#403937',
          text: '#574F4D',
        },
        brown: {
          100: '#f4eeec',
          500: '#b38f80',
          600: '#9d7565',
          700: '#826153',
          800: '#6d5247',
        },
      },
      minHeight: {
        calculatedHeight: 'calc(100vh - 5rem)',
        calculatedHeight2: 'calc(100vh - 8.875rem)',
      },
      animation: {
        'favorite-button-animation':
          'favorite-button-animation .45s ease-in-out',
      },
      keyframes: {
        'favorite-button-animation': {
          '0%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.2)' },
          '50%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
}
