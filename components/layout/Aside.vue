<template>
    <v-navigation-drawer :value="drawer" app disable-resize-watcher>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> Application </v-list-item-title>
          <v-list-item-subtitle> subtext </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link color="primary">
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
                { title: "Photos", icon: "mdi-help-box", to: "/photos" }
            ]
    }),
    
    props:  [ 'drawer']

}
</script>