<template>
  <div>
    <v-list-item>
      <v-list-item-avatar tile min-height="40" min-width="60">
        <v-img 
          src="/images/logo2.png" 
          min-height="60" 
          min-width="60" contain
        />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>Navigasyon</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider />

    <v-list dense nav>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        link
        color="primary"
        v-show="linkPermission(item.permisson)"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "Ana Sayfa", icon: "mdi-home", to: "/", permisson: "/" },
        { title: "Balonlar", icon: "mdi-airballoon-outline", to: "/balloons",  permisson: "viewBalloons" }
      ]
    }
  },
  methods: {
    linkPermission(permission) {
      if (!this._loggedIn) {
        return false;
      }
      if (["admin", "manager"].includes(this.$store.state.auth.user.rank)) {
        return true;
      } else if ( this.$store.state.auth.user.permissions && this.$store.state.auth.user.permissions.includes(permission) ) {
        return true;
      } else {
        return false;
      }
    }
  }
}
</script>
