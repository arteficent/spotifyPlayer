module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        crimson: '#FF003F',
        customGrey: '#919191'
      }
    }
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
