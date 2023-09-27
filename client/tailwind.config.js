/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        sm: '0.750rem',
        base: '1rem',
        xl: '1.333rem',
        '2xl': '1.777rem',
        '3xl': '2.369rem',
        '4xl': '3.158rem',
        '5xl': '4.210rem',
        '6xl': '4.375rem'
      },
      fontFamily: {
        poppins: 'Poppins',
        prompt: 'Prompt'
      },
      fontWeight: {
        normal: '400',
        bold: '700'
      },
      colors: {
        textLight: '#c9c9c9',
        background: '#010402',
        textDark: '#1E1E1E',
        primary: '#228d07',
        secondary: '#bfbfbf',
        secondaryDark: '#06080B',
        accent: '#539a07'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio')
  ]
}
