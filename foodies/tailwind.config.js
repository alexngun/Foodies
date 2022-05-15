module.exports = {
  mode: 'jit',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        slideText: {
          'from': { transform: 'translateX(175%)'},
          'to': { transform: 'translateX(-175%)'}
        }
      }
    },
  },
  plugins: [],
}
