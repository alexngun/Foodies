module.exports = {
  mode: 'jit',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'google': '#DB4437',
        'facebook': '#4267B2',
        'github': '#333'
      },
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
