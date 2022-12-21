const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2048px',
      '5xl': '2560px',
    },

    container: {
      center: true,
      screens: {
        sm: '100%',
        md: '100%',
        lg: '100%',
        xl: '100%',
        '2xl': '100%',
        '3xl': '1720px',
      },
    },
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#8EB429',
        },
        'secondary': {
          DEFAULT: '#535453',
          "200": "#666666"
        },
        'tertiary': {
          DEFAULT: '#429B35',
        },
        'additional': {
          DEFAULT: '#153E90',
          "2": "#C7C7C7",
          "3": "#EFEFEF",
        },
        'fuscous-gray': {
          DEFAULT: '#535453',
          '50': '#f6f6f6',
          '100': '#eeeeee',
          '200': '#d4d4d4',
          '300': '#babbba',
          '400': '#878787',
          '500': '#535453',
          '600': '#4b4c4b',
          '700': '#3e3f3e',
          '800': '#323232',
          '900': '#292929'
        },
        gray: colors.neutral,
        'limeade': {
          DEFAULT: '#8eb429',
          '50': '#f9fbf4',
          '100': '#f4f8ea',
          '200': '#e3ecca',
          '300': '#d2e1a9',
          '400': '#93C01F',
          '500': '#8eb429',
          '600': '#80a225',
          '700': '#6b871f',
          '800': '#556c19',
          '900': '#465814'
        },
        'apple': {
          DEFAULT: '#429b35',
          '50': '#f6faf5',
          '100': '#ecf5eb',
          '200': '#d0e6cd',
          '300': '#b3d7ae',
          '400': '#7bb972',
          '500': '#429b35',
          '600': '#3b8c30',
          '700': '#327428',
          '800': '#285d20',
          '900': '#204c1a'
        },
        'bay-of-many': {
          DEFAULT: '#153e90',
          '50': '#f3f5f9',
          '100': '#e8ecf4',
          '200': '#c5cfe3',
          '300': '#a1b2d3',
          '400': '#5b78b1',
          '500': '#153e90',
          '600': '#133882',
          '700': '#102f6c',
          '800': '#0d2556',
          '900': '#0a1e47'
        },
        'blue-gray': {
          DEFAULT: '#343A40'
        }
      },
      fontFamily: {
        rubik: ['Rubik']
      },
      gridTemplateRows: {
        '7': 'repeat(7, minmax(0, 1fr))',
        '12': 'repeat(12, minmax(0, 1fr))',
        '13': 'repeat(13, minmax(0, 1fr))',
        '14': 'repeat(14, minmax(0, 1fr))',
        '15': 'repeat(15, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
      },
      gridRow: {
        'span-6': 'span 6 / span 6',
        'span-7': 'span 7 / span 7',
        'span-8': 'span 8 / span 8',
        'span-9': 'span 9 / span 9',
        'span-10': 'span 10 / span 10',
        'span-11': 'span 11 / span 11',
        'span-12': 'span 12 / span 12',
        'span-13': 'span 13 / span 13',
        'span-14': 'span 14 / span 14',
        'span-15': 'span 15 / span 15',
        'span-16': 'span 16 / span 16',
      },


      keyframes: {
        'chat-circle-bounce': {
          '0%': {
            transform: 'translateY(0)',
            backgroundColor: '#4a7fae70'
          },
          '50%': {
            transform: 'translateY(-35%)',
            backgroundColor: '#4a7fae'
          }
        }
      }

    },
  },
  variants: {
    extend: {
      aspectRatio: {
        '16/9': '16/9',
      },

    },
  },
  plugins: [
    'tailwindcss',
    'postcss-preset-env',
    require('@tailwindcss/typography'),
    // require('@tailwindcss/forms'),
  ]
}
