<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon small v-bind="attrs" v-on="on" @click="darkMode" class="mr-2" >
        <v-icon :color="iconColor">mdi-theme-light-dark</v-icon>
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
      localStorage.setItem("dark-theme", this.$vuetify.theme.dark.toString());
    },
  },
  mounted() {
    const theme = localStorage.getItem("dark-theme");
    if (theme) {
      if (theme === "true") {
        this.$vuetify.theme.dark = true;
      } else {
        this.$vuetify.theme.dark = false;
      }
    } else if ( window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ) {
      this.$vuetify.theme.dark = true;
      localStorage.setItem("dark-theme", this.$vuetify.theme.dark.toString());
    }
  },
  computed: {
    iconColor() {
      return this.$vuetify.theme.dark ? 'yellow' : 'blue' 
    }
  }
}
</script>