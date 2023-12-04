/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      black: '#000000',
      white: '#FFFFFF',
      lightblue: '#00b4fc',
      gray: '#51425f',
      red: '#d50000',
      lightGray: '#e6ddee'
    }
  },
  plugins: [],
}

