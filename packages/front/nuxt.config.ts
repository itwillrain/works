import { NuxtConfig } from '@nuxt/types'
const environment = process.env.NODE_ENV
const desc = 'It will rain(Takeshi Matsushita)のPortfolioサイト'

const envSet = require(`./src/config/env.${environment}.ts`)
const config: NuxtConfig = {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  // Target: https://go.nuxtjs.dev/config-target
  srcDir: 'src/',
  env: envSet,
  target: 'static',

  publicRuntimeConfig: {
    ENVIRONMENT: environment,
    DESCRIPTION: desc,
    ...envSet,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s  it will rain',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      {
        hid: 'robots',
        property: 'robots',
        content: 'noindex, nofollow, noarchive',
      },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'it will rain',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: desc,
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: `${envSet.BASE_URL}/ogp-img.jpg`,
      },
      { hid: 'description', name: 'description', content: desc },
      {
        hid: 'msapplication-TileColor',
        name: 'msapplication-TileColor',
        content: '#06b6d4',
      },
      {
        hid: 'theme-color',
        name: 'theme-color',
        content: '#ffffff',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'apple-touch-icon, type',
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
      {
        rel: 'manifest',
        href: '/site.webmanifest',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/firebase',
    '@plugins/firebase-auth',
    '@plugins/message',
    '@plugins/dark-mode',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '~/components',
    { path: '~/components/presentational/atoms', prefix: 'p-a' },
    { path: '~/components/presentational/molecules', prefix: 'p-m' },
    { path: '~/components/container', prefix: 'c' },
    { path: '~/components/container/shared', prefix: 'c-s' },
  ],
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/composition-api',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/color-mode',
    '@nuxt/content',
    'nuxt-webfontloader',
  ],

  webfontloader: {
    google: {
      families: ['Montserrat:100,200,500,700', 'Noto+Sans+JP:400,700'],
    },
  },

  router: {
    trailingSlash: true,
    middleware: ['auth'],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/scss/variables.scss'],
    optionsPath: '~/vuetify.options.ts',
    treeShake: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    terser: {
      sourceMap: true,
      terserOptions: {
        compress: {
          drop_console: process.env.NODE_ENV === 'production',
        },
      },
    },
  },
  generate: {
    dir: '../cloud/public/front',
  },
}

export default config
