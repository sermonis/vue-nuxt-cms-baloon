import colors from "vuetify/es5/util/colors";
export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate(titleChunk) {
      return titleChunk ? titleChunk : process.env.PAGE_TITLE;
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "Ballon CMS" },
      { property: "og:title", content: `${process.env.PAGE_TITLE} | Ballon CMS` },
      { property: "og:url", content: `${process.env.BASE_URL}` },
      { property: "og:description", content: "Content Management System For Hot Air Balloon Companies" },
      { name: "type", content: "website" },
      { name: "Revisit-after", content: "7 Days" },
      { name: "keywords", content: "New Powerfull Hot Air Ballon CMS, Hot Air Ballon Website" },
      { hid: "description", name: "description", content: "Content Management System For Hot Air Balloon Companies" }
    ],
  },

  env: {
    PAGE_TITLE: "Todo App with VueJs & Vuetify",
    BASE_URL: "http://localhost/"
  },

  loading: {
    color: "#8B0715"
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    "~/plugins/axios"
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    "nuxt-purgecss"
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios"
  ],
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
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
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {}
};
