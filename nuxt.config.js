import colors from 'vuetify/es5/util/colors'
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
const fs = require('fs')
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  target:"static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - LuanCase',
    title: 'LuanCase',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  router: {
    middleware: ['auth'],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/axios', '~/plugins/persistedstate.js', '~/plugins/helper.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/moment',
    [
      '@nuxtjs/dotenv',
      { filename: `.env.${process.env.NODE_ENV}`, systemvars: true },
    ],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'vue-toastification/nuxt',
    '@nuxtjs/firebase'
  ],
  toast: {
    position: 'top-right',
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: 'button',
    icon: true,
    rtl: false,
  },
  firebase: {
    config:{
    apiKey: "AIzaSyBix73HHrvFUo_IwLvWeMEaihY4e3t9yS8",
    authDomain: "notificationapp-e6a25.firebaseapp.com",
    projectId: "notificationapp-e6a25",
    storageBucket: "notificationapp-e6a25.appspot.com",
    messagingSenderId: "616570992430",
    appId: "1:616570992430:web:7d95ef1047e8cb5e07acbf",
    measurementId: "G-RZVWZWMKFH"
  },
  services:{
    messaging:{
      createServiceWorker:true,
      fcmPublicVapidKey:'BKqLYzejApYU6nn3DxfmbzIzr35LUAquQiLY3iPKKfUHjBjFNC2VDJ95UzWVdiM1uwvFaNBL9XehpftTc6oP3yk',
      inject: fs.readFileSync('./serviceWorker.js')
    }
  }
},
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: `/`, // ${process.env.API_KEY}
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // transpile: ['vue-toastification'],
  },
}
