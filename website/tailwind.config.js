/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'tvBorder': "url('./public/assets/tvborder.png')",
      },
      fontFamily: {
        bebas: ['Bebas Neue'],
      }
    },
  },
  plugins: [],
}
