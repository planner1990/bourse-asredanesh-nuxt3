module.exports = {
  important: true,
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.ts",
  ],
  theme: {
    extend: {
      fontSize: {
        xl: "1.334rem",
      },
    },
    colors: {
      transparent: 'transparent',
      'gray1' : {
        DEFAULT: 'rgba(51, 51, 51, 1)',
        100: 'rgba(51, 51, 51, .1)',
        200: 'rgba(51, 51, 51, .2)',
        300: 'rgba(51, 51, 51, .3)',
        400: 'rgba(51, 51, 51, .4)',
        500: 'rgba(51, 51, 51, .5)',
        600: 'rgba(51, 51, 51, .6)',
        700: 'rgba(51, 51, 51, .7)',
        800: 'rgba(51, 51, 51, .8)',
        900: 'rgba(51, 51, 51, .9)',
      },
      'gray2' : {
        DEFAULT: 'rgba(51, 51, 51, 1)',
        100: 'rgba(79, 79, 79, .1)',
        200: 'rgba(79, 79, 79, .2)',
        300: 'rgba(79, 79, 79, .3)',
        400: 'rgba(79, 79, 79, .4)',
        500: 'rgba(79, 79, 79, .5)',
        600: 'rgba(79, 79, 79, .6)',
        700: 'rgba(79, 79, 79, .7)',
        800: 'rgba(79, 79, 79, .8)',
        900: 'rgba(79, 79, 79, .9)',
      },
      'gray3' : {
        DEFAULT: 'rgba(130, 130, 130, 1)',
        100: 'rgba(130, 130, 130, .1)',
        200: 'rgba(130, 130, 130, .2)',
        300: 'rgba(130, 130, 130, .3)',
        400: 'rgba(130, 130, 130, .4)',
        500: 'rgba(130, 130, 130, .5)',
        600: 'rgba(130, 130, 130, .6)',
        700: 'rgba(130, 130, 130, .7)',
        800: 'rgba(130, 130, 130, .8)',
        900: 'rgba(130, 130, 130, .9)',
      },
      'gray4' : {
        DEFAULT: 'rgba(189, 189, 189, 1)',
        100: 'rgba(189, 189, 189, .1)',
        200: 'rgba(189, 189, 189, .2)',
        300: 'rgba(189, 189, 189, .3)',
        400: 'rgba(189, 189, 189, .4)',
        500: 'rgba(189, 189, 189, .5)',
        600: 'rgba(189, 189, 189, .6)',
        700: 'rgba(189, 189, 189, .7)',
        800: 'rgba(189, 189, 189, .8)',
        900: 'rgba(189, 189, 189, .9)',
      },
      'gray5' : {
        DEFAULT: 'rgba(244, 244, 244, 1)',
        100: 'rgba(244, 244, 244, .1)',
        200: 'rgba(244, 244, 244, .2)',
        300: 'rgba(244, 244, 244, .3)',
        400: 'rgba(244, 244, 244, .4)',
        500: 'rgba(244, 244, 244, .5)',
        600: 'rgba(244, 244, 244, .6)',
        700: 'rgba(244, 244, 244, .7)',
        800: 'rgba(244, 244, 244, .8)',
        900: 'rgba(244, 244, 244, .9)',
      },
      'white': '#ffffff', 
      'black' : '#000000',
      'black1' : {
        DEFAULT: 'rgba(29, 29, 29, 1)',
        100: 'rgba(29, 29, 29, .1)',
        200: 'rgba(29, 29, 29, .2)',
        300: 'rgba(29, 29, 29, .3)',
        400: 'rgba(29, 29, 29, .4)',
        500: 'rgba(29, 29, 29, .5)',
        600: 'rgba(29, 29, 29, .6)',
        700: 'rgba(29, 29, 29, .7)',
        800: 'rgba(29, 29, 29, .8)',
        900: 'rgba(29, 29, 29, .9)',
      },
      'black2' : {
        DEFAULT: 'rgba(130, 130, 130, 1)',
        100: 'rgba(130, 130, 130, .1)',
        200: 'rgba(130, 130, 130, .2)',
        300: 'rgba(130, 130, 130, .3)',
        400: 'rgba(130, 130, 130, .4)',
        500: 'rgba(130, 130, 130, .5)',
        600: 'rgba(130, 130, 130, .6)',
        700: 'rgba(130, 130, 130, .7)',
        800: 'rgba(130, 130, 130, .8)',
        900: 'rgba(130, 130, 130, .9)',
      },
      'info' : {
        DEFAULT: 'rgba(47, 128, 237, 1)',
        100: 'rgba(47, 128, 237, .1)',
        200: 'rgba(47, 128, 237, .2)',
        300: 'rgba(47, 128, 237, .3)',
        400: 'rgba(47, 128, 237, .4)',
        500: 'rgba(47, 128, 237, .5)',
        600: 'rgba(47, 128, 237, .6)',
        700: 'rgba(47, 128, 237, .7)',
        800: 'rgba(47, 128, 237, .8)',
        900: 'rgba(47, 128, 237, .9)',
      },
      'success' : {
        DEFAULT: 'rgba(0, 189, 121, 1)',
        100: 'rgba(0, 189, 121, .1)',
        200: 'rgba(0, 189, 121, .2)',
        300: 'rgba(0, 189, 121, .3)',
        400: 'rgba(0, 189, 121, .4)',
        500: 'rgba(0, 189, 121, .5)',
        600: 'rgba(0, 189, 121, .6)',
        700: 'rgba(0, 189, 121, .7)',
        800: 'rgba(0, 189, 121, .8)',
        900: 'rgba(0, 189, 121, .9)',
      },
      'warning' : {
        DEFAULT: 'rgba(255, 187, 70, 1)',
        100: 'rgba(255, 187, 70, .1)',
        200: 'rgba(255, 187, 70, .2)',
        300: 'rgba(255, 187, 70, .3)',
        400: 'rgba(255, 187, 70, .4)',
        500: 'rgba(255, 187, 70, .5)',
        600: 'rgba(255, 187, 70, .6)',
        700: 'rgba(255, 187, 70, .7)',
        800: 'rgba(255, 187, 70, .8)',
        900: 'rgba(255, 187, 70, .9)',
      },
      'danger' : {
        DEFAULT: 'rgba(255, 187, 70, 1)',
        100: 'rgba(255, 187, 70, .1)',
        200: 'rgba(255, 187, 70, .2)',
        300: 'rgba(255, 187, 70, .3)',
        400: 'rgba(255, 187, 70, .4)',
        500: 'rgba(255, 187, 70, .5)',
        600: 'rgba(255, 187, 70, .6)',
        700: 'rgba(255, 187, 70, .7)',
        800: 'rgba(255, 187, 70, .8)',
        900: 'rgba(255, 187, 70, .9)',
      },
      'green' : {
        DEFAULT: 'rgba(0, 189, 121, 1)',
        100: 'rgba(0, 189, 121, .1)',
        200: 'rgba(0, 189, 121, .2)',
        300: 'rgba(0, 189, 121, .3)',
        400: 'rgba(0, 189, 121, .4)',
        500: 'rgba(0, 189, 121, .5)',
        600: 'rgba(0, 189, 121, .6)',
        700: 'rgba(0, 189, 121, .7)',
        800: 'rgba(0, 189, 121, .8)',
        900: 'rgba(0, 189, 121, .9)',
      },
      'orange' : {
        DEFAULT: 'rgba(255, 165, 0, 1)',
        100: 'rgba(255, 165, 0, .1)',
        200: 'rgba(255, 165, 0, .2)',
        300: 'rgba(255, 165, 0, .3)',
        400: 'rgba(255, 165, 0, .4)',
        500: 'rgba(255, 165, 0, .5)',
        600: 'rgba(255, 165, 0, .6)',
        700: 'rgba(255, 165, 0, .7)',
        800: 'rgba(255, 165, 0, .8)',
        900: 'rgba(255, 165, 0, .9)',
      },
      'sky-blue' : '#89ABCD',
      'blue' : {
        DEFAULT: 'rgba(0, 156, 242, 1)',
        100: 'rgba(0, 156, 242, .1)',
        200: 'rgba(0, 156, 242, .2)',
        300: 'rgba(0, 156, 242, .3)',
        400: 'rgba(0, 156, 242, .4)',
        500: 'rgba(0, 156, 242, .5)',
        600: 'rgba(0, 156, 242, .6)',
        700: 'rgba(0, 156, 242, .7)',
        800: 'rgba(0, 156, 242, .8)',
        900: 'rgba(0, 156, 242, .9)',
      },
      'red' : {
        DEFAULT: 'rgba(255, 59, 48, 1)',
        100: 'rgba(255, 59, 48, .1)',
        200: 'rgba(255, 59, 48, .2)',
        300: 'rgba(255, 59, 48, .3)',
        400: 'rgba(255, 59, 48, .4)',
        500: 'rgba(255, 59, 48, .5)',
        600: 'rgba(255, 59, 48, .6)',
        700: 'rgba(255, 59, 48, .7)',
        800: 'rgba(255, 59, 48, .8)',
        900: 'rgba(255, 59, 48, .9)',
      },
      'primary' : {
        DEFAULT: 'rgba(53, 84, 209, 1)',
        50: 'rgba(53, 84, 209, .05)',
        100: 'rgba(53, 84, 209, .1)',
        200: 'rgba(53, 84, 209, .2)',
        300: 'rgba(53, 84, 209, .3)',
        400: 'rgba(53, 84, 209, .4)',
        500: 'rgba(53, 84, 209, .5)',
        600: 'rgba(53, 84, 209, .6)',
        700: 'rgba(53, 84, 209, .7)',
        800: 'rgba(53, 84, 209, .8)',
        900: 'rgba(53, 84, 209, .9)',
      },
      'divider': 'rgba(229, 233, 250, 1)'
    }
    // #2547FF
  },
  plugins: [],
  prefix: "tw-",
  safelist: [
    {
      pattern: /^tw-text-\w+|^tw-m[-xytblr]-?[\d\w]+|^tw-[\w\d]+--active$/,
    },
  ],
};
