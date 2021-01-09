<template>
  <v-app>
    <Aside :drawer="drawer" />
    <v-app-bar app dense elevation="4">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-divider vertical />
      <nuxt-link to="/">
        <v-img
          class="mx-2"
          src="http://ballooncms.com/assets/default/media/logos/logo.png"
          max-height="40"
          max-width="40"
          contain
        />
      </nuxt-link>

      <v-toolbar-title>{{ $store.state.title }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
      <ScroolToTop />
    </v-main>

    <v-footer :absolute="true" app>
      <span>&copy; {{ new Date().getFullYear() }} - {{ $store.state.title }}</span>
    </v-footer>
  </v-app>
</template>

<script>
// TODO: do something
export default {
  name: "default-layout",
  middleware: ["session-control", "auth"],
  components: {
    Aside: () => import("@/components/layout/Aside.vue"),
    ScroolToTop: () => import("@/components/layout/ScroolToTop.vue")
  },
  data() {
    return {
      drawer: false
    };
  },
  computed: {
    data() {

    }
  }
};
</script>
