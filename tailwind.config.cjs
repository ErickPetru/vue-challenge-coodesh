// Doc: https://tailwindcss.com/docs/configuration
module.exports = {
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
    },
  },
}
