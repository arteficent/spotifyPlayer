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
      },
      boxShadow: {
        '3xl': '0px 0px 100px 20px rgba(0, 0, 0, 0.9)',
      }
    }
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
