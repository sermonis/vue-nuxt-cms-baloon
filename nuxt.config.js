import colors from "vuetify/es5/util/colors";

import i18n from './config/i18n'
export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate(titleChunk) {
      return titleChunk ? titleChunk : "Balloon CMS";
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "Ballon CMS" },
      { property: "og:title", content: `${process.env.COMPANY_NAME} | Ballon CMS` },
      { property: "og:url", content: `${process.env.BASE_URL}` },
      { property: "og:description", content: "Content Management System For Hot Air Balloon Companies" },
      { name: "type", content: "website" },
      { name: "Revisit-after", content: "7 Days" },
      { name: "keywords", content: "New Powerfull Hot Air Ballon CMS, Hot Air Ballon Website" },
      { hid: "description", name: "description", content: "Content Management System For Hot Air Balloon Companies" },
    ]
  },

  server: {
    host: "0.0.0.0"
  },
  
  publicRuntimeConfig: {
    BASE_URL: process.env.BASE_URL,
    COMPANY_NAME: process.env.COMPANY_NAME
  },
  
  privateRuntimeConfig: {
    userService: process.env.USER_SERVICE
  },

  loading: {
    color: "#8B0715",
    height:"3px"
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    "~/plugins/axios",
    '~/plugins/notifier',
    '~/plugins/mixins'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  moment: {
    defaultTimezone: process.env.TZ || "Europe/Istanbul"
  },
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/moment',
    ['@nuxtjs/vuetify', {
      defaultAssets: {
        font: {
          family: 'Quicksand' 
        },
        icons: 'mdi'
      }, 
      
        
      
    }],
    [
      'nuxt-purgecss', {
        paths: [
          'node_modules/@nuxtjs/vuetify/**/*.ts',
          'node_modules/@nuxt/vue-app/template/**/*.html',
          'node_modules/@nuxt/vue-app/template/**/*.vue'
        ],
        whitelist: [
          'v-application',
          'v-application--wrap'
        ],
        whitelistPatterns: () => [
          /^v-((?!application).)*$/,
          /^\.theme--light*/,
          /.*-transition/
        ],
        whitelistPatternsChildren: [/^v-((?!application).)*$/, /^theme--light*/]
      }
    ],
    [
      'nuxt-i18n',
      {
        strategy: 'prefix_and_default',
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'i18n_lang',
          onlyOnRoot: true,  // recommended
          alwaysRedirect: true
        },
        
        defaultLocale: 'tr',
        locales: [
          {
            code: 'en',
            name: 'English',
            //file: "en.json",
            iso: "en-US"
          },
          {
            code: 'tr',
            name: 'Türkçe',
            //file: "tr.json",
            iso: "tr-TR"
          }
        ],
        //lazy: true,
        //langDir: 'locales/'
        vueI18n: i18n
      }
     ]
  ],

  build: {
    extractCSS: true
    // ...
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "cookie-universal-nuxt"
  ],
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: true
  },
  
  proxy: {
    '/user-service/': { target: process.env.USER_SERVICE, pathRewrite: {'^/user-service/': ''} },
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    /*theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }*/
    
  }

 
};
