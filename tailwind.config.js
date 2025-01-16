/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    container: {center: true},
    extend: {
      colors: {
        'background': {
          'light': 'hsl(210,20%,98%)',
          'dark': 'hsl(217,19%,27%)',
          'text-light': 'hsl(221,39.3%,11%)',
          'text-dark': 'hsl(0,0%,100%)',
        }
      }
    },
  },
  plugins: [],
}

