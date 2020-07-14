export default {
  mode: 'universal',
  target: 'server',
  head: {
    titleTemplate: (title) =>
      title ? '%s - Melhor com Saúde' : 'Melhor com Saúde',
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
      { rel: 'manifest', href: '/manifest.json' },
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
    // Doc: https://axios.nuxtjs.org/
    '@nuxtjs/axios',

    // Doc: https://pwa.nuxtjs.org/
    '@nuxtjs/pwa',
  ],
  axios: {
    baseURL: 'https://api.beta.mejorconsalud.com/wp-json/mc/v1/',
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
    meta: false,
    icon: false,
    manifest: false,
  },
  webfontloader: {
    custom: {
      families: ['Montserrat:n3,n4,n5', 'Oswald:n4'],
      urls: [
        'https://fonts.googleapis.com/css?family=Montserrat:300,400,500&display=swap',
        'https://fonts.googleapis.com/css?family=Oswald:400&display=swap',
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
}
