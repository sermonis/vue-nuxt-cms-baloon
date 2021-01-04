<template>
  <v-app dark>
    <Aside :drawer="drawer" />
    <v-app-bar app color="primary" dark prominent src="/header-image.jpg">
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ title }}</v-toolbar-title>

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
      <ScroolToTop/>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }} - {{ title }}</span>
    </v-footer>
  </v-app>
</template>

<script>
// TODO: do something
export default {
  name: "default-layout",
  components: {
    Aside: () => import("@/components/layout/Aside.vue"),
    ScroolToTop: () => import("@/components/layout/ScroolToTop.vue")
  },
  data() {
    return {
      
      drawer: false,
      fixed: false,
      title: process.env.PAGE_TITLE
    };
  }
};
</script>
