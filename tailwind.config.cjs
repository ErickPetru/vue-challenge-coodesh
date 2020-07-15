// Doc: https://tailwindcss.com/docs/configuration
module.exports = {
  plugins: [require('@tailwindcss/custom-forms')],

  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },

    fontFamily: {
      base: ['Montserrat', 'Helvetica', 'Arial', 'sans-serif'],
      headings: ['Oswald', 'Helvetica', 'Arial', 'sans-serif'],
    },

    fontSize: {
      '5xs': '.25em',
      '4xs': '.375em',
      '3xs': '.5em',
      '2xs': '.675em',
      xs: '.75em',
      '2sm': '.8125em',
      sm: '.875em',
      tight: '.9375em',
      base: '1em',
      lg: '1.125em',
      xl: '1.25em',
      '2xl': '1.5em',
      '3xl': '1.875em',
      '4xl': '2.25em',
      '5xl': '3em',
      '6xl': '3.5em',
      '7xl': '4em',
      '8xl': '4.5em',
      '9xl': '5em',
      '10xl': '6em',
    },

    container: {
      center: true,
      padding: {
        default: '1rem',
        md: '2rem',
      },
    },

    boxShadow: {
      outline: '0 0 0 2px #3990b0',
      none: 'none',
    },

    extend: {
      spacing: {
        '36': '9rem',
        '44': '11rem',
        '68': '17rem',
        '72': '18rem',
        '76': '19rem',
        '80': '20rem',
        '84': '21rem',
        '96': '24rem',
      },

      colors: {
        blue: {
          100: '#d7e9ef',
          200: '#b0d3df',
          300: '#88bcd0',
          400: '#61a6c0',
          500: '#3990b0',
          600: '#2e738d',
          700: '#22566a',
          800: '#173a46',
          900: '#0b1d23',
        },

        green: {
          100: '#eef6d5',
          200: '#ddeeab',
          300: '#cbe581',
          400: '#badd57',
          500: '#a9d42d',
          600: '#87aa24',
          700: '#657f1b',
          800: '#445512',
          900: '#222a09',
        },

        pink: {
          100: '#f6e5ed',
          200: '#eeccdb',
          300: '#e5b2c9',
          400: '#dd99b7',
          500: '#d47fa5',
          600: '#aa6684',
          700: '#7f4c63',
          800: '#553342',
          900: '#2a1921',
        },
      },
    },
  },
}
