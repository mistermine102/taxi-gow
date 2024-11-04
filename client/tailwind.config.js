const colors = require('./colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: 'NotoSans_400Regular'
      },
      colors: {
        danger: colors.danger,
        primary: colors.primary,
        darkGray: colors.darkGray,
        lightGray: colors.lightGray,
      },
      spacing: {
        base: '16px',
      },
    },
  },
  plugins: [],
}
