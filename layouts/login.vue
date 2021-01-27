<template>
  <v-app>
    <v-app-bar app dense elevation="6">
      <nuxt-link :to="localePath('/about')"
        ><v-img
          class="mx-2"
          src="/images/logo.png"
          max-height="40"
          max-width="40"
          contain
      /></nuxt-link>

      <select v-model="selectedValue" @change="onChange(selectedValue)">
        <option
          v-for="(locale, index) in $i18n.locales"
          :key="index"
          :value="locale.code"
        >
          {{ locale.name }}
        </option>
      </select>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
    <ScroolToTop />
    <Snackbar />
    <Footer />
  </v-app>
</template>

<script>
// TODO: do something
export default {
  name: "login-layout",
  middleware: ["not-auth"],
  data() {
    return {
      selectedValue: "",
    };
  },
  created() {
    this.selectedValue = this.$i18n.locale;
  },
  methods: {
    onChange(event) {
      this.$i18n.setLocale(event);
      //this.$router.replace(this.switchLocalePath(event));
    },
  },
  components: {
    ScroolToTop: () => import("@/components/layout/ScroolToTop"),
    Snackbar: () => import("@/components/layout/SnackBar"),
    Footer: () => import("@/components/layout/Footer"),
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale);
    },
  },
};
</script>
