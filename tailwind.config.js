/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    fontWeight: {
      thin: '100',
      normal: '400',
      semibold: '700',
      bold: '900',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      'primary': '#0072F5',
      'primary-dark': '#0952A5',
      'primary-light': '#3694FF',
      'secondary': '#9750DD',
      'success': '#17C964',
      'warning': '#F5A524',
      'error': '#F31260',
      'white': '#FFFF',
      'neutral': '#697177',
      'black': '#000000',
      'accent-dark': '#16181A',
      'accent-light': '#F1F3F5'
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
