/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tsb: {
          "blue": "#1D9DD8"
        },
      },
      fontFamily: {
        ethnocentric: ['Ethnocentric Rg', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

