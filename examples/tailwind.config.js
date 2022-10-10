module.exports = {
  content: ['./src/**/*.{vue,js,md}'],
  theme: {
    extend: {}
  },
  plugins: [require('@tailwindcss/typography'), require('../src')]
}
