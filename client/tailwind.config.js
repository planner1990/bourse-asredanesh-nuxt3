module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    './nuxt.config.ts'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  prefix: 'tw-',
  safelist: [
    {
      pattern: /tw-text-\w+/,
    },
  ]
}
