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
        'chiti-green': 'var(--chiti-green)',
        'button-green': 'var(--button-green)',
        'chiti-bg': 'var(--chiti-bg)',
        'search-bg': 'var(--search-bg)',
        'search-text': 'var(--search-text)',
        'title-text': 'var(--title-text)',
        'chiti-text': 'var(--chiti-text)',

      },
    },
  },
  plugins: [],
};