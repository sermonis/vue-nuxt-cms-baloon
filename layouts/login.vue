<template>
  <v-app>
    <v-app-bar app dense elevation="6">
      <nuxt-link to="/">
        <v-img
          class="mx-2"
          src="http://ballooncms.com/assets/default/media/logos/logo.png"
          max-height="40"
          max-width="40"
          contain
        />
      </nuxt-link>
      <v-toolbar-title class="flex text-center">
        Login
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
    <ScroolToTop/>
    <v-footer :absolute="true" app>
      <span>&copy; {{ new Date().getFullYear() }} - {{ $store.state.title }}</span>
    </v-footer>
  </v-app>
</template>

<script>
// TODO: do something
export default {
  name: "login-layout",
  middleware: ["not-auth"],
  components: {
    ScroolToTop: () => import("@/components/layout/ScroolToTop.vue")
  }
};
</script>
