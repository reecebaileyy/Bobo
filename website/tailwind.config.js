/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'tvBorder': "url('')",
        'footer-texture': "url('./public/assets/tvborder.png')",
      }
    },
  },
  plugins: [],
}
