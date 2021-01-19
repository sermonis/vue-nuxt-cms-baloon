<template>
  <v-navigation-drawer  absolute
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
</template>
<script>
export default {
  data: () => ({
    items: [
      { title: "Dashboard", icon: "mdi-view-dashboard", to: "/" },
      { title: "Inspare", icon: "mdi-image", to: "/inspire" },
      { title: "Photos", icon: "mdi-help-box", to: "/photos" },
      { title: "Login", icon: "mdi-help-box", to: "/login" },
    ],
  }),
  

  methods: {      
  closeBtnClick() {
    this.$emit('close');
    setTimeout(() => { this.$router.push(this.returnRoute); }, this.closeDelay);
  },
  },
mounted() {
  setTimeout(() => { this.$emit('open'); }, this.closeDelay);
}
};
</script>
