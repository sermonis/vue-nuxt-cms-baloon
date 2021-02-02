<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon small v-bind="attrs" v-on="on" @click="darkMode">
        <v-icon :color="$vuetify.theme.dark ? 'yellow' : 'blue'" >mdi-{{ $vuetify.theme.dark ? "white-balance-sunny" : "moon-waxing-crescent" }}</v-icon>
      </v-btn>
    </template>
    <span>Toggle Color Mod</span>
  </v-tooltip>
</template>
<script>
export default {
  methods: {
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
    },
  },
  mounted() {
    const theme = localStorage.getItem("dark_theme");
    if (theme) {
      if (theme === "true") {
        this.$vuetify.theme.dark = true;
      } else {
        this.$vuetify.theme.dark = false;
      }
    } else if ( window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ) {
      this.$vuetify.theme.dark = true;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
    }
  },
};
</script>