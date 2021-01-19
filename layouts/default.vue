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
        v-for="item in items"
        :key="item.title"
        :to="item.to"
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
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
      <ScroolToTop />
    </v-main>

    <ScroolToTop />
    <Snackbar />
    <v-footer :absolute="true" app class="text-center">
      <v-flex md2 ></v-flex>
          <v-flex md8  class="text-xs-center text-sm-body-2">
            <span>{{ $t('copyrightMessage', { name: $config.COMPANY_NAME, date: new Date().getFullYear()  }) }}</span>
          </v-flex>
        <v-flex md2></v-flex>
    </v-footer>
  </v-app>
</template>

<script>
// TODO: do something
export default {
  name: "default-layout",
  middleware: "auth",
  components: {
    ScroolToTop: () => import("@/components/layout/ScroolToTop.vue"),
    Snackbar: () => import('~/components/layout/SnackBar')
  },
  data() {
    return {
      drawer: false,
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard", to: "/" },
        { title: "Inspare", icon: "mdi-image", to: "/inspire" },
        { title: "Photos", icon: "mdi-help-box", to: "/photos" },
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
<style>
@-moz-keyframes spin {
    from { -moz-transform: rotate(0deg); }
    to { -moz-transform: rotate(360deg); }
}
@-webkit-keyframes spin {
    from { -webkit-transform: rotate(0deg); }
    to { -webkit-transform: rotate(360deg); }
}
.icon-spin {
  animation: spin 2s infinite linear;
}
</style>