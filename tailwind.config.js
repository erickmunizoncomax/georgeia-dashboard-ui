/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      tablet: '768px',
      laptop: '1024px',
      desktop: '1280px',
    },
  },
  plugins: [],
}