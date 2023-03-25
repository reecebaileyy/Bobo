/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'sm': {'min': '320px', 'max': '639px'},     // Phones (portrait)
      'md': {'min': '640px', 'max': '767px'},     // Phones (landscape) / Tablets (portrait)
      'lg': {'min': '768px', 'max': '1023px'},    // Tablets (landscape) / Laptops
      'xl': {'min': '1024px', 'max': '1279px'},   // Desktops (sm)
      '2xl': {'min': '1280px', 'max': '1535px'},  // Desktops (md)
      '3xl': {'min': '1536px'},    
    },
    extend: {
      animation: {
        flash: 'flash 1s infinite',
      },
      keyframes: {
        flash: {
          '0%, 50%, 100%': { opacity: 1 },
          '25%, 75%': { opsacity: 0 },
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
