<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" absolute
      temporary
      app >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title"> Application </v-list-item-title>
        <v-list-item-subtitle> subtext </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list dense nav>
      <v-list-item
        v-for="(item, i ) in items"
        :key="i"
        :to="localePath(item.to)"
        link
        color="primary"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <!--  -->
  </v-navigation-drawer>
    <v-app-bar app dense elevation="4">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-divider vertical />
      <nuxt-link to="/">
        <v-img
          class="mx-2"
          src="/images/logo.png"
          max-height="40"
          max-width="40"
          contain
        />
      </nuxt-link>
      <v-spacer/>
      <v-toolbar-title>{{ $config.COMPANY_NAME }}</v-toolbar-title>

      <v-spacer/>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
      
      <UserMenu v-if="$store.getters['auth/isAuthenticated']"/>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
      <ScroolToTop />
    </v-main>
    <Snackbar />
    <Footer/>
  </v-app>
</template>

<script>
// TODO: do something
export default {
  name: "default-layout",
  middleware: "auth",
  components: {
    ScroolToTop: () => import("~/components/layout/ScroolToTop.vue"),
    Snackbar: () => import('~/components/layout/SnackBar'),
    UserMenu: () => import('~/components/layout/UserMenu'),
    Footer: () => import('~/components/layout/Footer'),
  },
  data() {
    return {
      drawer: false,
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard", to: "/" },
        { title: "Inspare", icon: "mdi-image", to: "/inspire" },
        { title: "Photos", icon: "mdi-help-box", to: "/photos" },
        { title: "Resimler", icon: "mdi-folder-multiple-image", to: "/images" },
        { title: "Resimler2", icon: "mdi-folder-multiple-image", to: "/images/others" },
        { title: "Tablolar", icon: "mdi-folder-multiple-image", to: "/tables" },
        { title: "Login", icon: "mdi-help-box", to: "/login" },
      ]
    };
  },
  computed: {
    data() {

    }
  }
};
</script>