/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'hero-wrapper':
          "linear-gradient(to right bottom, rgba('#000',0.8),[rgb(173,221,208,0.5)]))",
      },
    },
  },
  variants: {
    width: ['responsive', 'hover', 'focus'],
    height: ['responsive', 'hover', 'focus'],
    extend: {},
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
