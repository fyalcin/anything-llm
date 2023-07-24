/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'black-900': '#141414',
		primary: '#dbf2d6',
		secondary: '#14b914',
      }
    },
  },
  plugins: [],
}

