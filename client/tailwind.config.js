/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F3D464',
        darkGray: '#4D4D4D',
        lightGray: '#EDEDED',
      },
      spacing: {
        base: '16px',
      },
    },
  },
  plugins: [],
}
