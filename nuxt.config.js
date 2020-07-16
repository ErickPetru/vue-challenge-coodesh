import * as fs from 'fs'
import * as path from 'path'

export default {
  mode: 'universal',
  target: 'server',
  head: {
    titleTemplate: (title) =>
      title
        ? `${title} - Melhor com Saúde - Revista sobre bons hábitos e cuidados para a sua saúde`
        : 'Melhor com Saúde - Revista sobre bons hábitos e cuidados para a sua saúde',
    description: 'Revista sobre bons hábitos e cuidados para a sua saúde',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'apple-mobile-web-app-title', content: 'Melhor com Saúde' },
      { name: 'application-name', content: 'Melhor com Saúde' },
      { name: 'msapplication-TileColor', content: '#3990b0' },
      { name: 'theme-color', content: '#3990b0' },
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest' },
      {
        rel: 'mask-icon',
        href: '/safari-pinned-tab.svg',
        color: '#3990b0',
      },
    ],
  },
  components: true,
  loading: { color: '#3990b0' },
  router: {
    linkExactActiveClass: 'link-exact-active',
    linkActiveClass: 'link-active',
  },
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',

    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',

    // Doc: https://github.com/Developmint/nuxt-webfontloader
    'nuxt-webfontloader',
  ],
  modules: [
    // Doc: https://http.nuxtjs.org/
    '@nuxt/http',

    // Doc: https://pwa.nuxtjs.org/
    '@nuxtjs/pwa',
  ],
  plugins: [
    '@/plugins/filter-date-format.js',
    '@/plugins/filter-date-parse.js',
  ],
  http: {
    baseURL: 'https://api.beta.mejorconsalud.com/wp-json/mc/',
  },
  pwa: {
    workbox: {
      dev: false,
      debug: process.env.NODE_ENV === 'development',
      cleanupOutdatedCaches: true,
      cacheNames: {
        prefix: process.env.npm_package_name || 'vue-challenge-vbc',
        suffix: 'v20200714',
      },
    },
    meta: {
      lang: 'pt-BR',
      display: 'browser',
      name: 'Melhor com Saúde',
      author: 'Erick Eduardo Petrucelli <erickpetru@gmail.com>',
      description: 'Revista sobre bons hábitos e cuidados para a sua saúde',
    },
    icon: false,
    manifest: false,
  },
  webfontloader: {
    custom: {
      families: ['Roboto:n4,n7', 'Signika:n7'],
      urls: [
        'https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap',
        'https://fonts.googleapis.com/css?family=Signika:700&display=swap',
      ],
    },
  },
  tailwindcss: {
    configPath: './tailwind.config.cjs',
    cssPath: './assets/css/tailwind.css',
    exposeConfig: false,
  },
  purgeCSS: {
    content: [
      './components/**/*.vue',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './app.html',
    ],
    whitelist: ['html', 'body'],
  },
  build: {
    parallel: process.env.NODE_ENV === 'development',
  },
  server: {
    // Enable HTTPS on 'production' or simulates it on 'development'
    https:
      process.env.NODE_ENV === 'production' ||
      fs.existsSync(path.resolve(__dirname, 'private/localhost.key'))
        ? {
            key: fs.readFileSync(
              path.resolve(__dirname, 'private/localhost.key')
            ),
            cert: fs.readFileSync(
              path.resolve(__dirname, 'private/localhost.crt')
            ),
          }
        : false,
  },
}
