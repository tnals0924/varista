/** 
 * @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'pre_var': ['Pretendard Variable'],
        'pre_reg': ['Pretendard Regular']
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 0 0 var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      }
    },
    plugins: [
      plugin(function ({ matchUtilities, theme }) {
        matchUtilities(
          {
            'text-shadow': (value) => ({
              textShadow: value,
            }),
          },
          { values: theme('textShadow') }
        )
      }),
    ],
  },
  plugins: [],
}