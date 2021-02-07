module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: [
    "plugin:vue/recommended",
    "eslint:recommended",
    "prettier/vue",
    "plugin:prettier/recommended"
  ],
  rules: {
    "vue/component-name-in-template-casing": ["error", "PascalCase"],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "comma-dangle": 0,
    "no-underscore-dangle": 0,
    "no-param-reassign": 0,
    "no-return-assign": 0,
    camelcase: 0,
    proseWrap: ["off"],
    "linebreak-style": 0,
    'vue/valid-v-slot': ['error', { allowModifiers: true }],
    'max-len': ['error', 140, 4, {
      ignoreUrls: true,
      ignoreTemplateLiterals: true,
      ignoreStrings: true,
    }],
    'max-statements': ['error', 24],
    quotes: ['error', 'single', {
      avoidEscape: true,
      allowTemplateLiterals: true,
    }],
  },
  globals: {
    $nuxt: true
  },
  parserOptions: {
    parser: "babel-eslint"
  }
}