/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [

    './app/**/*.{js,ts,jsx,tsx}',  // Your page components
    './pages/**/*.{js,ts,jsx,tsx}',  // Your page components
    './components/**/*.{js,ts,jsx,tsx}',  // Your components
  ],
  theme: {
    extend: {
      colors: {
        'button-green': 'var(--button-green)',

        'search-bg': 'var(--search-bg)',
        'search-text': 'var(--search-text)',
        'title-text': 'var(--title-text)',

      },
    },
  },
  plugins: [],
};