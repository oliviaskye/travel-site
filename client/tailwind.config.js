/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'black-300': '#333333',
        'black-800': '#1a1a1a',
        'light-gray': '#f7f7f7',
        'brown-100': '#d2b48c',
      },
      spacing: {
        '4xl': '48rem',
      },
      borderRadius: {
        'rounded': '1rem',
      },
      boxShadow: {
        'lg': '0 10px 15px -3px rgba(2, 2, 2, 0.1)',
      },
    },
  },
  plugins: [],
}





