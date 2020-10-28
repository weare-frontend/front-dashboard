require('dotenv').config()
process.env.APP_VERSION = require('./package.json').version
const configTheme = require('./config/theme.js')

module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.SITE_NAME,
    htmlAttrs: {
      class: `${process.env.THEME_COLOR || 'greenlight-theme'}`,
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'HandheldFriendly',
        content: 'true',
      },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover,shrink-to-fit=no',
      },
      { name: 'language', content: 'TH' },
      { name: 'apple-mobile-web-app-capable', content: 'no' },
      {
        property: 'og:title',
        hid: 'og:title',
        name: 'og:title',
        content: process.env.SITE_NAME,
      },
      {
        property: 'og:image',
        hid: 'og:image',
        name: 'og:image',
        content: process.env.API + 'backend/api/get-setting/image?id=2',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: process.env.API + 'backend/api/get-setting/image?id=2',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Kanit:300,400,500,600,700',
      },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.6.3/css/all.css',
        integrity: 'sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/',
        crossorigin: 'anonymous',
      },
    ],
    script: [
      { src: '/js/jquery-3.3.1.min.js', type: 'text/javascript' },
      { src: '/js/popper.min.js', type: 'text/javascript' },
      {
        src: '/js/datepicker/bootstrap-datepicker.js',
        type: 'text/javascript',
      },
      {
        src: '/js/datepicker/bootstrap-datepicker-thai.js',
        type: 'text/javascript',
      },
      {
        src: '/js/datepicker/locales/bootstrap-datepicker.th.js',
        type: 'text/javascript',
      },
      {
        src: '/vendor/bootstrap-4.4.1/js/bootstrap.min.js',
        type: 'text/javascript',
      },
      { src: '/vendor/swiper/js/swiper.min.js', type: 'text/javascript' },
      { src: '/vendor/cookie/jquery.cookie.js', type: 'text/javascript' },
      { src: '/js/main.js', type: 'text/javascript' },
      { src: '/js/wheel/Winwheel.min.js', type: 'text/javascript' },
      { src: '/js/wheel/TweenMax.min.js', type: 'text/javascript' },
      {
        src: 'https://d.line-scdn.net/r/web/social-plugin/js/thirdparty/loader.min.js',
        type: 'text/javascript',
      },
      // {
      //     src: "https://d.line-scdn.net/r/web/social-plugin/js/thirdparty/loader.min.js",
      //     type: "text/javascript",
      // },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    '~/static/vendor/materializeicon/material-icons.css',
    '~/static/vendor/bootstrap-4.4.1/css/bootstrap.min.css',
    '~/static/vendor/swiper/css/swiper.min.css',
    '~/assets/css/style.css',
    '~/assets/css/animate.css',
    '~/assets/css/datepicker.css',
    '~/assets/css/framework7-icons.css',
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: '~/plugins/carousel3d.js',
      ssr: false,
    },
    {
      src: '~/plugins/filters.js',
      ssr: true,
    },
    {
      src: '~/plugins/pincode.js',
      ssr: false,
    },
    {
      src: '~/plugins/gtm.js',
      ssr: false,
    },
    {
      src: '~/plugins/overlay.js',
      ssr: false,
    },
    {
      src: '~/plugins/idle.js',
      ssr: false,
    },
    {
      src: '~/plugins/promptpay.js',
      ssr: false,
    },
    {
      src: '~/plugins/countdown.js',
      ssr: false,
    },
    {
      src: '~plugins/ga.js',
      mode: 'client',
    },
    {
      src: '~plugins/fb-sdk.js',
      ssr: false,
    },
    {
      src: '~/plugins/sharesocial.js',
      ssr: false,
    },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    ['@nuxtjs/axios', { proxy: true }],
    // Doc: https://github.com/nuxt-community/dotenv-module
    ['@nuxtjs/dotenv', { systemvars: true }],
    '@nuxtjs/auth',
    'bootstrap-vue/nuxt',
    '@nuxtjs/toast',
    'nuxt-session',
    '@nuxtjs/device',
    'cookie-universal-nuxt',
    '@nuxtjs/gtm',
    // 'nuxt-i18n',
    // {
    //     locales: ['en', 'es'],
    //     defaultLocale: 'en',
    //     vueI18n: {
    //         fallbackLocale: 'en',
    //         messages: {
    //             en: {
    //                 greeting: 'Hello world!'
    //             },
    //             es: {
    //                 greeting: '¡Hola mundo!'
    //             }
    //         }
    //     }
    // }
  ],

  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    // bootstrapVueCSS: false // Or `bvCSS: false`
  },
  loading: '~/components/Loading.vue',
  router: {
    linkExactActiveClass: 'active',
    middleware: ['auth'],
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  proxy: {
    '/api/': {
      target: process.env.API + 'backend/',
      pathRewrite: { '^/api': 'api' },
    },
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */

    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      })
    },
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/login', method: 'post', propertyName: 'data' },
          logout: { url: '/api/logout', method: 'get' },
          user: {
            url: '/api/player-data',
            method: 'get',
            propertyName: 'data',
          },
        },
        tokenRequired: true,
        tokenType: 'Bearer',
      },
    },
    redirect: {
      login: '/dashboard/login',
      home: '/dashboard',
      callback: '/dashboard/login',
    },
  },
  toast: {
    position: 'top-center',
    className: 'justify-content-start',
    register: [
      // Register custom toasts
      {
        name: 'error',
        message: (option) => option.message,
        options: {
          type: 'error',
          icon: 'error_outline',
          duration: 2000,
        },
      },
      {
        name: 'success',
        message: (option) => option.message,
        options: {
          type: 'success',
          icon: 'check',
          duration: 2000,
        },
      },
    ],
  },
  server: {
    // port: process.env.PORT || 3000, // default: 3000
    // host: process.env.HOST || "localhost", // default: localhost
    port: process.env.PORT || 7004, // default: 3000
    // host: process.env.HOST || 'localhost', // default: localhost
    host: '0.0.0.0', // default: localhost
  },
  telemetry: false,
}
