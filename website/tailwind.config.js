/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        flash: 'flash 1s infinite',
      },
      keyframes: {
        flash: {
          '0%, 50%, 100%': { opacity: 1 },
          '25%, 75%': { opacity: 0 },
        },
      },
      backgroundImage: {
        'tvBorder': "url('./public/assets/tvborder.png')",
      }
    },
    fontFamily: {
      pressStart: ['"Press Start 2P"', 'cursive'],
    }
  },
  plugins: [],
}
