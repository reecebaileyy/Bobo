/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'tvBorder': "url('./public/assets/tvborder.png')",
      },
      fontFamily: {
        pressStart: ['Press Start 2P', 'cursive'],
      }
    },
  },
  plugins: [],
}
